import React from 'react';
import "./doctools";
import { getStorybookUI } from '@storybook/react-native';
import RootContexts from '../src/components/RootContexts';

import './storybook.requires';

const StorybookUIRoot = getStorybookUI({});

export default ()=>{
  return <RootContexts><StorybookUIRoot /></RootContexts>
}
