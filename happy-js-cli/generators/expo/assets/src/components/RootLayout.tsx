import React, { PropsWithChildren } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootContexts from './RootContexts';

function RootLayout({ children }: PropsWithChildren) {
  return <NavigationContainer><RootContexts>{children}</RootContexts></NavigationContainer>;
}

export default RootLayout;
