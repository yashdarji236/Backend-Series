import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export const slides = [
  { url: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1400&q=90', mood: 'Ask Anything', sub: 'Real answers, not just links' },
  { url: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1400&q=90', mood: 'Know Instantly', sub: 'AI-powered search with cited sources' },
  { url: 'https://images.unsplash.com/photo-1655720828018-edd2daec9349?w=1400&q=90', mood: 'Explore Deeper', sub: 'Follow-up questions, no context lost' },
  { url: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1400&q=90', mood: 'Research Smarter', sub: 'Sources verified, ideas synthesized' },
  { url: 'https://images.unsplash.com/photo-1686191128892-3b37add4c844?w=1400&q=90', mood: 'Think Clearly', sub: 'Cut through noise with precision answers' },
];

const GlobalStyle = () => (
  <style>{`
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body, #root { height: 100%; width: 100%; font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"; }

    @keyframes fadeSlideUp {
      from { opacity: 0; transform: translateY(22px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulseDot {
      0%, 100% { opacity: 0.45; transform: scale(1); }
      50%       { opacity: 1;    transform: scale(1.35); }
    }

    .form-animate { animation: fadeSlideUp 0.65s cubic-bezier(0.22,1,0.36,1) both; }

    input:-webkit-autofill,
    input:-webkit-autofill:focus {
      -webkit-box-shadow: 0 0 0 100px #202222 inset;
      -webkit-text-fill-color: #e8e8f0;
      caret-color: #e8e8f0;
    }

    .field-wrap:focus-within .field-icon { color: #e8e8f0 !important; }

    .no-scroll::-webkit-scrollbar { display: none; }
    .no-scroll { -ms-overflow-style: none; scrollbar-width: none; }

    .login-root {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr;
      width: 100vw;
      height: 100vh;
      position: fixed;
      inset: 0;
      background: #191a1a;
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
      background: #191a1a;
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

  return (
    <div className="relative w-full h-full overflow-hidden group select-none">
      <img
        src={slides[current].url}
        alt={slides[current].mood}
        className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
        style={{ filter: 'brightness(0.52) saturate(0.65)', opacity: vis ? 1 : 0, transition: 'opacity 0.5s ease, transform 0.9s ease' }}
      />

      <div className="absolute inset-0 pointer-events-none" style={{
        background: `
          linear-gradient(to top, rgba(25,26,26,0.97) 0%, rgba(25,26,26,0.28) 48%, transparent 68%),
          linear-gradient(135deg, rgba(232,232,240,0.07) 0%, transparent 55%)
        `,
      }} />

      <div className="absolute top-6 left-6 z-10 flex items-center gap-2">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e8e8f0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
           <rect x="4" y="4" width="16" height="16" rx="2" ry="2"/>
           <line x1="12" y1="4" x2="12" y2="20"/>
           <line x1="4" y1="12" x2="20" y2="12"/>
        </svg>
        <span className="text-[15px] font-medium text-[#e8e8f0] tracking-wide">perplexity</span>
      </div>

      <div className="absolute z-10" style={{ bottom: '60px', left: '32px', right: '32px', opacity: vis ? 1 : 0, transition: 'opacity 0.5s ease' }}>
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="w-[6px] h-[6px] rounded-full bg-[#e8e8f0]" style={{ animation: 'pulseDot 2s ease-in-out infinite' }} />
          <span className="text-[9.5px] font-semibold tracking-[3.5px] uppercase" style={{ color: 'rgba(232,232,240,0.75)' }}>Answer Engine</span>
        </div>
        <h2 className="text-white mb-2" style={{ fontSize: 'clamp(24px, 3.5vw, 48px)', lineHeight: 1.1, fontWeight: 'bold' }}>
          {slides[current].mood}
        </h2>
        <p className="text-[13px] font-light" style={{ color: 'rgba(255,255,255,0.42)' }}>
          {slides[current].sub}
        </p>
      </div>

      <div className="absolute z-10 flex items-center gap-2" style={{ bottom: '24px', left: '32px' }}>
        {slides.map((_, i) => (
          <button key={i} onClick={() => goTo(i)} style={{
            border: 'none', padding: 0, cursor: 'pointer', borderRadius: i === current ? '3px' : '50%',
            width: i === current ? '22px' : '6px', height: '6px',
            background: i === current ? '#e8e8f0' : 'rgba(255,255,255,0.22)',
            transition: 'all 0.3s ease',
          }} />
        ))}
      </div>
    </div>
  );
};

const VerifyEmail = () => {
  const navigate = useNavigate();

  return (
    <>
      <GlobalStyle />
      <div className="login-root">
        <div className="image-col">
          <ImagePanel />
        </div>

        <div className="form-col no-scroll">
          <div className="form-animate relative z-10 w-full" style={{ maxWidth: '400px', textAlign: 'center' }}>
            <div className="flex items-center justify-center gap-2 mb-10">
              <h1 className="text-[28px] font-bold text-[#e8e8f0]">Check Your Email</h1>
            </div>

            <div className="flex justify-center mb-7">
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#202222', border: '2px solid #404040' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path d="M3 8L10.89 13.26a2 2 0 0 0 2.22 0L21 8M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z" stroke="#e8e8f0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>

            <p className="text-[14px] leading-[1.75] mb-7" style={{ color: '#a0a0a0' }}>
              We've sent a verification link to your email address. Please check your inbox
              and click the link to verify your account.
            </p>

            <div style={{ padding: '14px 16px', borderRadius: '10px', background: '#202222', border: '1px solid #404040', marginBottom: '28px' }}>
              <p className="text-[13px] leading-relaxed" style={{ color: '#e8e8f0' }}>
                ✓ If you don't see the email, check your spam folder
              </p>
            </div>

            <button
              onClick={() => navigate('/login')}
              className="w-full rounded-full text-[15px] font-medium cursor-pointer transition-all duration-200"
              style={{ background: '#e8e8f0', color: '#000', border: 'none', padding: '12px', marginBottom: '0' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#d7e3e2'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#e8e8f0'; }}
            >
              Back to Login
            </button>

            <p className="text-[13px] mt-5" style={{ color: '#a0a0a0' }}>
              Didn't receive the email?{' '}
              <Link to="#" style={{ fontWeight: 600, color: '#e8e8f0', textDecoration: 'none' }} onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'} onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}>
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