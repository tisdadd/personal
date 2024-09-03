import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react-native';
import { Button, View } from 'react-native';

import attachesPropTypes from './with[FTName].attachesPropTypes';
import with[FTName] from './with[FTName]';

function TemplateComponent(
  {
    <FTName | lowercasefirstchar>: {
      log,
      warn,
      info,
      error,
    },
  }: attachesPropTypes,
) {
  return (
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
  );
}

const TemplateWrapped = with[FTName](TemplateComponent);

function TemplateGenerator() {
  return <TemplateWrapped />;
}

export default {
  title: 'Contexts/[FTName]Context/with[FTName]',
} as ComponentMeta<typeof TemplateGenerator>;

const Template: ComponentStory<typeof TemplateGenerator> = TemplateGenerator;

export const DefaultProps = Template.bind({});
