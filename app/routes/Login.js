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
    color: 'red',
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
