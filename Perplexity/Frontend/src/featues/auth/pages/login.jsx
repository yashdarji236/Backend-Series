import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hook/useAuth';
import { useSelector } from 'react-redux';

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

const Login = () => {
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const user = useSelector(state=>state.auth.user)
  const loading = useSelector(state=>state.auth.loading)

  const { loginUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate('/');
    }
  }, [user, loading, navigate]);

  async function handleLogin(e) {
    e.preventDefault();
    const payload = { email, password };

    const res = await loginUser(payload);
    if (!res.success) {
      alert(res.message || 'Login failed');
    }
  }

  return (
    <>
      <GlobalStyle />
      <div className="login-root">
        <div className="image-col">
          <ImagePanel />
        </div>

        <div className="form-col no-scroll">
          <div className="form-animate relative z-10 w-full" style={{ maxWidth: '400px' }}>
            <div className="flex items-center gap-3 mb-9">
              <div className="flex items-center gap-2">
                <h1 className="text-[28px] font-bold text-[#e8e8f0]">Welcome back</h1>
              </div>
            </div>
            
            <p className="text-[14px] mb-7 leading-[1.75]" style={{ color: '#a0a0a0' }}>
              Sign in to your Perplexity account and keep exploring
            </p>

            <form onSubmit={handleLogin} className="flex flex-col gap-5">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-[7px]">
                  <label htmlFor="email" className="text-[11px] font-semibold uppercase tracking-[1px]" style={{ color: '#a0a0a0' }}>
                    Email address
                  </label>
                  <div className="field-wrap relative">
                    <svg className="field-icon absolute left-[13px] top-1/2 -translate-y-1/2 w-[16px] h-[16px] pointer-events-none transition-colors duration-200" style={{ color: '#808080' }}
                      viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0L12 13.5 2.25 6.75m19.5 0A2.25 2.25 0 0019.5 4.5H4.5a2.25 2.25 0 00-2.25 2.25" />
                    </svg>
                    <input type="email" id="email" name="email" placeholder="you@example.com" required
                      value={email} onChange={e => setEmail(e.target.value)}
                      className="w-full pl-[40px] pr-4 rounded-xl text-[15px] outline-none transition-all duration-200"
                      style={{ background: '#202222', border: '1px solid #404040', color: '#e8e8f0', padding: '12px 16px 12px 40px' }}
                      onFocus={e => { e.target.style.borderColor = '#606060'; e.target.style.background = '#303232'; }}
                      onBlur={e => { e.target.style.borderColor = '#404040'; e.target.style.background = '#202222'; }}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-[7px]">
                  <label htmlFor="password" className="text-[11px] font-semibold uppercase tracking-[1px]" style={{ color: '#a0a0a0' }}>
                    Password
                  </label>
                  <div className="field-wrap relative">
                    <svg className="field-icon absolute left-[13px] top-1/2 -translate-y-1/2 w-[16px] h-[16px] pointer-events-none transition-colors duration-200" style={{ color: '#808080' }}
                      viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                    <input
                      type={showPass ? 'text' : 'password'}
                      id="password" name="password" placeholder="••••••••" required
                      value={password} onChange={e => setPassword(e.target.value)}
                      className="w-full rounded-xl text-[15px] outline-none transition-all duration-200"
                      style={{ background: '#202222', border: '1px solid #404040', color: '#e8e8f0', padding: '12px 44px 12px 40px' }}
                      onFocus={e => { e.target.style.borderColor = '#606060'; e.target.style.background = '#303232'; }}
                      onBlur={e => { e.target.style.borderColor = '#404040'; e.target.style.background = '#202222'; }}
                    />
                    <button type="button" onClick={() => setShowPass(p => !p)}
                      style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#808080', padding: '4px', display: 'flex' }}>
                      {showPass
                        ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>
                        : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      }
                    </button>
                  </div>
                </div>

                <div className="flex justify-end -mt-1">
                  <a href="#" className="text-[13px] transition-colors duration-200" style={{ color: '#a0a0a0', textDecoration: 'none' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#e8e8f0'}
                    onMouseLeave={e => e.currentTarget.style.color = '#a0a0a0'}
                  >
                    Forgot password?
                  </a>
                </div>

                <button type="submit"
                  className="w-full rounded-full text-[15px] font-medium cursor-pointer transition-all duration-200"
                  style={{ background: '#e8e8f0', color: '#000', border: 'none', padding: '12px' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#d7e3e2'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#e8e8f0'; }}
                >
                  Sign In
                </button>
              </div>
            </form>

            <p className="text-center mt-6 text-[14px]" style={{ color: '#a0a0a0' }}>
              New to Perplexity?{' '}
              <Link to="/register" className="font-medium transition-colors duration-200" style={{ color: '#e8e8f0', textDecoration: 'none' }}
                onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
                onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}
              >
                Create account
              </Link>
            </p>

            <p className="text-center mt-4 leading-relaxed" style={{ fontSize: '12px', color: '#606060' }}>
              By signing in you agree to our{' '}
              <a href="#" style={{ color: '#808080', textDecoration: 'underline' }}>Terms</a>
              {' & '}
              <a href="#" style={{ color: '#808080', textDecoration: 'underline' }}>Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;