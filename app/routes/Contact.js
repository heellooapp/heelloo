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
import { Header, Spinner, FloatButton } from '../components/common'
import firebase from '../utils/firebase';
import images from '../config/images';
import ActionButton from 'react-native-action-button';
import Communications from 'react-native-communications';
import { SwipeListView } from 'react-native-swipe-list-view';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class Contact extends Component {

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

  deleteUser(data) {
    console.log(data);
  }
  
  renderListView(rowData) {
    const {listContainer, listProfileImage, middleSectionStyle, nameStyle, listIconStyle, positionStyle } = styles;
    return (
      <TouchableHighlight 
        underlayColor="#e6e6e6" 
        onPress={() => Actions.profile({
          uid: rowData.uid,
          isAdmin: this.props.isAdmin,
          currentUser: firebase.auth().currentUser.uid === rowData.uid
        })}
      >
        <View style={listContainer}>
          {
            rowData.profile_img
              ? <Image style={listProfileImage} source={{uri: rowData.profile_img}} />
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
    const {gridContainer, gridProfileImage, middleSectionStyle, nameStyle, gridIconStyle, iconStyle, iconGridStyle, positionStyle, lastNameStyle } = styles;
    return (
      <TouchableHighlight 
        underlayColor="#e6e6e6" 
        onPress={() => Actions.profile({
          uid: rowData.uid,
          isAdmin: this.props.isAdmin
        })}
      >
        <View style={gridContainer}>
          {
            rowData.profile_img
              ? <Image style={gridProfileImage} source={{uri: rowData.profile_img}} />
              : <Image style={gridProfileImage} source={images.avatar} />
          }
          <Text style={nameStyle}>{rowData.firstName}</Text>
          <Text style={lastNameStyle}>{rowData.lastname}</Text>
          <Text style={positionStyle}>{rowData.position}</Text>
          {
            rowData.phone &&
            <View style={gridIconStyle}>
                <Icon name="envelope" size={28} color="#b45f00" style={iconGridStyle} onPress={() => this.OnTextPress(rowData)} />
                <Icon name="phone-square" size={30} color="#009e11" style={iconStyle} onPress={() => this.OnPhonePress(rowData)} />
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
    return this.renderGridView(rowData);
  }

  _renderHiddenRow(data) {
    if (!this.state.isList) {
      return;
    }
    return (
      <View style={styles.listHiddenRow}>
        <View style={styles.hiddenPhoneButtons}>
          <TouchableHighlight onPress={() => this.OnPhonePress(data)}>
            <View style={[styles.hiddenButton, {backgroundColor: '#b45f00', width: 50}]}>
              <Icon name="phone-square" size={30} color="#FFF"/>
              <Text>Call</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => this.OnTextPress(data)}>
            <View style={[styles.hiddenButton, {backgroundColor: '#009e11', width: 50}]}>
              <Icon name="envelope" size={30} color="#FFF"/>
              <Text>SMS</Text>
            </View>
          </TouchableHighlight>
        </View>
        {
          this.props.isAdmin &&
          <TouchableHighlight onPress={() => this.deleteUser(data)}>
            <View style={[styles.hiddenButton, {backgroundColor: 'red', width: 75}]}>
              <Icon name="trash-o" size={30} color="#FFF"/>
              <Text>Delete</Text>
            </View>
          </TouchableHighlight>
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
    if (!this.state.isList) {
      listViewStyle = StyleSheet.flatten([listView, gridView]);
    } else {
      listViewStyle = listView;
      leftOpenValue = 100;
    }
    if (this.props.isAdmin)
      rightOpenValue = -75;
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
    Actions.newAccount();
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
    flex: 1,
    height: 300,
    margin: 7,
    paddingTop: 20,
    paddingRight: 14,
    paddingLeft: 14,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 5
  },
  listProfileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderColor: '#eee',
    borderWidth: 1
  },
  gridProfileImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
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
    fontSize: 17,
    fontWeight: 'bold'
  },
  lastNameStyle: {
    color: '#000',
    fontSize: 17,
    fontWeight: 'bold'
  },
  listIconStyle: {
    marginRight: 5
  },
  gridIconStyle: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
  iconStyle: {
    marginTop: 13
  },
  iconGridStyle: {
    marginTop: 15,
    marginRight: 10
  }
});

export default Contact;
