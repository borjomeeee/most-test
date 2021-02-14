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

  const BORDER_SIZE = isFavorites ? 5 : 0;

  return (
    <RN.Pressable
      style={
        isFavorites && {
          borderWidth: BORDER_SIZE,
          width: IMAGE_SIZE,
          height: IMAGE_SIZE,
          borderColor: '#0000ff',
        }
      }
      onLongPress={() =>
        dispatch(
          !isFavorites ? addDogToFavorites(dog) : removeDogFromFavorites(dog.id)
        )
      }
    >
      <Image
        style={{
          width: IMAGE_SIZE - BORDER_SIZE * 2,
          height: IMAGE_SIZE - BORDER_SIZE * 2,
        }}
        uri={dog.imagePath}
      />
    </RN.Pressable>
  );
};

export default Card;
