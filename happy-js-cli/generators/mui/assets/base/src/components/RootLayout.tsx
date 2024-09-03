import React, { PropsWithChildren } from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import RootContexts from './RootContexts';
import DrawerAppBar from './DrawerAppBar';

function RootLayout({ children }: PropsWithChildren) {
  return (
    <RootContexts>
      <DrawerAppBar>
        <CssBaseline />
        {children}
      </DrawerAppBar>
    </RootContexts>
  );
}

export default RootLayout;
