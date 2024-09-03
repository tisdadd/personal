import React from 'react';
import LogoElement from './Logo.svg';

function Logo() {
  return <LogoElement className="w-24 h-24 pointer-events-none animate-spin motion-reduce:animate-none" />;
}

export default Logo;
