import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import attachesPropTypes from './withLog.attachesPropTypes';
import withLog from './withLog';

function TemplateComponent(
  {
    log: {
      log,
      warn,
      error,
    },
  }: attachesPropTypes,
) {
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

const TemplateWrapped = withLog(TemplateComponent);

function TemplateGenerator() {
  return <TemplateWrapped />;
}

export default {
  title: 'Contexts/LogContext/withLog',
} as ComponentMeta<typeof TemplateGenerator>;

const Template: ComponentStory<typeof TemplateGenerator> = TemplateGenerator;

export const DefaultProps = Template.bind({});
