import React, { PropsWithChildren } from 'react';

import { ThemeProvider } from '@mui/material';
import { LogProvider } from '../contexts/LogContext';

import theme from './theme';

function RootContexts({ children }: PropsWithChildren) {
  return (
    <ThemeProvider theme={theme}>
      <LogProvider>
        {children}
      </LogProvider>
    </ThemeProvider>
  );
}

export default RootContexts;
