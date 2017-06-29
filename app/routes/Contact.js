import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View, Dimensions
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Header } from '../components/common'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Contact = () => {
  return (
    <View >
      <Header />
      <View style={styles.container}>
        <Text
          style={styles.welcome}
          onPress={() => Actions.gold()}
        >
          Black Screen
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'green',
    width: windowWidth,
    height: windowHeight,
    justifyContent: 'center',
    alignItems: 'center'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
  },
});

export default Contact;
