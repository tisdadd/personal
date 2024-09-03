import Image from 'next/image';
import React from 'react';
import logo from './Logo.svg';

function Logo() {
  return (
    <Image
      src={logo}
      alt="Vercel Logo"
      className="invert-0 h-[24px] w-[100px] min-w-fit"
      priority
    />
  );
}

export default Logo;
