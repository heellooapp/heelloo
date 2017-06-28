import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import images from '../config/images';
import firebase from '../utils/firebase';
import { Card, CardSection, Input, Button, Spinner } from '../components/common';

class Login extends Component {

  state = {
    email: '',
    password: '',
    error: '',
    loading: false,
  }

  onLogin() {
    const { email, password } = this.state;

    this.setState({
      error: '',
      loading: true,
    })

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.setState({
          email: '',
          password: '',
          error: 'Success',
          loading: false
        });
      })
      .catch((err) => {
        this.setState({ error: 'Authentication Failed.', loading: false });
      });
  }

  renderButton() {
    if (this.state.loading) {
      return <Spinner size="small" />
    }

    return (
      <Button onPress={this.onLogin.bind(this)}>
        Log in
      </Button>
    );
  }

  render() {
    return (
      <View>
        <View  style={styles.logo}>
          <Image source={images.logo} />
        </View>
        <Card>
          <CardSection>
            <Input
              label="Email"
              placeholder="mail@mail.com"
              value={this.state.email}
              autoCapitalize={'none'}
              onChangeText={email => this.setState({ email })}
            />
          </CardSection>
          <CardSection>
            <Input
              label="Password"
              placeholder="password"
              value={this.state.password}
              onChangeText={password => this.setState({ password })}
              secureTextEntry
            />
          </CardSection>
          <Text style={styles.errorText}>{this.state.error}</Text>
          <CardSection>
            {this.renderButton()}
          </CardSection>
        </Card>
      </View>
    );
  }
}

const styles = {
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  errorText: {
    textAlign: 'center',
    color: 'red',
    fontSize: 22,
  },
  logo: {
    alignItems: 'center',
    justifyContent: 'center',
  }
};

export default Login;
