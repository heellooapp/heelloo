import {
 View,
 StyleSheet
} from 'react-native';
import React, { Component } from 'react';
import { Actions, Router, Scene } from 'react-native-router-flux';

class NavBar extends Component {

  render () {
    return (
      <View style={styles.container}>
        <Text></Text>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent'
  }
});

export default NavBar;
