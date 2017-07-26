import React from 'react';
import {
  View,
  TouchableHighlight,
  Image,
  Dimensions,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import images from '../config/images';

const Height = Dimensions.get('window').height;

class Sidemenu extends React.Component {
  render() {
    return (
      <View style={styles.menu}>
         <View style={styles.userPart}>
          <Image source={images.search} style={styles.ProfileImg}/>
          <Text style={styles.userName}>Anu-Ujin Bat-ulzii</Text>
          <Text style={styles.position}>React native developer</Text>
         </View>
         <View style={styles.mainPart}>
          <View style={styles.userInfo}>
            <View style={styles.container}>
               <Icon name="md-person" size={23} color="#000" style={styles.icon} />
               <Text>My Profile</Text>
            </View>
            <View style={styles.container}>
               <Icon name="md-log-out" size={20} color="#000" style={styles.icon} />
               <Text>Sign Out</Text>
            </View>
          </View>
          <View style={styles.appInfo}>
            <View style={styles.container}>
               <Icon name="md-menu" size={23} color="#000" style={styles.icon} />
               <Text>Structure</Text>
            </View>
          </View>
          <View style={styles.logoContainer}>
            <Image source={images.logo} style={styles.logo}/>
          </View>
         </View>
      </View>
    );
  }
}

const styles = {
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 5
  },
  menu: {
    flex: 1,
    backgroundColor: '#ddd',
    flexDirection: 'column',
  },
  userPart: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ddd',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    height: 250
  },
  mainPart: {
    backgroundColor: '#fff',
    height: Height,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 15
  },
  userInfo: {
    height: 70,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  appInfo: {
    marginTop: 12,
  },
  ProfileImg: {
    width: 140,
    height: 140,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 70,
    resizeMode: 'contain',
    marginBottom: 15
  },
  userName: {
    fontSize: 18,
    fontWeight: '600'
  },
  position: {
    fontSize: 13,
    marginTop: 5
  },
  icon: {
    paddingRight: 13
  },
  logoContainer: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  logo: {
    width: 160,
    resizeMode: 'contain',
    height: Height - 170
  }
};

export default Sidemenu;
