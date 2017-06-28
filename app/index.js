import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import images from './config/images';
import firebase from './utils/firebase';
import { Card, CardSection, Input, Button, Spinner } from './components/common';
import Login from './router/Login'

class TeamOn extends Component {

  state = {
    loggedIn: false
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    if (this.state.loggedIn) {
      // 
    }
    return (<Login />);
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderContent()}
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
  },
};

export default TeamOn;
