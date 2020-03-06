import React, { Component } from 'react';
import { Text, View, Image, Dimensions, StatusBar } from 'react-native';
import { Card, CardSection, Input, Button, Spinner } from './common';
import { Login, ForgetPassword } from './screens/unauth';
import Root from './screens/root/Root';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';

console.disableYellowBox = true;

class TeamOn extends Component {


  constructor(props) {
    super(props);
    this.state = {
      name: null
    };
  }


  componentDidMount() {

    auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ name: 'root' });
      } else {
        this.setState({ name: 'login' });
      }
    });

    messaging().requestPermission().then(() => {
      messaging().getToken()
        .then(fcmToken => {
          if (fcmToken) {
            // user has a device token
          } else {
            // user doesn't have a device token yet
          }
        });
    });

  }
  change = (name) => {
    this.setState({ name });
  }
  renderContent() {
    switch (this.state.name) {
      case 'root':
        return <Root />;
      case 'login':
        return <Login change={this.change} />;
      case 'forgetpassword':
        return <ForgetPassword change={this.change} />;
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
