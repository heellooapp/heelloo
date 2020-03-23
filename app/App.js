// import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { Text, View, Image, Dimensions, StatusBar } from 'react-native';
import { Card, CardSection, Input, Button, Spinner } from './common';
import { Login, ForgetPassword } from './screens/unauth';
// import Root from './screens/root/Root';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import { NavigationContainer } from '@react-navigation/native';
import Sidemenu from './screens/root/Sidemenu';
import { Anniversary, Bravo, Contact, Conversation } from './screens/tabs';
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { Structure, NewStructure } from './screens/structure/';
import { Profile, NewContact, EditContact } from './screens/contact';
import { AddBravo } from './screens/bravo';
import Chat from './screens/conversations/chat'
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

// console.disableYellowBox = true;


function Home() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Contact"
        component={Contact}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="ios-contacts" color={color} size={26} />
          ),
        }} />
      <Tab.Screen name="Anniversary"
        component={Anniversary}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="ios-happy" color={color} size={26} />
          ),
        }} />
      <Tab.Screen name="Bravo"
        component={Bravo}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="ios-medal" color={color} size={26} />
          ),
        }} />
      <Tab.Screen name="Conversation"
        component={Conversation}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="ios-chatboxes" color={color} size={26} />
          ),
        }} />
    </Tab.Navigator>
  );
}
function Root() {
  return (
    <Drawer.Navigator drawerContent={props => <Sidemenu {...props} />}>
      <Drawer.Screen name="home" component={Home} />
    </Drawer.Navigator>);
}
class TeamOn extends Component {


  constructor(props) {
    super(props);
    this.state = {
      name: null
    };
  }


  componentDidMount() {

    auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ name: 'root' });
      } else {
        this.setState({ name: 'login' });
      }
    });

    messaging().requestPermission().then(() => {
      messaging().getToken()
        .then(fcmToken => {
          if (fcmToken) {
            // user has a device token
          } else {
            // user doesn't have a device token yet
          }
        });
    });

  }
  change = (name) => {
    this.setState({ name });
  }
  renderContent() {
    switch (this.state.name) {
      case 'root':
        return <Root />;
      case 'login':
        return <Login change={this.change} />;
      case 'forgetpassword':
        return <ForgetPassword change={this.change} />;
      default:
        return <Spinner />;
    }
  }

  render() {
    const { name } = this.state;
    return (
      <NavigationContainer>
        <Stack.Navigator>
          {name != 'root' ?
            <>
              <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
              <Stack.Screen name="ForgetPassword" options={{ title: 'Forget Password' }} component={ForgetPassword} />
            </>
            :
            <>
              <Stack.Screen name="Root" component={Root} options={{ headerShown: false }} />
              <Stack.Screen name="Structure" component={Structure} options={{ headerShown: false }} />
              <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
              <Stack.Screen name="Chat" component={Chat} options={{ headerShown: false }} />
              <Stack.Screen name="EditContact" component={EditContact} options={{ headerShown: false }} />
              <Stack.Screen name="AddBravo" component={AddBravo} options={{ headerShown: false }} />
              <Stack.Screen name="NewContact" component={NewContact} options={{ headerShown: false }} />
              <Stack.Screen name="NewStructure" component={NewStructure} options={{ headerShown: false }} />
            </>
          }
        </Stack.Navigator>
      </NavigationContainer >
    );
  }
}

export default TeamOn;
