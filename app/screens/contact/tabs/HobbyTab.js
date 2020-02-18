import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Linking
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {componentStyle} from '../../styles';

const HobbyTab = (props) => {
  return (
    <View style={componentStyle.container}>
      <View style={componentStyle.fieldContainer}>
        <Text style={componentStyle.label}>Interest:</Text>
        <Text style={componentStyle.labelValue}>
          {props.infoProp &&props.infoProp.interest ? props.infoProp.interest : ''}
        </Text>
      </View>

      <View style={componentStyle.fieldContainer}>
        <Text style={componentStyle.label}>More Info:</Text>
        <Text style={componentStyle.labelValue}>
          {props.infoProp && props.infoProp.info ? props.infoProp.info : ''}
        </Text>
      </View>
    </View>
  );
};

export {HobbyTab};
