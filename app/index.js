import React, { Component } from 'react';
import { Text, View, Image, Dimensions, StatusBar } from 'react-native';
import firebase from './utils/firebase';
import { Card, CardSection, Input, Button, Spinner } from './components/common';
import Login from './routes/Login';
import Root from './routes/index'

class TeamOn extends Component {

  state = {
    loggedIn: null,
    users: null
  }

  componentWillMount() {
    console.log('Index componentDidMount');
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // user.updateProfile({
        //   displayName: "Ujin",
        // });

        // test = firebase.database()
        //   .ref('users').child('AfUSjeq9TpRgcRHgHjP6AVdPQ7H2')
        //   .set({
        //     "anniversary" : {
        //       "birthday" : "1995-04-04",
        //       "firstDay" : "2016-08-06"
        //     },
        //     "email" : "test@test.com",
        //     "firstName" : "Ujin",
        //     "nickname" : "Juni",
        //     "position" : "React Native Developer",
        //     "profile_img" : "https://firebasestorage.googleapis.com/v0/b/teamon-68ca0.appspot.com/o/ujin.jpg?alt=media&token=c82ee4b3-7bf8-4c79-8bca-34aebe1c546f",
        //     "uid" : "AfUSjeq9TpRgcRHgHjP6AVdPQ7H2"
        //   });

        //   console.log(test);

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
          barStyle="dark-content"
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
