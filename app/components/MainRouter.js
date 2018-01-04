import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Dimensions, Image} from 'react-native';
import {Router, Scene, Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import {Contact, Anniversary} from './tabs';
import {NewContact, EditContact, Profile} from './contact';
import {NewStructure, EditStructure, Structure} from './structure';
import images from '../images';
import {firebase} from '../config';
import {routerStyles} from './styles';
import Login from '../Login';
import Utils from './utils';

const width = Dimensions.get('window').width;

const TabIcon = ({focused, title, Iconname}) => {
  return (
    <View
      style={[
        routerStyles.tabItemStyle,
        {
          backgroundColor: focused ? '#2a8aed' : '#FFF',
          width: width * 0.5,
        },
      ]}>
      <Image
        source={Iconname}
        style={[
          routerStyles.tabIconStyle,
          {tintColor: focused ? '#FFF' : '#000'},
        ]}
      />
      <Text
        style={[routerStyles.tabTitle, {color: focused ? '#FFF' : '#C9C9C9'}]}>
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
        <Scene key="root">
          <Scene
            key="tabbar"
            tabBarPosition="bottom"
            swipeEnabled={false}
            tabs={true}
            showLabel={false}
            tabBarStyle={routerStyles.tabBarStyle}>
            <Scene
              key="tabContact"
              title="Contact"
              Iconname={require('../images/contact.png')}
              icon={TabIcon}
              {...this.props}
              initial={true}>
              <Scene
                key="contact"
                title="CONTACT"
                hideNavBar
                component={Contact}
                openDrawer={this.props.openDrawer}
              />
            </Scene>

            <Scene
              key="tabAnniversary"
              title="Anniversary"
              Iconname={require('../images/anniversary.png')}
              icon={TabIcon}
              {...this.props}>
              <Scene
                key="anniversary"
                title="ANNIVERSARY"
                hideNavBar
                component={Anniversary}
                openDrawer={this.props.openDrawer}
              />
            </Scene>
          </Scene>

          <Scene
            key="newContact"
            component={NewContact}
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
            renderBackButton={this.backBtn}
            hideNavBar
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
        </Scene>
      </Router>
    );
  }
}

export default MainRouter;
