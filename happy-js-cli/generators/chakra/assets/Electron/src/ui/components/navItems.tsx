import React, { ReactNode } from 'react';
import DefaultReactView from '../views/DefaultReactView';
import SecondaryView from '../views/SecondaryView';
import TableView from '../views/TableView';

type NavItemType = {
  title?: string,
  link: string,
  element?: ReactNode,
  children?: NavItemType[]
};

const navItems: NavItemType[] = [
  {
    title: 'Table View',
    link: '/',
    element: <TableView />
  },
  {
    title: 'Default React',
    link: '/default-react',
    element: <DefaultReactView />,
  },
  {
    title: 'Secondary View',
    link: '/secondary',
    element: <SecondaryView />,
  },
];

export default navItems;
