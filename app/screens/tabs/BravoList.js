import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import Communications from 'react-native-communications';
import { Spinner, Search } from '../../common';
import images from '../../images';
import { firebase } from '../../config';
import FastImage from 'react-native-fast-image';
import firestore from '@react-native-firebase/firestore'
import { TabBravo } from '../bravo/';


class BravoList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contactList: [],
      loading: true,
      searchValue: '',
      db: [],
      toggleSearchValue: false,
    };

    this.usersRef = this.getRef().child('users');
  }

  componentWillUnmount() {
    this.usersRef.off('value', this.handleUsers);
  }

  getRef() {
    return firebase.database().ref();
  }

  async componentDidMount() {
    this.usersRef.on('value', this.handleUsers);
    const user = await firebase.auth().currentUser;
    this.setState({ user: user });

  }

  handleUsers = snapshot => {
    val = snapshot.val() || {};

    // usersArray = this.setUsersArray(val);

    this.setState({
      contactList: val,
    });
  };

  setUsersArray(val) {
    usersArray = Object.keys(val).map(key => {
      return { ...val[key], key: val[key].uid };
    });
    return usersArray;
    // return usersArray.filter(item => item.uid !== this.uid)
  }


  render() {
    // if (this.state.loading) return <Spinner />;
    return (
      <View style={{ flex: 1 }}>
        <Search
          hide
          title="Bravo"
          toggleSearchValue={this.state.toggleSearchValue}
          toggleSearch={this.toggleSearch}
          searchValue={this.state.searchValue}
          onChangeText={searchValue => this.onSearch(searchValue)}
        />
        <TabBravo users={this.state.contactList} currentUser={this.state.user} />
      </View>
    );
  }
}

export default BravoList;
