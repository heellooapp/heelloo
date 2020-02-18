import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import Communications from 'react-native-communications';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Spinner } from '../common';
import images from '../../images';
import { firebase } from '../../config';
import {
  InfoTab,
  AnniversaryTab,
  FamilyTab,
  FavouriteTab,
  HobbyTab,
} from './tabs';
import { profileStyles, iphoneX } from '../styles';

const styles = profileStyles;

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      info: null,
      structure: null,
      loadingUser: true,
      loadingInfo: true,
      tabs: 'info',
    };

    this.userRef = this.getRef().child(`/users/${this.props.uid}`);
    this.infoRef = this.getRef().child(`/userInfo/${this.props.uid}`);
    this.structureRef = this.getRef().child(`/structures/`);

    this.OnPhonePress = this.OnPhonePress.bind(this);
    this.OnTextPress = this.OnTextPress.bind(this);
    this.OnEmailPress = this.OnEmailPress.bind(this);
    this.OnEditPress = this.OnEditPress.bind(this);
  }

  getRef() {
    return firebase.database().ref();
  }

  componentDidMount() {
    this.userRef.on('value', this.handleUser);
    this.infoRef.on('value', this.handleInfo);
    this.structureRef.on('value', this.handleStructure);
  }

  componentWillUnmount() {
    this.userRef.off('value', this.handleUser);
    this.infoRef.off('value', this.handleInfo);
    this.structureRef.off('value', this.handleStructure);
  }

  handleUser = snapshot => {
    val = snapshot.val() || {};
    this.setState({
      user: val,
      loadingUser: false,
    });
  };

  handleInfo = snapshot => {
    val = snapshot.val() || {};
    this.setState({
      info: val,
      loadingInfo: false,
    });
  };

  handleStructure = snapshot => {
    val = snapshot.val();
    let items = Object.keys(val).map((s, i) => {
      let obj = { id: s, parent: val[s].parent, name: val[s].name };
      return obj;
    });
    items = items.filter(e => e.id == this.state.user.structure);
    structure = Object.assign({}, ...items);
    this.setState({ structure });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.structure) {
      this.setState({ structure: nextProps.structure });
    }
  }

  OnPhonePress() {
    const { phone } = this.state.user;
    phone && Communications.phonecall(phone.toString(), false);
  }

  OnTextPress() {
    const { phone, firstName } = this.state.user;
    phone &&
      firstName &&
      Communications.text(phone.toString(), `Hi, ${firstName}`);
  }

  OnEmailPress() {
    const { email } = this.state.user;
    email &&
      Communications.email(
        [email.toString()],
        null,
        null,
        'My Subject',
        'My body text',
      );
  }
  OnChatPress = () => {
    Actions.chat({
      uid: this.props.uid,
    });
  }


  OnEditPress() {
    Actions.editContact({
      uid: this.props.uid,
    });
  }

  showEditBtn() {
    let user = this.state.user;
    let uid = firebase.auth().currentUser.uid;
    if (user.uid == uid || this.props.isAdmin) {
      return (
        <TouchableOpacity onPress={this.OnEditPress} style={styles.editBtn}>
          <Icon
            name="md-create"
            size={25}
            color="#FFF"
            style={styles.iconRight}
          />
        </TouchableOpacity>
      );
    } else {
      return <View style={{ height: 25, width: 25 }} />;
    }
  }

  header() {
    if (this.state.loadingUser || this.state.loadingInfo) return;
    const { user, info } = this.state;
    return (
      <View style={styles.viewStyle}>
        <View style={styles.headerStyle}>
          <TouchableOpacity
            onPress={() => Actions.pop()}
            style={styles.headBtn}>
            <Icon
              name="md-arrow-back"
              size={25}
              color="#FFF"
              style={styles.iconLeft}
            />
          </TouchableOpacity>
          <View style={styles.nameStyle}>
            <Text style={styles.nameTitle}>
              {user.firstName} {user.lastname}
            </Text>
          </View>
          {this.showEditBtn()}
        </View>
      </View>
    );
  }

  renderSubTitle() {
    let info = this.state.info;
    let val = info.nickname && info.gender ? ',' : '';
    return `${info.nickname || ''}${val} ${info.gender || ''}`;
  }

  renderProfileImg() {
    let { user } = this.state;
    if (user.profileImg) {
      return (
        <Image style={styles.profileImage} source={{ uri: user.profileImg }} />
      );
    } else {
      return <Image source={images.avatar} style={styles.profileImage} />;
    }
  }

  renderBtn({ img, color, action }) {
    return (
      <TouchableOpacity
        onPress={action}
        style={[styles.btnGreen, { backgroundColor: color }]}>
        <Image source={img} style={styles.btnStyle} />
      </TouchableOpacity>
    );
  }

  setTab = name => {
    this.setState({ tabs: name });
  };

  tabItem({ name, img, title }) {
    let item,
      text,
      icon = null;
    let {
      tabItem,
      tabIcon,
      tabText,
      selectedTabItem,
      selectedTabIcon,
      selectedTabText,
    } = styles;

    if (this.state.tabs == name) {
      item = selectedTabItem;
      text = selectedTabText;
      icon = selectedTabIcon;
    }

    return (
      <TouchableOpacity
        style={[tabItem, item]}
        onPress={() => this.setTab(name)}>
        <Image source={img} style={[tabIcon, icon]} />
        <Text style={[tabText, text]}>{title}</Text>
      </TouchableOpacity>
    );
  }

  renderTabContent(user, info) {
    switch (this.state.tabs) {
      case 'info':
        return <InfoTab userProp={user} infoProp={info} />;
        break;
      case 'anniversary':
        return <AnniversaryTab userProp={user} infoProp={info} />;
        break;
      case 'family':
        return <FamilyTab userProp={user} infoProp={info} />;
        break;
      case 'favourite':
        return <FavouriteTab userProp={user} infoProp={info} />;
        break;
      case 'hobby':
        return <HobbyTab userProp={user} infoProp={info} />;
        break;
    }
  }

  renderContent() {
    if (this.state.loadingUser || this.state.loadingInfo) return <Spinner />;
    let { user, info, structure } = this.state;

    return (
      <View style={styles.mainContainer}>
        <View style={styles.avatarStyle}>
          <Text style={styles.subTitle}>{this.renderSubTitle()}</Text>
          {this.renderProfileImg()}
          <View style={styles.positionStyle}>
            <Text style={styles.positionTitle}>{user.position}</Text>
            <Text style={styles.teamTitle}>{structure && structure.name}</Text>
          </View>
        </View>
        <View style={styles.btnGroup}>
          {this.renderBtn({
            img: images.call,
            color: '#3AD265',
            action: this.OnPhonePress,
          })}
          {this.renderBtn({
            img: images.message,
            color: '#3AD265',
            action: this.OnTextPress,
          })}
          {this.renderBtn({
            img: images.mail,
            color: '#5498F4',
            action: this.OnEmailPress,
          })}
          {this.renderBtn({
            img: images.chat,
            color: '#5498F4',
            action: this.OnChatPress,
          })}
        </View>
        <View style={styles.tabContainer}>
          {this.tabItem({ name: 'info', img: images.info, title: 'Contact' })}
          {this.tabItem({
            name: 'anniversary',
            img: images.anniversary,
            title: 'Anniversary',
          })}
          {this.tabItem({ name: 'family', img: images.family, title: 'Family' })}
          {this.tabItem({
            name: 'favourite',
            img: images.favourite,
            title: 'Favourite',
          })}
          {this.tabItem({ name: 'hobby', img: images.hobby, title: 'Hobby' })}
        </View>
        <ScrollView style={styles.tabView}>
          {this.renderTabContent(user, info)}
        </ScrollView>
      </View>
    );
  }

  render() {
    return (
      <View style={{ flex: 1, ...iphoneX.space }}>
        {this.header()}
        {this.renderContent()}
      </View>
    );
  }
}

export { Profile };
