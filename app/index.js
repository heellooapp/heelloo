import React, { Component } from 'react';
import { Text, View, Image, Dimensions } from 'react-native';
import { Router, Scene } from 'react-native-router-flux';
import images from './config/images';
import Anniversary from './routes/Anniversary';
import Contact from './routes/Contact';
import Icon from 'react-native-vector-icons/Ionicons';

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
    );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  textWrapper: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: '#fff',
  }
};

export default TeamOn;
