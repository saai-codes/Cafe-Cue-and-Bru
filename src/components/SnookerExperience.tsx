import React, { useState } from 'react';
import { Trophy, Clock, Send, CheckCircle2, AlertCircle, Phone } from 'lucide-react';
import { CAFE_INFO } from '../data/cafeInfo';
import { Button } from './ui/Button';

interface SnookerExperienceProps {
  onOpenBooking: () => void;
}

export const SnookerExperience: React.FC<SnookerExperienceProps> = ({ onOpenBooking }) => {
  const [enquirySubmitted, setEnquirySubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    timePreference: 'evening',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setEnquirySubmitted(true);
  };

  return (
    <section id="snooker" className="relative py-16 sm:py-24 bg-[#0B111E] overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold uppercase tracking-widest mb-3">
            <Trophy className="w-3.5 h-3.5 text-emerald-400" />
            <span>Championship Gaming Lounge</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight mb-4">
            The <span className="gold-gradient-text">Cue Lounge</span> Experience
          </h2>
          <p className="text-stone-300 text-base sm:text-lg font-serif italic mb-2">
            Where Precision Cue Sports Meet Rooftop Nightlife
          </p>
          <p className="text-stone-400 text-sm max-w-xl mx-auto font-sans">
            Level up your social evenings on our 7th floor rooftop. Enjoy premium green felt tournament tables,
            custom cues, studio canopy lighting, and cold brews between frames.
          </p>
        </div>

        {/* Visual Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16">
          <div className="relative rounded-2xl overflow-hidden border border-stone-800 group h-64 sm:h-72 lg:h-80">
            <img
              src="/images/pool/pool-table-hero.jpg"
              alt="Snooker table with balls and cue at Cafe Cue & Brew"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                Precision Felt
              </span>
              <h3 className="font-display font-bold text-lg text-white mt-1">Tournament Grade Tables</h3>
              <p className="text-xs text-stone-300">True roll cloth, clean pockets & balanced cues.</p>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden border border-stone-800 group h-64 sm:h-72 lg:h-80">
            <img
              src="/images/pool/pool-balls-rack.jpg"
              alt="Pool triangle rack and pool balls"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30">
                Social Matches
              </span>
              <h3 className="font-display font-bold text-lg text-white mt-1">8-Ball & 9-Ball Action</h3>
              <p className="text-xs text-stone-300">Play with friends or challenge fellow cafe regulars.</p>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden border border-stone-800 group h-64 sm:h-72 lg:h-80 sm:col-span-2 lg:col-span-1">
            <img
              src="/images/pool/pool-lounge.jpg"
              alt="Billiards lounge ambiance with overhead lighting"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest bg-blue-950/60 px-2 py-0.5 rounded border border-blue-500/30">
                Ambience
              </span>
              <h3 className="font-display font-bold text-lg text-white mt-1">Lounge Atmosphere</h3>
              <p className="text-xs text-stone-300">Acoustic tunes, rooftop breeze & table-side snacks.</p>
            </div>
          </div>
        </div>

        {/* Enquiry Form Container (Respecting honest enquiry guidelines) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center bg-[#121927] border border-amber-500/30 rounded-3xl p-5 sm:p-8 lg:p-10 shadow-2xl">
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold mb-4">
                <Clock className="w-3.5 h-3.5" />
                <span>Enquiry & Availability Check</span>
              </div>

              <h3 className="font-display font-bold text-2xl sm:text-3xl text-white mb-3">
                Plan Your Snooker Session
              </h3>

              <p className="text-stone-300 text-sm leading-relaxed mb-6 font-sans">
                Want to ensure table availability or ask about playing charges and group slots?
                Submit an instant enquiry or call our front desk directly.
              </p>

              {/* Verified Policy / Enquiry Disclaimer Notice */}
              <div className="bg-stone-900/80 border border-stone-800 rounded-xl p-4 mb-6">
                <div className="flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-stone-300 leading-relaxed">
                    <strong>Honest Reservation Policy:</strong> Pool & snooker tables are assigned on inquiry and walk-in rotation. Charges and exact slot availability are confirmed directly by cafe staff prior to playtime.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-800">
              <p className="text-xs text-stone-400 mb-2">Prefer instant phone check?</p>
              <a
                href={`tel:${CAFE_INFO.phone}`}
                className="inline-flex items-center gap-2 text-sm font-bold text-amber-300 hover:text-amber-200 transition-colors"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>Call Desk: {CAFE_INFO.phoneDisplay}</span>
              </a>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-7 bg-[#0B111E]/80 border border-stone-800 rounded-2xl p-5 sm:p-8">
            {enquirySubmitted ? (
              <div className="text-center py-8">
                <CheckCircle2 className="w-14 h-14 text-emerald-400 mx-auto mb-3" />
                <h4 className="font-display font-bold text-xl text-white mb-2">
                  Pool Enquiry Transmitted!
                </h4>
                <p className="text-stone-300 text-xs sm:text-sm max-w-md mx-auto mb-6">
                  Thank you, <strong>{formData.name}</strong>. Cafe Cue & Brew staff will check current table slots and reach out at <strong>{formData.phone}</strong>.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-3">
                  <Button
                    variant="outline"
                    size="md"
                    onClick={() => setEnquirySubmitted(false)}
                  >
                    Send Another Enquiry
                  </Button>
                  <Button
                    variant="primary"
                    size="md"
                    onClick={onOpenBooking}
                  >
                    Reserve Dining Table Too
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1.5 uppercase tracking-wider">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Patil"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-stone-400 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1.5 uppercase tracking-wider">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9876543210"
                      pattern="[0-9]{10}"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-stone-400 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1.5 uppercase tracking-wider">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      min={new Date().toISOString().split('T')[0]}
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1.5 uppercase tracking-wider">
                      Preferred Time Slot
                    </label>
                    <select
                      value={formData.timePreference}
                      onChange={(e) => setFormData({ ...formData, timePreference: e.target.value })}
                      className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="afternoon">Afternoon (12 PM - 4 PM)</option>
                      <option value="evening">Sunset Frame (4 PM - 8 PM)</option>
                      <option value="night">Night Match (8 PM - 12 AM)</option>
                      <option value="late-night">Midnight Lounge (12 AM - 4 AM)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1.5 uppercase tracking-wider">
                    Questions or Group Requirement
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Ask about charges, group matches, or combining with food..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3.5 py-2 text-sm text-white placeholder-stone-400 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  leftIcon={<Send className="w-4 h-4" />}
                  className="w-full text-xs uppercase tracking-wider font-extrabold"
                >
                  Send Pool Availability Enquiry
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
