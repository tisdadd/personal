import React from 'react';
import logo from './Logo.svg';
import styles from './Logo.module.css';
import Image from 'next/image';


function Logo() {
  return (
    <Image
      src={logo}
      alt="Vercel Logo"
      className={styles.vercelLogo}
      width={100}
      height={100}
      priority
    />
  );
}

export default Logo;
