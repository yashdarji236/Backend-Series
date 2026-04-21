import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hook/useAuth';
import { useSelector } from 'react-redux';
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

  return (
    <div className="relative w-full h-full overflow-hidden group select-none system-font">
      <img
        src={slides[current].url}
        alt={slides[current].mood}
        className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
        style={{ filter: 'brightness(0.52) saturate(0.65)', opacity: vis ? 1 : 0, transition: 'opacity 0.5s ease, transform 0.9s ease' }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `
          linear-gradient(to top, rgba(10,10,15,0.97) 0%, rgba(10,10,15,0.28) 48%, transparent 68%),
          linear-gradient(135deg, rgba(32,217,210,0.07) 0%, transparent 55%)
        `,
      }} />

      {/* Top logo */}
      <div className="absolute top-6 left-6 z-10 flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'rgba(32,217,210,0.12)', border: '1px solid rgba(32,217,210,0.28)' }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="7" stroke="#20d9d2" strokeWidth="2.2" />
            <path d="M20 20l-3-3" stroke="#20d9d2" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        </div>
        <span className="font-sora text-[13px] font-semibold text-white/75 tracking-wide">perplexity</span>
      </div>

      {/* Caption */}
      <div className="absolute z-10" style={{ bottom: '60px', left: '32px', right: '32px', opacity: vis ? 1 : 0, transition: 'opacity 0.5s ease' }}>
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="w-[6px] h-[6px] rounded-full bg-[#20d9d2]" style={{ animation: 'pulseDot 2s ease-in-out infinite' }} />
          <span className="font-sora text-[9.5px] font-semibold tracking-[3.5px] uppercase" style={{ color: 'rgba(32,217,210,0.75)' }}>Answer Engine</span>
        </div>
        <h2 className="font-dm text-white mb-2" style={{ fontSize: 'clamp(24px, 3.5vw, 48px)', lineHeight: 1.1 }}>
          {slides[current].mood}
        </h2>
        <p className="font-sora text-[13px] font-light" style={{ color: 'rgba(255,255,255,0.42)' }}>
          {slides[current].sub}
        </p>
      </div>

      {/* Dots */}
      <div className="absolute z-10 flex items-center gap-2" style={{ bottom: '24px', left: '32px' }}>
        {slides.map((_, i) => (
          <button key={i} onClick={() => goTo(i)} style={{
            border: 'none', padding: 0, cursor: 'pointer', borderRadius: i === current ? '3px' : '50%',
            width: i === current ? '22px' : '6px', height: '6px',
            background: i === current ? '#20d9d2' : 'rgba(255,255,255,0.22)',
            transition: 'all 0.3s ease',
          }} />
        ))}
      </div>
    </div>
  );
};

