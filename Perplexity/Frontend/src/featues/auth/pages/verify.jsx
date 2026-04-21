import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

/* ─── Slides themed around AI / search / knowledge ─────────────── */
export const slides = [
  {
    url: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1400&q=90',
    mood: 'Ask Anything',
    sub: 'Real answers, not just links',
  },
  {
    url: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1400&q=90',
    mood: 'Know Instantly',
    sub: 'AI-powered search with cited sources',
  },
  {
    url: 'https://images.unsplash.com/photo-1655720828018-edd2daec9349?w=1400&q=90',
    mood: 'Explore Deeper',
    sub: 'Follow-up questions, no context lost',
  },
  {
    url: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1400&q=90',
    mood: 'Research Smarter',
    sub: 'Sources verified, ideas synthesized',
  },
  {
    url: 'https://images.unsplash.com/photo-1686191128892-3b37add4c844?w=1400&q=90',
    mood: 'Think Clearly',
    sub: 'Cut through noise with precision answers',
  },
];

/* ─── Injected styles ───────────────────────────────────────────── */
const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=DM+Serif+Display:ital@0;1&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body, #root { height: 100%; width: 100%; }

    @keyframes waveBar {
      0%, 100% { transform: scaleY(0.3); }
      50%       { transform: scaleY(1); }
    }
    @keyframes fadeSlideUp {
      from { opacity: 0; transform: translateY(22px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulseDot {
      0%, 100% { opacity: 0.45; transform: scale(1); }
      50%       { opacity: 1;    transform: scale(1.35); }
    }

    .font-sora     { font-family: 'Sora', sans-serif; }
    .font-dm       { font-family: 'DM Serif Display', serif; }

    .form-animate  { animation: fadeSlideUp 0.65s cubic-bezier(0.22,1,0.36,1) both; }

    .btn-teal { position: relative; overflow: hidden; }
    .btn-teal::after {
      content: '';
      position: absolute; inset: 0;
      background: linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.18) 50%, transparent 70%);
      transform: translateX(-150%);
      transition: transform 0.6s ease;
    }
    .btn-teal:hover::after { transform: translateX(150%); }

    input:-webkit-autofill,
    input:-webkit-autofill:focus {
      -webkit-box-shadow: 0 0 0 100px #0a0a0f inset;
      -webkit-text-fill-color: #e8e8f0;
      caret-color: #20d9d2;
    }

    /* Teal icon on focus via group trick */
    .field-wrap:focus-within .field-icon { color: #20d9d2 !important; }

    /* Hide scrollbar on form panel */
    .no-scroll::-webkit-scrollbar { display: none; }
    .no-scroll { -ms-overflow-style: none; scrollbar-width: none; }

    /* ── Responsive layout ─────────────────────────────────── */
    .login-root {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr;
      width: 100vw;
      height: 100vh;
      position: fixed;
      inset: 0;
      background: #0a0a0f;
    }

    @media (max-width: 1023px) {
      .login-root {
        grid-template-columns: 1fr;
        grid-template-rows: 40vh 1fr;
        height: 100dvh;
      }
      .image-col { height: 40vh; }
    }

    @media (max-width: 767px) {
      .login-root { grid-template-rows: 34vh 1fr; }
      .image-col  { height: 34vh; }
    }

    @media (max-width: 480px) {
      .login-root { grid-template-rows: 28vh 1fr; }
      .image-col  { height: 28vh; }
    }

    .image-col  { position: relative; overflow: hidden; }

    .form-col {
      background: #0a0a0f;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow-y: auto;
      padding: clamp(28px, 5vw, 64px) clamp(20px, 6vw, 60px);
    }

    @media (max-width: 1023px) {
      .form-col { align-items: flex-start; }
    }
  `}</style>
);

/* ─── Image Panel ───────────────────────────────────────────────── */
export const ImagePanel = () => {
  const [current, setCurrent] = useState(0);
  const [vis, setVis] = useState(true);
  
  useEffect(() => {
    const id = setInterval(() => {
      setVis(false);
      setTimeout(() => { setCurrent(p => (p + 1) % slides.length); setVis(true); }, 500);
    }, 4500);
    return () => clearInterval(id);
  }, []);

  const goTo = (i) => {
    if (i === current) return;
    setVis(false);
    setTimeout(() => { setCurrent(i); setVis(true); }, 500);
  };

  const slide = slides[current];

  return (
    <div className="relative w-full h-full overflow-hidden" style={{ background: '#000' }}>
      <div
        style={{
          backgroundImage: `url(${slide.url})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.6)',
          width: '100%',
          height: '100%',
          opacity: vis ? 1 : 0.5,
          transition: 'opacity 500ms cubic-bezier(0.22,1,0.36,1)',
        }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-center text-white">
          <h2 className="font-dm text-4xl font-bold mb-2">{slide.mood}</h2>
          <p className="font-sora text-base opacity-75">{slide.sub}</p>
        </div>
      </div>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="h-1 rounded-full transition-all"
            style={{
              width: i === current ? '24px' : '8px',
              backgroundColor: i === current ? '#20d9d2' : 'rgba(32,217,210,0.4)',
              transition: 'all 0.3s ease',
            }} />
        ))}
      </div>
    </div>
  );
};

