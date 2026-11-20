export default function Footer() {
  return (
    <footer className="bg-[#003B33] text-white py-12 border-t border-teal-700/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
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
              Explore
            </h4>
            <ul className="space-y-2 text-teal-200 text-sm">
              <li className="hover:text-white cursor-pointer transition">
                New DTH Connection
              </li>
              <li className="hover:text-white cursor-pointer transition">
                Set-Top Boxes
              </li>
              <li className="hover:text-white cursor-pointer transition">
                DTH Packs & Channels
              </li>
              <li className="hover:text-white cursor-pointer transition">
                Recharge & Payments
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-teal-100 mb-4 uppercase tracking-wider text-xs">
              Support
            </h4>
            <ul className="space-y-2 text-teal-200 text-sm">
              <li className="hover:text-white cursor-pointer transition">
                AI Support Chat
              </li>
              <li className="hover:text-white cursor-pointer transition">
                Check My Balance
              </li>
              <li className="hover:text-white cursor-pointer transition">
                Raise a Work Order
              </li>
              <li className="hover:text-white cursor-pointer transition">
                Contact Us
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-teal-100 mb-4 uppercase tracking-wider text-xs">
              Legal
            </h4>
            <ul className="space-y-2 text-teal-200 text-sm">
              <li className="hover:text-white cursor-pointer transition">
                Terms of Service
              </li>
              <li className="hover:text-white cursor-pointer transition">
                Privacy Policy
              </li>
              <li className="hover:text-white cursor-pointer transition">
                Billing Rules
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
      </div>
    </footer>
  );
}