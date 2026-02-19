import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import Countdown from './components/Countdown';
import Details from './components/Details';
import RsvpForm from './components/RsvpForm';
import Footer from './components/Footer';
import AdminLogin from './components/AdminLogin';
import Dashboard from './components/Dashboard';

type Page = 'home' | 'admin-login' | 'dashboard';

function App() {
  const [page, setPage] = useState<Page>('home');
  const [token, setToken] = useState<string | null>(null);

  // Handle hash-based routing
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash === '#/admin') {
        const savedToken = localStorage.getItem('admin_token');
        if (savedToken) {
          setToken(savedToken);
          setPage('dashboard');
        } else {
          setPage('admin-login');
        }
      } else {
        setPage('home');
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleLogin = (newToken: string) => {
    setToken(newToken);
    setPage('dashboard');
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('admin_token');
    setPage('admin-login');
  };

  const handleBackToSite = () => {
    window.location.hash = '';
    setPage('home');
  };

  if (page === 'admin-login') {
    return <AdminLogin onLogin={handleLogin} onBack={handleBackToSite} />;
  }

  if (page === 'dashboard' && token) {
    return <Dashboard token={token} onLogout={handleLogout} />;
  }

  return (
    <main className="w-full min-h-screen selection:bg-wedding-gold selection:text-white">
      <Hero />
      <Countdown />
      <Details />
      <RsvpForm />
      <Footer />
    </main>
  );
}

export default App;