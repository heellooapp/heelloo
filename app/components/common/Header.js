import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import images from '../../config/images';

class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      listIconName: "ios-apps",
      isList: false,
    }
    this.ListIconPressed = this.ListIconPressed.bind(this);
  }

  ListIconPressed() {
    this.setState({
      listIconName: this.state.isList === true ? "ios-apps" : "md-menu",
      isList: this.state.isList ? false : true,
    });

    this.props.onListPress(this.state.isList);
  }

  render() {
    const { searchValue, onChangeText } = this.props;
    const { viewStyle, searchSection, iconLeft, iconList, textInput } = styles;
    return (
      <View style={viewStyle}>
        <Icon name="ios-home" size={30} color="#fff" style={iconLeft} onPress={this.props.openDrawer}/>
        <View style={searchSection}>
          <TextInput 
            type="text"
            style={textInput}
            autoCorrect={false}
            placeholder='Search'
            underlineColorAndroid='transparent'
            value={searchValue}
            onChangeText={onChangeText}
            autoCapitalize='words'
          />
          <Icon name="ios-search" size={30} color="#cecece" />
        </View>
        <Icon name={this.state.listIconName} size={30} color="#fff" style={iconList} onPress={this.ListIconPressed} />
      </View>
    );
  }
};

const styles = {
  viewStyle: {
    backgroundColor: '#6fa8dc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 75,
    paddingTop: (Platform.OS === 'ios') ? 20 : 0,
  },
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#FFF',
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
  },
  iconLeft: {
    marginLeft: 20
  },
  iconList: {
    marginRight: 20,
    width: 30,
    height: 30,
  },
  textInput: {
    flex: 1,
    height: 35,
    paddingVertical: 0,
    justifyContent: 'flex-start',
    fontSize: 14
  },
};

Header.propTypes = {
  openDrawer: React.PropTypes.func,
};

export { Header };
