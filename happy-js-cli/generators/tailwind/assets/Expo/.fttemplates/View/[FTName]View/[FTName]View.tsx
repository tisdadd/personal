import React from 'react';
import {
  View, Text, Button, Linking, Alert,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import Logo from './components/Logo';
import navigationName from './[FTName]View.navigationName';

import RootStackParamList from '../RootStackParamList.type';
import defaultExpoViewNavigationName from '../DefaultExpoView/DefaultExpoView.navigationName';

type [FTName]ViewProps = NativeStackScreenProps<RootStackParamList, navigationName>;

function [FTName]View({ navigation }: [FTName]ViewProps) {
  return (
    <View className="flex-1">
      <View className="min-h-screen flex flex-col items-center justify-center bg-gray-800">
        <Logo />
        <View>
          <Text className="text-white text-lg">
            Edit src/views/DefaultReactView/DefaultReactView.tsx
            and save to reload.

          </Text>
        </View>
        <Button
          className="text-blue-400"
          onPress={async () => {
            const url = 'https://reactjs.org';
            const supported = await Linking.canOpenURL(url);

            if (supported) {
              await Linking.openURL(url);
            } else {
              Alert.alert(`Don't know how to open this URL: ${url}`);
            }
          }}
          title="Learn React"
        />
        <Button
          title="Go To Expo Default"
          onPress={() => navigation.navigate(defaultExpoViewNavigationName)}
        />
      </View>
    </View>
  );
}

export default [FTName]View;
