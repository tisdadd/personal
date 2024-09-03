import React from 'react';
import { StoryObj } from '@storybook/react';

import attachesPropTypes from './withLog.attachesPropTypes';
import withLog from './withLog';

function Base(
  {
    log: {
      log,
      info,
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
  title: 'Contexts/LogContext/withLog',
  component: withLog(Base),
};

export const Default: StoryObj<typeof withLog> = {};
