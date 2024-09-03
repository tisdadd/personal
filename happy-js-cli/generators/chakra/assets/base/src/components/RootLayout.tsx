import React, { PropsWithChildren } from 'react';

import {
  Tabs, TabList, Tab, Link,
} from '@chakra-ui/react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import RootContexts from './RootContexts';
import navItems from './navItems';

function RootLayout({ children }: PropsWithChildren) {
  const location = useLocation();
  return (
    <RootContexts>
      <Tabs as="nav" defaultIndex={navItems.findIndex((item) => item.link === location.pathname)}>
        <TabList>
          {navItems.map((item) => (
            <Link key={item.link} as={RouterLink} to={item.link}>
              <Tab>
                {item.title}
              </Tab>
            </Link>
          ))}
        </TabList>
      </Tabs>
      {children}
    </RootContexts>
  );
}

export default RootLayout;
