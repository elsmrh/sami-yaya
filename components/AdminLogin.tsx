import React, { useState } from 'react';
import { Lock, Heart, ArrowLeft } from 'lucide-react';

interface AdminLoginProps {
    onLogin: (token: string) => void;
    onBack: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin, onBack }) => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password })
            });

            const data = await res.json();

            if (res.ok && data.token) {
                localStorage.setItem('admin_token', data.token);
                onLogin(data.token);
            } else {
                setError(data.error || 'Mot de passe incorrect');
            }
        } catch (err) {
            setError('Erreur de connexion au serveur');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] flex items-center justify-center px-4 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-wedding-gold/5 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-wedding-rose/5 rounded-full blur-3xl" />

            <div className="w-full max-w-md relative z-10">
                {/* Back button */}
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-white/50 hover:text-white/80 transition-colors mb-8 text-sm font-sans"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Retour au site
                </button>

                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-10 shadow-2xl">
                    {/* Header */}
                    <div className="text-center mb-10">
                        <div className="w-16 h-16 bg-wedding-gold/20 rounded-full flex items-center justify-center mx-auto mb-5">
                            <Heart className="w-8 h-8 text-wedding-gold fill-wedding-gold/30" />
                        </div>
                        <h1 className="font-script text-4xl text-white mb-2">Espace Admin</h1>
                        <p className="text-white/40 font-sans text-sm tracking-wider uppercase">
                            Sami & Prescilia
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Mot de passe"
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white placeholder:text-white/20 outline-none focus:border-wedding-gold/50 focus:bg-white/10 transition-all font-sans"
                            />
                        </div>

                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 text-red-300 px-4 py-3 rounded-lg text-sm font-sans text-center animate-fade-in">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-wedding-gold to-[#c9a030] text-white font-sans uppercase tracking-widest py-4 rounded-xl hover:shadow-lg hover:shadow-wedding-gold/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                'Se connecter'
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
