import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, TextInput, TouchableOpacity, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {headerStyles} from '../styles';

class Header extends Component {
  static contextTypes = {
    drawer: PropTypes.object.isRequired,
  };
  
  render() {
    return(
    <View 
      style={[
        headerStyles.viewStyle, 
        {paddingTop: (Platform.OS === 'ios') ? 20 : 0}
      ]}>
        <TouchableOpacity 
          style={headerStyles.menuContainer} 
          onPress={this.context.drawer.open}>
          <Icon name="ios-menu" size={30} style={headerStyles.iconLeft} color="#FFF"/>
          <View style={headerStyles.notification}/>
        </TouchableOpacity>
        {
          (this.props.toggleSearchValue)
          ? <View style={headerStyles.searchSection}>
              <TextInput
                type="text"
                style={headerStyles.textInput}
                autoCorrect={false}
                placeholder='Search'
                autoFocus
                underlineColorAndroid='transparent'
                value={this.props.searchValue}
                onChangeText={this.props.onChangeText}
                autoCapitalize='words'
              />
            </View>
          : <View style={headerStyles.titleSection}>
              <Text style={headerStyles.titleNavbar}>{this.props.title}</Text>
            </View>
        }

        <TouchableOpacity style={headerStyles.menuContainer} onPress={this.props.toggleSearch}>
          {
            (this.props.toggleSearchValue)
            ? <Icon name="ios-close-outline" size={30} color="#fff" style={headerStyles.iconRight}/>
            : <Icon name="ios-search-outline" size={30} color="#fff" style={headerStyles.iconRight}/>
          }
        </TouchableOpacity>
      </View>
  );
  }
}

export { Header };
