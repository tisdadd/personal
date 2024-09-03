import React, { PropsWithChildren } from 'react';

import RootContexts from './RootContexts';

function RootLayout({ children }: PropsWithChildren) {
  return <RootContexts>{children}</RootContexts>;
}

export default RootLayout;
