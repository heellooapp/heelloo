import React, { Component } from 'react';
import {
  Text,
  View,
  ListView,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import firebase from '../utils/firebase';
import { Spinner, FloatButton } from '../components/common'

const windowHeight = Dimensions.get('window').height;

class Anniversary extends Component {
  
  constructor(props) {
    super(props);

    listView = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      anniversaryList: listView.cloneWithRows([]),
      db : [],
      loading: true,
    }
    this.handleQuery = this.handleQuery.bind(this);

  }

  componentDidMount() {
    val = this.sortContactsByDate(this.props.users);
    this.setState({ db: val });
    this.setState({
      anniversaryList: this.state.anniversaryList.cloneWithRows(val),
      loading: false
    });
  }
  
  sortContactsByDate(val) {
    work = JSON.parse(JSON.stringify(val));
    work.map(function (obj) {
      obj.isWork = true;
    });
    
    child = val.concat(work);
    sorted = child.sort( function (a, b) {
      var ad, bd;
      if (a.isWork) {
        ad = new Date(a.anniversary.firstDay);
      } else{
        ad = new Date(a.anniversary.birthday);
      }
      if (b.isWork) {
        bd = new Date(b.anniversary.firstDay);
      } else{
        bd = new Date(b.anniversary.birthday);
      }
      ad.setFullYear(1970);
      bd.setFullYear(1970);

      return new Date(ad) - new Date(bd);
    });

    for (var i = 0; i < sorted.length; i++) {
      if (sorted[0].isWork)
        first = new Date(sorted[0].anniversary.firstDay);
      else
        first = new Date(sorted[0].anniversary.birthday);
      first.setFullYear(1970);
      today = new Date();
      today.setFullYear(1970);
      if (first > today) {
        break;
      }
      first = sorted.shift();
      sorted.push(first);
    }
    return sorted;
  }
  
  handleQuery = (snapshot) => {
    val = snapshot.val() || {};
    val = this.sortContactsByDate(val);
    this.setState({ db: val });
    this.setState({
      anniversaryList: this.state.anniversaryList.cloneWithRows(val),
      loading: false
    });
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
        dataSource           = {this.state.anniversaryList}
        renderRow            = {(rowData) => this._renderRow(rowData)}
        enableEmptySections  = {true}/>
    );
  }

  _renderRow(rowData) {
    return (
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text>{rowData.firstName}</Text>
        {
          (!rowData.isWork && rowData.anniversary.birthday)
            ? <Text>b {rowData.anniversary.birthday}</Text>
            : null
        }
        {
          (rowData.isWork && rowData.anniversary.firstDay)
            ? <Text>a {rowData.anniversary.firstDay}</Text>
            : null
        }
      </View>
    );
  }

  addContact() {
    Actions.newAccount();
  }

  addStructure() {
    Actions.newStructure();

  }

  render() {
    return (
      <View style={{flex: 1, paddingBottom: 135, paddingTop: 30}}>
        {this.renderContent()}
        <FloatButton
          style={styles.floatButton}
          onContactPress={this.addContact}
          onStructurePress={this.addStructure}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
    height: windowHeight
  },
  floatButton: {
    position: 'absolute',
  }
});

export default Anniversary;
