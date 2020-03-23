import React, { useContext } from 'react';
import { TouchableOpacity } from 'react-native';
import { NavigationContext } from '@react-navigation/core';

import Icon from 'react-native-vector-icons/Ionicons';

const BackBtn = () => {
  const navigation = useContext(NavigationContext);

  return (
    <TouchableOpacity
      style={{ padding: 4 }}
      onPress={navigation.goBack}>
      <Icon
        name="md-arrow-back"
        size={25}
        color="#FFF"
        style={{ marginLeft: 15, alignSelf: 'center' }}
      />
    </TouchableOpacity>
  );
};

export { BackBtn };