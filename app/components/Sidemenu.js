import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  Text,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import images from '../config/images';
import { Spinner } from './common';
import firebase from '../utils/firebase';

const Height = Dimensions.get('window').height;

class Sidemenu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }

  componentDidMount() {
    userRef = firebase.database().ref('users').orderByChild('uid').equalTo(this.props.uid);
    userRef.on('value', this.handleUser);
  }

  handleUser = (snapshot) => {
    val = snapshot.val() || {};
    user = val[this.props.uid];
    this.setState({ user, loading: false });
  }

  signOut() {
    firebase.auth().signOut();
  }

  openStructure() {
    Actions.structure();
    this.props.closeDrawer();
  }

  profileOnPress() {
    this.props.closeDrawer();
    Actions.contact({
      uid: this.props.uid,
      isAdmin: this.props.isAdmin,
      currentUser: firebase.auth().currentUser.uid === this.props.uid
    });
  }

  renderContent() {
    if (this.state.loading) {
      return (
        <Spinner />
      )
    }
    return(
      <View>
        <View style={styles.userPart}>
          <TouchableOpacity onPress={this.profileOnPress.bind(this)}>
          {
            this.state.user.profileImg
              ? <Image style={styles.ProfileImg} source={{uri: this.state.user.profileImg}} />
              : <Image style={styles.ProfileImg} source={images.avatar} />
          }
          </TouchableOpacity>
          <Text style={styles.userName}>{this.state.user.firstName} {this.state.user.lastname}</Text>
          <Text style={styles.position}>{this.state.user.position}</Text>
        </View>
        <View style={styles.mainPart}>
          <View style={styles.userInfo}>
          <TouchableOpacity onPress={this.profileOnPress.bind(this)}>
            <View style={styles.container}>
              <Icon name="md-person" size={23} color="#000" style={styles.icon} />
              <Text>My Profile</Text>
            </View>
          </TouchableOpacity>
            <TouchableOpacity onPress={this.signOut}>
              <View style={styles.container}>
                <Icon name="md-log-out" size={20} color="#000" style={styles.icon} />
                <Text>Sign Out</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between'}}>
            <View style={styles.appInfo}>
              <TouchableOpacity onPress={() => Actions.structure(this.props.closeDrawer())}>
                <View style={styles.container}>
                  <Icon name="md-menu" size={23} color="#000" style={styles.icon} />
                  <Text>Structure</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.logoContainer}>
              <Image source={images.logo} style={styles.logo}/>
            </View>
            <View></View>
          </View>
        </View>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.menu}>
        {this.renderContent()}
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
    paddingTop: 15,
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
    marginTop: 10,
    paddingRight: 20,
    paddingLeft: 20
  },
  icon: {
    paddingRight: 13
  },
  logoContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 40
  },
  logo: {
    width: 160,
    resizeMode: 'contain',
    justifyContent: 'flex-end'
  }
};

export default Sidemenu;
