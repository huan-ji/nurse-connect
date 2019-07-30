import React from 'react';
import {
  View, Text, Icon,
} from 'native-base';

const LikeIcon = ({
  active, count
}) => {
  return (
    <View style={{ position: 'relative' }}>
      <Icon style={{ color: '#27EBFF' }} name={active ? 'heart' : 'heart-empty'} />
      <Text style={{ position: 'absolute', fontSize: 12, top: 5, left: 5, color: active ? 'white' : '#27EBFF' }}>{count}</Text>
    </View>
  );
};

export default LikeIcon;
