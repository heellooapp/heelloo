import React from 'react';
import { TextInput, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Input = ({ icon, value, onChangeText, placeholder, secureTextEntry, autoCapitalize }) => {
  const { inputStyle, labelStyle, containerStyle } = styles;

  return (
    <View style={containerStyle}>
      <Icon style={styles.iconStyle} name={icon} size={30} color="#98bce1"/>
      <TextInput
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        autoCorrect={false}
        style={inputStyle}
        value={value}
        onChangeText={onChangeText}
        autoCapitalize={autoCapitalize}
        underlineColorAndroid='transparent'
      />
    </View>
  );
};

const styles = {
  inputStyle: {
    color: '#555',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 16,
    lineHeight: 23,
    flex: 2,  
  },
  iconStyle: {
    paddingLeft: 10,
    paddingRight: 23
  },
  containerStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
};

export { Input };
