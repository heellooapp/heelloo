import React, { useContext } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { common } from '../styles';
import { NavigationContext } from '@react-navigation/core';

const Header = props => {
  const { header, backBtn, backIcon, title, createIcon, emptyIcon } = common;
  const navigation = useContext(NavigationContext);

  return (
    <View style={header}>
      <TouchableOpacity style={backBtn} onPress={navigation.goBack}>
        <Icon name="md-arrow-back" size={25} color="#FFF" style={backIcon} />
      </TouchableOpacity>
      <Text style={title}>{props.title}</Text>
      {props.onPress ? (
        <TouchableOpacity onPress={props.onPress}>
          <Icon name="md-create" size={25} color="#FFF" style={createIcon} />
        </TouchableOpacity>
      ) : (
          <View style={emptyIcon} />
        )}
    </View>
  );
};

export { Header };
