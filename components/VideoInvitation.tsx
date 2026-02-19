import React from 'react';
import { Play } from 'lucide-react';

const VideoInvitation: React.FC = () => {
    return (
        <section className="py-24 bg-wedding-cream relative overflow-hidden" id="video">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-wedding-gold/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-wedding-rose/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16 animate-fade-in-up">
                    <h2 className="font-script text-5xl md:text-6xl text-wedding-gold mb-4">Notre Invitation</h2>
                    <p className="font-sans text-xs tracking-[0.3em] uppercase text-wedding-dark/60">
                        Découvrez notre faire-part en vidéo
                    </p>
                </div>

                <div className="max-w-4xl mx-auto">
                    {/* Placeholder Vidéo */}
                    <div className="relative aspect-video bg-wedding-dark rounded-2xl overflow-hidden shadow-2xl group cursor-pointer border hover:border-wedding-gold/30 transition-colors duration-500">
                        {/* Image de fond (placeholder) - à remplacer plus tard par une miniature de la vidéo */}
                        <img
                            src="/images/mairiefleurs.jpg"
                            alt="Video Thumbnail"
                            className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700"
                        />

                        {/* overlay sombre */}
                        <div className="absolute inset-0 bg-gradient-to-t from-wedding-dark/80 via-wedding-dark/20 to-transparent" />

                        {/* Bouton Play */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:bg-wedding-gold/20 group-hover:border-wedding-gold/50 transition-all duration-300 group-hover:scale-110 shadow-[0_0_30px_rgba(0,0,0,0.3)]">
                                <Play className="w-8 h-8 text-white ml-2 opacity-90 group-hover:text-wedding-gold transition-colors" />
                            </div>
                        </div>

                        {/* Texte informatif en bas */}
                        <div className="absolute bottom-6 left-0 right-0 text-center">
                            <p className="font-serif italic text-white/80 text-lg md:text-xl">
                                La vidéo sera bientôt disponible...
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VideoInvitation;
