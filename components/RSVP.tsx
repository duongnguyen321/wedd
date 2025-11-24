import React, { useState, useEffect } from 'react';
import { Send, Gift, CheckCircle, Heart, Users } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useWeddingData } from '../contexts/WeddingContext';
import { weddingService } from '../services/api';
import { RSVPStats } from '../types';

export const RSVP: React.FC = () => {
  const { data } = useWeddingData();
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [name, setName] = useState('');
  const [wish, setWish] = useState('');
  const [attendance, setAttendance] = useState('yes');
  const [stats, setStats] = useState<RSVPStats | null>(null);

  // Load stats on mount
  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const s = await weddingService.getRSVPStats();
    setStats(s);
  };

  const triggerConfetti = () => {
    const duration = 3000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#D4AF37', '#E6B8B8', '#F9F7F2']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#D4AF37', '#E6B8B8', '#F9F7F2']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    const success = await weddingService.submitRSVP({
      name,
      wish,
      attendance
    });

    if (success) {
      setFormStatus('success');
      setName('');
      setWish('');
      loadStats(); // Refresh stats
      triggerConfetti(); // Trigger fireworks
    } else {
      setFormStatus('error');
    }
  };

  if (!data) return null;
  const { form, banking } = data.rsvp;

  return (
    <section id="rsvp" className="py-20 bg-wedding-cream">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8 md:p-12">
            <div className="text-center mb-10" data-aos="fade-up">
              <span className="text-wedding-gold uppercase tracking-widest text-sm font-semibold">{data.rsvp.sectionTitle}</span>
              <h2 className="font-script text-4xl text-stone-800 mt-2">{data.rsvp.mainTitle}</h2>
              <p className="text-stone-500 mt-4">
                {data.rsvp.message}
              </p>
            </div>

            {/* Statistics Badge */}
            {stats && (
              <div className="flex justify-center gap-4 mb-8" data-aos="zoom-in">
                <div className="px-4 py-2 bg-pink-50 rounded-full border border-pink-100 flex items-center space-x-2">
                  <Heart className="text-pink-500" size={16} fill="currentColor" />
                  <span className="text-pink-700 text-sm font-medium">{stats.total} Lời chúc</span>
                </div>
                <div className="px-4 py-2 bg-blue-50 rounded-full border border-blue-100 flex items-center space-x-2">
                  <Users className="text-blue-500" size={16} />
                  <span className="text-blue-700 text-sm font-medium">{stats.yes} Sẽ tham dự</span>
                </div>
              </div>
            )}

            {formStatus === 'success' ? (
               <div className="text-center py-12" data-aos="zoom-in">
                 <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                   <CheckCircle className="text-green-500" size={40} />
                 </div>
                 <h3 className="text-2xl font-serif text-stone-800 mb-2">{form.successTitle}</h3>
                 <p className="text-stone-600">{form.successMessage}</p>
                 <button 
                   onClick={() => setFormStatus('idle')}
                   className="mt-6 text-wedding-gold hover:text-stone-800 underline font-medium"
                 >
                   {form.successButton}
                 </button>
               </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" data-aos="fade-up" data-aos-delay="200">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-stone-700 font-medium mb-2 text-sm uppercase tracking-wide">{form.nameLabel}</label>
                    <input 
                      type="text" 
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-wedding-gold focus:ring-1 focus:ring-wedding-gold outline-none transition-colors"
                      placeholder={form.namePlaceholder}
                    />
                  </div>
                  <div>
                    <label className="block text-stone-700 font-medium mb-2 text-sm uppercase tracking-wide">{form.attendanceLabel}</label>
                    <select 
                      value={attendance}
                      onChange={(e) => setAttendance(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-wedding-gold focus:ring-1 focus:ring-wedding-gold outline-none transition-colors bg-white"
                    >
                      <option value="yes">{form.attendanceOptions.yes}</option>
                      <option value="maybe">{form.attendanceOptions.maybe}</option>
                      <option value="no">{form.attendanceOptions.no}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-stone-700 font-medium mb-2 text-sm uppercase tracking-wide">{form.wishLabel}</label>
                  <textarea 
                    rows={4}
                    value={wish}
                    onChange={(e) => setWish(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-wedding-gold focus:ring-1 focus:ring-wedding-gold outline-none transition-colors"
                    placeholder={form.wishPlaceholder}
                  ></textarea>
                </div>

                <div className="text-center pt-4">
                  <button 
                    type="submit"
                    disabled={formStatus === 'submitting'}
                    className="inline-flex items-center justify-center px-8 py-4 bg-stone-800 text-white font-medium rounded-full hover:bg-wedding-gold transition-colors duration-300 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed group"
                  >
                    {formStatus === 'submitting' ? form.submitting : (
                      <>
                        <span className="mr-2">{form.submitButton}</span>
                        <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                  {formStatus === 'error' && <p className="text-red-500 mt-2 text-sm">Có lỗi xảy ra, vui lòng thử lại.</p>}
                </div>
              </form>
            )}

            {/* Banking Info Box */}
            <div className="mt-16 pt-10 border-t border-gray-100 text-center">
              <div className="flex items-center justify-center space-x-2 text-wedding-gold mb-4">
                <Gift size={20} />
                <span className="font-bold uppercase tracking-wide text-sm">{banking.title}</span>
              </div>
              <p className="text-stone-500 text-sm mb-6 max-w-md mx-auto">
                {banking.message}
              </p>
              <div className="grid md:grid-cols-2 gap-4 max-w-lg mx-auto">
                {banking.items.map((item, index) => (
                  <div key={index} className="bg-stone-50 p-4 rounded-lg border border-stone-200">
                    <p className="font-bold text-stone-800">{item.owner}</p>
                    <p className="text-sm text-stone-600">{item.bank}</p>
                    <p className="font-mono text-wedding-gold mt-1">{item.number}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};