import React from 'react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';

import RootLayout from '../src/components/RootLayout';

export default function App({ Component, pageProps }: AppProps) {
  // have to have this because we are wrapping the component
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <RootLayout><Component {...pageProps} /></RootLayout>;
}