/* ─── Login Page ────────────────────────────────────────────────── */
const Login = () => {
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const user = useSelector(state=>state.auth.user)
  const loading = useSelector(state=>state.auth.loading)



  const { loginUser } = useAuth();
  const navigate = useNavigate();
  async function handleLogin(e) {
    e.preventDefault();
    const payload = { email, password };

    const res = await loginUser(payload);
    if (res.success) {
      navigate('/', {
        state: {
          message: `Welcome back 👋`,
          userEmail: email
        }
      });
    } else {
      alert(res.message || 'Login failed');
    }
  useEffect(() => {
  if (!loading && user) {
    navigate('/');
  }
}, [user, loading, navigate]);
  }
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
          <div className="form-animate relative z-10 w-full" style={{ maxWidth: '400px' }}>

            {/* Brand */}
            <div className="flex items-center gap-3 mb-9">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, rgba(32,217,210,0.14), rgba(32,217,210,0.04))', border: '1px solid rgba(32,217,210,0.22)' }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                  <circle cx="11" cy="11" r="7" stroke="#20d9d2" strokeWidth="2" />
                  <path d="M20 20l-3-3" stroke="#20d9d2" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-sora text-[17px] font-semibold text-white tracking-[-0.3px]">perplexity</span>

              </div>
            </div>
            <br />
            {/* Heading */}
            <h1 className="font-dm text-white mb-2" style={{ fontSize: 'clamp(24px, 2.8vw, 35px)', lineHeight: 1.15 }}>
              Welcome back
            </h1>
            <p className="font-sora text-[13px] font-light mb-7 leading-[1.75]" style={{ color: 'rgba(232,232,240,0.38)' }}>
              Sign in to your Perplexity account and keep exploring
            </p>




            <br />
            {/* Fields */}
            <form onSubmit={handleLogin} className="flex flex-col gap-5">
              <div className="flex flex-col gap-4">

                {/* Email */}
                <div className="flex flex-col gap-[7px]">
                  <label htmlFor="email" className="font-sora text-[10px] font-semibold uppercase tracking-[1.6px]" style={{ color: 'rgba(232,232,240,0.28)' }}>
                    Email address
                  </label>
                  <div className="field-wrap relative">
                    <svg className="field-icon absolute left-[13px] top-1/2 -translate-y-1/2 w-[14px] h-[14px] pointer-events-none transition-colors duration-200" style={{ color: 'rgba(232,232,240,0.2)' }}
                      viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0L12 13.5 2.25 6.75m19.5 0A2.25 2.25 0 0019.5 4.5H4.5a2.25 2.25 0 00-2.25 2.25" />
                    </svg>
                    <input type="email" id="email" name="email" placeholder="you@example.com" required
                      value={email} onChange={e => setEmail(e.target.value)}
                      className="font-sora w-full pl-[40px] pr-4 rounded-xl text-[14px] outline-none transition-all duration-200"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#e8e8f0', padding: '12px 16px 12px 40px' }}
                      onFocus={e => { e.target.style.borderColor = 'rgba(32,217,210,0.38)'; e.target.style.background = 'rgba(32,217,210,0.03)'; e.target.style.boxShadow = '0 0 0 3px rgba(32,217,210,0.07)'; }}
                      onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; e.target.style.background = 'rgba(255,255,255,0.04)'; e.target.style.boxShadow = 'none'; }}
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="flex flex-col gap-[7px]">
                  <label htmlFor="password" className="font-sora text-[10px] font-semibold uppercase tracking-[1.6px]" style={{ color: 'rgba(232,232,240,0.28)' }}>
                    Password
                  </label>
                  <div className="field-wrap relative">
                    <svg className="field-icon absolute left-[13px] top-1/2 -translate-y-1/2 w-[14px] h-[14px] pointer-events-none transition-colors duration-200" style={{ color: 'rgba(232,232,240,0.2)' }}
                      viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                    <input
                      type={showPass ? 'text' : 'password'}
                      id="password" name="password" placeholder="••••••••" required
                      value={password} onChange={e => setPassword(e.target.value)}
                      className="font-sora w-full rounded-xl text-[14px] outline-none transition-all duration-200"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#e8e8f0', padding: '12px 44px 12px 40px' }}
                      onFocus={e => { e.target.style.borderColor = 'rgba(32,217,210,0.38)'; e.target.style.background = 'rgba(32,217,210,0.03)'; e.target.style.boxShadow = '0 0 0 3px rgba(32,217,210,0.07)'; }}
                      onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; e.target.style.background = 'rgba(255,255,255,0.04)'; e.target.style.boxShadow = 'none'; }}
                    />
                    <button type="button" onClick={() => setShowPass(p => !p)}
                      style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(232,232,240,0.25)', padding: '4px', display: 'flex' }}>
                      {showPass
                        ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>
                        : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      }
                    </button>
                  </div>
                </div>

                {/* Forgot */}
                <div className="flex justify-end -mt-1">
                  <a href="#" className="font-sora text-[12px] transition-colors duration-200" style={{ color: 'rgba(232,232,240,0.35)', textDecoration: 'none' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#20d9d2'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(232,232,240,0.35)'}
                  >
                    Forgot password?
                  </a>
                </div>

                {/* Sign In */}
                <button type="submit"
                  className="btn-teal font-sora w-full rounded-xl text-[14px] font-semibold tracking-[0.3px] cursor-pointer transition-all duration-250"
                  style={{ background: 'linear-gradient(135deg, #20d9d2, #17b8b2)', color: '#0a0a0f', border: 'none', padding: '13px', boxShadow: '0 8px 24px rgba(32,217,210,0.2)' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(32,217,210,0.3)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(32,217,210,0.2)'; }}
                  onMouseDown={e => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  Sign In
                </button>
              </div>
            </form>

            {/* Sign up link */}
            <p className="font-sora text-center mt-6 text-[13px] font-light" style={{ color: 'rgba(232,232,240,0.3)' }}>
              New to Perplexity?{' '}
              <Link to="/register" className="font-medium transition-colors duration-200" style={{ color: '#20d9d2', textDecoration: 'none' }}
                onMouseEnter={e => e.currentTarget.style.color = '#5ee8e4'}
                onMouseLeave={e => e.currentTarget.style.color = '#20d9d2'}
              >
                Create account
              </Link>
            </p>

            {/* Terms */}
            <p className="font-sora text-center mt-4 leading-relaxed" style={{ fontSize: '11px', color: 'rgba(232,232,240,0.17)' }}>
              By signing in you agree to our{' '}
              <a href="#" style={{ color: 'rgba(232,232,240,0.32)', textDecoration: 'underline' }}>Terms</a>
              {' & '}
              <a href="#" style={{ color: 'rgba(232,232,240,0.32)', textDecoration: 'underline' }}>Privacy Policy</a>
            </p>

          </div>
        </div>

      </div>
    </>
  );
};

export default Login;