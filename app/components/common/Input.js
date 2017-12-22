import React from 'react';
import {TextInput, View, Text, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {FloatingLabel} from './FloatingLabel';

const Input = ({
  icon,
  value,
  onChangeText,
  placeholder,
  password,
  autoCapitalize,
}) => {
  const {inputStyle, labelStyle, containerStyle, placeholderStyle} = styles;

  return (
    <View style={containerStyle}>
      <FloatingLabel
        containerStyle={containerStyle}
        label={placeholder}
        placeholder={placeholder}
        placeholderTextColor={'#555'}
        autoCorrect={false}
        value={value}
        style={inputStyle}
        onChangeText={onChangeText}
        password={password}
        autoCapitalize={autoCapitalize}
        underlineColorAndroid="transparent"
      />
    </View>
  );
};

const styles = {
  inputStyle: {
    color: '#000',
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'Montserrat-Regular',
    lineHeight: 35,
    marginTop: 20,
    height: 40,
    flex: 2,
  },
  containerStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
};

export {Input};
