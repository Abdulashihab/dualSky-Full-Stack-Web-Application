import { useState } from 'react';

const API_BASE = 'http://127.0.0.1:8000';

export default function Navbar() {
  const [openModal, setOpenModal] = useState(null);
  const [authTab, setAuthTab] = useState('login');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState({});

  const setLoadingState = (key, val) =>
    setLoading((prev) => ({ ...prev, [key]: val }));

  const formatMoney = (v) => Number(v || 0).toFixed(2);

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
        setUser(data[0]);
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
      setUser(data);
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
        setUser(data);
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
    setUser(null);
  };

  return (
    <>
      <nav className="bg-teal-700 text-white px-6 py-4 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center text-teal-700 font-bold text-xl shadow-sm">
            D
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Dualsky</h1>
            <p className="text-teal-100 text-xs uppercase tracking-wider">
              Sky Without Limits
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-4 bg-teal-50 border border-teal-200/60 px-4 py-2 rounded-xl text-teal-900">
              <div className="hidden sm:flex flex-col">
                <p className="text-sm font-semibold">{user.name}</p>
                <p className="text-xs text-teal-600">{user.subscriber_id}</p>
                <p className="text-xs text-teal-600">
                  Balance: ₹{formatMoney(user.balance)}
                </p>
                <p className="text-xs text-teal-600">
                  Due: {user.due_date || '—'}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="bg-teal-700 hover:bg-teal-800 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition shadow-sm"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={() => setOpenModal('recharge')}
                className="bg-teal-700 hover:bg-teal-800 text-white px-5 py-2 rounded-lg font-medium transition shadow-sm"
              >
                Recharge
              </button>
              <button
                onClick={() => {
                  setAuthTab('login');
                  setOpenModal('login-signup');
                }}
                className="bg-white text-teal-700 px-5 py-2 rounded-lg font-medium border border-teal-200 hover:bg-teal-50 transition shadow-sm"
              >
                Login / Sign Up
              </button>
            </>
          )}
        </div>
      </nav>

      {openModal === 'login-signup' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setOpenModal(null)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
          />
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl relative">
            <button
              onClick={() => setOpenModal(null)}
              className="absolute top-4 right-4 text-teal-600 hover:text-teal-800"
            >
              &times;
            </button>
            <div className="px-6 pt-6 pb-4">
              <h2 className="text-xl font-bold text-teal-900 mb-1">
                Welcome back
              </h2>
              <p className="text-sm text-teal-600 mb-6">
                Sign in to your Dualsky account
              </p>
              {authTab === 'login' ? (
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-teal-800 mb-1">
                      Subscriber ID or RMN
                    </label>
                    <input
                      name="subscriber_id_or_rmn"
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                      placeholder="Enter subscriber ID or RMN"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading.login}
                    className="w-full bg-teal-700 hover:bg-teal-800 text-white py-2.5 rounded-lg font-medium transition disabled:opacity-70"
                  >
                    {loading.login ? 'Signing in...' : 'Login'}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleSignup} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-teal-800 mb-1">
                      Full Name
                    </label>
                    <input
                      name="name"
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-teal-800 mb-1">
                      RMN
                    </label>
                    <input
                      name="rmn"
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-teal-800 mb-1">
                      Address
                    </label>
                    <textarea
                      name="address"
                      rows={2}
                      required
                      className="w-full px-3 py-2 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading.signup}
                    className="w-full bg-teal-700 hover:bg-teal-800 text-white py-2.5 rounded-lg font-medium transition disabled:opacity-70"
                  >
                    {loading.signup ? 'Creating account...' : 'Create Account'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
      {openModal === 'recharge' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setOpenModal(null)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
          />
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl relative">
            <button
              onClick={() => setOpenModal(null)}
              className="absolute top-4 right-4 text-teal-600 hover:text-teal-800"
            >
              &times;
            </button>
            <div className="px-6 pt-6 pb-6">
              <h2 className="text-xl font-bold text-teal-900 mb-1">Recharge</h2>
              <p className="text-sm text-teal-600 mb-6">
                Top up your account balance
              </p>
              <form onSubmit={handleRecharge} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-teal-800 mb-1">
                    Subscriber ID
                  </label>
                  <input
                    name="subscriber_id"
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-teal-800 mb-1">
                    Amount (₹)
                  </label>
                  <input
                    name="amount"
                    type="number"
                    step="0.01"
                    required
                    className="w-full px-3 py-2 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading.recharge}
                  className="w-full bg-teal-700 hover:bg-teal-800 text-white py-2.5 rounded-lg font-medium transition disabled:opacity-70"
                >
                  {loading.recharge ? 'Processing...' : 'Recharge Now'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}