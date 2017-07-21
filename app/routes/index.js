import React, { Component } from 'react';
import { Text, View, Image, Dimensions } from 'react-native';
import { Router, Scene } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import images from '../config/images';
import Anniversary from './Anniversary';
import Contact from './Contact';
import { Spinner } from '../components/common'
import firebase from '../utils/firebase';

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

  constructor() {
    super();

    this.state = {
      loading: true,
      users: null
    }
  }

  componentDidMount() {
    ref = firebase.database().ref('users');
    ref.on('value', this.handleQuery);
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
      <Router>
        <Scene key="root">
          <Scene
            key="tabbar"
            tabs={true}
            tabBarStyle={{ backgroundColor: '#6fa8dc', height: 60 }}
          >
            <Scene key="anniversary" title="Anniversary" Iconname="ios-notifications-outline" icon={TabIcon} hideNavBar={true}>
              <Scene
                key="scarlet"
                component={Anniversary}
                title="Scarlet"
                tintColor='#6fa8dc'
                users={this.state.users}
              />
            </Scene>

            <Scene key="contact" title="Contact" Iconname="ios-people" icon={TabIcon} hideNavBar={true} initial>
              <Scene
                key="blue"
                component={Contact}
                title="Blue"
                users={this.state.users}
              />
            </Scene>
          </Scene>
        </Scene>
      </Router>
    );
  }
};

const styles = {
  text: {
    color: '#fff'
  }
};


export default Root;
