import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = ({ onPress, children, btnColor }) => {
  const { buttonStyle, textStyle } = styles;

  return (
    <TouchableOpacity onPress={onPress} style={[buttonStyle, {backgroundColor: btnColor || '#2C8AED'}]}>
      <Text style={textStyle}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = {
  textStyle: {
    fontFamily: 'Montserrat-Regular',
    alignSelf: 'center',
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
    paddingTop: 12,
    paddingBottom: 12
  },
  buttonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    borderRadius: 50,
  }
};

export { Button };
