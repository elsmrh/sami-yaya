import React, { useState } from 'react';
import { Send, CheckCircle2, Heart, X, Utensils, Loader2 } from 'lucide-react';

const RsvpForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    attendance: 'yes',
    guests: 1,
    children: 0,
    dietaryRestrictions: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Erreur lors de l\'envoi');
      }

      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Erreur de connexion au serveur');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <section id="rsvp" className="py-24 bg-wedding-rose/20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-xl mx-auto bg-white p-12 rounded-lg shadow-xl border border-wedding-gold/20 animate-fade-in-up">
            <div className="w-20 h-20 bg-wedding-sage/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-wedding-sage" />
            </div>
            <h3 className="font-script text-5xl text-wedding-gold mb-6">Merci !</h3>
            <p className="font-serif text-xl text-wedding-dark mb-2">
              Votre réponse a bien été enregistrée.
            </p>
            <p className="font-sans text-gray-500 mb-8">
              {formData.attendance === 'yes'
                ? "Nous sommes ravis de vous compter parmi nous !"
                : "Nous regrettons que vous ne puissiez pas être là."}
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  name: '',
                  email: '',
                  attendance: 'yes',
                  guests: 1,
                  children: 0,
                  dietaryRestrictions: '',
                  message: ''
                });
              }}
              className="text-sm font-sans uppercase tracking-widest text-wedding-gold hover:text-wedding-dark underline transition-colors"
            >
              Envoyer une autre réponse
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="rsvp" className="py-24 bg-wedding-rose/20 relative overflow-hidden">
      {/* Decorative floral background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[url('https://images.unsplash.com/photo-1516962241680-d007a14fa8d9?q=80&w=2070&auto=format&fit=crop')] bg-contain bg-no-repeat opacity-10 rotate-180 transform translate-x-20 -translate-y-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[url('https://images.unsplash.com/photo-1516962241680-d007a14fa8d9?q=80&w=2070&auto=format&fit=crop')] bg-contain bg-no-repeat opacity-10 transform -translate-x-20 translate-y-20 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto bg-white/90 backdrop-blur-md p-8 md:p-16 rounded-t-[5rem] rounded-b-xl shadow-2xl border-t-4 border-wedding-gold">
          <div className="text-center mb-12">
            <span className="font-sans text-xs md:text-sm tracking-[0.3em] text-wedding-sage uppercase block mb-3">
              Réponse souhaitée avant le 1er Août 2026
            </span>
            <h2 className="font-script text-5xl md:text-6xl text-wedding-dark mb-4">Répondez s'il vous plaît</h2>
            <div className="w-24 h-1 bg-wedding-gold mx-auto rounded-full opacity-50"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Identity Section */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="group">
                <label className="block font-serif text-lg text-wedding-dark mb-2 group-focus-within:text-wedding-gold transition-colors">Votre Prénom et Nom</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-transparent border-b border-gray-300 focus:border-wedding-gold px-2 py-3 outline-none transition-all placeholder:text-gray-300 font-sans"
                  placeholder="Ex: Jean Dupont"
                />
              </div>
              <div className="group">
                <label className="block font-serif text-lg text-wedding-dark mb-2 group-focus-within:text-wedding-gold transition-colors">Votre Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-transparent border-b border-gray-300 focus:border-wedding-gold px-2 py-3 outline-none transition-all placeholder:text-gray-300 font-sans"
                  placeholder="Ex: jean.dupont@email.com"
                />
              </div>
            </div>

            {/* Attendance Selection Cards */}
            <div className="space-y-4">
              <label className="block font-serif text-lg text-wedding-dark text-center mb-4">Serez-vous des nôtres ?</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, attendance: 'yes' })}
                  className={`p-6 rounded-xl border-2 transition-all duration-300 flex flex-col items-center justify-center gap-3 group ${formData.attendance === 'yes'
                    ? 'border-wedding-gold bg-wedding-gold/5 shadow-md'
                    : 'border-gray-100 hover:border-wedding-sage/50 bg-gray-50'
                    }`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${formData.attendance === 'yes' ? 'bg-wedding-gold text-white' : 'bg-gray-200 text-gray-400 group-hover:bg-wedding-sage/20 group-hover:text-wedding-sage'
                    }`}>
                    <Heart className="w-6 h-6 fill-current" />
                  </div>
                  <span className={`font-serif text-xl ${formData.attendance === 'yes' ? 'text-wedding-dark' : 'text-gray-500'}`}>
                    Oui, avec joie !
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, attendance: 'no' })}
                  className={`p-6 rounded-xl border-2 transition-all duration-300 flex flex-col items-center justify-center gap-3 group ${formData.attendance === 'no'
                    ? 'border-wedding-dark bg-gray-100 shadow-md'
                    : 'border-gray-100 hover:border-gray-300 bg-gray-50'
                    }`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${formData.attendance === 'no' ? 'bg-wedding-dark text-white' : 'bg-gray-200 text-gray-400 group-hover:bg-gray-300 group-hover:text-gray-600'
                    }`}>
                    <X className="w-6 h-6" />
                  </div>
                  <span className={`font-serif text-xl ${formData.attendance === 'no' ? 'text-wedding-dark' : 'text-gray-500'}`}>
                    À regret, non...
                  </span>
                </button>
              </div>
            </div>

            {/* Conditional Details Section */}
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${formData.attendance === 'yes' ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
              }`}>
              <div className="grid md:grid-cols-2 gap-8 pt-4">
                <div className="space-y-2">
                  <label className="block font-serif text-lg text-wedding-dark">Nombre d'adultes</label>
                  <input
                    type="number"
                    min="1"
                    className="w-full bg-transparent border-b border-gray-300 focus:border-wedding-gold px-2 py-3 outline-none transition-all placeholder:text-gray-300 font-sans"
                    value={formData.guests}
                    onChange={e => {
                      const val = parseInt(e.target.value);
                      setFormData({ ...formData, guests: isNaN(val) ? 1 : val });
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <label className="block font-serif text-lg text-wedding-dark">Nombre d'enfants</label>
                  <input
                    type="number"
                    min="0"
                    className="w-full bg-transparent border-b border-gray-300 focus:border-wedding-gold px-2 py-3 outline-none transition-all placeholder:text-gray-300 font-sans"
                    value={formData.children}
                    onChange={e => {
                      const val = parseInt(e.target.value);
                      setFormData({ ...formData, children: isNaN(val) ? 0 : val });
                    }}
                  />
                </div>
              </div>

              <div className="pt-8">
                <div className="space-y-2">
                  <label className="block font-serif text-lg text-wedding-dark flex items-center gap-2">
                    <Utensils className="w-4 h-4 text-wedding-sage" />
                    Régimes alimentaires
                  </label>
                  <input
                    type="text"
                    value={formData.dietaryRestrictions}
                    onChange={e => setFormData({ ...formData, dietaryRestrictions: e.target.value })}
                    className="w-full bg-transparent border-b border-gray-300 focus:border-wedding-gold px-2 py-3 outline-none transition-all placeholder:text-gray-300 font-sans"
                    placeholder="Allergies, végétarien, etc."
                  />
                </div>
              </div>
            </div>

            {/* Message Section */}
            <div className="space-y-2 pt-6 border-t border-gray-100">
              <label className="block font-serif text-lg text-wedding-dark mb-2">Un petit mot pour le livre d'or ?</label>
              <div className="relative">
                <textarea
                  className="w-full bg-wedding-cream/30 border border-gray-200 focus:border-wedding-gold rounded-lg px-4 py-4 outline-none transition-colors h-32 resize-none font-sans text-sm leading-relaxed"
                  placeholder="Votre message..."
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm font-sans text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="group w-full bg-wedding-dark text-white font-sans uppercase tracking-widest py-4 px-8 rounded-full hover:bg-wedding-gold transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Envoi en cours...</span>
                </>
              ) : (
                <>
                  <span>Confirmer ma réponse</span>
                  <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default RsvpForm;