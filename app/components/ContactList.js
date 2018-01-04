import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  Dimensions,
  ListView,
  Keyboard,
  StyleSheet,
  Platform,
  TouchableOpacity,
  TextInput,
  TouchableHighlight,
} from 'react-native';
import {contactListStyles} from './styles';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import Communications from 'react-native-communications';
import {SwipeListView} from 'react-native-swipe-list-view';
import {Spinner, Search} from './common';
import images from '../images';
import {firebase} from '../config';

const deleteUserURL =
  'https://us-central1-teamon-68ca0.cloudfunctions.net/deleteUser';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class ContactList extends Component {
  constructor(props) {
    super(props);

    listView = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      contactList: listView.cloneWithRows([]),
      loading: true,
      searchValue: '',
      db: [],
      toggleSearchValue: false,
    };

    this.usersRef = this.getRef().child('users');
    this.onSearch = this.onSearch.bind(this);
    this.toggleSearch = this.toggleSearch.bind(this);
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

    usersArray = this.setUsersArray(val);
    sortedContacts = this.sortContactsByName(usersArray);

    this.setState({
      db: sortedContacts,
      contactList: this.state.contactList.cloneWithRows(sortedContacts),
    });

    this.isLoading(false);
  };

  toggleSearch = () => {
    this.setState({
      searchValue: '',
      toggleSearchValue: !this.state.toggleSearchValue,
    });
    this.onSearch('');
  };

  onSearch(searchValue) {
    this.setState({searchValue});
    let filteredData = this.filterNotes(searchValue, this.state.db);

    this.setState({
      contactList: this.state.contactList.cloneWithRows(filteredData),
    });
  }

  filterNotes(searchValue, notes) {
    let text = searchValue.toString().toLowerCase();
    return notes.filter((n, i) => {
      let note = n.firstName.toString().toLowerCase();
      return note.match(text);
    });
  }

  isLoading = loading => {
    this.setState({loading});
  };

  setUsersArray(val) {
    usersArray = Object.keys(val).map(key => {
      return val[key];
    });
    return usersArray;
  }

  sortContactsByName(val) {
    return val.sort(function(a, b) {
      return b.firstName > a.firstName ? -1 : b.firstName < a.firstName ? 1 : 0;
    });
  }

  onPhonePress(rowData) {
    const {phone, firstName} = rowData;
    phone && Communications.phonecall(phone.toString(), false);
  }

  onEmailPress(rowData) {
    const email = rowData.email;
    email &&
      Communications.email(
        [email.toString()],
        null,
        null,
        'My Subject',
        'My body text',
      );
  }

  onMessagePress() {
    const {phone, firstName} = this.state.user;
    phone &&
      firstName &&
      Communications.text(phone.toString(), `Hi, ${firstName}`);
  }

  onEditPress(rowData) {
    Actions.editContact({uid: rowData.uid});
  }

  onDeletePress({rowData, rowMap, secId, rowId}) {
    rowMap[`${secId}${rowId}`].closeRow();

    const listContact = [...this.state.db];
    listContact.splice(rowId, 1);
    this.setState({db: listContact});

    fetch(deleteUserURL + '?uid=' + rowData.uid, {
      method: 'POST',
    }).catch(err => console.log(err));
  }

  _renderRow(rowData) {
    return this.renderListView(rowData);
  }

  _renderHiddenRow(rowData, secId, rowId, rowMap) {
    const {listHiddenRow, hiddenBtn} = contactListStyles;
    return (
      <View style={listHiddenRow}>
        <View style={hiddenBtn}>
          {this.hiddenBtn({
            icon: images.call,
            color: '#3AD265',
            title: 'Call',
            type: 'call',
            rowData: rowData,
          })}
          {this.hiddenBtn({
            icon: images.message,
            color: '#3AD265',
            title: 'Message',
            type: 'message',
            rowData: rowData,
          })}
          {this.hiddenBtn({
            icon: images.mail,
            color: '#2A8AED',
            title: 'Mail',
            type: 'mail',
            rowData: rowData,
          })}
        </View>
        <View style={hiddenBtn}>
          {this.hiddenBtn({
            icon: images.pencil,
            color: '#FBB314',
            title: 'Edit',
            rowData: rowData,
            type: 'edit',
          })}
          {this.hiddenBtn({
            icon: images.trash,
            color: '#E92C2C',
            title: 'Delete',
            rowMap: rowMap,
            secId: secId,
            rowId: rowId,
            rowData: rowData,
            type: 'delete',
          })}
        </View>
      </View>
    );
  }

  hiddenBtn({icon, color, title, rowMap, secId, rowId, rowData, type}) {
    const {
      hiddenBtnView,
      hiddenBtnIcon,
      hiddenBtnImage,
      hiddenBtnText,
    } = contactListStyles;

    const data = {
      rowData: rowData,
      rowMap: rowMap,
      secId: secId,
      rowId: rowId,
      type: type,
    };

    return (
      <TouchableHighlight onPress={() => this.rowPress(data)}>
        <View
          style={[
            hiddenBtnView,
            {
              backgroundColor: color,
              width: windowWidth <= 320 ? 60 : 75,
            },
          ]}>
          <Image source={icon} style={hiddenBtnImage} />
          <Text style={hiddenBtnText}>{title}</Text>
        </View>
      </TouchableHighlight>
    );
  }

  rowPress(data) {
    const {rowData, rowMap, secId, rowId, type} = data;
    switch (type) {
      case 'call':
        this.onPhonePress(rowData);
        break;
      case 'message':
        this.onMessagePress(rowData);
        break;
      case 'mail':
        this.onEmailPress(rowData);
        break;
      case 'edit':
        this.onEditPress(rowData);
        break;
      case 'delete':
        this.onDeletePress({rowData, rowMap, secId, rowId});
        break;
    }
  }

  renderListView(rowData) {
    const {
      listContainer,
      listItemName,
      middleSectionStyle,
      nameStyle,
      positionStyle,
      listIconStyle,
    } = contactListStyles;
    return (
      <TouchableHighlight
        underlayColor="#e6e6e6"
        onPress={() => this.onPressListItem(rowData)}>
        <View style={listContainer}>
          {this.showAvatar(rowData.profileImg)}
          <View style={listItemName}>
            <View style={middleSectionStyle}>
              <Text style={nameStyle}>
                {rowData.firstName} {rowData.lastname}
              </Text>
              <Text style={positionStyle}>{rowData.position}</Text>
            </View>
            {rowData.phone && <View style={listIconStyle} />}
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  showAvatar(profileImg) {
    const {listProfileImage} = contactListStyles;
    if (profileImg) {
      return <Image source={{uri: profileImg}} style={listProfileImage} />;
    } else {
      return <Image source={images.avatar} style={listProfileImage} />;
    }
  }

  onPressListItem(rowData) {
    Actions.profile({
      uid: rowData.uid,
      isAdmin: this.props.isAdmin,
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

  render() {
    if (this.state.loading) return <Spinner />;
    return (
      <View>
        <Search
          title="CONTACT"
          toggleSearchValue={this.state.toggleSearchValue}
          toggleSearch={this.toggleSearch}
          searchValue={this.state.searchValue}
          onChangeText={searchValue => this.onSearch(searchValue)}
        />
        <SwipeListView
          style={{marginBottom: Platform.os == 'android' ? 50 : 70}}
          dataSource={this.state.contactList}
          renderRow={rowData => this._renderRow(rowData)}
          renderHiddenRow={(rowData, secdId, rowId, rowMap) =>
            this._renderHiddenRow(rowData, secdId, rowId, rowMap)
          }
          closeOnRowPress={true}
          enableEmptySections={true}
          disableLeftSwipe={this.requireAdmin()}
          stopLeftSwipe={this.leftSwipeSize()}
          stopRightSwipe={this.rightSwipeSize()}
          leftOpenValue={this.leftSwipeSize()}
          rightOpenValue={this.rightSwipeSize()}
        />
      </View>
    );
  }
}

export default ContactList;
