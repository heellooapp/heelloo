import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import images from './config/images';

export default class TeamOn extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image source={images.logo} style={styles.logoOne} />
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
};
