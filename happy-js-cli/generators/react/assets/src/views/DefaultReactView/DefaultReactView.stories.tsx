import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import DefaultReactView from './DefaultReactView';

export default {
  title: 'Views/DefaultReactView',
} as ComponentMeta<typeof DefaultReactView>;

function TemplateGenerator() {
  return (
    <DefaultReactView />
  );
}

const Template: ComponentStory<typeof DefaultReactView> = TemplateGenerator;

export const DefaultProps = Template.bind({});