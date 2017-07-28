import React, { Component } from 'react';
import { Text, View, Image, AsyncStorage } from 'react-native';
import images from '../config/images';
import firebase from '../utils/firebase';
import { Card, CardSection, Input, Button, Spinner } from '../components/common';

class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      error: '',
      loading: false,
    }

    this.onLogin = this.onLogin.bind(this);
  }

  onLogin() {
    const { email, password } = this.state;

    this.setState({
      loading: true,
    })

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.authSuccess(password);
      })
      .catch((err) => {
        this.authFailed();
      });
  }

  authSuccess(password) {
    AsyncStorage.setItem('USER', password);
    this.setState({
      error: 'Success',
      loading: false
    });
  }

  authFailed() {
    this.setState({ error: 'Authentication Failed.', loading: false });
  }

  renderButton() {
    if (this.state.loading) {
      return <Spinner size="small" />
    }

    return (
      <Button onPress={this.onLogin}>
        Log in
      </Button>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View  style={styles.logo}>
          <Image source={images.logo} />
        </View>
        <Card>
          <CardSection>
            <Input
              icon="ios-person"
              placeholder="E-mail address"
              value={this.state.email}
              autoCapitalize={'none'}
              onChangeText={email => this.setState({ email })}
            />
          </CardSection>
          <CardSection>
            <Input
              icon="md-lock"
              placeholder="Password"
              value={this.state.password}
              onChangeText={password => this.setState({ password })}
              secureTextEntry
            />
          </CardSection>
          <Text style={styles.errorText}>{this.state.error}</Text>
          <View style={styles.btn}>
            {this.renderButton()}
          </View>
        </Card>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  errorText: {
    textAlign: 'center',
    color: '#F44336',
    fontSize: 16,
    marginBottom: 6
  },
  logo: {
    alignItems: 'center',
    marginTop: 70,
    marginBottom: 110
  },
  btn: {
    flexDirection: 'row',
  }
};

export default Login;
