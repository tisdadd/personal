import React from 'react';
import logo from './Logo.svg';
import Image from 'next/image';


function Logo() {
  return (
    <Image
      src={logo}
      alt="Vercel Logo"
      className="w-24 h-24 pointer-events-none animate-spin motion-reduce:animate-none"
      priority
    />
  );
}

export default Logo;
