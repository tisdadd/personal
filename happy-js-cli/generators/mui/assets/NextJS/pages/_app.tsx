import React from 'react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import RootLayout from '../components/RootLayout';

export default function App({ Component, pageProps }: AppProps) {
  // have to have this because we are wrapping the component
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <RootLayout><Component {...pageProps} /></RootLayout>;
}
