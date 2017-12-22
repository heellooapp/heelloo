import React from 'react';
import {
  View,
  Text,
  Image
} from 'react-native';
import images from '../../images';

const Footer = () => {
  return (
    <View style={styles.wrapperStyle}>
      <View style={styles.containerStyle}>
        <Text style={styles.text}>powered by</Text>
        <Image resizeMode={"contain"} source={images.logo} style={styles.logo}/>
      </View>
    </View>
  );
};

const styles = {
  wrapperStyle: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    marginBottom: 20
  },
  containerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 10,
    // fontFamily: 'Montserrat-Light',
    color: '#3486f9'
  },
  logo: {
    width: 50,
    height: 25,
    marginLeft: 5
  }
};

export { Footer };
