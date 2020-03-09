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

    // firebase.database().ref().child('bravo').on('value', (snapshot) => {
    //   console.log(snapshot);
    // });

    // firestore().collection("bravo").get().then(querySnapshot => {
    //   querySnapshot.docs.map(doc => {
    //     doc.data().user.get().then((res) => {
    //       console.log(res.data());
    //     });
    //     // console.log('LOG 1', doc.data());
    //     return doc.data();
    //   });
    // });
    this.usersRef = this.getRef().child('users');

  }

  componentWillUnmount() {
    this.usersRef.off('value', this.handleUsers);
  }

  getRef() {
    return firebase.database().ref();
  }

  componentDidMount() {
    this.usersRef.on('value', this.handleUsers);
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
      <View style={{ flex: 1, backgroundColor: 'red' }}>
        <Search
          title="Bravo"
          toggleSearchValue={this.state.toggleSearchValue}
          toggleSearch={this.toggleSearch}
          searchValue={this.state.searchValue}
          onChangeText={searchValue => this.onSearch(searchValue)}
        />
        <TabBravo users={this.state.contactList} />
      </View>
    );
  }
}

export default BravoList;
