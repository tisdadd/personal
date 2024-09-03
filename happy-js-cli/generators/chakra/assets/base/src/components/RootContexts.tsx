import React, { PropsWithChildren } from 'react';

import { ChakraProvider } from '@chakra-ui/react';
import { LogProvider } from '../contexts/LogContext';
import theme from './theme';

function RootContexts({ children }: PropsWithChildren) {
  return (
    <ChakraProvider theme={theme}>
      <LogProvider>
        {children}
      </LogProvider>
    </ChakraProvider>
  );
}

export default RootContexts;
