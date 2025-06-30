
import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Certifications from '../components/Certifications';
import Projects from '../components/Projects';
import TechStack from '../components/TechStack';
import Experience from '../components/Experience';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Certifications />
      <Projects />
      <TechStack />
      <Experience />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
