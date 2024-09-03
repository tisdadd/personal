import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import TableView from './TableView';

export default {
  title: 'Views/TableView',
} as ComponentMeta<typeof TableView>;

function TemplateGenerator() {
  return (
    <TableView />
  );
}

const Template: ComponentStory<typeof TableView> = TemplateGenerator;

export const DefaultProps = Template.bind({});
