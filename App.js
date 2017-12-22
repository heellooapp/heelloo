import React, { Component } from 'react'; 
import { Text, View, Image, Dimensions, StatusBar } from 'react-native';
import {firebase} from './app/config';
import { Card, CardSection, Input, Button, Spinner } from './app/components/common';
import Login from './app/Login';
import Root from './app/index';

class TeamOn extends Component {

  state = {
    loggedIn: null
  };

  componentWillMount() {
    // firebase.auth().signOut();
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({loggedIn: true});
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  componentDidMount() {
    console.disableYellowBox= true;
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
      <View style={{flex: 1, justifyContent: 'center'}}>
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