import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import images from '../images';
import ActionButton from 'react-native-action-button';

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
      <ActionButton.Item
        buttonColor="#FFF"
        textStyle={styles.textStyle}
        textContainerStyle={styles.textContainerStyle}
        title="Add Structure"
        onPress={props.onStructurePress}>
        <Image source={images.structure} style={{width: 30, height: 30}} />
      </ActionButton.Item>
      <ActionButton.Item
        buttonColor="#FFF"
        textStyle={styles.textStyle}
        textContainerStyle={styles.textContainerStyle}
        title="Add Member"
        onPress={props.onContactPress}>
        <Image source={images.addmember} style={{width: 30, height: 30}} />
      </ActionButton.Item>
    </ActionButton>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    shadowColor: '#000',
    shadowOpacity: 0.1,
    elevation: 1,
    zIndex: 2,
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  textStyle: {
    color: '#FFF',
    fontFamily: 'Montserrat-Regular',
    fontSize: 15,
  },
  textContainerStyle: {
    elevation: 0,
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
});

export {FloatButton};
