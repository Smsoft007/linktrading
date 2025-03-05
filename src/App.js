import React from 'react';
import './styles.css';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import BusinessModel from './components/BusinessModel';
import Investment from './components/Investment';
import RiskManagement from './components/RiskManagement';
import Roadmap from './components/Roadmap';
import ProfitSimulation from './components/ProfitSimulation';
import Seminar from './components/Seminar';
import Conclusion from './components/Conclusion';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <About />
      <BusinessModel />
      <Investment />
      <RiskManagement />
      <Roadmap />
      <ProfitSimulation />
      <Seminar />
      <Conclusion />
      <Footer />
    </div>
  );
}

export default App; 