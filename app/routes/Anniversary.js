import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View, Dimensions
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import { Header } from '../components/common'

const windowHeight = Dimensions.get('window').height;

const Anniversary = () => {
  return (
    <View >
      <View style={styles.container}>
        <Text
          style={styles.welcome}
          onPress={() => Actions.gold()}
        >
          Black Screen
        </Text>
        <Icon style={styles.icon} name="ios-albums-outline" size={20} color='#fff'/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
    height: windowHeight
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
  },
});

export default Anniversary;
