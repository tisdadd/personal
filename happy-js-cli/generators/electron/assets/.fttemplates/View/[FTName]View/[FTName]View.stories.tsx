import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import [FTName]View from './[FTName]View';

export default {
  title: 'Views/[FTName]View',
} as ComponentMeta<typeof [FTName]View>;

function TemplateGenerator() {
  return (
    <[FTName]View />
  );
}

const Template: ComponentStory<typeof [FTName]View> = TemplateGenerator;

export const DefaultProps = Template.bind({});
