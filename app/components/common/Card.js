import React from 'react';
import { View } from 'react-native';

const Card = (props) => {
  return (
    <View style={styles.containerStyle}>
      {props.children}
    </View>
  );
};

const styles = {
  containerStyle: {
    marginLeft: 50,
    marginRight: 50,
    marginBottom: 25
  }
};

export { Card };
