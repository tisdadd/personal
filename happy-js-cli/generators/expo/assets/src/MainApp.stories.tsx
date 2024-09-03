import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react-native';

import MainApp from './MainApp';

export default {
  title: 'MainApp',
} as ComponentMeta<typeof MainApp>;

function TemplateGenerator() {
  return (
    <MainApp />
  );
}

const Template: ComponentStory<typeof MainApp> = TemplateGenerator;

export const DefaultProps = Template.bind({});
