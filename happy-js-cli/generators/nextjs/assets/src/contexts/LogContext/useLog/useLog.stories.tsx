import React from 'react';
import { StoryObj } from '@storybook/react';

import useLog from './useLog';

function Wrapper() {
  const {
    log,
    info,
    warn,
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
  title: 'Contexts/LogContext/useLog',
  component: Wrapper,
};

export const Default: StoryObj<typeof useLog> = {};
