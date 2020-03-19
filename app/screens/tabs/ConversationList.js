import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  Dimensions,
  Keyboard,
  StyleSheet,
  Platform,
  TouchableOpacity,
  TextInput,
  TouchableHighlight,
  FlatList,
} from 'react-native';
import { contactListStyles } from '../../styles';
import { conversationListStyles } from '../../styles';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import Communications from 'react-native-communications';
// import { SwipeListView } from 'react-native-swipe-list-view';
import { Spinner, Search } from '../../common';
import images from '../../images';
import { firebase } from '../../config';
import FastImage from 'react-native-fast-image';
import moment from "moment";


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class ConversationList extends Component {
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

  getRef() {
    return firebase.database().ref();
  }

  componentWillUnmount() {
    this.usersRef.off('value', this.handleUsers);
    this.unsubscribe && this.unsubscribe()
  }

  async componentDidMount() {
    const user = await firebase.auth().currentUser;
    if (user) {
      this.uid = user.uid;
      this.unsubscribe = firebase.firestore().collection("conversation")
        .where('users', "array-contains", this.uid)
        // .orderBy('last_update')
        .onSnapshot(snapshot => {
          let lastchats = [];
          if (snapshot)
            snapshot.forEach(doc => {
              var users = doc.data().users;
              var ind = users.indexOf(this.uid)
              var obj = doc.data();
              if (ind !== -1) users.splice(ind, 1);
              if (users.length > 0) {
                obj.user = users[0];
              }
              if ('last_update' in obj)
                lastchats.push(obj);
            });
          this.setState({ lastchats: lastchats });
        });
    }
    this.usersRef.once('value').then(this.handleUsers);
  }

  handleUsers = snapshot => {
    val = snapshot.val() || {};

    usersArray = this.setUsersArray(val);
    sortedContacts = this.sortContactsByName(usersArray);

    this.setState({
      db: sortedContacts,
      contactList: sortedContacts,
    });

    this.setState({ loading: false });
  };

  toggleSearch = () => {
    // this.setState({
    //   searchValue: '',
    //   toggleSearchValue: !this.state.toggleSearchValue,
    // });
    // this.onSearch('');
  };

  onSearch = (searchValue) => {
    // this.setState({ searchValue });
    // let filteredData = this.filterNotes(searchValue, this.state.db);
    // this.setState({
    //   contactList: filteredData,
    // });
  }

  filterNotes(searchValue, notes) {
    let text = searchValue.toString().toLowerCase();
    return notes.filter((n, i) => {
      let note = n.firstName.toString().toLowerCase();
      return note.match(text);
    });
  }

  setUsersArray(val) {
    usersArray = Object.keys(val).map(key => {
      return { ...val[key], key: val[key].uid };
    });
    return usersArray.filter(item => item.uid !== this.uid)
  }

  sortContactsByName(val) {
    return val.sort(function (a, b) {
      return b.firstName > a.firstName ? -1 : b.firstName < a.firstName ? 1 : 0;
    });
  }


  _renderRow(rowData) {
    return this.renderListView(rowData);
  }

  renderListView(rowData) {
    const {
      listContainer,
      listItemName,
      middleSectionStyle,
      nameStyle,
      positionStyle,
      listIconStyle,
    } = conversationListStyles;
    let ago = '';
    if (rowData.item.last_update) {
      dateToFormat = (new Date(rowData.item.last_update._seconds * 1000));
      ago = moment(dateToFormat).fromNow();
    }
    return (
      <TouchableHighlight
        underlayColor="#e6e6e6"
        onPress={() => this.onPressListItem(rowData)}>
        <View style={listContainer}>
          {this.showAvatar(rowData.item.profileImg)}
          <View style={listItemName}>
            <View style={middleSectionStyle}>
              <Text style={nameStyle}>
                {rowData.item.firstName}
              </Text>
              <Text style={positionStyle}>{ago}</Text>
            </View>
            <Text style={positionStyle}>{rowData.item.last_message}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  showAvatar(profileImg) {
    const { chatProfileImage } = contactListStyles;
    if (profileImg) {
      return <FastImage source={{ uri: profileImg }} style={chatProfileImage} />;
    } else {
      return <Image source={images.avatar} style={chatProfileImage} />;
    }
  }

  onPressListItem(rowData) {
    Actions.chat({
      uid: rowData.item.uid,
    });
  }

  requireAdmin() {
    return !this.props.isAdmin;
  }

  leftSwipeSize() {
    return windowWidth <= 320 ? 180 : 225;
  }

  rightSwipeSize() {
    return windowWidth <= 320 ? -120 : -150;
  }

  merge = (contactList, lastchats) => {
    // if (contactList.length > 0 && lastchats) {
    //   contactList = contactList.map((item) => {
    //     let ind = lastchats.findIndex(x => x.user === item.uid);
    //     return { ...item, ...lastchats[ind] };
    //   });
    // }
    let sorted = []
    let tmp = [].concat(contactList || []);
    let tmp_lastchats = [].concat((lastchats || []));

    if (tmp_lastchats && tmp_lastchats.length > 0) {
      tmp_lastchats.sort((a, b) => a.last_update._seconds < b.last_update._seconds);
      tmp_lastchats.forEach((item) => {
        let ind = tmp.findIndex(x => item.user === x.uid);
        if (ind != -1) {
          let obj = { ...item, ...tmp[ind] };
          tmp.splice(ind, 1)
          sorted.push(obj);
        }
      });
    }
    return [...sorted, ...tmp];
  }
  render() {
    const { loading, toggleSearchValue, contactList, lastchats } = this.state
    if (loading) return <Spinner />;
    const mergedData = this.merge(contactList, lastchats);
    // console.log(mergedData);
    return (
      <View>
        <Search
          title="Conversation"
          toggleSearchValue={true}
          toggleSearch={this.toggleSearch}
          searchValue={this.state.searchValue}
          onChangeText={searchValue => this.onSearch(searchValue)}
        />
       
        <FlatList
          useFlatList={true}
          style={{ marginBottom: Platform.os == 'android' ? 50 : 70 }}
          data={mergedData}
          renderItem={rowData => this._renderRow(rowData)}
        />
      </View>
    );
  }
}

export default ConversationList;
