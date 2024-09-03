import React from 'react';
import { Image } from '@chakra-ui/react';
import logo from './Logo.svg';
import './Logo.css';

function Logo() {
  return <Image src={logo} className="App-logo" alt="logo" />;
}

export default Logo;
