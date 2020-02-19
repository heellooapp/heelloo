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
import {componentStyle} from '../../../styles';

const AnniversaryTab = (props) => {
  return (
    <View style={componentStyle.container}>
      <View style={componentStyle.fieldContainer}>
        <Text style={componentStyle.label}>Birthday:</Text>
        <Text style={componentStyle.labelValue}>
          {props.userProp.anniversary && props.userProp.anniversary.birthday ? props.userProp.anniversary.birthday : ''}
        </Text>
      </View>

      <View style={componentStyle.fieldContainer}>
        <Text style={componentStyle.label}>First day of work:</Text>
        <Text style={componentStyle.labelValue}>
          {props.userProp.anniversary && props.userProp.anniversary.firstDay ? props.userProp.anniversary.firstDay : ''}
        </Text>
      </View>
    </View>
  );
};

export {AnniversaryTab};
