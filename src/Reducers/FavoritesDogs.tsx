import { IDog } from '../Utils';

export const ADD_DOG = '@FavoritesDogs/add';
export const REMOVE_DOG = '@FavoritesDogs/remove';
export const SET_DOGS = '@FavoritesDogs/set';

export const addDogToFavorites = (dog: IDog) => ({
  type: ADD_DOG,
  payload: dog,
});
export const removeDogFromFavorites = (id: string) => ({
  type: REMOVE_DOG,
  payload: id,
});
export const setDogsToFavorites = (dogs: State) => ({
  type: SET_DOGS,
  payload: dogs,
});

type State = { [key: string]: IDog };

type Action =
  | ReturnType<typeof addDogToFavorites>
  | ReturnType<typeof removeDogFromFavorites>;

export default function reducer(state: State = {}, action: Action) {
  switch (action.type) {
    case ADD_DOG:
      action.payload = action.payload as IDog;

      state[action.payload.id] = action.payload;
      return { ...state };
    case REMOVE_DOG:
      action.payload = action.payload as string;

      delete state[action.payload];
      return { ...state };
    case SET_DOGS:
      return (action.payload as any) as State;
    default:
      throw new Error();
  }
}
