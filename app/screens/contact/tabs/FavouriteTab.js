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

const FavouriteTab = (props) => {
  return (
    <View style={componentStyle.container}>
      <View style={componentStyle.fieldContainer}>
        <Text style={componentStyle.label}>Drinks:</Text>
        <Text style={componentStyle.labelValue}>
          {props.infoProp.favourite && props.infoProp.favourite.drink ? props.infoProp.favourite.drink : ''}
        </Text>
      </View>

      <View style={componentStyle.fieldContainer}>
        <Text style={componentStyle.label}>Foods</Text>
        <Text style={componentStyle.labelValue}>
          {props.infoProp.favourite && props.infoProp.favourite.food ? props.infoProp.favourite.food : ''}
        </Text>
      </View>
      <View style={componentStyle.fieldContainer}>
        <Text style={componentStyle.label}>Snacks</Text>
        <Text style={componentStyle.labelValue}>
          {props.infoProp.favourite && props.infoProp.favourite.snack ? props.infoProp.favourite.snack : ''}
        </Text>
      </View>
      <View style={componentStyle.fieldContainer}>
        <Text style={componentStyle.label}>Music</Text>
        <Text style={componentStyle.labelValue}>
          {props.infoProp.favourite && props.infoProp.favourite.music ?props.infoProp.favourite.music : ''}
        </Text>
      </View>
      <View style={componentStyle.fieldContainer}>
        <Text style={componentStyle.label}>Sports</Text>
        <Text style={componentStyle.labelValue}>
          {props.infoProp.favourite && props.infoProp.favourite.sport ? props.infoProp.favourite.sport : ''}
        </Text>
      </View>
    </View>
  );
};

export {FavouriteTab};
