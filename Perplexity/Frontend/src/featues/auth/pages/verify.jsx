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

    .field-wrap:focus-within .field-icon { color: #20d9d2 !important; }

    .no-scroll::-webkit-scrollbar { display: none; }
    .no-scroll { -ms-overflow-style: none; scrollbar-width: none; }

    /* ── Root layout ───────────────────────────────────────── */
    .login-root {
      display: grid;
      grid-template-columns: 1fr 1fr;
      width: 100vw;
      height: 100vh;
      position: fixed;
      inset: 0;
      background: #0a0a0f;
    }

    /* ── Image column ──────────────────────────────────────── */
    .image-col {
      position: relative;
      overflow: hidden;
    }

    /* ── Form column ───────────────────────────────────────── */
    .form-col {
      background: #0a0a0f;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow-y: auto;
      /* Consistent horizontal padding; vertical handled by flex centering */
      padding: 40px 48px;
    }

    /* ── Responsive breakpoints ────────────────────────────── */
    @media (max-width: 1023px) {
      .login-root {
        grid-template-columns: 1fr;
        grid-template-rows: 38vh 1fr;
        height: 100dvh;
      }
      .image-col {
        height: 38vh;
      }
      .form-col {
        align-items: flex-start;
        padding: 36px 32px;
      }
    }

    @media (max-width: 767px) {
      .login-root {
        grid-template-rows: 32vh 1fr;
      }
      .image-col {
        height: 32vh;
      }
      .form-col {
        padding: 32px 24px;
      }
    }

    @media (max-width: 480px) {
      .login-root {
        grid-template-rows: 26vh 1fr;
      }
      .image-col {
        height: 26vh;
      }
      .form-col {
        padding: 28px 20px;
      }
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
      setTimeout(() => {
        setCurrent(p => (p + 1) % slides.length);
        setVis(true);
      }, 500);
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
    <div style={{ position: 'relative', width: '100%', height: '100%', background: '#000' }}>
      {/* Background image */}
      <div
        style={{
          backgroundImage: `url(${slide.url})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.6)',
          position: 'absolute',
          inset: 0,
          opacity: vis ? 1 : 0.5,
          transition: 'opacity 500ms cubic-bezier(0.22,1,0.36,1)',
        }}
      />

      {/* Centered text overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 32px',
          textAlign: 'center',
        }}
      >
        <h2
          className="font-dm"
          style={{ color: '#fff', fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 700, marginBottom: '8px' }}
        >
          {slide.mood}
        </h2>
        <p
          className="font-sora"
          style={{ color: 'rgba(255,255,255,0.72)', fontSize: '14px', lineHeight: 1.6 }}
        >
          {slide.sub}
        </p>
      </div>

      {/* Dot indicators */}
      <div
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '6px',
          alignItems: 'center',
        }}
      >
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            style={{
              height: '4px',
              width: i === current ? '24px' : '8px',
              borderRadius: '9999px',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              backgroundColor: i === current ? '#20d9d2' : 'rgba(32,217,210,0.4)',
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </div>
    </div>
  );
};

/* ─── Verify Email Page ─────────────────────────────────────────── */
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

          {/* Ambient glows — positioned relative to form-col */}
          <div
            style={{
              position: 'absolute',
              top: '-100px',
              right: '-100px',
              width: '380px',
              height: '380px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(32,217,210,0.055) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '-80px',
              left: '-80px',
              width: '300px',
              height: '300px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(32,217,210,0.035) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          {/* Card */}
          <div
            className="form-animate"
            style={{
              position: 'relative',
              zIndex: 10,
              width: '100%',
              maxWidth: '400px',
              textAlign: 'center',
            }}
          >
            {/* ── Brand ── */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                marginBottom: '40px',
              }}
            >
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  background: 'linear-gradient(135deg, rgba(32,217,210,0.14), rgba(32,217,210,0.04))',
                  border: '1px solid rgba(32,217,210,0.22)',
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                  <circle cx="11" cy="11" r="7" stroke="#20d9d2" strokeWidth="2"/>
                  <path d="M20 20l-3-3" stroke="#20d9d2" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <span
                className="font-sora"
                style={{ fontSize: '17px', fontWeight: 600, color: '#fff', letterSpacing: '-0.3px' }}
              >
                perplexity
              </span>
            </div>

            {/* ── Email icon ── */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: '28px',
              }}
            >
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'linear-gradient(135deg, rgba(32,217,210,0.14), rgba(32,217,210,0.04))',
                  border: '2px solid rgba(32,217,210,0.22)',
                }}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M3 8L10.89 13.26a2 2 0 0 0 2.22 0L21 8M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z"
                    stroke="#20d9d2"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            {/* ── Heading ── */}
            <h1
              className="font-dm"
              style={{
                color: '#fff',
                fontSize: 'clamp(24px, 2.8vw, 34px)',
                lineHeight: 1.2,
                marginBottom: '12px',
              }}
            >
              Check Your Email
            </h1>

            {/* ── Subtext ── */}
            <p
              className="font-sora"
              style={{
                fontSize: '13px',
                fontWeight: 300,
                lineHeight: 1.75,
                color: 'rgba(232,232,240,0.60)',
                marginBottom: '28px',
                padding: '0 4px',
              }}
            >
              We've sent a verification link to your email address. Please check your inbox
              and click the link to verify your account.
            </p>

            {/* ── Info banner ── */}
            <div
              style={{
                padding: '14px 16px',
                borderRadius: '10px',
                background: 'rgba(32,217,210,0.08)',
                border: '1px solid rgba(32,217,210,0.15)',
                marginBottom: '28px',
              }}
            >
              <p
                className="font-sora"
                style={{ fontSize: '12px', color: 'rgba(32,217,210,0.85)', lineHeight: 1.5 }}
              >
                ✓ If you don't see the email, check your spam folder
              </p>
            </div>

            {/* ── CTA button ── */}
            <button
              onClick={() => navigate('/login')}
              className="btn-teal"
              style={{
                width: '100%',
                padding: '13px 16px',
                borderRadius: '10px',
                fontFamily: 'inherit',
                fontWeight: 600,
                fontSize: '14px',
                cursor: 'pointer',
                background: 'linear-gradient(135deg, rgba(32,217,210,0.2), rgba(32,217,210,0.08))',
                border: '1px solid rgba(32,217,210,0.4)',
                color: '#20d9d2',
                transition: 'all 0.2s ease',
                marginBottom: '0',
              }}
            >
              Back to Login
            </button>

            {/* ── Resend link ── */}
            <p
              className="font-sora"
              style={{
                fontSize: '12px',
                color: 'rgba(232,232,240,0.38)',
                marginTop: '20px',
              }}
            >
              Didn't receive the email?{' '}
              <Link
                to="#"
                style={{ fontWeight: 600, color: '#20d9d2', textDecoration: 'none' }}
              >
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