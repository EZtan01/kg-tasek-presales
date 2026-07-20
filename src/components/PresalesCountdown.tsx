import { useEffect, useState } from 'react';

const PRESALES_END = new Date('2026-09-15T23:59:59+08:00');

function getTimeLeft() {
  const now = new Date();
  const diff = PRESALES_END.getTime() - now.getTime();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, ended: true };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    ended: false,
  };
}

export function PresalesCountdown() {
  const [time, setTime] = useState(getTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  // === ENDED STATE ===
  if (time.ended) {
    return (
      <section
        className="w-full py-14 md:py-20 px-4 relative overflow-hidden"
        style={{
          background: 'radial-gradient(ellipse at center, #1a1a1a 0%, #000000 70%)',
        }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <div
            className="inline-block px-4 py-1.5 rounded-full mb-6 border border-white/10"
            style={{ background: 'rgba(255,255,255,0.03)' }}
          >
            <p className="text-white/60 uppercase tracking-widest text-[10px] md:text-xs">
              Pre-Sales Closed
            </p>
          </div>

          <h2 className="font-anton text-3xl md:text-5xl text-white mb-4 uppercase leading-tight">
            The RM99 Locked-In Rate<br />
            is No Longer Available
          </h2>

          <p className="text-white/70 text-base md:text-lg mb-8 max-w-xl mx-auto">
            Pre-sales closed on 15 September 2026. Current membership rate is now RM129/month.
          </p>

          <div
            className="inline-block rounded-2xl md:rounded-3xl px-6 md:px-10 py-4 md:py-6 border border-white/5"
            style={{
              background: 'rgba(255,255,255,0.03)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.4), 0 1px 2px rgba(255,204,0,0.05)',
            }}
          >
            <p className="text-white/50 text-xs md:text-sm uppercase tracking-widest mb-2">
              Current Price
            </p>
            <div className="flex items-baseline justify-center gap-3">
              <span
                className="font-anton text-5xl md:text-7xl text-yellow-400"
                style={{ textShadow: '0 0 30px rgba(255, 204, 0, 0.3)' }}
              >
                RM129
              </span>
              <span className="text-white/60 text-lg md:text-xl">/month</span>
            </div>
          </div>

          <p className="text-white/40 text-xs md:text-sm mt-8 italic">
            Sign up any time — no contract, cancel anytime.
          </p>
        </div>
      </section>
    );
  }

  // === RUNNING COUNTDOWN STATE ===
  const boxes = [
    { label: 'DAYS', value: time.days },
    { label: 'HRS', value: time.hours },
    { label: 'MIN', value: time.minutes },
    { label: 'SEC', value: time.seconds },
  ];

  return (
    <section
      className="w-full py-14 md:py-20 px-4 relative overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at center, #1a1a1a 0%, #000000 70%)',
      }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-yellow-400 uppercase tracking-widest text-xs mb-2 font-semibold">
          Pre-Sales Ends In
        </p>
        <p className="text-white/50 text-sm md:text-base mb-8">
          Lock in RM99/month forever before it's gone.
        </p>

        <div className="grid grid-cols-4 gap-2 md:gap-6 max-w-2xl mx-auto">
          {boxes.map((box) => (
            <div
              key={box.label}
              className="bg-white/[0.03] rounded-2xl md:rounded-3xl p-3 md:p-6 border border-white/5 transition-all duration-500"
              style={{
                boxShadow: '0 8px 32px rgba(0,0,0,0.4), 0 1px 2px rgba(255,204,0,0.05)',
              }}
            >
              <div
                className="font-anton text-3xl md:text-6xl text-white"
                style={{
                  textShadow: '0 0 20px rgba(255, 204, 0, 0.2)',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {box.value.toString().padStart(2, '0')}
              </div>
              <div className="text-white/50 text-[10px] md:text-sm tracking-widest mt-1 md:mt-2">
                {box.label}
              </div>
            </div>
          ))}
        </div>

        <p className="text-white/40 text-xs md:text-sm mt-8 italic">
          Pre-sales closes 15 September 2026
        </p>
      </div>
    </section>
  );
}
