import React, { PropsWithChildren } from 'react';

import { LogProvider } from '../contexts/LogContext';

function RootContexts({ children }: PropsWithChildren) {
  return (
    <LogProvider>
      {children}
    </LogProvider>
  );
}

export default RootContexts;
