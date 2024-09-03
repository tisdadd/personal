// note that expo StatusBar has its own style prop that is a string...
/* eslint-disable react/style-prop-object */
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  Text, View, Button,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import styles from './DefaultExpoView.styles';
import navigationName from './DefaultExpoView.navigationName';
import RootStackParamList from '../RootStackParamList.type';

import DefaultReactViewNavigationName from '../DefaultReactView/DefaultReactView.navigationName';

type DefaultExpoViewProps = NativeStackScreenProps<RootStackParamList, navigationName>;

export default function DefaultExpoView({ navigation }: DefaultExpoViewProps) {
  return (
    <View style={styles.container}>
      <Text>Open up src/views/DefaultExpoView.tsx to start working on your app!</Text>
      <Button
        title="Go To React Default"
        onPress={() => navigation.navigate(DefaultReactViewNavigationName)}
      />
      <StatusBar style="auto" />
    </View>
  );
}
