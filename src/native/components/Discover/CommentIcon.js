import React from 'react';
import {
  View, Text, Icon,
} from 'native-base';

const CommentIcon = ({ count }) => {
  return (
    <View style={{ position: 'relative' }}>
      <Icon style={{ color: '#27EBFF' }} name="chatbubbles" />
      <Text style={{ position: 'absolute', fontSize: 12, top: 5, left: 10, color: 'white' }}>{count}</Text>
    </View>
  );
};

export default CommentIcon;
