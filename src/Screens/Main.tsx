import React from 'react';
import * as RN from 'react-native';

import { Image } from 'react-native-expo-image-cache';
import RNPickerSelect from 'react-native-picker-select';

import { getAllBreeds, getImages } from '../Api';
import { useDebounce } from '../Hooks/useDebounce';
import { Dog, IDog, IDogBreed } from '../Utils';

const IMAGE_SIZE = RN.Dimensions.get('window').width / 3;

const renderItem = ({ item }: { item: IDog }) => (
  <RN.View style={{ flex: 1 }}>
    <Image
      style={{ width: IMAGE_SIZE, height: IMAGE_SIZE }}
      uri={item.imagePath}
    />
  </RN.View>
);

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

    console.log(depouncedDogType)
    depouncedDogType && loadDogs();
  }, [depouncedDogType]);

  return (
    <RN.FlatList
      data={dogs.slice(0, numToShow)}
      numColumns={3}
      stickyHeaderIndices={[0]}
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
        </>
      }
      style={{ flex: 1 }}
      keyExtractor={(item) => item.id}
      getItemLayout={(data, index) => ({
        length: IMAGE_SIZE,
        offset: IMAGE_SIZE * index,
        index,
      })}
      maxToRenderPerBatch={12}
      initialNumToRender={12}
      onEndReachedThreshold={0.7}
      onEndReached={loadMore}
      renderItem={renderItem}
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
