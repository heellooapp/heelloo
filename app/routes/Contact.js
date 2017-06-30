import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  Dimensions,
  ListView
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Header, Spinner } from '../components/common'
import firebase from '../utils/firebase';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class Contact extends Component {

  constructor() {
    super();

    listView = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      contactList: listView.cloneWithRows([]),
      loading: true,
      isList: false,
    }
    this.handleQuery = this.handleQuery.bind(this);
    this._renderRow = this._renderRow.bind(this);
  }

  componentDidMount() {
    ref = firebase.database().ref('users');
    ref.on('value', this.handleQuery)
  }
  
  handleQuery = (snapshot) => {
    val = snapshot.val() || {};

    console.log(this.state);
    this.setState({
      contactList: this.state.contactList.cloneWithRows(val),
      loading: false
    });
  }

  renderListView(rowData) {
    const {listContainer, listProfileImage, middleSectionStyle, nameStyle, listIconStyle } = styles;
    return (
      <View style={listContainer}>
        <Image
          style={listProfileImage}
          source={{uri: rowData.profile_img}} />
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={middleSectionStyle}>
            <Text style={nameStyle}>{rowData.name}</Text>
            <Text style={{}}>{rowData.position}</Text>
          </View>
          {
            rowData.phone &&
            <View style={listIconStyle}>
              <Icon name="phone-square" size={30} color="green" />
              <Icon name="envelope" size={27} color="orange" />
            </View>
          }
        </View>
      </View>
    );

  }

  renderGridView(rowData) {
    const {gridContainer, gridProfileImage, middleSectionStyle, nameStyle, gridIconStyle, iconStyle } = styles;
    return (
      <View style={gridContainer}>
        <Image
          style={gridProfileImage}
          source={{uri: rowData.profile_img}} />
        <Text style={nameStyle}>{rowData.name}</Text>
        <Text style={{}}>{rowData.position}</Text>
        {
          rowData.phone &&
          <View style={gridIconStyle}>
              <Icon name="phone-square" size={35} color="green" style={iconStyle} />
              <Icon name="envelope" size={33} color="orange" style={iconStyle} />
          </View>
        }
      </View>
    );
  }

  _renderRow(rowData) {
    if (this.state.isList) {
      return this.renderListView(rowData);
    }
    return this.renderGridView(rowData);
  }

  renderContent() {
    if (this.state.loading) {
      return (
        <View style={{marginTop: 200}}>
          <Spinner />
        </View>
      );
    }
    return (
      <ListView
        contentContainerStyle = {styles.gridView}
        dataSource           = {this.state.contactList}
        renderRow            = {(rowData) => this._renderRow(rowData)}
        enableEmptySections  = {true}
      />
    );
  }

  render() {
    return (
      <View style={{}}>
        <Header />
        {this.renderContent()}
      </View>
    );
  }
}

const styles = {
  listView: {
  },
  gridView: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  listContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
    padding: 5,
    backgroundColor: '#cce5ff',
    borderRadius: 5
  },
  gridContainer: {
    width: 190,
    height: 260,
    margin: 7,
    paddingTop: 20,
    alignItems: 'center',
    backgroundColor: '#cce5ff',
    borderRadius: 5
  },
  listProfileImage: {
    width: 60,
    height: 60,
    borderRadius: 30
  },
  gridProfileImage: {
    width: 150,
    height: 150,
    borderRadius: 75
  },
  middleSectionStyle: {
    marginLeft: 12,
  },
  nameStyle: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold'
  },
  listIconStyle: {
    marginRight: 5
  },
  gridIconStyle: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginRight: 20,
    justifyContent: 'center'
  },
  iconStyle: {
    padding: 3,
  }
};

export default Contact;
