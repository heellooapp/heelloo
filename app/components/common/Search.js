import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  Keyboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {headerStyles} from '../styles';

const name = '';

class Search extends Component {
  static contextTypes = {
    drawer: PropTypes.object.isRequired,
  };

  field() {
    return (
      <View style={headerStyles.searchSection}>
        <TextInput
          type="text"
          style={headerStyles.textInput}
          autoCorrect={false}
          placeholder="Search"
          autoFocus
          underlineColorAndroid="transparent"
          value={this.props.searchValue}
          onChangeText={this.props.onChangeText}
          autoCapitalize="words"
        />
      </View>
    );
  }

  headerTitle() {
    return (
      <View style={headerStyles.titleSection}>
        <Text style={headerStyles.titleNavbar}>{this.props.title}</Text>
      </View>
    );
  }

  renderField() {
    if (this.props.toggleSearchValue) {
      name = 'ios-close-outline';
      return this.field();
    } else {
      name = 'ios-search-outline';
      return this.headerTitle();
    }
  }

  renderIcon() {
    return (
      <Icon name={name} size={30} color="#FFF" style={headerStyles.iconRight} />
    );
  }

  render() {
    return (
      <View style={headerStyles.viewStyle}>
        <TouchableOpacity
          style={headerStyles.menuContainer}
          onPress={this.context.drawer.open}>
          <Icon
            name="ios-menu"
            size={30}
            style={headerStyles.iconLeft}
            color="#FFF"
          />
          <View style={headerStyles.notification} />
        </TouchableOpacity>
        {this.renderField()}
        <TouchableOpacity
          style={headerStyles.menuContainer}
          onPress={this.props.toggleSearch}>
          {this.renderIcon()}
        </TouchableOpacity>
      </View>
    );
  }
}

export {Search};
