import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  Dimensions,
  ListView,
  StyleSheet,
  TouchableHighlight
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import ActionButton from 'react-native-action-button';
import Communications from 'react-native-communications';
import { SwipeListView } from 'react-native-swipe-list-view';
import firebase from '../../utils/firebase';
import images from '../../config/images';
import { Header, Spinner, FloatButton } from '../../components/common'

const width = '50%';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function vw(percentageWidth) {
  return Dimensions.get('window').width * (percentageWidth / 100);
}

function vh(percentageHeight) {
  return Dimensions.get('window').height * (percentageHeight / 100);
}

class ContactList extends Component {

  constructor(props) {
    super(props);
    listView = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      contactList: listView.cloneWithRows([]),
      loading: true,
      isList: true,
      searchValue: '',
      db : [],
    }
    // this.handleQuery = this.handleQuery.bind(this);
    this._renderRow = this._renderRow.bind(this);
    this.changeLayout = this.changeLayout.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.OnPhonePress = this.OnPhonePress.bind(this);
    this.OnTextPress = this.OnTextPress.bind(this);
  }

  componentDidMount() {
    val = this.sortContactsByName(this.props.users);
    this.setState({ db: val });
    this.setState({
      contactList: this.state.contactList.cloneWithRows(val),
      loading: false
    });

  }

  sortContactsByName(val) {
    return array.sort(function (a, b) {
      return b.firstName > a.firstName ? -1
           : b.firstName < a.firstName ? 1 : 0
    });
  }


  OnPhonePress(rowData){
    const phone = rowData.phone;
    const firstName = rowData.firstName;

    Communications.phonecall(phone.toString(), false)
  }

  OnTextPress(rowData){
    const phone = rowData.phone;
    const firstName = rowData.firstName;

    Communications.text(phone.toString(), '')
  }

  deactivateUser(data) {
    firebase.database().ref(`/users/${data.uid}`)
      .remove();
    firebase.database().ref(`/userInfo/${data.uid}`)
      .remove();
  }

  activateUser(data) {
    firebase.database().ref(`/users/${data.uid}`)
      .update({
        active: true
      });
  }
  
  renderListView(rowData) {
    const {listContainer, listProfileImage, middleSectionStyle, nameStyle, listIconStyle, positionStyle } = styles;
    return (
      <TouchableHighlight 
        underlayColor="#e6e6e6" 
        onPress={() => Actions.contact({
          uid: rowData.uid,
          isAdmin: this.props.isAdmin,
          currentUser: firebase.auth().currentUser.uid === rowData.uid
        })}
      >
        <View style={listContainer}>
          {
            rowData.profileImg
              ? <Image style={listProfileImage} source={{uri: rowData.profileImg}} />
              : <Image style={listProfileImage} source={images.avatar} />
          }
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={middleSectionStyle}>
              <Text style={nameStyle}>{rowData.firstName} {rowData.lastname}</Text>
              <Text style={positionStyle}>{rowData.position}</Text>
            </View>
            {
              rowData.phone &&
              <View style={listIconStyle}>
              </View>
            }
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  renderGridView(rowData) {
    const {gridContainer, gridProfileImage, middleSectionStyle, nameStyle, gridIconStyle, iconGridStyle, positionStyle } = styles;
    return (
      <TouchableHighlight 
        underlayColor="#e6e6e6" 
        onPress={() => Actions.contact({
          uid: rowData.uid,
          isAdmin: this.props.isAdmin,
          currentUser: firebase.auth().currentUser.uid === rowData.uid
        })}
      >
        <View style={gridContainer}>
          {
            rowData.profileImg
              ? <Image style={gridProfileImage} source={{uri: rowData.profileImg}} />
              : <Image style={gridProfileImage} source={images.avatar} />
          }
          <Text style={nameStyle}>{rowData.firstName}</Text>
          <Text style={nameStyle}>{rowData.lastname}</Text>
          <Text style={positionStyle}>{rowData.position}</Text>
          {
            rowData.phone &&
            <View style={gridIconStyle}>
                <Icon name="phone-square" size={35} color="#009e11" style={iconGridStyle} onPress={() => this.OnPhonePress(rowData)} />
                <Icon name="envelope" size={35} color="#b45f00" style={iconGridStyle} onPress={() => this.OnTextPress(rowData)} />
            </View>
          }
        </View>
      </TouchableHighlight>
    );
  }

  _renderRow(rowData) {
    if (this.state.isList) {
      return this.renderListView(rowData);
    }
    return (
      <View style={styles.gridStyle}> 
        {this.renderGridView(rowData)}
      </View>
    )
  }

  _renderHiddenRow(data) {
    if (!this.state.isList) {
      return;
    }
    rightBtn = {};
    console.log(data.active);
    if (data.active === false) {
      rightBtn = <TouchableHighlight onPress={() => this.activateUser(data)}>
                  <View style={[styles.hiddenButton, {backgroundColor: '#66ffff', width: 75}]}>
                    <Icon name="plus-circle" size={30} color="#FFF"/>
                    <Text>Activate</Text>
                  </View>
                </TouchableHighlight>
    } else {
      rightBtn = <TouchableHighlight onPress={() => this.deactivateUser(data)}>
                  <View style={[styles.hiddenButton, {backgroundColor: '#FF6666', width: 75}]}>
                    <Icon name="minus-circle" size={30} color="#FFF"/>
                    <Text>Delete</Text>
                  </View>
                </TouchableHighlight>
    }
    return (
      <View style={styles.listHiddenRow}>
        <View style={styles.hiddenPhoneButtons}>
          <TouchableHighlight onPress={() => this.OnPhonePress(data)}>
            <View style={[styles.hiddenButton, {backgroundColor: '#009e11', width: 50}]}>
              <Icon name="phone-square" size={30} color="#FFF"/>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => this.OnTextPress(data)}>
            <View style={[styles.hiddenButton, {backgroundColor: '#b45f00', width: 50}]}>
              <Icon name="envelope" size={30} color="#FFF"/>
            </View>
          </TouchableHighlight>
        </View>
        {
          this.props.isAdmin
            ? rightBtn
            : null
        }
      </View>
    );
  }
 
  renderContent() {
    if (this.state.loading) {
      return (
        <View style={{marginTop: 200}}>
          <Spinner />
        </View>
      );
    }
    const { listView, gridView } = styles;
    listViewStyle  = null;
    leftOpenValue  = 0;
    rightOpenValue = 0;
    if (this.props.isAdmin)
      rightOpenValue = -75;
    if (!this.state.isList) {
      listViewStyle = StyleSheet.flatten([listView, gridView]);
      rightOpenValue = 0;
    } else {
      listViewStyle = listView;
      leftOpenValue = 100;
    }
    return (
      <SwipeListView
        key={this.state.isList}
        contentContainerStyle = {listViewStyle}
        dataSource           = {this.state.contactList}
        renderRow            = {(rowData) => this._renderRow(rowData)}
        renderHiddenRow      = {(data) => this._renderHiddenRow(data)}
        enableEmptySections  = {true}
        leftOpenValue={leftOpenValue}
        rightOpenValue={rightOpenValue}
      />
    );
  }

  changeLayout(isList) {
    if (isList) {
      this.setState({
        isList: isList
      });
    } else {
      this.setState({
        isList: isList
      });
    }
  }

  filterNotes(searchValue, notes) {
    let text = searchValue.toString().toLowerCase();;
    return notes.filter((n, i) => {
      let note = n.firstName.toString().toLowerCase();
      return note >= text;
    });
  }

  onSearch(searchValue) {
    this.setState({ searchValue });
    let filteredData = this.filterNotes(searchValue, this.state.db);

    this.setState({ contactList: this.state.contactList.cloneWithRows(filteredData) });
  }

  addContact() {
    Actions.newContact();
  }

  addStructure() {
    Actions.newStructure();
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          openDrawer={this.props.openDrawer}
          onListPress = {(isList) => this.changeLayout(isList)}
          searchValue = {this.state.searchValue}
          onChangeText = {searchValue => this.onSearch(searchValue)} />
        {this.renderContent()}
        {
          this.props.isAdmin &&
          <FloatButton
            style={styles.floatButton}
            onContactPress={this.addContact}
            onStructurePress={this.addStructure}/>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    paddingBottom: 60, 
    backgroundColor: '#eee'
  },
  gridView: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  floatButton: {
    position: 'absolute',
  },
  listHiddenRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    top: 0,
    bottom: 0,
  },
  hiddenPhoneButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  hiddenButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    padding: 5,
    backgroundColor: '#fff',
    marginLeft: 10,
    marginRight: 10,
  },
  gridContainer: {
    width: windowWidth / 2 - 20,
    height: 300,
    marginTop: 10,
    paddingTop: 10,
    paddingRight: 10,
    paddingLeft: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  listProfileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderColor: '#eee',
    borderWidth: 1
  },
  gridProfileImage: {
    width: windowWidth <= 320 ? 120 : 140,
    height: windowWidth <= 320 ? 120 : 140,
    borderRadius: windowWidth <= 320 ? 60 : 70,
    borderColor: '#eee',
    borderWidth: 1,
    marginBottom: 12
  },
  middleSectionStyle: {
    marginLeft: 12,
    justifyContent: 'center',
  },
  positionStyle: {
    fontSize: 13,
    paddingTop: 5
  },
  nameStyle: {
    color: '#000',
    fontSize: windowWidth <= 320 ? 14 : 17,
    fontWeight: 'bold'
  },
  listIconStyle: {
    marginRight: 5
  },
  gridIconStyle: {
    bottom: 0,
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
  iconGridStyle: {
    marginTop: 15,
    marginRight: 10
  }
});

export { ContactList };
