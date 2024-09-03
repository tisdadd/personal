import React from 'react';
import {
  View, Text, Button, Linking, Alert,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import styles from './[FTName]View.styles';
import Logo from './components/Logo';
import navigationName from './[FTName]View.navigationName';

import RootStackParamList from '../RootStackParamList.type';
import defaultExpoViewNavigationName from '../DefaultExpoView/DefaultExpoView.navigationName';

type [FTName]ViewProps = NativeStackScreenProps<RootStackParamList, navigationName>;

function [FTName]View({ navigation }: [FTName]ViewProps) {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.appHeader}>
        <Logo />
        <View>
          <Text>
            Edit src/views/[FTName]View/[FTName]View.tsx
            and save to reload.

          </Text>
        </View>
        <Button
          style={styles.appLink}
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
