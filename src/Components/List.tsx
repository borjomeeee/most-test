import React from 'react';
import * as RN from 'react-native';

import { IMAGE_SIZE } from '../Const';

const getItemLayout = (_: any, index: number) => ({
  length: IMAGE_SIZE,
  offset: IMAGE_SIZE * index,
  index,
});
const keyExtractor = (item: any) => item.id;

interface IListProps extends React.ComponentProps<typeof RN.FlatList> {}
const List: React.FC<IListProps> = ({ ...props }) => {
  return (
    <RN.FlatList
      {...props}
      numColumns={3}
      getItemLayout={getItemLayout}
      keyExtractor={keyExtractor}
      maxToRenderPerBatch={12}
      initialNumToRender={12}
    />
  );
};

export default List;
