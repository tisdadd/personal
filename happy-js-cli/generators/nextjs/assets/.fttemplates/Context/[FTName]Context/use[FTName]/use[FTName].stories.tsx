import React from 'react';
import { StoryObj } from '@storybook/react';

import use[FTName] from './use[FTName]';

function Wrapper() {
  const {
    log,
    info,
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
  title: 'Contexts/[FTName]Context/use[FTName]',
  component: Wrapper,
};

export const Default: StoryObj<typeof use[FTName]> = {};
