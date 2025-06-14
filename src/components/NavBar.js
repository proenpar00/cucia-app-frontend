import React from 'react';
import logo from './logo.png'; // Ajusta si el logo está en otro directorio

const Navbar = ({ showLogo }) => {
  return (
    <nav className="navbar">
        <div className="navbar-logo">
          <img src={logo} alt="Logo" className="logo-image" />
        </div>
        <div className="navbar-title">
            <span className="logo-title">CUCIA</span>
          </div>
      <div className="navbar-links">
        <a href="#diagnostico">Diagnóstico</a>
        <a href="#repositorio">Repositorio</a>
        <a href="#pricing">Pricing</a>
        <a href="#contact">Contact</a>
      </div>
    </nav>
  );
};

export default Navbar;
