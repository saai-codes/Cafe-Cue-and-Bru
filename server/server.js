import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { handleReservationRequest } from './reservationHandler.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// API: Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Cafe Cue & Brew Booking API',
    bookingRecipient: process.env.BOOKING_TO_EMAIL || 'shivsaai2010@gmail.com',
    resendConfigured: Boolean(process.env.RESEND_API_KEY && process.env.RESEND_API_KEY.startsWith('re_')),
  });
});

// API: Submit Reservation Request
app.post('/api/reservations', async (req, res) => {
  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
  try {
    const result = await handleReservationRequest(req.body, clientIp);
    res.status(result.statusCode).json(result.body);
  } catch (err) {
    console.error('Server error handling reservation:', err);
    res.status(500).json({
      success: false,
      error: 'An unexpected internal server error occurred. Please try again or call the cafe directly.',
    });
  }
});

// Serve frontend static build if in production
const distPath = path.resolve(__dirname, '../dist');
app.use(express.static(distPath));
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`[Cafe Cue & Brew Server] Running on http://localhost:${PORT}`);
  console.log(`[Reservation Email Target] -> ${process.env.BOOKING_TO_EMAIL || 'shivsaai2010@gmail.com'}`);
});

