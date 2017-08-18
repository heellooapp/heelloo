import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StatusBar, Dimensions } from 'react-native';
import Sidemenu from '../components/Sidemenu';
import Drawer from 'react-native-drawer';
import { Router, Scene } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import images from '../config/images';
import Anniversary from './Anniversary';
import firebase from '../utils/firebase';
import { Spinner, FloatButton } from '../components/common'
import { Contact, ContactList, NewContact } from './Contact';
import { Structure, NewStructure, EditStructure } from './Structure';

var width = Dimensions.get('window').width;

const TabIcon = ({ selected, title, Iconname }) => {
  return (
    <View style={{ backgroundColor: selected ? '#2b78e4' : '#6fa8dc', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: width * .5,  padding: 10 }}>
      <Icon name={Iconname} size={30} color="#fff" />
      <Text style={styles.text}> {title} </Text>
    </View>
  );
}

class Root extends Component {

  closeDrawer = () => {
    this._drawer.close()
  };

  openDrawer = () => {
    this._drawer.open()
  };
  
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      users: null,
    }
  }

  componentDidMount() {
    ref = firebase.database().ref('users');
    
    userUid = firebase.auth().currentUser.uid;
    this.setState({ uid: userUid });
    userRef = ref.orderByChild('uid').equalTo(userUid);
    userRef.on('value', this.handleUser);

    ref.on('value', this.handleQuery);
  }

  handleUser = (snapshot) => {
    val = snapshot.val() || {};
    val = val[this.state.uid];
    if (val.isAdmin) {
      this.setState({ isAdmin: true });
    } else {
      this.setState({ isAdmin: false });
    }
  }

  handleQuery = (snapshot) => {
    this.setState({ loading: true });
    val = snapshot.val() || {};
    array = Object.keys(val).map(function (key) {
      return val[key];
    });
    this.setState({
      loading: false,
      users: array
    });
  }

  render() {
    if (this.state.loading) {
      return <Spinner />;
    }
    return (
      <Drawer
        onPress={() => {this._drawer.open()}}
        ref={(ref) => this._drawer = ref}
        content={<Sidemenu
                            closeDrawer={this.closeDrawer}
                            uid = {this.state.uid}
                            isAdmin={this.state.isAdmin} />}
        tweenHandler={Drawer.tweenPresets.parallax}
        openDrawerOffset={(viewport) => {
          return 110
        }}
        tapToClose={true}
        panOpenMask={0.2}
        negotiatePan
        tweenHandler={(ratio) => ({
          main: {
            opacity: 1,
          },
          mainOverlay: {
            opacity: ratio / 1.7,
            backgroundColor: 'black',
          },
        })}
        styles={{main: {shadowColor: '#000000', shadowOpacity: 0.3, shadowRadius: 5}}}
        >
          <Router>
            <Scene key="root">

              <Scene
                key="tabbar"
                tabs={true}
                tabBarStyle={{ backgroundColor: '#6fa8dc', height: 60 }}
              >
                <Scene key="anniversary" title="Anniversary" Iconname="ios-notifications-outline" icon={TabIcon} {...this.props} hideNavBar={true}>
                  <Scene
                    key="Anniversary"
                    component={Anniversary}
                    tintColor='#6fa8dc'
                    users={this.state.users}
                    isAdmin={this.state.isAdmin}
                  />
                </Scene>

                <Scene key="contactList" title="ContactList" Iconname="ios-people" icon={TabIcon} hideNavBar={true} {...this.props} initial>
                  <Scene
                    key="ContactList"
                    component={ContactList}
                    users={this.state.users}
                    isAdmin={this.state.isAdmin}
                    openDrawer={this.openDrawer}
                  />
                  <Scene
                    key="contact"
                    component={Contact}
                    users={this.state.users}
                  />
                </Scene>

                <Scene
                  key="newStructure"
                  component={NewStructure}
                  hideNavBar={true}
                />
                
                <Scene
                  key="editStructure"
                  component={EditStructure}
                  hideNavBar={true}
                />

                <Scene
                  key="structure"
                  component={Structure}
                  isAdmin={this.state.isAdmin}
                  hideNavBar={true}/>
                <Scene
                  key="newContact"
                  component={NewContact}
                  hideNavBar={true}
                />


              </Scene>


            </Scene>
          </Router>
        </Drawer>
    );
  }
};

const styles = {
  text: {
    color: '#fff'
  },
  drawer: {
    backgroundColor: '#000',
    width: 100
  }
};


export default Root;

