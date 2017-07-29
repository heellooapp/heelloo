import React, { Component } from 'react';
import {
  Text,
  View,
  ListView,
  ScrollView,
  Dimensions,
  StyleSheet,
  TouchableOpacity
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
      loading: true,
      today: false,
    }
    this.handleQuery = this.handleQuery.bind(this);

  }

  componentDidMount() {
    val = this.sortContactsByDate(this.props.users);
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

    filtered = child.filter( (obj) => {
      if (obj.anniversary) {
        if (obj.anniversary.birthday && !obj.isWork) {
          return true;
        }
        if (obj.anniversary.firstDay && obj.isWork) {
          return true;
        }
      }
      return false;
    });

    sorted = filtered.sort( function (a, b) {
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

    today = new Date();
    today.setFullYear(1970);
    today.setHours(0, 0, 0, 0);
    for (var i = 0; i < sorted.length; i++) {
      if (sorted[0].isWork)
        first = new Date(sorted[0].anniversary.firstDay);
      else
        first = new Date(sorted[0].anniversary.birthday);
      first.setFullYear(1970);
      first.setHours(0, 0, 0, 0);
      if (first >= today) {
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
      <ScrollView>
        <ListView 
          dataSource           = {this.state.anniversaryList}
          renderRow            = {(rowData) => this._renderRow(rowData)}
          enableEmptySections  = {true}/>
      </ScrollView>
    );
  }

  _renderRow(rowData) {
    return (
      <View>
        {
          (!rowData.isWork && rowData.anniversary.birthday)
            ?
          <TouchableOpacity> 
            <View style={styles.mainContainer}>
              <View style={styles.secondContainer}>
                <Text style={styles.name}>{rowData.firstName} {rowData.lastname}</Text>
                <Text>Happy 35-year birthday!</Text>
              </View>
              <View style={styles.dateBirth}>
                <Text style={styles.dateBirthtext}>{rowData.anniversary.birthday}</Text>
              </View>
            </View>
          </TouchableOpacity>
          : null
        }
        {
          (rowData.isWork && rowData.anniversary.firstDay)
            ?
            <TouchableOpacity>
              <View style={styles.mainContainer}>
                <View style={styles.secondContainer}>
                  <Text style={styles.name}>{rowData.firstName} {rowData.lastname}</Text>
                  <Text>Happy 4-year work anniversary!</Text>
                </View> 
                <View style={styles.dateWork}>
                  <Text style={styles.dateWorktext}>{rowData.anniversary.firstDay}</Text>
                </View>
              </View>
            </TouchableOpacity>
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
      <View style={styles.container}>
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
  mainContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    marginBottom: 5,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 3
  },
  secondContainer: {
    padding: 10
  },
  container: {
    flex: 1, 
    paddingBottom: 65, 
    paddingTop: 30,
    backgroundColor: '#eee'
  },
  floatButton: {
    position: 'absolute',
  },
  dateBirth: {
    backgroundColor: '#fae6e6',
    padding: 20
  },
  dateBirthtext: {
    color: '#e06666'
  },
  dateWorktext: {
    color: '#009e11'
  },
  dateWork: {
    backgroundColor: '#edf5ea',
    padding: 20
  },
});

export default Anniversary;
