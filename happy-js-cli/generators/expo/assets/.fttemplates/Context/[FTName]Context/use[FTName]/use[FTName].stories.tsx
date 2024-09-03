import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react-native';
import { View, Button } from 'react-native';

import use[FTName] from './use[FTName]';

function TemplateGenerator() {
  const {
    log,
    warn,
    info,
    error,
  } = use[FTName]();
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

export default {
  title: 'Contexts/[FTName]Context/use[FTName]',
} as ComponentMeta<typeof TemplateGenerator>;

const Template: ComponentStory<typeof TemplateGenerator> = TemplateGenerator;

export const DefaultProps = Template.bind({});
