import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ListView
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Header } from '../components/common'
import firebase from '../utils/firebase';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class Contact extends Component {

  constructor() {
    super();

    listView = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      contactList: listView.cloneWithRows([])
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
    });
  }

  _renderRow(rowData) {
    console.log(rowData);
    return (
      <View>
        <Text style={{color: '#000'}}>{rowData.name}</Text>
      </View>
    );
  }

  render() {
    return (
      <View >
        <Header />
        <View style={styles.container}>
          <ListView
            dataSource          = {this.state.contactList}
            renderRow           = {(rowData) => this._renderRow(rowData)}
            enableEmptySections = {true}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'green',
    width: windowWidth,
    height: windowHeight,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default Contact;
