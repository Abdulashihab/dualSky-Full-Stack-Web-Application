import { useState } from 'react';

const API_BASE = 'http://127.0.0.1:8000';

const QUICK_QUESTIONS = [
  'Check my balance',
  'Malayalam HD packs',
  'No signal error',
];

export default function SupportChatWidget({ subscriberId, isOpen, onToggle }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Hello! I am your Dualsky AI Support assistant. How can I help you today?',
      sender: 'bot',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [sending, setSending] = useState(false);

  const sendMessage = async (text) => {
    const userMsg = { id: Date.now(), text, sender: 'user' };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setSending(true);

    try {
      const res = await fetch(`${API_BASE}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, subscriber_id: subscriberId || null }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { id: Date.now() + 1, text: data.reply, sender: 'bot' }]);
    } catch (err) {
      setMessages((prev) => [...prev, { id: Date.now() + 1, text: 'Sorry, I could not reach the support server. Please try again later.', sender: 'bot' }]);
    } finally {
      setSending(false);
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    sendMessage(inputValue);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={() => onToggle(!isOpen)}
        className="bg-teal-700 hover:bg-teal-800 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition"
        aria-label="Toggle Dualsky AI Support"
      >
        {isOpen ? (
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )}
      </button>

      {isOpen && (
        <div className="flex flex-col h-[500px] w-[360px] bg-white rounded-2xl shadow-2xl border border-teal-100 overflow-hidden">
          <div className="bg-teal-700 text-white px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-teal-500 rounded flex items-center justify-center text-teal-700 text-xs font-bold">
                D
              </div>
              <div>
                <div className="text-sm font-bold">Dualsky AI Support</div>
                <div className="text-xs text-teal-100">Online</div>
              </div>
            </div>
            <button
              onClick={() => onToggle(false)}
              className="text-teal-100 hover:text-white"
            >
              &times;
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-teal-50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`max-w-[85%] ${
                  msg.sender === 'user'
                    ? 'ml-auto text-right'
                    : 'mr-auto text-left'
                }`}
              >
                <div
                  className={`inline-block px-4 py-2.5 rounded-lg ${
                    msg.sender === 'user'
                      ? 'bg-teal-700 text-white'
                      : 'bg-teal-50 text-teal-900 border border-teal-100'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {sending && (
              <div className="ml-auto text-right">
                <div className="flex gap-1">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-pulse"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
          {!sending && messages.length === 1 && (
            <div className="p-3 border-t border-teal-100 bg-teal-50/50">
              <p className="text-xs text-teal-500 mb-2">Quick questions:</p>
              <div className="flex flex-wrap gap-1.5">
                {QUICK_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="text-xs text-teal-600 hover:bg-white px-2 py-1.5 rounded border border-teal-100 hover:border-teal-700 transition whitespace-nowrap"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}
          <div className="p-3 border-t border-teal-100 bg-white">
            <form onSubmit={handleSend} className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 rounded-lg border border-teal-200 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none text-sm"
                disabled={sending}
              />
              <button
                type="submit"
                disabled={sending || !inputValue.trim()}
                className="bg-teal-700 hover:bg-teal-800 text-white px-4 py-2 rounded-lg font-medium transition disabled:opacity-50"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}