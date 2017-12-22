import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Platform,
  TextInput,
  Image,
  Dimensions,
  Text,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import images from '../images/';
import {firebase} from '../config';
import {Spinner, BubbleScreen, Button} from './common';
import PropTypes from 'prop-types';
import {sidemenuStyles} from './styles';
import Utils from './utils';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const styles = sidemenuStyles;

class ModalWrapper extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      title,
      icon,
      isVisible,
      onChangeText,
      value,
      onSave,
      onHide,
      children,
    } = this.props;
    const {modal, modalTitle, btnContainer, btn, btntextStyle} = styles;
    return (
      <Modal isVisible={isVisible}>
        <View style={modal}>
          <Text style={modalTitle}>{title}</Text>
          {children}
          <View style={btnContainer}>
            <TouchableOpacity style={btn} onPress={onSave}>
              <Text style={btntextStyle}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={btn} onPress={onHide}>
              <Text style={btntextStyle}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}

class Sidemenu extends Component {
  static contextTypes = {
    drawer: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      password: '',
      newPassword: '',
      isPasswordVisible: false,
      error: '',
      user: '',
      structure: '',
    };

    this.userRef = this.getRef().child('/users/');
    // this.structureRef = this.getRef().child('/structures/');
    this.uid = firebase.auth().currentUser.uid;
    this.profileOnPress = this.profileOnPress.bind(this);
    this.structureOnPress = this.structureOnPress.bind(this);
    this.savePassword = this.savePassword.bind(this);
    this.openPassword = this.openPassword.bind(this);
  }

  componentDidMount() {
    this.userRef.orderByChild('uid').equalTo(this.uid);
    this.userRef.on('value', this.handleUser);
    // this.structureRef.on('value', this.handleStructure);
  }

  getRef() {
    return firebase.database().ref();
  }

  handleUser = snapshot => {
    val = snapshot.val() || {};
    user = val[this.uid];
    this.setState({user, loading: false});
  };

  // handleStructure = snapshot => {
  //   val = snapshot.val() || {};
  //   var items = Object.keys(val).map((s, i) => {
  //     var obj = {id: s, parent: val[s].parent, name: val[s].name};
  //     return obj;
  //   });
  //   items = items.filter(e => e.id == this.state.user.structure);
  //   obj = Object.assign({}, ...items);
  //   this.setState({structure: obj});
  // };

  signOut() {
    firebase.auth().signOut();
  }

  structureOnPress() {
    this.context.drawer.close();
    Actions.structure({isAdmin: this.state.user.isAdmin});
  }

  profileOnPress() {
    this.context.drawer.close();
    Actions.profile({uid: this.state.user.uid});
  }

  showError() {
    let error = this.state.error;
    if (error.length > 0) {
      return <Text style={styles.error}>{error}</Text>;
    } else {
      return null;
    }
  }

  openPassword = () => {
    this.setState({
      isPasswordVisible: true,
      password: '',
      newPassword: '',
      error: '',
    });
  };

  savePassword = () => {
    if (this.state.password.length === 0) {
      this.setState({error: 'Password should not be null'});
      return;
    }

    if (this.state.password !== this.state.newPassword) {
      this.setState({error: 'Password does not match'});
      return;
    }

    if (this.state.password.length < 6) {
      this.setState({error: 'Password must have at least 6 characters'});
      return;
    }

    this.setState({loading: true});
    let user = firebase.auth().currentUser;
    user
      .updatePassword(this.state.password)
      .then(() => {
        this.setState({
          isPasswordVisible: false,
          newPassword: '',
          password: '',
          error: '',
          loading: false,
        });
      })
      .catch(err => {
        this.setState({
          newPassword: '',
          password: '',
          error: err.message,
          loading: false,
        });
      });
  };

  renderWrappers() {
    return (
      <View>
        <ModalWrapper
          isVisible={this.state.isPasswordVisible}
          title="Password"
          onSave={this.savePassword}
          onHide={() =>
            this.setState({
              isPasswordVisible: false,
              password: '',
              newPassword: '',
            })
          }>
          <View style={styles.mFieldContainer}>
            <View style={styles.mContainer}>
              <Text style={styles.mLabel}>New password:</Text>
              <TextInput
                autoFocus
                style={[
                  styles.mInputStyle,
                  {height: Platform.OS === 'android' ? 40 : 20},
                ]}
                onChangeText={password => this.setState({password})}
                value={this.state.password}
                underlineColorAndroid="transparent"
                secureTextEntry
              />
            </View>
            <View style={styles.mContainer}>
              <Text style={styles.mLabel}>Repeat new password:</Text>
              <TextInput
                style={[
                  styles.mInputStyle,
                  {height: Platform.OS === 'android' ? 40 : 20},
                ]}
                onChangeText={newPassword => this.setState({newPassword})}
                value={this.state.newPassword}
                underlineColorAndroid="transparent"
                secureTextEntry
              />
            </View>
            {this.showError()}
          </View>
        </ModalWrapper>
      </View>
    );
  }

  renderProfileImage() {
    if (this.state.user.profileImg) {
      return (
        <Image
          style={styles.ProfileImg}
          source={{uri: this.state.user.profileImg}}
          resizeMode="contain"
        />
      );
    } else {
      return <Image style={styles.ProfileImg} source={images.avatar} />;
    }
  }

  render() {
    if (this.state.loading) return null;
    return (
      <View style={styles.menu}>
        <BubbleScreen />
        <View style={styles.userPart}>
          <TouchableOpacity
            style={styles.arrowContainer}
            onPress={this.context.drawer.close}>
            <Icon
              name="md-arrow-back"
              size={25}
              color="#000"
              style={{marginTop: 15, backgroundColor: 'transparent'}}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.profileOnPress}>
            {this.renderProfileImage()}
          </TouchableOpacity>
          <Text
            style={[styles.userName, {fontSize: windowWidth <= 320 ? 16 : 18}]}>
            {this.state.user.firstName} {this.state.user.lastname}
          </Text>
          <Text
            style={[styles.title, {fontSize: windowWidth <= 320 ? 14 : 15}]}>
            {this.state.user.position}
          </Text>
        </View>
        {!this.state.loading ? this.renderWrappers() : null}
        <View style={styles.mainPart}>
          <View style={styles.userInfo}>
            <TouchableOpacity onPress={this.profileOnPress}>
              <View style={styles.container}>
                <Image source={images.me} style={styles.icon} />
                <Text style={styles.menuText}>My Profile</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.openPassword}>
              <View style={styles.container}>
                <Icon
                  name="ios-lock-outline"
                  size={20}
                  style={{margin: 5}}
                  color="#555"
                />
                <Text style={[styles.menuText, {marginLeft: 5}]}>Password</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.structureOnPress}>
              <View style={styles.container}>
                <Image source={images.structure} style={styles.icon} />
                <Text style={styles.menuText}>Structure</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.btnSignOut} onPress={this.signOut}>
            <Text style={[styles.btntextStyle]}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Sidemenu;
