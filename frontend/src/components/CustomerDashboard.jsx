import { useState, useEffect } from 'react';

const API_BASE = 'http://127.0.0.1:8000';

export default function CustomerDashboard({ user, onLogout, onBackToHome }) {
  const [activePackages, setActivePackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [amount, setAmount] = useState('');
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [rechargeReceipt, setRechargeReceipt] = useState(null);
  const [rechargeMsg, setRechargeMsg] = useState(null);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await fetch(`${API_BASE}/packages`);
        const data = await res.json();
        const active = data.filter((p) => (user?.packs || []).includes(p.pack_id));
        setActivePackages(active);
      } catch (_err) {
        console.error('Failed to load packages:', _err);
      }
    };
    fetchPackages();
  }, [user]);

  const formatMoney = (v) => Number(v || 0).toFixed(2);

  const validatePayment = (value) => {
    if (!value || value <= 0) return 'Please select or enter an amount.';
    if (paymentMethod === 'upi') {
      if (!/^[\w.-]{2,}@[a-zA-Z]{2,}$/.test(upiId.trim())) return 'Enter a valid UPI ID (example: name@upi).';
    } else {
      if (!/^\d{16}$/.test(cardNumber.replace(/\s/g, ''))) return 'Enter a valid 16-digit card number.';
      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardExpiry)) return 'Enter expiry as MM/YY.';
      if (!/^\d{3}$/.test(cardCvv)) return 'Enter a 3-digit CVV.';
    }
    return null;
  };

  const handlePay = async (e) => {
    e.preventDefault();
    setRechargeMsg(null);
    const value = parseFloat(amount);
    const problem = validatePayment(value);
    if (problem) {
      setRechargeMsg({ type: 'error', text: problem });
      return;
    }
    setProcessingPayment(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setLoading(true);
    try {
      // Only the subscriber ID and amount go to the backend. UPI/card details are never sent or stored.
      const res = await fetch(`${API_BASE}/recharge`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subscriber_id: user.subscriber_id, amount: value }),
      });
      if (!res.ok) throw new Error('Recharge failed');
      const updated = await res.json();
      const txnId = 'DSK-TXN-' + Math.floor(100000 + Math.random() * 900000);
      setRechargeReceipt({
        subscriberId: user.subscriber_id,
        amount: value,
        txnId,
        paymentMethod,
        updatedBalance: updated.balance,
        status: updated.status,
      });
      window.dispatchEvent(
        new CustomEvent('dualsky:user-updated', { detail: updated })
      );
      setAmount('');
      setUpiId('');
      setCardNumber('');
      setCardExpiry('');
      setCardCvv('');
    } catch (_err) {
      setRechargeMsg({ type: 'error', text: 'Recharge failed. Please try again.' });
    } finally {
      setProcessingPayment(false);
      setLoading(false);
    }
  };

  if (!user) return null;

  const statusPill =
    user.status === 'active'
      ? <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-700 text-xs font-bold">ACTIVE</span>
      : <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-red-100 text-red-700 text-xs font-bold">SUSPENDED</span>;

  const workOrder = user.work_order;
  const workOrderDisplay = workOrder
    ? <div className="flex items-start gap-2 mt-1">
        <span className="text-xs font-medium text-teal-700">{workOrder.issue_type || 'Work Order'}</span>
        <span className="text-xs text-teal-600">{workOrder.status || 'unscheduled'}</span>
        {workOrder.slot && <span className="text-xs text-teal-500">· {workOrder.slot}</span>}
      </div>
    : <div className="mt-1 text-xs text-teal-500">No active work order</div>;

  const inputCls = 'w-full px-3 py-2 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none';
  const methodBtn = (m) =>
    `flex-1 py-2 rounded-lg text-sm font-medium transition border ${
      paymentMethod === m
        ? 'bg-teal-700 text-white border-teal-700'
        : 'bg-white text-teal-700 border-teal-200 hover:bg-teal-50'
    }`;

  return (
    <section className="min-h-[calc(100vh-160px)] bg-teal-50 py-8">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-teal-900">Dualsky Account</h1>
            <p className="text-teal-600 text-sm">Welcome back, {user.name}</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={onBackToHome} className="px-4 py-2 bg-white text-teal-700 border border-teal-200 rounded-xl font-medium hover:bg-teal-50 transition shadow-sm">
              Back to Home
            </button>
            <button onClick={onLogout} className="px-4 py-2 bg-[#00796B] hover:bg-[#004D40] text-white rounded-xl font-medium transition shadow-sm">
              Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Card 1: Customer Profile */}
          <div className="bg-white rounded-2xl border border-teal-100 shadow-sm p-6 flex flex-col h-full">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center text-teal-700 font-bold text-lg">D</div>
              <div>
                <h2 className="text-base font-bold text-teal-900">Customer Profile</h2>
                <p className="text-xs text-teal-500">Your account details</p>
              </div>
            </div>
            <div className="space-y-3 flex-1">
              <div className="flex justify-between items-center border-b border-teal-50 pb-2">
                <span className="text-sm text-teal-600">Name</span>
                <span className="text-sm font-semibold text-teal-900">{user.name}</span>
              </div>
              <div className="flex justify-between items-center border-b border-teal-50 pb-2">
                <span className="text-sm text-teal-600">Subscriber ID</span>
                <span className="text-sm font-semibold text-teal-900">{user.subscriber_id}</span>
              </div>
              <div className="flex justify-between items-center border-b border-teal-50 pb-2">
                <span className="text-sm text-teal-600">RMN</span>
                <span className="text-sm font-semibold text-teal-900">{user.rmn}</span>
              </div>
              <div className="flex justify-between items-center border-b border-teal-50 pb-2">
                <span className="text-sm text-teal-600">Connection Type</span>
                <span className="text-sm font-semibold text-teal-900 capitalize">{user.kind}</span>
              </div>
              <div className="flex justify-between items-center border-b border-teal-50 pb-2">
                <span className="text-sm text-teal-600">Status</span>
                {statusPill}
              </div>
              <div className="flex justify-between items-start pt-2">
                <span className="text-sm text-teal-600">Address</span>
                <span className="text-sm text-teal-900 max-w-[200px] truncate">{user.address}</span>
              </div>
            </div>
          </div>

          {/* Card 2: Balance & Billing */}
          <div className="bg-white rounded-2xl border border-teal-100 shadow-sm p-6 flex flex-col h-full">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center text-teal-700 font-bold text-lg">₹</div>
              <div>
                <h2 className="text-base font-bold text-teal-900">Balance & Billing</h2>
                <p className="text-xs text-teal-500">Wallet and package charges</p>
              </div>
            </div>
            <div className="space-y-4 flex-1">
              <div className="flex justify-between items-center border-b border-teal-50 pb-2">
                <span className="text-sm text-teal-600">Available Balance</span>
                <span className="text-lg font-bold text-teal-900">₹{formatMoney(user.balance)}</span>
              </div>
              <div className="flex justify-between items-center border-b border-teal-50 pb-2">
                <span className="text-sm text-teal-600">Monthly Charge</span>
                <span className="text-sm font-semibold text-teal-900">₹{formatMoney(user.monthly_charge)}</span>
              </div>
              <div className="flex justify-between items-center border-b border-teal-50 pb-2">
                <span className="text-sm text-teal-600">Due Date</span>
                <span className="text-sm font-semibold text-teal-900">{user.due_date}</span>
              </div>
              <div className="pt-2">
                <p className="text-xs font-medium text-teal-700 mb-1">Work Order Status</p>
                {workOrderDisplay}
              </div>
            </div>
            {user.balance < user.monthly_charge && (
              <div className="mt-4 p-3 bg-teal-50 border border-teal-100 rounded-xl">
                <p className="text-xs text-teal-700">
                  Balance is below monthly charge. Recharge to avoid service suspension.
                </p>
              </div>
            )}
          </div>

          {/* Card 3: Active Packages */}
          <div className="bg-white rounded-2xl border border-teal-100 shadow-sm p-6 flex flex-col h-full">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center text-teal-700 font-bold text-lg">📦</div>
              <div>
                <h2 className="text-base font-bold text-teal-900">Active Packages</h2>
                <p className="text-xs text-teal-500">Your subscribed channel packs</p>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto space-y-3">
              {activePackages.length === 0 ? (
                <div className="text-center py-6 text-teal-500 text-sm">
                  No active packages found.
                </div>
              ) : (
                activePackages.map((pkg) => (
                  <div key={pkg.pack_id} className="flex items-center justify-between gap-3 p-2.5 bg-teal-50 rounded-lg border border-teal-100">
                    <span className="text-sm font-semibold text-teal-900">{pkg.pack_id}</span>
                    <div className="flex-1 text-sm text-teal-700">{pkg.pack_name}</div>
                    <div className="text-xs text-teal-500">{pkg.language}</div>
                    <span className="text-sm font-semibold text-teal-900">₹{formatMoney(pkg.price)}</span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Card 4: Instant Recharge */}
          <div className="bg-white rounded-2xl border border-teal-100 shadow-sm p-6 flex flex-col h-full">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center text-teal-700 font-bold text-lg">💳</div>
              <div>
                <h2 className="text-base font-bold text-teal-900">Instant Recharge</h2>
                <p className="text-xs text-teal-500">Top up your account balance</p>
              </div>
            </div>

            <div className="flex-1 space-y-4">
              <form onSubmit={handlePay} className="space-y-4">
                {/* Step 1: amount */}
                <div>
                  <p className="text-xs font-medium text-teal-700 mb-2">1. Select amount</p>
                  <div className="grid grid-cols-2 gap-2">
                    {[153, 359, 500, 1000].map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => setAmount(String(amt))}
                        className={`py-2 rounded-xl text-sm font-medium transition border shadow-sm ${
                          String(amt) === amount
                            ? 'bg-teal-700 text-white border-teal-700'
                            : 'bg-white text-teal-700 border-teal-200 hover:bg-teal-50 hover:border-teal-700'
                        }`}
                      >
                        ₹{amt}
                      </button>
                    ))}
                  </div>
                  <input
                    name="amount"
                    type="number"
                    min="1"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Or enter custom amount"
                    className="mt-2 w-full px-3 py-2 border border-teal-200 rounded-xl text-sm focus:ring-2 focus:ring-teal-500 outline-none"
                  />
                </div>

                {/* Step 2: payment method */}
                <div>
                  <p className="text-xs font-medium text-teal-700 mb-2">2. Choose payment method</p>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => setPaymentMethod('upi')} className={methodBtn('upi')}>UPI</button>
                    <button type="button" onClick={() => setPaymentMethod('card')} className={methodBtn('card')}>Credit / Debit Card</button>
                  </div>
                </div>

                {paymentMethod === 'upi' && (
                  <div className="space-y-2">
                    <div>
                      <label className="block text-sm font-medium text-teal-800 mb-1">UPI ID</label>
                      <input value={upiId} onChange={(e) => setUpiId(e.target.value)} type="text" placeholder="yourname@upi" className={inputCls} />
                    </div>
                    <div className="flex gap-2">
                      {['GPay', 'PhonePe', 'Paytm'].map((app) => (
                        <span key={app} className="px-2 py-1 rounded bg-teal-50 text-teal-700 text-xs font-medium border border-teal-200">
                          {app}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {paymentMethod === 'card' && (
                  <div className="space-y-2">
                    <div>
                      <label className="block text-sm font-medium text-teal-800 mb-1">Card Number</label>
                      <input value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} type="text" inputMode="numeric" maxLength={19} placeholder="•••• •••• •••• ••••" className={inputCls} />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs font-medium text-teal-800 mb-1">Expiry (MM/YY)</label>
                        <input value={cardExpiry} onChange={(e) => setCardExpiry(e.target.value)} type="text" maxLength={5} placeholder="MM/YY" className={inputCls} />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-teal-800 mb-1">CVV</label>
                        <input value={cardCvv} onChange={(e) => setCardCvv(e.target.value)} type="password" inputMode="numeric" maxLength={3} placeholder="•••" className={inputCls} />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: pay */}
                <button
                  type="submit"
                  disabled={processingPayment || loading}
                  className="w-full bg-teal-700 hover:bg-teal-800 text-white py-2.5 rounded-xl font-medium transition disabled:opacity-70 shadow-sm"
                >
                  {processingPayment ? 'Processing Payment...' : `Pay ₹${amount || 0} Now`}
                </button>
              </form>

              {processingPayment && (
                <p className="text-xs text-teal-600 animate-pulse">Processing Payment...</p>
              )}

              {/* Receipt */}
              {rechargeReceipt && (
                <div className="bg-teal-50 rounded-xl p-4 border border-teal-100 space-y-2">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-teal-100 rounded-xl flex items-center justify-center text-teal-700 font-bold">✓</div>
                    <h3 className="text-base font-bold text-teal-900">Recharge Successful</h3>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-teal-600">Transaction ID</span>
                    <span className="font-semibold text-teal-900">{rechargeReceipt.txnId}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-teal-600">Subscriber ID</span>
                    <span className="font-semibold text-teal-900">{rechargeReceipt.subscriberId}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-teal-600">Amount Credited</span>
                    <span className="font-bold text-teal-700">₹{formatMoney(rechargeReceipt.amount)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-teal-600">Payment Method</span>
                    <span className="font-semibold text-teal-900 capitalize">{rechargeReceipt.paymentMethod}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-teal-600">Updated Balance</span>
                    <span className="font-bold text-teal-700">₹{formatMoney(rechargeReceipt.updatedBalance)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-teal-600">Status</span>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold ${
                      rechargeReceipt.status === 'active'
                        ? 'bg-teal-100 text-teal-700'
                        : 'bg-red-100 text-red-700'
                    }`}>{String(rechargeReceipt.status || '').toUpperCase()}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setRechargeReceipt(null)}
                    className="w-full bg-[#00796B] hover:bg-[#004D40] text-white py-2 rounded-lg font-medium transition shadow-sm"
                  >
                    Close Receipt
                  </button>
                </div>
              )}

              {rechargeMsg && rechargeMsg.type === 'error' && (
                <p className="text-xs text-red-600">{rechargeMsg.text}</p>
              )}
            </div>
          </div>

        </div>

        <p className="text-center text-xs text-teal-600 mt-8 italic">
          DSK-BASIC (₹153) base pack applies to all connections.
        </p>
      </div>
    </section>
  );
}