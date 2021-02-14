import { useNavigation } from '@react-navigation/native';
import React from 'react';
import * as RN from 'react-native';

import { Image } from 'react-native-expo-image-cache';
import RNPickerSelect from 'react-native-picker-select';

import { getAllBreeds, getImages } from '../Api';
import Button from '../Components/Button';
import Card from '../Components/Card';
import List from '../Components/List';
import { useDebounce } from '../Hooks/useDebounce';
import { Dog, IDog, IDogBreed } from '../Utils';

const Main = () => {
  const [numToShow, setNumToShow] = React.useState(12);
  const [dogTypes, setDogTypes] = React.useState<
    { label: string; value: IDogBreed }[]
  >([]);
  const [selectedDogType, setSelectedDogType] = React.useState<
    undefined | IDogBreed
  >(undefined);
  const depouncedDogType = useDebounce(selectedDogType, 500);

  const [dogs, setDogs] = React.useState<IDog[]>([]);
  const navigation = useNavigation();

  React.useEffect(() => {
    const loadDogTypes = async () => {
      const types = await getAllBreeds();
      setDogTypes(types.map((item) => ({ label: item.name, value: item })));
    };
    loadDogTypes();
  }, []);

  const loadMore = () => {
    setNumToShow((num) => num + 12);
  };

  const handleSelectBreed = (type: IDogBreed) => {
    setNumToShow(12);
    setSelectedDogType(type);
  };

  React.useEffect(() => {
    const loadDogs = async () => {
      const dogs: string[] = await getImages(
        (depouncedDogType as IDogBreed).type
      );

      setDogs(
        dogs
          .filter((item) => item.includes(depouncedDogType?.subType || ''))
          .map((item) => ({ id: Dog.getIdFromUrl(item), imagePath: item }))
      );
    };

    depouncedDogType && loadDogs();
  }, [depouncedDogType]);

  const handlePressToFavorites = React.useCallback(() => {
    navigation.navigate('Избранное');
  }, [navigation]);

  return (
    <List
      data={dogs.slice(0, numToShow)}
      ListHeaderComponent={
        <>
          <RNPickerSelect
            items={dogTypes}
            onValueChange={handleSelectBreed}
            style={{
              inputIOSContainer: s.picker,
              inputAndroidContainer: s.picker,
            }}
            useNativeAndroidPickerStyle={false}
          />
          <Button text="В избранное" onClick={handlePressToFavorites} />
        </>
      }
      stickyHeaderIndices={[0]}
      keyExtractor={(item) => (item as IDog).id}
      onEndReachedThreshold={0.7}
      onEndReached={loadMore}
      renderItem={({ item }) => <Card dog={item as IDog} />}
    />
  );
};

const s = RN.StyleSheet.create({
  picker: {
    padding: 10,

    backgroundColor: '#fff',
  },
});

export default Main;
