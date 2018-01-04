import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import {common} from '../styles';

const Header = props => {
  const {header, backBtn, backIcon, title, createIcon, emptyIcon} = common;
  return (
    <View style={header}>
      <TouchableOpacity style={backBtn} onPress={() => Actions.pop()}>
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

export {Header};
