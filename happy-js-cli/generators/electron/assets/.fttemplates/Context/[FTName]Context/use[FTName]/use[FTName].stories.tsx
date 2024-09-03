import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import use[FTName] from './use[FTName]';

function TemplateGenerator() {
  const {
    log,
    warn,
    error,
  } = use[FTName]();
  return (

    <>
      <div>
        <button
          type="button"
          onClick={() => {
           log('Log level clicked');
          }}
        >
          Log Level
        </button>
      </div>
      <div>
        <button
          type="button"
          onClick={() => {
            warn('Warn level clicked');
          }}
        >
          Warn Level
        </button>
      </div>
      <div>
        <button
          type="button"
          onClick={() => {
            error('Error level clicked');
          }}
        >
          Error Level
        </button>
      </div>
    </>
  );
}

export default {
  title: 'Contexts/[FTName]Context/use[FTName]',
} as ComponentMeta<typeof TemplateGenerator>;

const Template: ComponentStory<typeof TemplateGenerator> = TemplateGenerator;

export const DefaultProps = Template.bind({});
