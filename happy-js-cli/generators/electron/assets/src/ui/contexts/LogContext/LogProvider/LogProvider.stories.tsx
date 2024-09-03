import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import LogProvider from './LogProvider';
import LogContext from '../LogContext';
import propTypes from './LogProvider.propTypes';

export default {
  title: 'Contexts/LogContext/LogProvider',
} as ComponentMeta<typeof LogProvider>;

function TemplateGenerator(args: propTypes) {
  return (
    // disabled for storybook args binding pattern
    // eslint-disable-next-line react/jsx-props-no-spreading
    <LogProvider {...args}>
      <LogContext.Consumer>
        {({
          log,
          // info,
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
            {/* info level not available in storybook <div>
            <button
              type="button"
              onClick={() => {
                console.log('checking');
                info('Info level clicked');
              }}
            >
              Info Level
            </button>
          </div> */}
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

const Template: ComponentStory<typeof LogProvider> = TemplateGenerator;

export const DefaultProps = Template.bind({});

export const StartOff = Template.bind({});
StartOff.args = {
  on: false,
};
