import { ReactNode } from 'react';

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
  },
  {
    title: 'Secondary View',
    link: '/secondary',
  },
];

export default navItems;
