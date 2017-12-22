import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';

const Spinner = ({ size }) => {
  return (
    <View style={styles.spinnerStyle}>
      <ActivityIndicator size={size || 'large'} />
      <Text style={styles.spinnerText}>Please Wait...</Text>
    </View>
  );
};

const styles = {
  spinnerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  spinnerText: {
    textAlign: 'center',
    color: 'rgb(170, 170, 170)',
    marginTop: 10,
    fontSize: 11
  }
};

export { Spinner };
