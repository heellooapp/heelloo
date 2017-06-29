import React, { Component } from 'react';
import { Text, View, Image, Dimensions } from 'react-native';
import firebase from './utils/firebase';
import { Card, CardSection, Input, Button, Spinner } from './components/common';
import Login from './routes/Login';
import Root from './routes/index'

class TeamOn extends Component {

  state = {
    loggedIn: null
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
