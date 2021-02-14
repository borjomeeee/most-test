import 'react-native-gesture-handler';
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Main from './src/Screens/Main';
import Favorites from './src/Screens/Favorites';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Главная" component={Main} />
        <Stack.Screen name="Избранные" component={Favorites} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
