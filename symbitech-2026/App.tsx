import React from 'react';
import Background from './components/Background';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Highlights from './components/Highlights';
import Schedule from './components/Schedule';
import RegistrationForm from './components/RegistrationForm';
import Contact from './components/Contact';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="relative min-h-screen text-white font-inter selection:bg-neon-blue selection:text-black flex flex-col">
      <Background />
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        <Highlights />
        <Schedule />
        <RegistrationForm />
        <Contact />
      </main>
      
      <Footer />
    </div>
  );
};

export default App;