import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import RootLayout from './components/RootLayout';
import DefaultReactView from './views/DefaultReactView';
import DefaultExpoView from './views/DefaultExpoView';

import DefaultReactViewNavigationName from './views/DefaultReactView/DefaultReactView.navigationName';
import DefaultExpoViewNavigationName from './views/DefaultExpoView/DefaultExpoView.navigationName';

import RootStackParamList from './views/RootStackParamList.type';

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <RootLayout>
      <Stack.Navigator>
        <Stack.Screen name={DefaultExpoViewNavigationName} component={DefaultExpoView} />
        <Stack.Screen name={DefaultReactViewNavigationName} component={DefaultReactView} />
      </Stack.Navigator>
    </RootLayout>
  );
}

export default App;
