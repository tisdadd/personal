import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react-native';

import DefaultExpoView from './DefaultExpoView';

export default {
  title: 'Views/DefaultExpoView',
} as ComponentMeta<typeof DefaultExpoView>;

function TemplateGenerator() {
  return (
    <DefaultExpoView />
  );
}

const Template: ComponentStory<typeof DefaultExpoView> = TemplateGenerator;

export const DefaultProps = Template.bind({});
