import React from 'react';
import * as RN from 'react-native';
import Card from '../Components/Card';
import List from '../Components/List';
import FavoritesContext from '../Context/Favorites';
import { IDog } from '../Utils';

const Favorites = () => {
  const { state } = React.useContext(FavoritesContext) as any;
  
  return (
    <List
      data={Object.values(state)}
      keyExtractor={(item) => (item as IDog).id}
      renderItem={({ item }) => <Card dog={item as IDog} />}
    />
  );
};

const s = RN.StyleSheet.create({});

export default Favorites;
