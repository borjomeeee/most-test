import 'react-native-gesture-handler';
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Main from './src/Screens/Main';
import Favorites from './src/Screens/Favorites';

import reducer from './src/Reducers/FavoritesDogs';
import FavoritesContext from './src/Context/Favorites';
import { useStorage } from './src/Hooks/useStorage';

const Stack = createStackNavigator();

const Content = () => {
  useStorage();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Главная">
        <Stack.Screen name="Главная" component={Main} />
        <Stack.Screen name="Избранное" component={Favorites} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  const [state, dispatch] = React.useReducer(reducer, {});

  return (
    <FavoritesContext.Provider value={{ state, dispatch }}>
      <Content />
    </FavoritesContext.Provider>
  );
}
