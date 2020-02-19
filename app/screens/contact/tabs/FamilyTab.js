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

const FamilyTab = (props) => {
  let familyObject = props.infoProp.family ? Object.values(props.infoProp.family) : null;

  if (familyObject) {
    var familyList = familyObject.map((list, i) => {
      return (
        <View key={i} style={componentStyle.fieldContainer}>
          <Text style={componentStyle.label}>
            {list.relation}
          </Text>
          <Text style={componentStyle.labelValue}>
            {list.name}
            {'\n'}
            {list.birthday}
            {'\n'}
            {list.phone}
          </Text>
        </View>
      )
    }).reverse();
  } else {
    var familyList = [];
  }

  return (
    <View style={componentStyle.container}>
      {familyList}
    </View>
  );
};

export {FamilyTab};
