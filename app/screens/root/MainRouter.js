import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Image } from 'react-native';
import { Router, Scene, Actions, ActionConst } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import { Contact, Anniversary } from '../tabs';
import { NewContact, EditContact, Profile } from '../contact';
import { NewStructure, EditStructure, Structure } from '../structure';
import Chat from '../conversations/chat';
import { Login, ForgetPassword } from '../unauth';

// import images from '../../images';
// import { firebase } from '../config';
import { routerStyles, iphoneX } from '../../styles';

// import Utils from './utils';

const width = Dimensions.get('window').width;

const TabIcon = ({ focused, title, Iconname }) => {
  return (
    <View
      style={[
        routerStyles.tabItemStyle,
        {
          backgroundColor: focused ? '#2a8aed' : '#FFF',
          width: width * 0.25,
        },
      ]}>
      <Image
        source={Iconname}
        style={[
          routerStyles.tabIconStyle,
          { tintColor: focused ? '#FFF' : '#000' },
        ]}
      />
      <Text
        style={[routerStyles.tabTitle, { color: focused ? '#FFF' : '#C9C9C9' }]}>
        {title}
      </Text>
    </View>
  );
};

class MainRouter extends Component {
  constructor(props) {
    super(props);
  }

  backBtn() {
    return (
      <TouchableOpacity
        onPress={() => Actions.pop()}
        style={routerStyles.headBtn}>
        <Icon
          name="md-arrow-back"
          size={25}
          color="#FFF"
          style={routerStyles.iconLeft}
        />
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <Router
        navigationBarStyle={routerStyles.navbarStyle}
        titleStyle={routerStyles.titleStyle}>
        <Scene key="root" hideNavBar>
          <Scene
            key="tabbar"
            tabBarPosition="bottom"
            swipeEnabled={false}
            tabs={true}
            showLabel={false}
            wrap={false}
            tabBarStyle={routerStyles.tabBarStyle}>
            <Scene
              key="tabContact"
              Iconname={require('../../images/contact.png')}
              icon={TabIcon}
              {...this.props}
              wrap={false}
              component={Contact}
              initial={true} />
            <Scene
              key="tabAnniversary"
              Iconname={require('../../images/anniversary.png')}
              icon={TabIcon}
              component={Anniversary}
              {...this.props} />
            <Scene
              key="tabBravo"
              Iconname={require('../../images/tabclap.png')}
              icon={TabIcon}
              component={Anniversary}
              {...this.props} />
            <Scene
              key="tabChat"
              Iconname={require('../../images/tabchat.png')}
              icon={TabIcon}
              component={Anniversary}
              {...this.props} />
          </Scene>

          <Scene
            key="newContact"
            component={NewContact}
            hideNavBar
          />
          <Scene
            key="login"
            component={Login}
            hideNavBar
          />
          <Scene
            key="editContact"
            component={EditContact}
            renderBackButton={this.backBtn}
            hideNavBar
          />

          <Scene
            key="profile"
            component={Profile}
            title="mongolia"
          // renderBackButton={this.backBtn}
          // hideNavBar
          />

          <Scene
            key="newStructure"
            component={NewStructure}
            hideNavBar
          />

          <Scene
            key="editStructure"
            component={EditStructure}
            hideNavBar
          />

          <Scene
            key="structure"
            component={Structure}
            hideNavBar
          />
          <Scene
            key="chat"
            component={Chat}
            hideNavBar
          />
          <Scene
            key="forgetPassword"
            component={ForgetPassword}
            hideNavBar
          />
        </Scene>
      </Router>
    );
  }
}

export default MainRouter;
