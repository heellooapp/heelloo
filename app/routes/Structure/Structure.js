import React, { Component } from 'react';
import {
  Text,
  View,
  Platform,
  ListView,
  DataSource,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import Collapsible from 'react-native-collapsible'
import { Spinner } from '../../components/common'
import firebase from '../../utils/firebase';

class CollapsibleWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true
    }
    this.renderContacts = this.renderContacts.bind(this);
    this.handleContacts = this.handleContacts.bind(this);
    this.renderPerContact = this.renderPerContact.bind(this);
  }

  componentDidMount() {
    const structure = this.props.structure;

    ref = firebase.database().ref('users');
    ref.orderByChild('structure')
      .equalTo(structure.id)
      .on('value', this.handleContacts);
  }

  handleContacts(snapshot) {
    val = snapshot.val() || {};
    contacts = Object.keys(val).map(function (key) {
      return val[key];
    });
    listView = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.setState({ contactList: listView.cloneWithRows(contacts) });
  }

  manageCollapse() {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }

  renderPerContact(rowData) {
    return (
      <TouchableOpacity 
        onPress={() => Actions.contact({
          uid: rowData.uid,
          isAdmin: this.props.isAdmin,
          currentUser: firebase.auth().currentUser.uid === rowData.uid
        })}>
        <View style={[styles.mainStructure, {backgroundColor: '#f6f6f6', paddingLeft: 25}]}>
          <Text style={{fontSize: 15, marginLeft: 10, color: '#555'}}>{rowData.firstName}</Text>
        </View>
      </TouchableOpacity>
      );
  }

  renderContacts() {
    return (
      <ListView
        dataSource          = {this.state.contactList}
        renderRow           = {(rowData) => this.renderPerContact(rowData)}
        enableEmptySections = {true}
        scrollEnabled       = {false}
      />
    );
  }

  render() {
    const { structure, children } = this.props;
    return (
      <View>
        <TouchableOpacity onPress={this.manageCollapse.bind(this)}>
          <View style={styles.mainStructure}>
            {
              (this.state.collapsed)
                ? <Icon name="plus-square-o" size={25} color="#555" />
                : <Icon name="minus-square-o" size={25} color="#555" />
            }
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{fontSize: 15, marginLeft: 10, fontWeight: 'bold', color: '#555'}}>{structure.name}</Text>
              <TouchableOpacity
                onPress={() => Actions.editStructure({
                  structure,
                  hasChild: this.state.contactList.getRowCount() > 0 || children !== null
                })}>
                <Icon name="pencil-square-o" size={25} color="#555" style={styles.iconStructure}/>
              </TouchableOpacity>
            </View>
          </View>
          <Collapsible collapsed={this.state.collapsed} style={styles.childStructure}>
            <View>
                {children}
                {
                  (!this.state.collapsed && this.state.contactList)
                    ? this.renderContacts()
                    : null
                }
            </View>
          </Collapsible>
        </TouchableOpacity>
      </View>
    )
  }
}

class Structure extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    }
    this.renderStructures = this.renderStructures.bind(this);
    this.plusIconPressed = this.plusIconPressed.bind(this);
    console.log('Structure constructor');
  }

  componentDidMount() {
    console.log('Structure componentDidMount');
    ref = firebase.database().ref('structures');
    ref.on('value', this.handleQuery);
  }

  handleQuery = (snapshot) => {
    val = snapshot.val();
    var items = Object.keys(val).map((s, i) => {
      var obj = {id: s, parent: val[s].parent, name: val[s].name};
      return obj;
    });
    items.forEach(e => e.subcats=items.filter(el=>el.parent==e.id));
    items=items.filter(e=>e.parent==0);
    this.setState({ loading: false, structures: items });
  }

  plusIconPressed () {
    if (this.props.isAdmin) {
      Actions.newStructure();
    }
  }

  header() {
    const { viewStyle, searchSection, iconLeft, iconList, textInput, textStyle } = styles;
    return (
    <View style={viewStyle}>
      <TouchableOpacity  onPress={() => Actions.pop()} >
        <Icon name="caret-left" size={45} color="#fff" style={iconLeft}/>
      </TouchableOpacity>
      <Text style={textStyle}>Structure</Text>
      <TouchableOpacity onPress={this.plusIconPressed}>
        <Icon name="plus-square-o" size={30} color="#fff" style={iconList} />
      </TouchableOpacity>
    </View>
  )}

  renderStructures(struct) {
    arr = [];
    arr.push(struct);
    return (
      <View style={{paddingLeft: 13}} key={struct.id}>
        <CollapsibleWrapper structure={struct} isAdmin={this.props.isAdmin}>
          {(struct.subcats && struct.subcats.length) ? struct.subcats.map(this.renderStructures) : null}
        </CollapsibleWrapper>
      </View>
    )
  }

  render() {
    if (this.state.loading) {
      return <Spinner />;
    }
    return (
      <View>
        {this.header()}
        <ScrollView style={{paddingBottom: 60}}>
          {this.state.structures.map(this.renderStructures)}
        </ScrollView>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  mainStructure: {
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#eee',
    padding: 12,
    marginBottom: 3,
    marginLeft: -13,
  },
  childStructure: {
    marginLeft: 10,
    paddingLeft: 10,
  },
  viewStyle: {
    backgroundColor: '#6fa8dc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 75,
    paddingTop: (Platform.OS === 'ios') ? 20 : 0,
  },
  textStyle: {
    fontSize: 23,
    color: '#fff'
  },
  iconLeft: {
    marginLeft: 20
  },
  iconList: {
    marginRight: 20,
    width: 30,
    height: 30,
  },
  iconStructure: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
  }
});

export {Structure};