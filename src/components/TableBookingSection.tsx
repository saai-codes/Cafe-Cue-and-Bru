import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Users,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Phone,
  User,
  MessageSquare,
  Trophy,
  Send,
  Copy,
  Check,
  Mail,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CAFE_INFO } from '../data/cafeInfo';
import type { OrderItem } from './OrderEstimateDrawer';
import { Button } from './ui/Button';

interface TableBookingSectionProps {
  initialOrderItems?: OrderItem[];
}

interface ServerBookingResponse {
  referenceId: string;
  name: string;
  phone: string;
  date: string;
  timeSlot: string;
  guests: number;
  seatingArea: string;
  includePool: boolean;
  emailStatus: 'EMAIL_SENT' | 'EMAIL_PENDING_CONFIG' | 'EMAIL_FAILED';
  emailRecipient: string;
  emailNotice: string;
  timestamp: string;
}

export const TableBookingSection: React.FC<TableBookingSectionProps> = ({
  initialOrderItems = [],
}) => {
  const todayStr = new Date().toISOString().split('T')[0];

  const [date, setDate] = useState<string>(todayStr);
  const [timeSlot, setTimeSlot] = useState<string>('19:00 - 21:00 (Dinner Peak)');
  const [guests, setGuests] = useState<number>(4);
  const [seatingArea, setSeatingArea] = useState<string>('rooftop-sky');
  const [includePool, setIncludePool] = useState<boolean>(false);
  const [fullName, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [occasion, setOccasion] = useState<string>('friends');

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedBooking, setSubmittedBooking] = useState<ServerBookingResponse | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const [copied, setCopied] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const timeSlots = [
    { value: '12:00 - 14:00 (Afternoon Lunch)', label: '12:00 PM – Lunch Time' },
    { value: '16:00 - 18:00 (Sunset Golden Hour)', label: '04:00 PM – Sunset Golden Hour' },
    { value: '18:30 - 20:30 (Evening Breeze)', label: '06:30 PM – Evening Rooftop' },
    { value: '20:30 - 22:30 (Prime Dinner)', label: '08:30 PM – Prime Dinner' },
    { value: '23:00 - 01:00 (Midnight Chill)', label: '11:00 PM – Midnight Chill' },
    { value: '01:30 - 03:30 (Late Night)', label: '01:30 AM – Late Night Vibe' },
  ];

  const seatingOptions = [
    { id: 'rooftop-sky', label: 'Rooftop Open Sky Terrace', desc: 'Breezy panoramic view of Sinhgad hills' },
    { id: 'cabana', label: 'Sunset Canopy / Cabana', desc: 'Covered luxury lounge seating' },
    { id: 'snooker-adjacent', label: 'Cue Lounge Adjacent', desc: 'Close to the pool and snooker tables' },
    { id: 'indoor-cozy', label: 'Cozy Ambient Interior', desc: 'Intimate air-cooled cafe tables' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);
    setServerError(null);

    // Frontend validation
    if (!fullName.trim() || fullName.trim().length < 2) {
      setValidationError('Please enter your full name (at least 2 characters).');
      return;
    }

    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setValidationError('Please enter a valid 10-digit mobile number.');
      return;
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setValidationError('Please enter a valid email address or leave it blank.');
      return;
    }

    if (!date) {
      setValidationError('Please choose a reservation date.');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        fullName: fullName.trim(),
        phone: cleanPhone,
        email: email.trim() || null,
        date,
        timeSlot,
        guests,
        seatingArea: seatingOptions.find((s) => s.id === seatingArea)?.label || seatingArea,
        occasion,
        notes: notes.trim(),
        includePool,
        orderItems: initialOrderItems.map((o) => ({
          item: { id: o.item.id, name: o.item.name },
          variantName: o.variantName,
          price: o.price,
          quantity: o.quantity,
        })),
      };

      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Server rejected reservation request. Please try again or call the cafe.');
      }

      // Success from server!
      setSubmittedBooking({
        referenceId: data.referenceId,
        name: data.data.name,
        phone: data.data.phone,
        date: data.data.date,
        timeSlot: data.data.timeSlot,
        guests: data.data.guests,
        seatingArea: data.data.seatingArea,
        includePool: data.data.includePool,
        emailStatus: data.emailStatus,
        emailRecipient: data.emailRecipient,
        emailNotice: data.emailNotice,
        timestamp: new Date(data.data.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      });

      // Trigger celebration confetti ONLY after real server acceptance
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#D4AF37', '#FCE08B', '#ffffff', '#22c55e'],
        });
      } catch (err) {
        // Safe fail
      }
    } catch (err: any) {
      setServerError(err.message || 'Unable to submit reservation. Please check your connection or call the desk.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyRef = () => {
    if (!submittedBooking) return;
    navigator.clipboard.writeText(submittedBooking.referenceId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsAppShare = () => {
    if (!submittedBooking) return;
    const msg = `Hello Cafe Cue & Brew! I have submitted a table reservation request.\n\n*Reference:* ${submittedBooking.referenceId}\n*Name:* ${submittedBooking.name}\n*Date:* ${submittedBooking.date}\n*Slot:* ${submittedBooking.timeSlot}\n*Guests:* ${submittedBooking.guests}\n*Seating:* ${submittedBooking.seatingArea}${submittedBooking.includePool ? '\n*Pool Table Interest:* Yes' : ''}\n\nPlease confirm availability. Thank you!`;
    const url = `https://wa.me/${CAFE_INFO.whatsapp}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="booking" className="relative py-16 sm:py-24 bg-[#0E1522] overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Table Reservation Flow</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight mb-4">
            Reserve Your <span className="gold-gradient-text">Rooftop Table</span>
          </h2>
          <p className="text-stone-300 text-sm sm:text-base font-serif italic mb-2">
            Enjoy Pune's Skyline with Gourmet Dishes & Snooker
          </p>
          <p className="text-stone-400 text-xs sm:text-sm font-sans">
            Submit your reservation request in seconds. Requests are processed through our reservation server and dispatched to cafe management.
          </p>
        </div>

        {/* Clear Disclosure Notice */}
        <div className="bg-[#121927] border border-amber-500/30 rounded-2xl p-4 sm:p-5 mb-8 shadow-xl">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-amber-200 mb-1">
                Reservation Request Policy & Notification Pipeline
              </h4>
              <p className="text-xs text-stone-300 leading-relaxed font-sans">
                Submitting this form registers an official <strong>Table Reservation Request</strong>.
                To prevent faking live inventory before cafe confirmation, all requests are securely dispatched to the management inbox (<code>{submittedBooking?.emailRecipient || 'shivsaai2010@gmail.com'}</code>) for floor review. Your table is confirmed only once staff contacts you.
              </p>
            </div>
          </div>
        </div>

        {/* Booking Card */}
        <div className="bg-[#121927] border border-stone-800 rounded-3xl p-4 sm:p-8 lg:p-10 shadow-2xl">
          {submittedBooking ? (
            /* Request Confirmation Screen */
            <div className="animate-fadeIn text-center py-6">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <span className="text-xs uppercase tracking-widest font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-3.5 py-1 rounded-full">
                Reservation Request Received — Pending Review
              </span>

              <h3 className="font-display font-black text-2xl sm:text-3xl text-white mt-4 mb-2">
                Your Reservation Request Has Been Received!
              </h3>

              <p className="text-stone-300 text-xs sm:text-sm max-w-lg mx-auto mb-6">
                Your table is <strong>not confirmed yet</strong>. Cafe Cue & Brew staff will review floor availability and contact you at <strong>+91 {submittedBooking.phone}</strong> to confirm your booking.
              </p>

              {/* Booking Reference Box */}
              <div className="max-w-md mx-auto bg-[#0B111E] border border-amber-500/40 rounded-2xl p-5 mb-6 text-left shadow-lg">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-stone-800">
                  <span className="text-xs text-stone-400 uppercase font-semibold">Reference Number</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-amber-300 text-sm">
                      {submittedBooking.referenceId}
                    </span>
                    <button
                      onClick={handleCopyRef}
                      className="p-1.5 rounded-lg bg-stone-900 border border-stone-800 text-stone-300 hover:text-white hover:border-amber-400/50"
                      title="Copy Reference"
                      aria-label="Copy booking reference"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-stone-500 block">Name:</span>
                    <span className="text-white font-medium">{submittedBooking.name}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block">Phone:</span>
                    <span className="text-white font-medium">+91 {submittedBooking.phone}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block">Date & Slot:</span>
                    <span className="text-white font-medium">{submittedBooking.date}</span>
                    <span className="text-stone-400 block text-[11px]">{submittedBooking.timeSlot}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block">Seating Area:</span>
                    <span className="text-amber-200 font-medium">{submittedBooking.seatingArea}</span>
                  </div>
                  {submittedBooking.includePool && (
                    <div className="col-span-2 pt-2 border-t border-stone-800/60">
                      <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                        <Trophy className="w-3.5 h-3.5" /> Snooker / Pool Table Availability Enquiry Attached
                      </span>
                    </div>
                  )}
                </div>

                {/* Email Delivery Pipeline Status Badge */}
                <div className="mt-4 pt-3 border-t border-stone-800/80 text-[11px]">
                  <div className="flex items-start gap-2 text-stone-300">
                    <Mail className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-amber-300">Email Notification Status: </span>
                      <span>
                        {submittedBooking.emailStatus === 'EMAIL_SENT' && 'Dispatched to cafe inbox (' + submittedBooking.emailRecipient + ')'}
                        {submittedBooking.emailStatus === 'EMAIL_PENDING_CONFIG' && 'Saved in server queue (Target: ' + submittedBooking.emailRecipient + ')'}
                        {submittedBooking.emailStatus === 'EMAIL_FAILED' && 'Saved on server; staff alert pending'}
                      </span>
                      <p className="text-stone-400 text-[10px] mt-0.5">{submittedBooking.emailNotice}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
                <Button
                  variant="primary"
                  size="md"
                  onClick={handleWhatsAppShare}
                  leftIcon={<Send className="w-4 h-4" />}
                  className="w-full sm:w-auto flex-1 text-xs uppercase tracking-wider font-extrabold"
                >
                  Send via WhatsApp
                </Button>

                <Button
                  variant="secondary"
                  size="md"
                  onClick={() => setSubmittedBooking(null)}
                  className="w-full sm:w-auto text-xs uppercase tracking-wider"
                >
                  Make Another Request
                </Button>
              </div>
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              {validationError && (
                <div className="bg-red-950/50 border border-red-500/50 rounded-xl p-3.5 flex items-center gap-2 text-red-200 text-xs">
                  <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                  <span>{validationError}</span>
                </div>
              )}

              {serverError && (
                <div className="bg-amber-950/50 border border-amber-500/50 rounded-xl p-3.5 flex items-center gap-2 text-amber-200 text-xs">
                  <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>{serverError}</span>
                </div>
              )}

              {/* Step 1: Date & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="flex items-center gap-2 text-xs font-semibold text-stone-300 mb-2 uppercase tracking-wider">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    <span>Select Date *</span>
                  </label>
                  <input
                    type="date"
                    required
                    min={todayStr}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-stone-900 border border-stone-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-xs font-semibold text-stone-300 mb-2 uppercase tracking-wider">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>Time Slot *</span>
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full bg-stone-900 border border-stone-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
                  >
                    {timeSlots.map((slot) => (
                      <option key={slot.value} value={slot.value}>
                        {slot.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Step 2: Guests & Occasion */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="flex items-center gap-2 text-xs font-semibold text-stone-300 mb-2 uppercase tracking-wider">
                    <Users className="w-3.5 h-3.5 text-amber-400" />
                    <span>Party Size (Guests)</span>
                  </label>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    {[1, 2, 4, 6, 8, '10+'].map((num) => {
                      const countVal = typeof num === 'string' ? 10 : num;
                      const isSelected = guests === countVal;
                      return (
                        <button
                          type="button"
                          key={num}
                          onClick={() => setGuests(countVal)}
                          className={`flex-1 py-2 sm:py-2.5 px-0.5 rounded-xl text-[11px] sm:text-xs font-bold border transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                            isSelected
                              ? 'border-amber-400 bg-amber-500/20 text-amber-300 shadow-sm'
                              : 'border-stone-800 bg-stone-900/80 text-stone-400 hover:border-stone-700 hover:text-white'
                          }`}
                        >
                          {num}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-xs font-semibold text-stone-300 mb-2 uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Occasion</span>
                  </label>
                  <select
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                    className="w-full bg-stone-900 border border-stone-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
                  >
                    <option value="friends">Casual Hangout with Friends</option>
                    <option value="birthday">Birthday Party Celebration</option>
                    <option value="date-night">Rooftop Date Night</option>
                    <option value="anniversary">Anniversary Celebration</option>
                    <option value="snooker-match">Pool Tournament & Gaming</option>
                  </select>
                </div>
              </div>

              {/* Seating Area Selection */}
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-2 uppercase tracking-wider">
                  Preferred Rooftop Seating Area
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {seatingOptions.map((opt) => (
                    <button
                      type="button"
                      key={opt.id}
                      onClick={() => setSeatingArea(opt.id)}
                      className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                        seatingArea === opt.id
                          ? 'border-amber-400 bg-amber-500/15 text-white shadow-md shadow-amber-500/5'
                          : 'border-stone-800 bg-stone-900/60 text-stone-400 hover:border-stone-700 hover:text-stone-300'
                      }`}
                    >
                      <p className={`text-xs font-bold ${seatingArea === opt.id ? 'text-amber-300' : 'text-stone-200'}`}>
                        {opt.label}
                      </p>
                      <p className="text-[11px] text-stone-400 mt-0.5">{opt.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Snooker Add-on Toggle */}
              <div className="p-4 rounded-xl bg-stone-900/70 border border-stone-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <Trophy className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">
                      Include Snooker / Pool Table Enquiry?
                    </p>
                    <p className="text-[11px] text-stone-400">
                      Reserve playing frames alongside your dining reservation
                    </p>
                  </div>
                </div>

                <input
                  type="checkbox"
                  id="poolCheckbox"
                  checked={includePool}
                  onChange={(e) => setIncludePool(e.target.checked)}
                  className="w-5 h-5 rounded border-stone-700 text-amber-500 focus:ring-amber-400 focus:ring-offset-stone-900 bg-stone-800 cursor-pointer"
                />
              </div>

              {/* Step 3: Guest Contact Details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div>
                  <label className="flex items-center gap-2 text-xs font-semibold text-stone-300 mb-2 uppercase tracking-wider">
                    <User className="w-3.5 h-3.5 text-amber-400" />
                    <span>Your Full Name *</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Aditya Sharma"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-stone-900 border border-stone-700 rounded-xl px-4 py-3 text-sm text-white placeholder-stone-400 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-xs font-semibold text-stone-300 mb-2 uppercase tracking-wider">
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    <span>Mobile Number *</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 text-xs font-semibold">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      placeholder="9876543210"
                      pattern="[0-9]{10}"
                      maxLength={10}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                      className="w-full bg-stone-900 border border-stone-700 rounded-xl pl-12 pr-4 py-3 text-sm text-white placeholder-stone-400 focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-xs font-semibold text-stone-300 mb-2 uppercase tracking-wider">
                    <Mail className="w-3.5 h-3.5 text-amber-400" />
                    <span>Email (Optional)</span>
                  </label>
                  <input
                    type="email"
                    placeholder="aditya@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-stone-900 border border-stone-700 rounded-xl px-4 py-3 text-sm text-white placeholder-stone-400 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>
              </div>

              {/* Special Requests / Notes */}
              <div>
                <label className="flex items-center gap-2 text-xs font-semibold text-stone-300 mb-2 uppercase tracking-wider">
                  <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
                  <span>Special Requests / Celebration Note</span>
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Birthday cake candle setup, corner rooftop view, extra spice..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-stone-900 border border-stone-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-stone-400 focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              {/* Submit Button with Loading State */}
              <Button
                type="submit"
                variant="primary"
                size="xl"
                isLoading={isSubmitting}
                leftIcon={<Sparkles className="w-5 h-5" />}
                className="w-full text-xs sm:text-sm font-extrabold uppercase tracking-widest shadow-xl shadow-amber-500/20"
              >
                Submit Table Reservation Request
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