/* ─── Verify Email Page ────────────────────────────────────────── */
const VerifyEmail = () => {
  const navigate = useNavigate();

  return (
    <>
      <GlobalStyle />
      <div className="login-root font-sora">

        {/* Image column */}
        <div className="image-col">
          <ImagePanel />
        </div>

        {/* Form column */}
        <div className="form-col no-scroll">

          {/* Ambient glows */}
          <div className="absolute pointer-events-none" style={{ top: '-100px', right: '-100px', width: '380px', height: '380px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(32,217,210,0.055) 0%, transparent 70%)' }} />
          <div className="absolute pointer-events-none" style={{ bottom: '-80px', left: '-80px', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(32,217,210,0.035) 0%, transparent 70%)' }} />

          {/* Card */}
          <div className="form-animate relative z-10 w-full" style={{ maxWidth: '400px', textAlign: 'center' }}>

            {/* Brand */}
            <div className="flex items-center gap-3 mb-9 justify-center">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, rgba(32,217,210,0.14), rgba(32,217,210,0.04))', border: '1px solid rgba(32,217,210,0.22)' }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                  <circle cx="11" cy="11" r="7" stroke="#20d9d2" strokeWidth="2"/>
                  <path d="M20 20l-3-3" stroke="#20d9d2" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-sora text-[17px] font-semibold text-white tracking-[-0.3px]">perplexity</span>
              </div>
            </div>

            {/* Icon */}
            <div className="mb-8 flex justify-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(32,217,210,0.14), rgba(32,217,210,0.04))', border: '2px solid rgba(32,217,210,0.22)' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M3 8L10.89 13.26a2 2 0 0 0 2.22 0L21 8M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z" stroke="#20d9d2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>

            {/* Heading */}
            <h1 className="font-dm text-white mb-3" style={{ fontSize: 'clamp(24px, 2.8vw, 35px)', lineHeight: 1.15 }}>
              Check Your Email
            </h1>
            <p className="font-sora text-[13px] font-light mb-8 leading-[1.75]" style={{ color: 'rgba(232,232,240,0.60)' }}>
              We've sent a verification link to your email address. Please check your inbox and click the link to verify your account.
            </p>

            <div className="mb-8 p-4 rounded-lg" style={{ background: 'rgba(32,217,210,0.08)', border: '1px solid rgba(32,217,210,0.15)' }}>
              <p className="font-sora text-[12px]" style={{ color: 'rgba(32,217,210,0.8)' }}>
                ✓ If you don't see the email, check your spam folder
              </p>
            </div>

            {/* Button */}
            <button
              onClick={() => navigate('/login')}
              className="w-full py-3 px-4 rounded-lg font-sora font-semibold text-sm btn-teal transition-all"
              style={{
                background: 'linear-gradient(135deg, rgba(32,217,210,0.2), rgba(32,217,210,0.08))',
                border: '1px solid rgba(32,217,210,0.4)',
                color: '#20d9d2',
              }}
            >
              Back to Login
            </button>

            {/* Help Text */}
            <p className="font-sora text-[12px] mt-6" style={{ color: 'rgba(232,232,240,0.38)' }}>
              Didn't receive the email?{' '}
              <Link to="#" className="font-semibold" style={{ color: '#20d9d2' }}>
                Resend
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerifyEmail;
