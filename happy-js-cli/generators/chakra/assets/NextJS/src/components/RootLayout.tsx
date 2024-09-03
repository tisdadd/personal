import React, { PropsWithChildren } from 'react';

import {
  Tabs, TabList, Tab, Link,
} from '@chakra-ui/react';

import NextLink from 'next/link';
import { useRouter } from 'next/router';
import RootContexts from './RootContexts';
import navItems from './navItems';

function RootLayout({ children }: PropsWithChildren) {
  const location = useRouter();
  return (
    <RootContexts>
      <Tabs as="nav" defaultIndex={navItems.findIndex((item) => item.link === location.pathname)}>
        <TabList>
          {navItems.map((item) => (
            <Link as={NextLink} key={item.link} href={item.link}>
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
