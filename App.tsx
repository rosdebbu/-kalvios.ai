
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustedBy from './components/TrustedBy';
import StudentTypes from './components/StudentTypes';
import ProblemSection from './components/ProblemSection';
import Features from './components/Features'; // This is Life Areas (Sec 5)
import HowItWorks from './components/HowItWorks';
import AgenticDifference from './components/AgenticDifference';
import ExamAndAcademic from './components/ExamAndAcademic';
import FinancialLife from './components/FinancialLife';
import SelfImprovement from './components/SelfImprovement';
import FocusAudio from './components/FocusAudio';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import ChatWorkspace from './components/ChatWorkspace';
import Onboarding from './components/Onboarding';

const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'onboarding' | 'dashboard' | 'chat'>('landing');

  // --- APPEARANCE STATE ---
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('kalvi-theme') as 'light' | 'dark') || 
             (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    }
    return 'light';
  });

  const [accentColor, setAccentColor] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('kalvi-accent') || '#2563EB';
    }
    return '#2563EB';
  });

  const [density, setDensity] = useState<'compact' | 'comfortable'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('kalvi-density') as 'compact' | 'comfortable') || 'comfortable';
    }
    return 'comfortable';
  });

  // --- EFFECTS ---

  // Apply Theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('kalvi-theme', theme);
  }, [theme]);

  // Apply Accent Color
  useEffect(() => {
    document.documentElement.style.setProperty('--color-primary', accentColor);
    document.documentElement.style.setProperty('--color-primary-hover', accentColor); // Simplified hover
    localStorage.setItem('kalvi-accent', accentColor);
  }, [accentColor]);

  // Apply Density
  useEffect(() => {
    if (density === 'compact') {
      document.body.classList.add('density-compact');
    } else {
      document.body.classList.remove('density-compact');
    }
    localStorage.setItem('kalvi-density', density);
  }, [density]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // --- HANDLERS ---

  const handleLogin = () => {
    const hasOnboarded = localStorage.getItem('kalvi_onboarded');
    if (hasOnboarded) {
      setView('dashboard');
    } else {
      setView('onboarding');
    }
    window.scrollTo(0, 0);
  };

  const handleOnboardingComplete = () => {
    localStorage.setItem('kalvi_onboarded', 'true');
    setView('dashboard');
    window.scrollTo(0, 0);
  };

  const handleLogout = () => {
    localStorage.removeItem('kalvi_onboarded');
    setView('landing');
    window.scrollTo(0, 0);
  };

  const handleOpenChat = () => {
    setView('chat');
  };

  const handleBackToDashboard = () => {
    setView('dashboard');
  };

  if (view === 'onboarding') {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  if (view === 'dashboard') {
    return (
      <Dashboard 
        onLogout={handleLogout} 
        onOpenChat={handleOpenChat} 
        // Appearance Props
        theme={theme}
        toggleTheme={toggleTheme}
        accentColor={accentColor}
        setAccentColor={setAccentColor}
        density={density}
        setDensity={setDensity}
      />
    );
  }

  if (view === 'chat') {
    return <ChatWorkspace onBack={handleBackToDashboard} />;
  }

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar onLogin={handleLogin} />
      <main className="flex-grow">
        <Hero onStart={handleLogin} /> 
        <TrustedBy />
        <StudentTypes />
        <ProblemSection />
        <Features />
        
        {/* Feature Deep Dives Ordered */}
        <FinancialLife />
        <FocusAudio />
        <ExamAndAcademic />
        
        <AgenticDifference />
        <HowItWorks />
        <SelfImprovement />
        <Testimonials />
      </main>
      <Footer onStart={handleLogin} />
    </div>
  );
};

export default App;
