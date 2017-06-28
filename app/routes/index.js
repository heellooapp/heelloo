import React, { Component } from 'react';
import { Text, View, Image, Dimensions } from 'react-native';
import { Router, Scene } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import images from '../config/images';
import Anniversary from './Anniversary';
import Contact from './Contact';

var width = Dimensions.get('window').width;

const TabIcon = ({ selected, title, Iconname }) => {
  return (
    <View style={{ backgroundColor: selected ? '#2b78e4' : '#6fa8dc', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: width * .5,  padding: 10 }}>
      <Icon name={Iconname} size={30} color="#fff" />
      <Text style={styles.text}> {title} </Text>
    </View>
  );
}

class TeamOn extends Component {
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene
            key="tabbar"
            tabs={true}
            tabBarStyle={{ backgroundColor: '#6fa8dc', height: 60 }}
          >
            <Scene key="anniversary" title="Anniversary" Iconname="ios-notifications-outline" icon={TabIcon}>
              <Scene
                key="scarlet"
                component={Anniversary}
                title="Scarlet"
              />
            </Scene>

            <Scene key="contact" title="Contact" Iconname="ios-people" icon={TabIcon} initial>
              <Scene
                key="blue"
                component={Contact}
                title="Blue"
              />
            </Scene>
          </Scene>
        </Scene>
      </Router>
    )
  }
};


export default TeamOn;
