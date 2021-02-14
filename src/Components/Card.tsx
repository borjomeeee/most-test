import React from 'react';
import * as RN from 'react-native';
import { IMAGE_SIZE } from '../Const';

import { Image } from 'react-native-expo-image-cache';

import { IDog } from '../Utils';
import FavoritesContext from '../Context/Favorites';
import {
  addDogToFavorites,
  removeDogFromFavorites,
} from '../Reducers/FavoritesDogs';

interface ICardProps {
  dog: IDog;
}

const Card: React.FC<ICardProps> = ({ dog }) => {
  const { state, dispatch } = React.useContext(FavoritesContext) as any;
  const isFavorites = Object.keys(state).includes(dog.id);

  const BORDER_SIZE = React.useMemo(() => (isFavorites ? 5 : 0), [isFavorites]);
  const onLongPress = React.useCallback(() => {
    dispatch(
      !isFavorites ? addDogToFavorites(dog) : removeDogFromFavorites(dog.id)
    );
  }, [dispatch, dog, isFavorites]);

  const ImageStyles = React.useMemo(
    () => ({
      width: IMAGE_SIZE - BORDER_SIZE * 2,
      height: IMAGE_SIZE - BORDER_SIZE * 2,
    }),
    [isFavorites]
  );

  return (
    <RN.Pressable
      style={[s.favorite, isFavorites && s.border]}
      onLongPress={onLongPress}
    >
      <Image style={ImageStyles} uri={dog.imagePath} />
    </RN.Pressable>
  );
};

const s = RN.StyleSheet.create({
  favorite: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderColor: '#0000ff',
  },

  border: {
    borderWidth: 5,
  },
});

export default Card;
