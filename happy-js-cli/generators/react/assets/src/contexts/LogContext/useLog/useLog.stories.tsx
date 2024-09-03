import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import useLog from './useLog';

function TemplateGenerator() {
  const {
    log,
    warn,
    info,
    error,
  } = useLog();
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
            info('Info level clicked');
          }}
        >
          Info Level
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
  title: 'Contexts/LogContext/useLog',
} as ComponentMeta<typeof TemplateGenerator>;

const Template: ComponentStory<typeof TemplateGenerator> = TemplateGenerator;

export const DefaultProps = Template.bind({});
