import React, {Component} from 'react';
import {Text, View, Image, AsyncStorage, StatusBar} from 'react-native';
import {
  Card,
  CardSection,
  Input,
  Button,
  Spinner,
  Footer,
  BubbleScreen,
} from './components/common';
import images from './images';
import {firebase} from './config';
import {loginStyles} from './components/styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      error: '',
      loading: false
    };

    this.onLogin = this.onLogin.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  onLogin() {
    const {email, password} = this.state;
    if (this._isMounted) {
     this.setState({loading: true}) ;
    }

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => this.authSuccess(password))
      .catch(err => this.authFailed());
  }

  authSuccess(password) {
    if (this._isMounted) {
      this.setState({loading: false});
      AsyncStorage.setItem('USER', password);
    }
  }

  authFailed() {
    if (this._isMounted) {
      this.setState({
        loading: true,
        error: 'Authentication Failed',
      });
    }
  }

  renderButton() {
    if (this.state.loading) return <Spinner size="small" />;
    return <Button onPress={this.onLogin}>Login</Button>;
  }

  renderLogo() {
    return (
      <View style={loginStyles.logo}>
        <Image source={images.nmma} style={loginStyles.logoStyle} />
      </View>
    );
  }

  renderField({placeholder, name, state, password}) {
    return (
      <CardSection>
        <Input
          placeholder={placeholder}
          value={name}
          autoCapitalize={'none'}
          password={password}
          onChangeText={value => this.setState({[state]: value})}
        />
      </CardSection>
    );
  }

  render() {
    return (
      <KeyboardAwareScrollView
        behavior="padding"
        contentContainerStyle={loginStyles.container}>
        <BubbleScreen />
        {this.renderLogo()}
        <Card>
          {this.renderField({
            placeholder: 'E-mail Address',
            name: this.state.email,
            state: 'email',
            password: false,
          })}
          {this.renderField({
            placeholder: 'Password',
            name: this.state.password,
            state: 'password',
            password: true,
          })}
          <Text style={loginStyles.errorText}>{this.state.error}</Text>
          <View style={loginStyles.btn}>{this.renderButton()}</View>
        </Card>
        <Footer />
      </KeyboardAwareScrollView>
    );
  }
}

export default Login;
