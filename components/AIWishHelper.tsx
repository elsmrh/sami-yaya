import React, { useState } from 'react';
import { Sparkles, Loader2, RefreshCw } from 'lucide-react';
import { Tone } from '../types';
import { generateWeddingWish } from '../services/geminiService';

interface AIWishHelperProps {
  onWishGenerated: (wish: string) => void;
}

const AIWishHelper: React.FC<AIWishHelperProps> = ({ onWishGenerated }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [relationship, setRelationship] = useState('');
  const [tone, setTone] = useState<Tone>(Tone.SENTIMENTAL);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!relationship) return;
    
    setLoading(true);
    try {
      const wish = await generateWeddingWish({ relationship, tone });
      onWishGenerated(wish);
      setIsOpen(false); 
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="text-xs flex items-center gap-1 text-wedding-gold hover:text-wedding-sage transition-colors mt-2"
      >
        <Sparkles className="w-3 h-3" />
        Besoin d'inspiration pour votre message ?
      </button>
    );
  }

  return (
    <div className="mt-4 p-4 bg-white rounded-lg border border-wedding-sage/30 shadow-inner animate-fade-in">
      <div className="flex justify-between items-center mb-3">
        <h4 className="text-sm font-serif font-bold text-wedding-sage flex items-center gap-2">
          <Sparkles className="w-4 h-4" /> Assistant de Vœux IA
        </h4>
        <button 
          onClick={() => setIsOpen(false)}
          className="text-gray-400 hover:text-gray-600 text-xs"
        >
          Fermer
        </button>
      </div>

      <div className="space-y-3">
        <div>
          <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Votre lien avec nous</label>
          <input
            type="text"
            placeholder="Ex: Ami d'enfance, Cousine, Collègue..."
            value={relationship}
            onChange={(e) => setRelationship(e.target.value)}
            className="w-full text-sm p-2 border border-gray-200 rounded focus:ring-1 focus:ring-wedding-gold outline-none"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Ton du message</label>
          <div className="flex flex-wrap gap-2">
            {Object.values(Tone).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTone(t)}
                className={`text-xs px-3 py-1 rounded-full border transition-colors ${
                  tone === t 
                    ? 'bg-wedding-sage text-white border-wedding-sage' 
                    : 'bg-transparent text-gray-600 border-gray-300 hover:border-wedding-sage'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          disabled={!relationship || loading}
          onClick={handleGenerate}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-wedding-gold to-yellow-600 text-white py-2 rounded text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
          Générer une idée
        </button>
      </div>
    </div>
  );
};

export default AIWishHelper;