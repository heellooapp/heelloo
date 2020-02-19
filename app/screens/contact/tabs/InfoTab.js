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

const InfoTab = (props) => {
  return (
    <View style={componentStyle.container}>
      <View style={componentStyle.fieldContainer}>
        <Text style={componentStyle.label}>Phone Number:</Text>
        <Text style={componentStyle.labelValue}>
          {props.userProp && props.userProp.phone ? props.userProp.phone : ''}
        </Text>
      </View>

      <View style={componentStyle.fieldContainer}>
        <Text style={componentStyle.label}>Mail Address:</Text>
        <Text style={componentStyle.labelValue}>
          {props.userProp && props.userProp.email ? props.userProp.email : ''}
        </Text>
      </View>

      <View style={componentStyle.fieldContainer}>
        <Text style={componentStyle.label}>Social Accounts:</Text>
        <View style={componentStyle.socialContainer}>
          {
            (props.infoProp.social && props.infoProp.social.facebook)
            ? <TouchableOpacity onPress={() => Linking.openURL('https://facebook.com/'+props.infoProp.social.facebook)}>
                <Icon name="logo-facebook" size={25} color="#3453A5" style={componentStyle.socialIcon} />
              </TouchableOpacity>
            : null
          }
          {
            (props.infoProp.social && props.infoProp.social.twitter)
            ? <TouchableOpacity onPress={() => Linking.openURL('https://twitter.com/'+props.infoProp.social.twitter)}>
                <Icon name="logo-twitter" size={25} color="#2490F1" style={componentStyle.socialIcon} />
              </TouchableOpacity>
            : null
          }
          {
            (props.infoProp.social && props.infoProp.social.linkedin)
            ? <TouchableOpacity onPress={() => Linking.openURL('https://linkedin.com/'+props.infoProp.social.linkedin)}>
                <Icon name="logo-linkedin" size={25} color="#1264A8" style={componentStyle.socialIcon} />
              </TouchableOpacity>
            : null
          }
          {
            (props.infoProp.social && props.infoProp.social.skype)
            ? <TouchableOpacity onPress={() => Linking.openURL('https://skype.com/'+props.infoProp.social.skype)}>
                <Icon name="logo-skype" size={25} color="#20A0EF" style={componentStyle.socialIcon} />
              </TouchableOpacity>
            : null
          }
          {
            (props.infoProp.social && props.infoProp.social.instagram)
            ? <TouchableOpacity onPress={() => Linking.openURL('https://instagram.com/'+props.infoProp.social.instagram)}>
                <Icon name="logo-instagram" size={25} color="#f95c19" style={componentStyle.socialIcon} />
              </TouchableOpacity>
            : null
          }
        </View>
      </View>
    </View>
  );
};

export {InfoTab};
