import React from 'react';

import { StoryObj } from '@storybook/react';
import LogProvider from './LogProvider';
import LogContext from '../LogContext';
import propTypes from './LogProvider.propTypes';

function Wrapper(args: propTypes) {
  return (
    // disabled for storybook args binding pattern
    // eslint-disable-next-line react/jsx-props-no-spreading
    <LogProvider {...args}>
      <LogContext.Consumer>
        {({
          log,
          info,
          warn, error,
        }) => (
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
        )}
      </LogContext.Consumer>
    </LogProvider>
  );
}

export default {
  title: 'Contexts/LogContext/LogProvider',
  component: Wrapper,
};

export const Default: StoryObj<typeof LogProvider> = {};

export const StartOff: StoryObj<typeof LogProvider> = {
  args: {
    on: false,
  },
};
