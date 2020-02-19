import React, {Component} from 'react';
import {
  Text,
  View,
  ListView,
  DataSource,
  Alert,
  Image,
  TouchableOpacity,
} from 'react-native';
import images from '../../images';
import Icon from 'react-native-vector-icons/Ionicons';
import {firebase} from '../../config';
import Collapsible from 'react-native-collapsible';
import {structure, common} from '../../styles';

const styles = structure;

class StructureList extends Component {
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
    console.log(this.props.children);
  }

  getRef() {
    return firebase.database().ref();
  }

  componentDidMount() {
    const structure = this.props.structure;
    this.usersRef
      .orderByChild('structure')
      .equalTo(structure.id)
      .on('value', this.handleContacts);
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
            isAdmin: this.props.isAdmin,
          })
        }>
        <View style={styles.structureContainer}>
          {this.showAvatar(rowData.profileImg)}
          <View style={styles.contactList}>
            <Text style={styles.contactName}>
              {rowData.firstName} {rowData.lastname}
            </Text>
            <Text style={styles.contactPosition}>{rowData.position}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  showAvatar(profileImg) {
    const {avatar} = styles;
    if (profileImg) {
      return <Image source={{uri: profileImg}} style={avatar} />;
    } else {
      return <Image source={images.avatar} style={avatar} />;
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
    this.state.collapsed ? (name = 'ios-add') : (name = 'ios-remove');
    return (
      <TouchableOpacity>
        <Icon name={name} size={40} color="#555" style={styles.icon} />
      </TouchableOpacity>
    );
  }

  render() {
    const {structure, children} = this.props;
    return (
      <TouchableOpacity
        onLongPress={this.props.isAdmin ? this.showActions : null}
        onPress={this.manageCollapse}>
        <View style={styles.structureContainer}>
          <View style={styles.structureView}>
            <Text
              style={[
                styles.titleStyle,
                {paddingLeft: structure.parent == 0 ? 0 : 25},
              ]}>
              {structure.name}
            </Text>
            {this.showIcon()}
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

export {StructureList};
