import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Hero from './components/Hero';
import Countdown from './components/Countdown';
import VideoInvitation from './components/VideoInvitation';
import Details from './components/Details';
import RsvpForm from './components/RsvpForm';
import Footer from './components/Footer';
import AdminLogin from './components/AdminLogin';
import Dashboard from './components/Dashboard';

function HomePage() {
  return (
    <main className="w-full min-h-screen selection:bg-wedding-gold selection:text-white">
      <Hero />
      <Countdown />
      <VideoInvitation />
      <Details />
      <RsvpForm />
      <Footer />
    </main>
  );
}

function AdminSection() {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('admin_token')
  );

  const handleLogin = (newToken: string) => {
    setToken(newToken);
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('admin_token');
  };

  if (token) {
    return <Dashboard token={token} onLogout={handleLogout} />;
  }

  return <AdminLogin onLogin={handleLogin} onBack={() => window.history.back()} />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminSection />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;