import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, Text, Platform, Image, Dimensions, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import images from '../config/images';
import { Spinner } from '../components/common';
import firebase from '../utils/firebase';

Height = Dimensions.get("window").height
Width = Dimensions.get("window").width

class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null
    }
  }

  componentDidMount() {
    userRef = firebase.database().ref('users').orderByChild('uid').equalTo(this.props.uid);
    userRef.on('value', this.handleUser);

    infoRef = firebase.database().ref('userInfo').orderByChild('uid').equalTo(this.props.uid);
  }

  handleUser = (snapshot) => {
    val = snapshot.val() || {};
    user = val[this.props.uid];
    this.setState({ user });
  }

  header() {
    const { viewStyle, iconLeft, iconList, textStyle } = styles;
    return (
    <View style={viewStyle}>
      <Icon name="caret-left" size={45} color="#fff" style={iconLeft} onPress={() => Actions.pop()} />
      <Text style={textStyle}>Profile</Text>
      <Icon name="lock" size={30} color="#fff" style={iconList}  />
    </View>
  )}

  renderSocialIcons() {
    return (
      <View style={{flexDirection: 'row', paddingBottom: 20, paddingTop: 10, justifyContent: 'space-around'}}>
        <Image source={images.fb} style={styles.socialImage} />
        <Image source={images.twitter} style={styles.socialImage} />
        <Image source={images.instagram} style={styles.socialImage} />
        <Image source={images.linkedin} style={styles.socialImage} />
        <Image source={images.skype} style={styles.socialImage} />
      </View>
  )}

  render() {
    return (
      <View style={{backgroundColor: '#eee', height: Height}}>
        {this.header()}
        {
          this.state.user &&
          <ScrollView>
            <View style={styles.mainStyle}>
              <Image
              style={styles.profileImage}
              source={{uri: this.state.user.profile_img}} />
              <View style={styles.namePart}>
                <View style={styles.nameFlex}>
                  <Text style={styles.generalText}>Нэр:</Text>
                  <Text style={styles.userName}>{this.state.user.firstName} {this.state.user.lastname}</Text>
                </View>
                <View style={styles.nameFlex}>
                  <Text style={styles.generalText}>Албан тушаал:</Text>
                  <Text>{this.state.user.position}</Text>
                </View>
                <View style={styles.nameFlex}>
                  <Text style={styles.generalText}>Хоч:</Text>
                  <View style={styles.mainTitle}>
                    <Text>{this.state.user.nickname}</Text>
                    <Icon name="pencil-square-o" size={23} color="#000" style={styles.icon}/>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.mainStyle}>
              <View style={styles.center}>
                <Icon name="phone-square" size={37} color="#009e11" style={{marginRight: 15}} />
                <Icon name="envelope" size={35} color="#b45f00" />
              </View>
            </View>
            <View style={styles.columnStyle}>
              <View style={styles.mainTitle}>
                <Text style={styles.mainTitleText}>Social accounts</Text>
                <Icon name="pencil-square-o" size={23} color="#000" style={{justifyContent: 'flex-end'}}/>
              </View>
              {this.renderSocialIcons()}
              <View style={styles.mainTitle}>
                <Text style={styles.mainTitleText}>Contact Info</Text>
                <Icon name="pencil-square-o" size={23} color="#000" style={{justifyContent: 'flex-end'}}/>
              </View>
              <View style={styles.mainTitle}>
                <Text style={styles.mainTitleText}>Anniversary</Text>
                <Icon name="pencil-square-o" size={23} color="#000" style={{justifyContent: 'flex-end'}}/>
              </View>
              <View style={styles.mainTitle}>
                <Text style={styles.mainTitleText}>Family</Text>
                <Icon name="pencil-square-o" size={23} color="#000" style={{justifyContent: 'flex-end'}}/>
              </View>
              <View style={styles.mainTitle}>
                <Text style={styles.mainTitleText}>Favourite things</Text>
                <Icon name="pencil-square-o" size={23} color="#000" style={{justifyContent: 'flex-end'}}/>
              </View>
              <View style={styles.mainTitle}>
                <Text style={styles.mainTitleText}>Interest</Text>
                <Icon name="pencil-square-o" size={23} color="#000" style={{justifyContent: 'flex-end'}}/>
              </View>
              <View style={styles.mainTitle}>
                <Text style={styles.mainTitleText}>More Information</Text>
                <Icon name="pencil-square-o" size={23} color="#000" style={{justifyContent: 'flex-end'}}/>
              </View> 
            </View>
          </ScrollView>
        }
      </View>
    );
  }
}

const styles = {
  mainStyle: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    marginTop: 5
  },
  columnStyle: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    padding: 10,
    marginTop: 5
  },
  center: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  mainTitle: {
    flex: 1, 
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mainTitleText:{
    fontWeight: 'bold',
    justifyContent: 'center'
  },
  viewStyle: {
    backgroundColor: '#6fa8dc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 75,
    paddingTop: (Platform.OS === 'ios') ? 20 : 0,
  },
  textStyle: {
    fontSize: 23,
    color: '#fff'
  },
  iconLeft: {
    marginLeft: 20
  },
  iconList: {
    marginRight: 20,
    width: 30,
    height: 30,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 10,
    borderColor: '#eee',
    borderWidth: 1
  },
  namePart: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  nameFlex: {
    flexDirection: 'row',
    marginBottom: 7,
  },
  generalText: {
    fontSize: 14,
    fontWeight: '700',
    marginRight: 7,
  },
  icon: {
    justifyContent: 'flex-end', 
  },
  socialImage: {
    width: 30,
    height: 30,
    marginRight: 8,
    resizeMode: 'contain'
  }
};

export default Profile;
