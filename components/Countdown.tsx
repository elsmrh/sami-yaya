import React, { useState, useEffect } from 'react';

const Countdown: React.FC = () => {
  const weddingDate = new Date('2026-10-23T14:00:00').getTime();
  const [timeLeft, setTimeLeft] = useState<{days: number, hours: number, minutes: number, seconds: number} | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = weddingDate - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [weddingDate]);

  if (!timeLeft) return null;

  return (
    <div className="py-20 bg-wedding-cream">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          <TimeBox value={timeLeft.days} label="Jours" />
          <TimeBox value={timeLeft.hours} label="Heures" />
          <TimeBox value={timeLeft.minutes} label="Minutes" />
          <TimeBox value={timeLeft.seconds} label="Secondes" />
        </div>
      </div>
    </div>
  );
};

const TimeBox: React.FC<{value: number, label: string}> = ({ value, label }) => (
  <div className="flex flex-col items-center">
    <span className="text-4xl md:text-6xl font-serif text-wedding-sage">{value}</span>
    <span className="text-xs md:text-sm uppercase tracking-widest text-wedding-dark/60 font-sans mt-2">{label}</span>
  </div>
);

export default Countdown;