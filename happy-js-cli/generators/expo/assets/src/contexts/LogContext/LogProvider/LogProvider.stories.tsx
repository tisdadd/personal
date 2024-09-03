import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react-native';
import { Button, View } from 'react-native';

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
          info,
          warn, error,
        }) => (
          <>
            <View>
              <Button
                title="Log Level"
                onPress={() => {
                  log('Log level clicked');
                }}
              />
            </View>
            <View>
              <Button
                title="Info Level"
                onPress={() => {
                  info('Info level clicked');
                }}
              />
            </View>
            <View>
              <Button
                title="Warn Level"
                onPress={() => {
                  warn('Warn level clicked');
                }}
              />
            </View>
            <View>
              <Button
                title="Error Level"
                onPress={() => {
                  error('Error level clicked');
                }}
              />
            </View>
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
