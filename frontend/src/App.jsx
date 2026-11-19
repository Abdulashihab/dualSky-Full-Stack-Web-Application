import Navbar from './components/Navbar';
import SetTopBoxCarousel from './components/SetTopBoxCarousel';
import PackagesSection from './components/PackagesSection';

function App() {
  return (
    <div className="min-h-screen bg-teal-50">
      <Navbar />
      <SetTopBoxCarousel />
      <PackagesSection />
    </div>
  );
}

export default App;
