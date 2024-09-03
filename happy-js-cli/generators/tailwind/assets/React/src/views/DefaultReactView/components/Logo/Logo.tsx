import React from 'react';
import logo from './Logo.svg';

function Logo() {
  return <img src={logo} className="w-24 h-24 pointer-events-none animate-spin motion-reduce:animate-none" alt="logo" />;
}

export default Logo;
