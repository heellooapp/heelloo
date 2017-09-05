import React, { Component } from 'react';
import { Text, View, Image, Dimensions, StatusBar } from 'react-native';
import firebase from './utils/firebase';
import { Card, CardSection, Input, Button, Spinner } from './components/common';
import Login from './routes/Login';
import Root from './routes/index'

class TeamOn extends Component {

  state = {
    loggedIn: null,
    users: null,
  }

  componentWillMount() {
    // firebase.auth().signOut();
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  componentDidMount() {
    console.log('Index componentDidMount');
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
      <View style={styles.container}>
        <StatusBar
          backgroundColor="#2266ad"
          barStyle="light-content"
        />
        {this.renderContent()}
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center'
  }
};

export default TeamOn;
