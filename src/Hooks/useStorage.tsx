import React from 'react';
import FavoritesContext from '../Context/Favorites';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_PATH } from '../Const';
import { setDogsToFavorites } from '../Reducers/FavoritesDogs';

export function useStorage() {
  const [isFirstLoad, setIsFirstLoad] = React.useState(true);
  const { state, dispatch } = React.useContext(FavoritesContext) as any;
  React.useEffect(() => {
    const loadFromStorage = async () => {
      const data = JSON.parse(
        (await AsyncStorage.getItem(STORAGE_PATH)) || '{}'
      );

      dispatch(setDogsToFavorites(data));
      setIsFirstLoad(false);
    };

    loadFromStorage();
  }, []);

  React.useEffect(() => {
    const saveToStorage = async () => {
      await AsyncStorage.setItem(STORAGE_PATH, JSON.stringify(state));
    };

    !isFirstLoad && saveToStorage();
  }, [state]);
}
