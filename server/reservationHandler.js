import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { Resend } from 'resend';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '../data');
const RESERVATIONS_FILE = path.join(DATA_DIR, 'reservations.json');

// Ensure data directory and file exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(RESERVATIONS_FILE)) {
  fs.writeFileSync(RESERVATIONS_FILE, JSON.stringify([], null, 2), 'utf8');
}

// In-memory rate limiting and idempotency cache
const ipRateLimits = new Map(); // ip -> { count, firstSeen }
const idempotencyCache = new Map(); // hash -> { timestamp, response }

// HTML Escaper to prevent injection
function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export async function handleReservationRequest(reqBody, clientIp = '127.0.0.1') {
  // 1. Rate limiting check (max 6 submissions per IP in 10 minutes)
  const now = Date.now();
  const clientWindow = ipRateLimits.get(clientIp);
  if (clientWindow) {
    if (now - clientWindow.firstSeen < 10 * 60 * 1000) {
      if (clientWindow.count >= 6) {
        return {
          statusCode: 429,
          body: {
            success: false,
            error: 'Too many reservation attempts from your connection. Please wait a few minutes before trying again.',
          },
        };
      }
      clientWindow.count++;
    } else {
      ipRateLimits.set(clientIp, { count: 1, firstSeen: now });
    }
  } else {
    ipRateLimits.set(clientIp, { count: 1, firstSeen: now });
  }

  // 2. Validate required input
  const {
    fullName,
    phone,
    email,
    date,
    timeSlot,
    guests,
    seatingArea,
    occasion,
    notes,
    includePool,
    orderItems,
  } = reqBody || {};

  if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
    return {
      statusCode: 400,
      body: { success: false, error: 'Please provide a valid full name (at least 2 characters).' },
    };
  }

  const cleanPhone = String(phone || '').replace(/\D/g, '');
  if (cleanPhone.length < 10 || cleanPhone.length > 12) {
    return {
      statusCode: 400,
      body: { success: false, error: 'Please provide a valid 10-digit mobile number.' },
    };
  }

  if (email && (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {
    return {
      statusCode: 400,
      body: { success: false, error: 'Please enter a valid email address, or leave it blank.' },
    };
  }

  if (!date || typeof date !== 'string') {
    return {
      statusCode: 400,
      body: { success: false, error: 'Please select a reservation date.' },
    };
  }

  // Date check - cannot be in past
  const reservationDate = new Date(date + 'T00:00:00');
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (isNaN(reservationDate.getTime()) || reservationDate < today) {
    return {
      statusCode: 400,
      body: { success: false, error: 'Reservation date cannot be in the past.' },
    };
  }

  const guestCount = parseInt(guests, 10);
  if (isNaN(guestCount) || guestCount < 1 || guestCount > 30) {
    return {
      statusCode: 400,
      body: { success: false, error: 'Party size must be between 1 and 30 guests.' },
    };
  }

  // 3. Duplicate prevention / idempotency (within 3 minutes by phone + date)
  const idempotencyKey = `${cleanPhone}-${date}-${timeSlot}`;
  const existingRequest = idempotencyCache.get(idempotencyKey);
  if (existingRequest && now - existingRequest.timestamp < 3 * 60 * 1000) {
    return {
      statusCode: 200,
      body: {
        ...existingRequest.response,
        message: 'This reservation request was already submitted and is pending review.',
        isDuplicate: true,
      },
    };
  }

  // 4. Generate Unique Booking Reference
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const referenceId = `CCB-${date.replace(/-/g, '').slice(2)}-${randomSuffix}`;
  const timestamp = new Date().toISOString();

  // 5. Structure Reservation Record
  const reservationRecord = {
    referenceId,
    timestamp,
    clientIp,
    customer: {
      name: fullName.trim(),
      phone: cleanPhone,
      email: email ? email.trim() : null,
    },
    details: {
      date,
      timeSlot: timeSlot || 'Dinner Slot',
      guests: guestCount,
      seatingArea: seatingArea || 'Rooftop Terrace',
      occasion: occasion || 'Casual Dining',
      includePool: Boolean(includePool),
      notes: notes ? notes.trim() : '',
      estimatedOrderItemsCount: Array.isArray(orderItems) ? orderItems.length : 0,
    },
    status: 'REQUEST_RECEIVED',
    reviewStatus: 'PENDING_REVIEW', // Table is NOT confirmed yet!
    emailDelivery: {
      status: 'NOT_SENT',
      attemptedAt: timestamp,
      recipient: process.env.BOOKING_TO_EMAIL || 'shivsaai2010@gmail.com',
    },
  };

  // 6. Save to local storage
  try {
    const raw = fs.readFileSync(RESERVATIONS_FILE, 'utf8');
    const list = JSON.parse(raw);
    list.unshift(reservationRecord);
    fs.writeFileSync(RESERVATIONS_FILE, JSON.stringify(list, null, 2), 'utf8');
  } catch (err) {
    console.error('Failed to save reservation locally:', err.message);
  }

  // 7. Dispatch Email Notification
  const targetEmail = process.env.BOOKING_TO_EMAIL || 'shivsaai2010@gmail.com';
  const fromEmail = process.env.BOOKING_FROM_EMAIL || 'onboarding@resend.dev';
  const apiKey = process.env.RESEND_API_KEY;

  let emailStatus = 'EMAIL_PENDING_CONFIG';
  let emailNotice = '';

  // Prepare Email Template
  const emailSubject = `New Table Reservation Request — Cafe Cue & Brew [${referenceId}]`;

  const orderItemsSummaryHtml = Array.isArray(orderItems) && orderItems.length > 0
    ? `
      <div style="margin-top: 20px; padding: 15px; background: #161D2A; border-radius: 8px; border: 1px solid #2A364F;">
        <h3 style="margin: 0 0 10px; color: #F5D783; font-size: 14px;">Pre-selected Demo Dishes to Estimate (${orderItems.length} items):</h3>
        <ul style="margin: 0; padding-left: 20px; color: #D1D5DB; font-size: 13px;">
          ${orderItems
            .map(
              (o) =>
                `<li><strong>${escapeHtml(o.item?.name || 'Item')}</strong> ${
                  o.variantName ? `(${escapeHtml(o.variantName)})` : ''
                } x ${o.quantity} — ₹${o.price * o.quantity}</li>`
            )
            .join('')}
        </ul>
      </div>
    `
    : '';

  const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>${emailSubject}</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #070B14; color: #E5E7EB; margin: 0; padding: 24px;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #0E1522; border: 1px solid #D4AF37; border-radius: 12px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.6);">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #1A120C 0%, #0B111E 100%); padding: 28px 24px; text-align: center; border-bottom: 2px solid #D4AF37;">
          <h1 style="margin: 0; font-size: 22px; color: #FCE08B; letter-spacing: 2px; text-transform: uppercase;">CAFE CUE & BREW</h1>
          <p style="margin: 4px 0 0; font-size: 13px; color: #D4AF37; font-style: italic;">कैफे क्यू & ब्रेव • 7th Floor Rooftop & Snooker Lounge, Pune</p>
          <div style="display: inline-block; margin-top: 12px; padding: 4px 12px; background: rgba(212,175,55,0.15); border: 1px solid #D4AF37; border-radius: 20px; font-size: 11px; color: #FCE08B; font-weight: bold; letter-spacing: 1px;">
            TABLE RESERVATION REQUEST
          </div>
        </div>

        <!-- Body -->
        <div style="padding: 24px;">
          <div style="background: #121927; padding: 14px 18px; border-radius: 8px; border-left: 4px solid #D4AF37; margin-bottom: 20px;">
            <p style="margin: 0; font-size: 12px; color: #9CA3AF; text-transform: uppercase;">Booking Reference</p>
            <p style="margin: 2px 0 0; font-size: 18px; font-weight: bold; color: #FFFFFF; font-family: monospace;">${escapeHtml(referenceId)}</p>
            <p style="margin: 4px 0 0; font-size: 11px; color: #EAB308;">Status: PENDING REVIEW — Action Required by Cafe Staff</p>
          </div>

          <h2 style="font-size: 16px; color: #F3F4F6; border-bottom: 1px solid #1F293D; padding-bottom: 8px; margin-top: 0;">Guest Details</h2>
          <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 20px;">
            <tr>
              <td style="padding: 8px 0; color: #9CA3AF; width: 140px;">Customer Name:</td>
              <td style="padding: 8px 0; color: #FFFFFF; font-weight: bold;">${escapeHtml(fullName)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #9CA3AF;">Phone Number:</td>
              <td style="padding: 8px 0; color: #FCE08B; font-weight: bold;"><a href="tel:+91${cleanPhone}" style="color: #FCE08B; text-decoration: none;">+91 ${cleanPhone}</a></td>
            </tr>
            ${email ? `<tr><td style="padding: 8px 0; color: #9CA3AF;">Email:</td><td style="padding: 8px 0; color: #FFFFFF;">${escapeHtml(email)}</td></tr>` : ''}
          </table>

          <h2 style="font-size: 16px; color: #F3F4F6; border-bottom: 1px solid #1F293D; padding-bottom: 8px; margin-top: 0;">Reservation Parameters</h2>
          <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
            <tr>
              <td style="padding: 8px 0; color: #9CA3AF; width: 140px;">Requested Date:</td>
              <td style="padding: 8px 0; color: #FFFFFF; font-weight: bold;">${escapeHtml(date)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #9CA3AF;">Requested Slot:</td>
              <td style="padding: 8px 0; color: #FFFFFF;">${escapeHtml(timeSlot || 'Evening')}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #9CA3AF;">Party Size:</td>
              <td style="padding: 8px 0; color: #FFFFFF; font-weight: bold;">${guestCount} Guests</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #9CA3AF;">Seating Area:</td>
              <td style="padding: 8px 0; color: #FCE08B;">${escapeHtml(seatingArea || 'Rooftop Terrace')}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #9CA3AF;">Occasion:</td>
              <td style="padding: 8px 0; color: #FFFFFF;">${escapeHtml(occasion || 'None')}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #9CA3AF;">Pool Table Interest:</td>
              <td style="padding: 8px 0; color: ${includePool ? '#22C55E' : '#9CA3AF'}; font-weight: ${includePool ? 'bold' : 'normal'};">
                ${includePool ? '✓ YES — Guest requested Snooker/Pool Table availability' : 'No'}
              </td>
            </tr>
            ${notes ? `
            <tr>
              <td style="padding: 8px 0; color: #9CA3AF; vertical-align: top;">Special Requests:</td>
              <td style="padding: 8px 0; color: #E5E7EB; font-style: italic;">“${escapeHtml(notes)}”</td>
            </tr>` : ''}
          </table>

          ${orderItemsSummaryHtml}

          <!-- Cafe Staff Call To Action Box -->
          <div style="margin-top: 24px; padding: 16px; background: #1A1F2C; border-radius: 8px; border: 1px dashed #D4AF37; text-align: center;">
            <p style="margin: 0 0 10px; font-size: 13px; color: #F3F4F6;">
              Please review table availability at the cafe and call or message <strong>${escapeHtml(fullName)}</strong> to confirm or reschedule.
            </p>
            <a href="tel:+91${cleanPhone}" style="display: inline-block; padding: 10px 20px; background: #D4AF37; color: #0B111E; text-decoration: none; font-weight: bold; font-size: 12px; border-radius: 6px; text-transform: uppercase;">
              Call Guest: +91 ${cleanPhone}
            </a>
          </div>
        </div>

        <!-- Footer -->
        <div style="background-color: #070B14; padding: 16px 24px; text-align: center; border-top: 1px solid #1F293D; font-size: 11px; color: #6B7280;">
          <p style="margin: 0;">Cafe Cue & Brew Pune — 7th floor, above Amigos Gym, opp Sinhgad Campus, Vadgaon Budruk</p>
          <p style="margin: 4px 0 0;">Received at: ${new Date(timestamp).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const emailText = `
NEW TABLE RESERVATION REQUEST — CAFE CUE & BREW
==================================================
Reference: ${referenceId}
Status: PENDING REVIEW (Action Required)

GUEST DETAILS:
- Name: ${fullName}
- Phone: +91 ${cleanPhone}
${email ? `- Email: ${email}` : ''}

RESERVATION DETAILS:
- Date: ${date}
- Time Slot: ${timeSlot}
- Guests: ${guestCount}
- Seating: ${seatingArea}
- Occasion: ${occasion}
- Pool Table: ${includePool ? 'Yes' : 'No'}
${notes ? `- Special Notes: ${notes}` : ''}

Submitted at: ${timestamp}
Please contact the guest at +91 ${cleanPhone} to confirm table floor availability.
  `.trim();

  // If Resend API Key is provided, attempt live dispatch
  if (apiKey && apiKey.trim().length > 0 && apiKey !== 're_placeholder') {
    try {
      const resend = new Resend(apiKey);
      const emailResult = await resend.emails.send({
        from: `Cafe Cue & Brew <${fromEmail}>`,
        to: [targetEmail],
        subject: emailSubject,
        html: emailHtml,
        text: emailText,
      });

      if (emailResult && !emailResult.error) {
        emailStatus = 'EMAIL_SENT';
        emailNotice = `Notification email dispatched to ${targetEmail} via Resend.`;
        reservationRecord.emailDelivery.status = 'SENT';
        reservationRecord.emailDelivery.resendId = emailResult.data?.id;
      } else {
        emailStatus = 'EMAIL_FAILED';
        emailNotice = `Resend returned error: ${emailResult.error?.message || 'Unknown error'}`;
        reservationRecord.emailDelivery.status = 'FAILED';
        reservationRecord.emailDelivery.error = emailResult.error?.message;
      }
    } catch (err) {
      emailStatus = 'EMAIL_FAILED';
      emailNotice = `Failed to send email: ${err.message}`;
      reservationRecord.emailDelivery.status = 'FAILED';
      reservationRecord.emailDelivery.error = err.message;
    }
  } else {
    // API key not yet configured in .env
    emailStatus = 'EMAIL_PENDING_CONFIG';
    emailNotice = `Reservation saved locally on server. Notification email configured for ${targetEmail} (set RESEND_API_KEY in .env to activate live dispatch).`;
  }

  // Update record in JSON file with final email status
  try {
    const raw = fs.readFileSync(RESERVATIONS_FILE, 'utf8');
    const list = JSON.parse(raw);
    const idx = list.findIndex((r) => r.referenceId === referenceId);
    if (idx !== -1) {
      list[idx] = reservationRecord;
      fs.writeFileSync(RESERVATIONS_FILE, JSON.stringify(list, null, 2), 'utf8');
    }
  } catch (err) {
    // Ignore update error
  }

  const responsePayload = {
    success: true,
    referenceId,
    status: 'REQUEST_RECEIVED',
    reviewStatus: 'PENDING_REVIEW',
    emailStatus,
    emailRecipient: targetEmail,
    emailNotice,
    data: {
      name: fullName.trim(),
      phone: cleanPhone,
      date,
      timeSlot,
      guests: guestCount,
      seatingArea,
      includePool: Boolean(includePool),
      timestamp,
    },
  };

  // Cache response for idempotency
  idempotencyCache.set(idempotencyKey, {
    timestamp: now,
    response: responsePayload,
  });

  return {
    statusCode: 200,
    body: responsePayload,
  };
}

