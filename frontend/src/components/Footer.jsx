import { useState } from 'react';

export default function Footer({ onOpenSupport }) {
  const [activeLegalModal, setActiveLegalModal] = useState(null);
  const [workOrderModal, setWorkOrderModal] = useState(false);
  const [contactModal, setContactModal] = useState(false);

  const legalContents = {
    terms: {
      title: 'Terms of Service',
      body: (
        <>
          <p className="mb-4 text-teal-600">Last updated: November 2026</p>
          <p className="mb-2 text-teal-700">Welcome to Dualsky DTH Services. These Terms of Service govern your use of our Direct-to-Home television services, website, and mobile applications.</p>
          <p className="mb-2 text-teal-700">By subscribing to Dualsky, you agree to be bound by these terms, our Privacy Policy, and our Billing Rules. If you do not agree, please do not use our services.</p>
          <p className="mb-2 text-teal-700"><span className="font-semibold text-teal-800">1. Eligibility.</span> You must be at least 18 years old to subscribe. Valid ID and proof of address are required for activation.</p>
          <p className="mb-2 text-teal-700"><span className="font-semibold text-teal-800">2. Service Provision.</span> Dualsky provides HD/SD DTH channels subject to availability in your region. Signal quality may be affected by weather and obstructions.</p>
          <p className="mb-2 text-teal-700"><span className="font-semibold text-teal-800">3. Subscriber Obligations.</span> You are responsible for maintaining your set-top box and smart card. Tampering with equipment will result in immediate service termination.</p>
          <p className="mb-2 text-teal-700"><span className="font-semibold text-teal-800">4. Termination.</span> Either party may terminate service with 30 days' written notice. Dualsky may suspend service for non-payment or violation of terms.</p>
          <p className="mb-2 text-teal-700"><span className="font-semibold text-teal-800">5. Limitation of Liability.</span> Dualsky is not liable for indirect, incidental, or consequential damages arising from service interruptions.</p>
          <p className="mb-2 text-teal-700"><span className="font-semibold text-teal-800">6. Governing Law.</span> These terms are governed by the laws of India.</p>
        </>
      )
    },
    privacy: {
      title: 'Privacy Policy',
      body: (
        <>
          <p className="mb-4 text-teal-600">Last updated: November 2026</p>
          <p className="mb-2 text-teal-700">Dualsky respects your privacy. This policy explains how we collect, use, disclose, and protect your personal information.</p>
          <p className="mb-2 text-teal-700"><span className="font-semibold text-teal-800">Information We Collect.</span> Name, address, subscriber ID, contact details, payment information, and service usage data.</p>
          <p className="mb-2 text-teal-700"><span className="font-semibold text-teal-800">How We Use It.</span> To activate and provision your DTH service, bill your account, send service alerts, and improve customer support.</p>
          <p className="mb-2 text-teal-700"><span className="font-semibold text-teal-800">Sharing and Disclosure.</span> We do not sell your personal data. We may share information only with authorized service partners for billing and installation purposes.</p>
          <p className="mb-2 text-teal-700"><span className="font-semibold text-teal-800">Data Security.</span> Your data is stored on secure servers with encryption in transit and at rest. Access is restricted to authorized personnel.</p>
          <p className="mb-2 text-teal-700"><span className="font-semibold text-teal-800">Your Rights.</span> You may request access to, correction of, or deletion of your personal data by contacting us.</p>
          <p className="mb-2 text-teal-700"><span className="font-semibold text-teal-800">Contact.</span> Email: privacy@dualsky.in | Toll-free: 1800-123-4567</p>
        </>
      )
    },
    billing: {
      title: 'Billing Rules',
      body: (
        <>
          <p className="mb-4 text-teal-600">Effective: November 2026</p>
          <p className="mb-4 text-teal-700">The following Dualsky billing rules apply to all subscribers:</p>
          <ul className="list-disc list-inside mb-4 text-teal-700 space-y-2">
            <li><span className="font-semibold text-teal-800">1.</span> Every subscriber must have <span className="font-semibold">DSK-BASIC (₹153)</span> with add-on packs billed on top.</li>
            <li><span className="font-semibold text-teal-800">2.</span> The full flat package price applies even when packs share overlapping channels.</li>
            <li><span className="font-semibold text-teal-800">3.</span> No multi-pack discount applies.</li>
            <li><span className="font-semibold text-teal-800">4.</span> Each <span className="font-semibold">subscriber_id</span> (primary or secondary) has its own independent balance, monthly charge, and due date.</li>
          </ul>
          <p className="mb-2 text-teal-700">Charges are billed monthly in advance. Late payments may result in service suspension until the balance is cleared.</p>
          <p className="mb-2 text-teal-700"><span className="font-semibold text-teal-800">Billing inquiries:</span> billing@dualsky.in | Toll-free: 1800-123-4567</p>
        </>
      )
    }
  };

  return (
    <footer className="bg-[#003B33] text-white py-12 border-t border-teal-700/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 bg-white rounded flex items-center justify-center text-[#00796B] font-bold text-lg">
                D
              </div>
              <span className="text-xl font-bold tracking-tight">Dualsky</span>
            </div>
            <p className="text-teal-200 text-sm leading-relaxed max-w-xs">
              Sky Without Limits — India's most trusted DTH service with
              crystal-clear HD picture and instant activation.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-teal-100 mb-4 uppercase tracking-wider text-xs">
              Support
            </h4>
            <ul className="space-y-2 text-teal-200 text-sm">
              <li>
                <button onClick={onOpenSupport} className="text-teal-200 hover:text-white transition underline">
                  AI Support Chat
                </button>
              </li>
              <li>
                <button onClick={() => setWorkOrderModal(true)} className="text-teal-200 hover:text-white transition underline">
                  Raise a Work Order
                </button>
              </li>
              <li>
                <button onClick={() => setContactModal(true)} className="text-teal-200 hover:text-white transition underline">
                  Contact Us
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-teal-100 mb-4 uppercase tracking-wider text-xs">
              Legal
            </h4>
            <ul className="space-y-2 text-teal-200 text-sm">
              <li>
                <button onClick={() => setActiveLegalModal('terms')} className="text-teal-200 hover:text-white transition underline">
                  Terms of Service
                </button>
              </li>
              <li>
                <button onClick={() => setActiveLegalModal('privacy')} className="text-teal-200 hover:text-white transition underline">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => setActiveLegalModal('billing')} className="text-teal-200 hover:text-white transition underline">
                  Billing Rules
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-teal-700/40 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-teal-300 text-xs">
            &copy; {new Date().getFullYear()} Dualsky. All rights reserved.
          </p>
          <div className="flex gap-4 text-teal-300 text-xs">
            <a href="#" className="hover:text-white transition">
              Facebook
            </a>
            <a href="#" className="hover:text-white transition">
              Twitter
            </a>
            <a href="#" className="hover:text-white transition">
              Instagram
            </a>
            <a href="#" className="hover:text-white transition">
              YouTube
            </a>
          </div>
        </div>
      {activeLegalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setActiveLegalModal(null)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-teal-200 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveLegalModal(null)}
              className="absolute top-4 right-4 text-teal-600 hover:text-teal-800"
            >
              &times;
            </button>
            <div className="p-6 pt-8">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-teal-700 rounded flex items-center justify-center text-white font-bold text-lg">
                  D
                </div>
                <h2 className="text-xl font-bold text-teal-900">
                  {legalContents[activeLegalModal].title}
                </h2>
              </div>
              <div className="text-teal-700 leading-relaxed text-sm">
                {legalContents[activeLegalModal].body}
              </div>
              <button
                onClick={() => setActiveLegalModal(null)}
                className="mt-6 w-full bg-teal-700 hover:bg-teal-800 text-white py-2.5 rounded-xl font-medium transition shadow-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {workOrderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setWorkOrderModal(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-teal-200 relative">
            <button
              onClick={() => setWorkOrderModal(false)}
              className="absolute top-4 right-4 text-teal-600 hover:text-teal-800"
            >
              &times;
            </button>
            <div className="p-6 pt-8">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-teal-700 rounded flex items-center justify-center text-white font-bold text-lg">
                  D
                </div>
                <h2 className="text-xl font-bold text-teal-900">Raise a Work Order</h2>
              </div>
              <p className="text-teal-700 text-sm mb-6 leading-relaxed">
                How would you like to resolve your issue?
              </p>
              <button
                onClick={() => {
                  setWorkOrderModal(false);
                  onOpenSupport();
                }}
                className="w-full bg-teal-700 hover:bg-teal-800 text-white py-3 rounded-xl font-medium transition shadow-sm mb-3"
              >
                Use Dualsky AI Support Bot
              </button>
              <button
                onClick={() => setWorkOrderModal(false)}
                className="w-full bg-white text-teal-700 py-3 rounded-xl font-medium border border-teal-200 hover:bg-teal-50 transition shadow-sm"
              >
                Call 24/7 Customer Care (1800-123-4567)
              </button>
            </div>
          </div>
        </div>
      )}

      {contactModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setContactModal(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-teal-200 relative">
            <button
              onClick={() => setContactModal(false)}
              className="absolute top-4 right-4 text-teal-600 hover:text-teal-800"
            >
              &times;
            </button>
            <div className="p-6 pt-8">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-teal-700 rounded flex items-center justify-center text-white font-bold text-lg">
                  D
                </div>
                <h2 className="text-xl font-bold text-teal-900">Contact Us</h2>
              </div>
              <div className="space-y-3 text-teal-700 text-sm mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-teal-500">📞</span>
                  <div>
                    <div className="font-semibold text-teal-800">Toll-Free</div>
                    <div className="text-teal-600">1800-123-4567</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-teal-500">✉️</span>
                  <div>
                    <div className="font-semibold text-teal-800">Email</div>
                    <div className="text-teal-600">support@dualsky.in</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-teal-500">🕒</span>
                  <div>
                    <div className="font-semibold text-teal-800">Availability</div>
                    <div className="text-teal-600">24x7</div>
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  setContactModal(false);
                  onOpenSupport();
                }}
                className="w-full bg-teal-700 hover:bg-teal-800 text-white py-2.5 rounded-xl font-medium transition shadow-sm"
              >
                Open AI Support Chat
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </footer>
  );
}