import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import SetTopBoxCarousel from './components/SetTopBoxCarousel';
import PackagesSection from './components/PackagesSection';
import Footer from './components/Footer';
import SupportChatWidget from './components/SupportChatWidget';
import CustomerDashboard from './components/CustomerDashboard';

function App() {
  const [user, setUser] = useState(null);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [activeView, setActiveView] = useState('home');

  useEffect(() => {
    const storedUser = localStorage.getItem('dualsky_user');
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        // Defensive: if parsed data is an array, take only the first element
        // This prevents crashes when CustomerDashboard expects user.subscriber_id but gets an array
        setUser(Array.isArray(parsed) ? parsed[0] : parsed);
      } catch (_err) {
        // Invalid JSON or corrupted data - clear it
        localStorage.removeItem('dualsky_user');
      }
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('dualsky_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('dualsky_user');
    }
  }, [user]);

  useEffect(() => {
    const handleUserUpdated = (e) => {
      setUser(e.detail);
    };
    window.addEventListener('dualsky:user-updated', handleUserUpdated);
    return () => window.removeEventListener('dualsky:user-updated', handleUserUpdated);
  }, []);

  const handleLogin = (data) => {
    // Normalize: if data is an array, store only the first subscriber object
    const subscriber = Array.isArray(data) ? data[0] : data;
    setUser(subscriber);
    // Also persist normalized subscriber (never an array) to localStorage
    if (subscriber) {
      try {
        localStorage.setItem('dualsky_user', JSON.stringify(subscriber));
      } catch (_err) {
        localStorage.removeItem('dualsky_user');
      }
    }
    setActiveView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setActiveView('home');
  };

  const onMyAccount = () => {
    setActiveView('dashboard');
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar
        user={user}
        onLogin={handleLogin}
        onLogout={handleLogout}
        onOpenSupport={() => setIsSupportOpen(true)}
        activeView={activeView}
        onMyAccount={onMyAccount}
      />
      {activeView === 'dashboard' ? (
        <CustomerDashboard
          user={user}
          onLogout={handleLogout}
          onBackToHome={() => setActiveView('home')}
        />
      ) : (
        <>
          <HeroBanner />
          <SetTopBoxCarousel />
          <PackagesSection />
          <Footer onOpenSupport={() => setIsSupportOpen(true)} />
        </>
      )}
      <SupportChatWidget subscriberId={user?.subscriber_id || null} isOpen={isSupportOpen} onToggle={() => setIsSupportOpen(v => !v)} />
    </div>
  );
}

export default App;
