import React from 'react';

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
                    <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border border-wedding-gold/10">
                        <video
                            className="w-full h-full object-cover"
                            controls
                            playsInline
                            preload="metadata"
                            poster="/images/video-poster.jpg"
                        >
                            <source src="/videos/invitation.mp4" type="video/mp4" />
                            Votre navigateur ne supporte pas la lecture vidéo.
                        </video>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VideoInvitation;
