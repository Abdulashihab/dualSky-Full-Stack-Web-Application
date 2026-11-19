import { useState } from 'react';
import Navbar from './components/Navbar';
import SetTopBoxCarousel from './components/SetTopBoxCarousel';
import PackagesSection from './components/PackagesSection';
import SupportChatWidget from './components/SupportChatWidget';

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="min-h-screen bg-teal-50">
      <Navbar user={user} onLogout={() => setUser(null)} />
      <SetTopBoxCarousel />
      <PackagesSection />
      <SupportChatWidget subscriberId={user?.subscriber_id || null} />
    </div>
  );
}

export default App;
