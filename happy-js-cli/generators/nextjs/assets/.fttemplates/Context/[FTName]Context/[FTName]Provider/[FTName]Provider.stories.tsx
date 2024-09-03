import React from 'react';

import { StoryObj } from '@storybook/react';
import [FTName]Provider from './[FTName]Provider';
import [FTName]Context from '../[FTName]Context';
import propTypes from './[FTName]Provider.propTypes';

function Wrapper(args: propTypes) {
  return (
    // disabled for storybook args binding pattern
    // eslint-disable-next-line react/jsx-props-no-spreading
    <[FTName]Provider {...args}>
      <[FTName]Context.Consumer>
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
      </[FTName]Context.Consumer>
    </[FTName]Provider>
  );
}

export default {
  title: 'Contexts/[FTName]Context/[FTName]Provider',
  component: Wrapper,
};

export const Default: StoryObj<typeof [FTName]Provider> = {};

export const StartOff: StoryObj<typeof [FTName]Provider> = {
  args: {
    on: false,
  },
};
