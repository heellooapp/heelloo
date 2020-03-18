import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import images from '../images';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

const FloatButton = props => {
  return (
    <ActionButton
      buttonColor="#FFF"
      buttonTextStyle={{
        color: '#2a8aed',
        fontFamily: 'Montserrat-Thin',
        fontSize: 55,
      }}
      style={styles.containerStyle}>
      {props.isAdmin &&
        < ActionButton.Item
          buttonColor="#FFF"
          textStyle={styles.textStyle}
          textContainerStyle={styles.textContainerStyle}
          title=""
          onPress={props.onStructurePress}>
          <Image source={images.structure} style={{ width: 30, height: 30 }} />
        </ActionButton.Item>
      }
      {props.isAdmin &&
        <ActionButton.Item
          buttonColor="#FFF"
          textStyle={styles.textStyle}
          textContainerStyle={styles.textContainerStyle}
          title=""
          onPress={props.onContactPress}>
          <Image source={images.addmember} style={{ width: 30, height: 30 }} />
        </ActionButton.Item>
      }
      {props.isAdmin ?
        <ActionButton.Item
          buttonColor="#FFF"
          textStyle={styles.textStyle}
          textContainerStyle={styles.textContainerStyle}
          title=""
          onPress={props.onBravoPress}>
          <Icon
            name={'ios-medal'}
            style={{color:'#2A8AED'}}
            size={30}
          />
        </ActionButton.Item>
        : <ActionButton.Item
          buttonColor="#FFF"
          textStyle={styles.textStyle}
          textContainerStyle={styles.textContainerStyle}
          title=""
          onPress={props.onBravoPress}>
          <Icon
            name={'ios-medal'}
            style={{color:'#2A8AED'}}
            size={30}
          />
        </ActionButton.Item>
      }
    </ActionButton >
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    shadowColor: '#000',
    shadowOpacity: 0.5,
    elevation: 2,
    zIndex: 2,
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  textStyle: {
    color: '#2A8AED',
    fontFamily: 'Montserrat-Regular',
    fontSize: 15,
  },
  textContainerStyle: {
    elevation: 0,
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
});

export { FloatButton };
