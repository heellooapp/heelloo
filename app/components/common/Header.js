import React from 'react';
import { Text, View, TextInput, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import images from '../../config/images';

const Header = (props) => {

  return (
    <View style={styles.viewStyle}>
      <Icon name="ios-home" size={30} color="#fff" style={styles.iconLeft} />
      <TextInput 
        type="text"
        style={styles.textInput}
        placeholder='Search'
        underlineColorAndroid='transparent'
      />
      <View style={styles.search}>
        <Image
          style={styles.searchIcon}
          source={images.search}
        />
      </View>
      <Icon name="ios-apps" size={30} color="#fff" style={styles.iconRight} />
    </View>
  );
};

const styles = {
  viewStyle: {
    backgroundColor: '#6fa8dc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 75,
    paddingTop: 10
  },
  textStyle: {
    fontSize: 20
  },
  iconLeft: {
    paddingTop: 10,
    marginLeft: 15
  },
  iconRight: {
    paddingTop: 10,
    marginRight: 15
  },
  textInput: {
    flex: 1,
    height: 35,
    borderColor: '#cecece',
    marginBottom: 20,
    marginLeft: 28,
    marginTop: 20,
    paddingLeft: 10,
    paddingRight: 5,
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    fontSize: 14,
    borderWidth: 1
  },
  search: {
    backgroundColor: 'white',
    marginTop: 10,
    marginRight: 20,
    padding: 8,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },
   searchIcon: {
    flex: 0,
    height: 18,
    width: 18
   },
};

// Make the component available to other parts of the app
export { Header };
