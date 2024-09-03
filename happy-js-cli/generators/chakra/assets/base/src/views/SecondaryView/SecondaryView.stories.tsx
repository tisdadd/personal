import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SecondaryView from './SecondaryView';

export default {
  title: 'Views/SecondaryView',
} as ComponentMeta<typeof SecondaryView>;

function TemplateGenerator() {
  return (
    <SecondaryView />
  );
}

const Template: ComponentStory<typeof SecondaryView> = TemplateGenerator;

export const DefaultProps = Template.bind({});
