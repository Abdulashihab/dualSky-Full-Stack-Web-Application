import { useState } from 'react';

const API_BASE = 'http://127.0.0.1:8000';

export default function Navbar({ user, onLogin, onLogout, onOpenSupport, onMyAccount, activeView }) {
  const [openModal, setOpenModal] = useState(null);
  const [authTab, setAuthTab] = useState('login');
  const [loading, setLoading] = useState({});

  const setLoadingState = (key, val) =>
    setLoading((prev) => ({ ...prev, [key]: val }));

  const handleLogin = async (e) => {
    e.preventDefault();
    const id = e.target.elements['subscriber_id_or_rmn'].value;
    setLoadingState('login', true);
    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subscriber_id_or_rmn: id }),
      });
      if (!res.ok) throw new Error('Login failed');
      const data = await res.json();
      if (data && data.length > 0) {
        onLogin(data[0]);
        setOpenModal(null);
        e.target.reset();
      } else {
        alert('No subscriber found.');
      }
    } catch (err) {
      alert(err.message);
    } finally {
      setLoadingState('login', false);
    }
  };
  const handleSignup = async (e) => {
    e.preventDefault();
    const payload = {
      name: e.target.elements['name'].value,
      rmn: e.target.elements['rmn'].value,
      address: e.target.elements['address'].value,
    };
    setLoadingState('signup', true);
    try {
      const res = await fetch(`${API_BASE}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Signup failed');
      const data = await res.json();
      onLogin(data);
      setOpenModal(null);
      e.target.reset();
    } catch (err) {
      alert(err.message);
    } finally {
      setLoadingState('signup', false);
    }
  };

  const handleRecharge = async (e) => {
    e.preventDefault();
    const payload = {
      subscriber_id: e.target.elements['subscriber_id'].value,
      amount: parseFloat(e.target.elements['amount'].value),
    };
    setLoadingState('recharge', true);
    try {
      const res = await fetch(`${API_BASE}/recharge`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Recharge failed');
      const data = await res.json();
      if (user && user.subscriber_id === payload.subscriber_id) {
        onLogin(data);
      }
      e.target.reset();
      alert('Recharge successful!');
    } catch (err) {
      alert(err.message);
    } finally {
      setLoadingState('recharge', false);
    }
  };
  const handleLogout = () => {
    onLogout();
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  return (
    <>
      <nav className="bg-white sticky top-0 z-40 border-b border-teal-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#00796B] rounded flex items-center justify-center text-white font-bold text-lg shadow-sm">
              D
            </div>
            <h1 className="text-xl font-bold text-[#00796B] tracking-tight">Dualsky</h1>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <button type="button" onClick={(e) => { e.preventDefault(); scrollToSection('set-top-boxes'); }} className="text-teal-700 font-medium text-sm hover:text-[#004D40] transition">New DTH Connection</button>
            <button onClick={() => setOpenModal('recharge')} className="text-teal-700 font-medium text-sm hover:text-[#004D40] transition">Quick Recharge</button>
            <button type="button" onClick={(e) => { e.preventDefault(); scrollToSection('packages'); }} className="text-teal-700 font-medium text-sm hover:text-[#004D40] transition">Explore DTH Packs</button>
            <div className="relative">
              <button
                onClick={() => setOpenModal(openModal === 'help' ? null : 'help')}
                className="text-teal-700 font-medium text-sm hover:text-[#004D40] transition rounded-lg py-1.5 px-3 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                aria-haspopup="true"
                aria-expanded={openModal === 'help'}
              >
                Help
              </button>
              {openModal === 'help' && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-teal-100 p-4 space-y-2">
                  <div className="text-sm text-teal-700 mb-2">Customer Care</div>
                  <div className="flex items-center gap-2 text-teal-600 text-sm mb-3">
                    <span>📞 1800-123-4567</span>
                  </div>
                  <div className="flex items-center gap-2 text-teal-600 text-sm mb-3">
                    <span>✉️ support@dualsky.in</span>
                  </div>
                  <button onClick={() => { setOpenModal(null); onOpenSupport?.(); }} className="w-full bg-[#00796B] hover:bg-[#004D40] text-white py-2 rounded-lg font-medium transition shadow-sm">
                    Open Dualsky AI Support
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-2">
                {(!activeView || activeView === 'home') && (
                  <button
                    onClick={() => onMyAccount?.()}
                    className="bg-teal-50 hover:bg-teal-100 text-teal-700 border border-teal-200 px-4 py-2 rounded-lg text-sm font-medium transition shadow-sm"
                  >
                    My Account
                  </button>
                )}
                <button onClick={handleLogout} className="bg-[#00796B] hover:bg-[#004D40] text-white px-4 py-2 rounded-lg text-sm font-medium transition shadow-sm">Logout</button>
              </div>
            ) : (
              <button onClick={() => { setAuthTab('login'); setOpenModal('login-signup'); }} className="bg-[#00796B] hover:bg-[#004D40] text-white px-5 py-2 rounded-lg font-medium transition shadow-sm">Login</button>
            )}
          </div>
        </div>
      </nav>
      {openModal === 'login-signup' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div onClick={() => setOpenModal(null)} className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl relative">
            <button onClick={() => setOpenModal(null)} className="absolute top-4 right-4 text-teal-600 hover:text-teal-800">&times;</button>
            <div className="px-6 pt-6 pb-4">
              <h2 className="text-xl font-bold text-teal-900 mb-1">Welcome back</h2>
              <p className="text-sm text-teal-600 mb-6">Sign in to your Dualsky account</p>
              <div className="flex border-b border-teal-100 mb-6">
                <button
                  onClick={() => setAuthTab('login')}
                  className={`flex-1 py-3 text-sm font-medium ${authTab === 'login' ? 'text-teal-700 border-b-2 border-teal-700' : 'text-teal-500 hover:text-teal-700'}`}
                >
                  Login
                </button>
                <button
                  onClick={() => setAuthTab('signup')}
                  className={`flex-1 py-3 text-sm font-medium ${authTab === 'signup' ? 'text-teal-700 border-b-2 border-teal-700' : 'text-teal-500 hover:text-teal-700'}`}
                >
                  Sign Up
                </button>
              </div>
              {authTab === 'login' ? (
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-teal-800 mb-1">Subscriber ID or RMN</label>
                    <input name="subscriber_id_or_rmn" type="text" required className="w-full px-3 py-2 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none" placeholder="Enter subscriber ID or RMN" />
                  </div>
                  <button type="submit" disabled={loading.login} className="w-full bg-[#00796B] hover:bg-[#004D40] text-white py-2.5 rounded-lg font-medium transition disabled:opacity-70">{loading.login ? 'Signing in...' : 'Login'}</button>
                </form>
              ) : (
                <form onSubmit={handleSignup} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-teal-800 mb-1">Full Name</label>
                    <input name="name" type="text" required className="w-full px-3 py-2 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-teal-800 mb-1">RMN</label>
                    <input name="rmn" type="text" required className="w-full px-3 py-2 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-teal-800 mb-1">Address</label>
                    <textarea name="address" rows={2} required className="w-full px-3 py-2 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none" />
                  </div>
                  <button type="submit" disabled={loading.signup} className="w-full bg-[#00796B] hover:bg-[#004D40] text-white py-2.5 rounded-lg font-medium transition disabled:opacity-70">{loading.signup ? 'Creating account...' : 'Create Account'}</button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
      {openModal === 'recharge' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div onClick={() => setOpenModal(null)} className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl relative">
            <button onClick={() => setOpenModal(null)} className="absolute top-4 right-4 text-teal-600 hover:text-teal-800">&times;</button>
            <div className="px-6 pt-6 pb-6">
              <h2 className="text-xl font-bold text-teal-900 mb-1">Recharge</h2>
              <p className="text-sm text-teal-600 mb-6">Top up your account balance</p>
              <form onSubmit={handleRecharge} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-teal-800 mb-1">Subscriber ID</label>
                  <input name="subscriber_id" type="text" required className="w-full px-3 py-2 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-teal-800 mb-1">Amount (₹)</label>
                  <input name="amount" type="number" step="0.01" required className="w-full px-3 py-2 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none" />
                </div>
                <button type="submit" disabled={loading.recharge} className="w-full bg-[#00796B] hover:bg-[#004D40] text-white py-2.5 rounded-lg font-medium transition disabled:opacity-70">{loading.recharge ? 'Processing...' : 'Recharge Now'}</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
