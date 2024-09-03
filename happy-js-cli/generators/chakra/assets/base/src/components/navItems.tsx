import React, { ReactNode } from 'react';
import DefaultReactView from '../views/DefaultReactView';
import SecondaryView from '../views/SecondaryView';

type NavItemType = {
  title?: string,
  link: string,
  element?: ReactNode,
  children?: NavItemType[]
};

const navItems: NavItemType[] = [
  {
    title: 'Default React',
    link: '/',
    element: <DefaultReactView />,
  },
  {
    title: 'Secondary View',
    link: '/secondary',
    element: <SecondaryView />,
  },
];

export default navItems;
