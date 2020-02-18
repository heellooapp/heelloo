import React, { Component } from 'react';
import { Text, View, Image, Dimensions, StatusBar } from 'react-native';
import { Card, CardSection, Input, Button, Spinner } from './app/components/common';
import Login from './app/Login';
import Root from './app/index';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';

class TeamOn extends Component {


  constructor(props) {
    super(props);
    this.state = {
      loggedIn: null
    };
  }

  componentDidMount() {

    auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });

    messaging().requestPermission().then(() => {
      messaging().getToken()
        .then(fcmToken => {
          if (fcmToken) {
            console.log(fcmToken);
            // user has a device token
          } else {
            // user doesn't have a device token yet
          }
        });
    });

  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return <Root />;
      case false:
        return <Login />;
      default:
        return <Spinner />;
    }
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <StatusBar
          backgroundColor="#2676EC"
          barStyle="light-content"
        />
        {this.renderContent()}
      </View>
    );
  }
}

export default TeamOn;
