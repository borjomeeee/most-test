import React from 'react';
import * as RN from 'react-native';

import { IMAGE_SIZE } from '../Const';

interface IListProps extends React.ComponentProps<typeof RN.FlatList> {}

const List: React.FC<IListProps> = ({ ...props }) => {
  return (
    <RN.FlatList
      {...props}
      numColumns={3}
      getItemLayout={(data, index) => ({
        length: IMAGE_SIZE,
        offset: IMAGE_SIZE * index,
        index,
      })}
      maxToRenderPerBatch={12}
      initialNumToRender={12}
    />
  );
};

const s = RN.StyleSheet.create({});

export default List;
