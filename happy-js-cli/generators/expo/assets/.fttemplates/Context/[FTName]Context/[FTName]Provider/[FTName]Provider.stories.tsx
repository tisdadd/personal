import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react-native';
import { Button, View } from 'react-native';

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
          info,
          warn, error,
        }) => (
          <>
            <View>
              <Button
                title="[FTName] Level"
                onPress={() => {
                  log('[FTName] level clicked');
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
