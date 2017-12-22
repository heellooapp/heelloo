import React, {Component} from 'react';
import {
  Text,
  View,
  Platform,
  ListView,
  DataSource,
  Alert,
  TextInput,
  Image,
  TouchableHighlight,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import images from '../../images';
import Icon from 'react-native-vector-icons/Ionicons';
import Collapsible from 'react-native-collapsible';
import {Spinner, Button, BackBtn} from '../../components/common';
import ActionSheet from '@yfuks/react-native-action-sheet';
import {firebase} from '../../config';
import {SwipeListView} from 'react-native-swipe-list-view';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {structureStyles} from '../styles';

const windowWidth = Dimensions.get('window').width;
const ActionButtons = ['Edit', 'Delete', 'Cancel'];
const styles = structureStyles;
const DESTRUCTIVE_INDEX = 1;
const CANCEL_INDEX = 2;

class CollapsibleWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
    };
    this.structureRef = this.getRef().child('structures');
    this.usersRef = this.getRef().child('users');

    this.manageCollapse = this.manageCollapse.bind(this);
    this.renderContacts = this.renderContacts.bind(this);
    this.handleContacts = this.handleContacts.bind(this);
    this.renderPerContact = this.renderPerContact.bind(this);
    this.showActions = this.showActions.bind(this);
  }

  getRef() {
    return firebase.database().ref();
  }

  componentDidMount() {
    const structure = this.props.structure;
    // ref = firebase.database().ref('users');
    // ref
    //   .orderByChild('structure')
    //   .equalTo(structure.id)
    //   .on('value', this.handleContacts);
    this.usersRef.orderByChild('structure').equalTo(structure.id).on('value', this.handleContacts);
  }

  componentWillUnmount() {
    this.usersRef.off('value', this.handleContacts);
  }

  handleContacts(snapshot) {
    val = snapshot.val() || {};
    contacts = Object.keys(val).map(function(key) {
      return val[key];
    });
    listView = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.setState({contactList: listView.cloneWithRows(contacts)});
  }

  manageCollapse() {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  showActions = () => {
    const {structure, children} = this.props;
    ActionSheet.showActionSheetWithOptions(
      {
        options: ActionButtons,
        cancelButtonIndex: CANCEL_INDEX,
        destructiveButtonIndex: DESTRUCTIVE_INDEX,
        tintColor: '#2a8aed',
      },
      index => {
        const hasChild =
          this.state.contactList.getRowCount > 0 || children !== null;
        if (index == 0) {
          Actions.editStructure({
            structure,
            hasChild: hasChild,
          });
        } else if (index == 1) {
          if (hasChild) {
            this.showAlert();
            return;
          }
          this.setState({error: ''});
          this.structureRef.child(structure.id).remove();
        }
      },
    );
  };

  showAlert() {
    Alert.alert(
      '',
      'This structure contains sub structure or contact.',
      [{text: 'Close', onPress: () => null, style: 'cancel'}],
      {cancelable: false},
    );
  }

  renderPerContact(rowData) {
    return (
      <TouchableOpacity
        onPress={() =>
          Actions.profile({
            uid: rowData.uid,
          })
        }>
        <View style={[styles.mainStructure, {backgroundColor: '#ededed'}]}>
          {this.showAvatar(rowData.profileImg)}
          <View style={styles.contactListStyle}>
            <Text style={styles.nameStyle}>
              {rowData.firstName} {rowData.lastname}
            </Text>
            <Text style={styles.positionStyle}>{rowData.position}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  showAvatar(profileImg) {
    const {listProfileImage} = styles;
    if (profileImg) {
      return <Image source={{uri: profileImg}} style={listProfileImage} />;
    } else {
      return <Image source={images.avatar} style={listProfileImage} />;
    }
  }

  renderContacts() {
    return (
      <ListView
        dataSource={this.state.contactList}
        renderRow={rowData => this.renderPerContact(rowData)}
        enableEmptySections={true}
        scrollEnabled={false}
      />
    );
  }

  showIcon() {
    const {iconStructure} = styles;
    if (this.state.collapsed) {
      return (
        <Icon name="ios-add" size={40} color="#555" style={iconStructure} />
      );
    } else {
      return (
        <Icon name="ios-remove" size={40} color="#555" style={iconStructure} />
      );
    }
  }

  render() {
    const {structure, children} = this.props;
    return (
      <TouchableOpacity
        onLongPress={this.props.isAdmin ? this.showActions : null}
        onPress={this.manageCollapse}>
        <View style={styles.mainStructure}>
          <View style={styles.structureView}>
            <Text
              style={[
                styles.titleStyle,
                {paddingLeft: structure.parent == 0 ? 0 : 25},
              ]}>
              {structure.name}
            </Text>
            <TouchableOpacity>{this.showIcon()}</TouchableOpacity>
          </View>
        </View>
        <Collapsible collapsed={this.state.collapsed}>
          <View>
            {children}
            {!this.state.collapsed && this.state.contactList
              ? this.renderContacts()
              : null}
          </View>
        </Collapsible>
      </TouchableOpacity>
    );
  }
}

class Structure extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      department: '',
      parent: 0,
      error: '',
    };

    this.structureRef = this.getRef().child('structures');

    this.renderStructures = this.renderStructures.bind(this);
    this.plusIconPressed = this.plusIconPressed.bind(this);
  }

  componentDidMount() {
    this.structureRef.on('value', this.handleQuery);
  }

  componentWillUnmount() {
    this.structureRef.off('value', this.handleQuery);
  }

  getRef() {
    return firebase.database().ref();
  }

  handleQuery = snapshot => {
    val = snapshot.val();
    var items = Object.keys(val).map((s, i) => {
      var obj = {id: s, parent: val[s].parent, name: val[s].name};
      return obj;
    });
    items.forEach(e => (e.subcats = items.filter(el => el.parent == e.id)));
    items = items.filter(e => e.parent == 0);
    this.setState({loading: false, structures: items});
  };

  saveStructure() {
    if (this.state.department.length === 0) {
      this.setState({error: 'Department name should not be empty.'});
      return;
    }

    this.structureRef.push({
      name: this.state.department,
      parent: 0,
    });

    this.setState({department: '', parent: 0});
  }

  plusIconPressed() {
    if (this.props.isAdmin) {
      Actions.newStructure();
    }
  }

  showError() {
    let error = this.state.error;
    if (error.length) {
      return (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text style={styles.error}>{this.state.error}</Text>
        </View>
      );
    } else {
      return null;
    }
  }

  showAddIcon() {
    if (this.props.isAdmin) {
      return (
        <TouchableOpacity onPress={this.plusIconPressed}>
          <Icon
            name="md-create"
            size={25}
            color="#FFF"
            style={styles.iconRight}
          />
        </TouchableOpacity>
      );
    } else {
      return <View style={{height: 25, width: 25}} />;
    }
  }

  header() {
    const {viewStyle, iconLeft, titleNavbar} = styles;
    return (
      <View style={[viewStyle, {paddingTop: Platform.OS === 'ios' ? 20 : 0}]}>
        <BackBtn />
        <Text style={titleNavbar}>STRUCTURE</Text>
        {this.showAddIcon()}
      </View>
    );
  }

  renderStructures(struct) {
    arr = [];
    arr.push(struct);
    return (
      <View key={struct.id}>
        <CollapsibleWrapper structure={struct} isAdmin={this.props.isAdmin}>
          {struct.subcats && struct.subcats.length
            ? struct.subcats.map(this.renderStructures)
            : null}
        </CollapsibleWrapper>
      </View>
    );
  }

  showAddStructure() {
    if (this.props.isAdmin) {
      return (
        <View style={styles.addStructure}>
          <View style={styles.structureView}>
            <Text style={styles.titleStyle}>Add head department</Text>
            <Icon
              name="ios-remove"
              size={40}
              color="#555"
              style={styles.iconStructure}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.labelStyle}>Department:</Text>
            <TextInput
              style={styles.inputStyle}
              onChangeText={department => this.setState({department})}
              value={this.state.department}
              underlineColorAndroid="transparent"
              multiline
              autoCapitalize="words"
            />
          </View>
          <Button onPress={this.saveStructure.bind(this)}>Add</Button>
          {this.showError()}
        </View>
      );
    } else {
      return null;
    }
  }

  render() {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    if (this.state.loading) return <Spinner />;
    return (
      <View style={{flex: 1, backgroundColor: '#FFF'}}>
        {this.header()}
        <KeyboardAwareScrollView
          behavior="padding"
          style={styles.mainContainer}>
          {this.state.structures.map(this.renderStructures)}
          {this.showAddStructure()}
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

export {Structure};
