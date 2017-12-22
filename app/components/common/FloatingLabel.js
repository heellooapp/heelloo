import React, {Component} from 'react';
import {View, Text, TextInput, Animated} from 'react-native';

class FloatingLabel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFocused: false,
    };
  }

  handleFocus = () => this.setState({isFocused: true});
  handleBlur = () => this.setState({isFocused: false});

  componentWillMount() {
    this._animatedIsFocused = new Animated.Value(
      this.props.value === '' ? 0 : 1,
    );
  }

  componentDidUpdate() {
    Animated.timing(this._animatedIsFocused, {
      toValue: this.state.isFocused || this.props.value !== '' ? 1 : 0,
      duration: 200,
    }).start();
  }

  render() {
    const {isFocused} = this.state;
    const labelStyle = {
      position: 'absolute',
      width: '100%',
      textAlign: 'center',
      backgroundColor: 'transparent',
      fontFamily: 'Montserrat-Light',
      top: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [18, 0],
      }),
      color: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: ['#555', '#000'],
      }),
      marginBottom: !isFocused ? 0 : 15,
    };
    return (
      <View style={this.props.containerStyle}>
        <Animated.Text style={labelStyle}>{this.props.label}</Animated.Text>
        <TextInput
          value={this.props.value}
          autoCapitalize={this.props.autoCapitalize}
          autoCorrect={this.props.autoCorrect}
          secureTextEntry={this.props.password}
          password={this.props.password}
          underlineColorAndroid={this.props.underlineColorAndroid}
          onChangeText={this.props.onChangeText}
          style={this.props.style}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          blurOnSubmit
        />
      </View>
    );
  }
}

export {FloatingLabel};
