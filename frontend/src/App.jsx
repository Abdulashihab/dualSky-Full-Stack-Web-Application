import { useState } from 'react';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import SetTopBoxCarousel from './components/SetTopBoxCarousel';
import PackagesSection from './components/PackagesSection';
import Footer from './components/Footer';
import SupportChatWidget from './components/SupportChatWidget';

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar user={user} onLogin={setUser} onLogout={() => setUser(null)} />
      <HeroBanner />
      <SetTopBoxCarousel />
      <PackagesSection />
      <Footer />
      <SupportChatWidget subscriberId={user?.subscriber_id || null} />
    </div>
  );
}

export default App;
