import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import [FTName]Provider from './[FTName]Provider';
import [FTName]Context from '../[FTName]Context';
import propTypes from './[FTName]Provider.propTypes';

export default {
  title: 'Contexts/[FTName]Context/[FTName]Provider',
} as ComponentMeta<typeof [FTName]Provider>;

function TemplateGenerator(args: propTypes) {
  return (
    // disabled for storybook args binding pattern
    // eslint-disable-next-line react/jsx-props-no-spreading
    <[FTName]Provider {...args}>
      <[FTName]Context.Consumer>
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
      </[FTName]Context.Consumer>
    </[FTName]Provider>
  );
}

const Template: ComponentStory<typeof [FTName]Provider> = TemplateGenerator;

export const DefaultProps = Template.bind({});

export const StartOff = Template.bind({});
StartOff.args = {
  on: false,
};
