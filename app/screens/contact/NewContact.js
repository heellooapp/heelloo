import React, { Component } from 'react';
import {
  Text,
  View,
  Picker,
  Platform,
  TextInput,
  StyleSheet,
  ScrollView,
  AsyncStorage,
  TouchableOpacity,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import ActionButton from 'react-native-action-button';
import { Spinner, Button, BackBtn, Structure } from '../../components/common';
import { firebase } from '../../config';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { newContactStyles } from '../styles';

const createUserURL =
  'https://us-central1-teamon-68ca0.cloudfunctions.net/createUser';
const styles = newContactStyles;
const obj = [
  { name: 'firstName', error: 'Fill First name' },
  { name: 'lastname', error: 'Fill Last name' },
  { name: 'email', error: 'Fill Email' },
  { name: 'password', error: 'Fill Password' },
  { name: 'position', error: 'Fill Position' },
];
class NewContact extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      parent: 0,
      firstName: '',
      lastname: '',
      email: '',
      password: '',
      repearPassword: '',
      position: '',
      isAdmin: false,
    };

    this.saveContact = this.saveContact.bind(this);
    this.structureRef = this.getRef().child('structures');
  }

  componentDidMount() {
    this.structureRef.on('value', this.handleQuery);
    AsyncStorage.getItem('USER', (err, val) => {
      this.setState({ currentPassword: val });
    });
  }

  componentWillUnmount() {
    this.structureRef.off('value', this.handleQuery);
  }

  handleQuery = snapshot => {
    val = snapshot.val() || {};
    if (val !== null && this.state.parent === 0) {
      this.updateParent(Object.keys(val)[0]);
    }
    this.setState({
      loading: false,
      structures: val,
    });
  };

  updateParent(parent) {
    this.setState({ parent });
  }

  getRef() {
    return firebase.database().ref();
  }

  isValid({ name, error }) {
    if (this.state[name].length === 0 || !this.state[name]) {
      this.setState({ error });
      return false;
    }

    if (this.state.password.length < 5) {
      this.setState({ error: 'Password must be at least 6 characters' });
      return false;
    }

    if (!(this.state.selectedItems && this.state.selectedItems.length > 0)) {
      this.setState({ error: 'Choose department' });
      return false;
    }

    if (this.state.password !== this.state.repeatPassword) {
      this.setState({ error: "Password doesn't match" });
      return false;
    }

    return true;
  }

  saveContact() {
    arr = [];
    for (i = 0; i < 5; i++) {
      arr.push(this.isValid(obj[i]));
    }
    if (arr.indexOf(false) === -1) {
      this.setState({ error: '' });
      this.createUser();
    }
  }

  createUser() {
    this.setState({ loading: true });
    currentUser = firebase.auth().currentUser;
    email = currentUser.email;
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(({ user }) => {
        this.signInBack(email, user.uid);
      })
      .catch(err => {
        this.setState({ error: err.message, loading: false });
      });
  }

  signInBack(email, uid) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, this.state.currentPassword)
      .then(user => {
        firebase
          .database()
          .ref('users/' + uid)
          .set({
            anniversary: {
              firstDay: new Date().toISOString().split('T')[0],
              birthday: '',
            },
            isAdmin: this.state.isAdmin,
            email: this.state.email,
            firstName: this.state.firstName,
            lastname: this.state.lastname,
            position: this.state.position,
            uid: uid,
            structure: this.state.parent,
          });
        Actions.pop();
      })
      .catch(err => {
        this.setState({ err: err.message });
      });
  }

  header() {
    const { viewStyle, titleNavbar } = styles;
    return (
      <View style={viewStyle}>
        <BackBtn />
        <Text style={titleNavbar}>ADD CONTACT</Text>
        <View style={{ width: 25, height: 25 }} />
      </View>
    );
  }

  toggleAdmin = () => {
    this.setState({ isAdmin: !this.state.isAdmin });
  };

  showPicker() {
    return <View style={styles.fieldContainer}>{this.renderPicker()}</View>;
  }

  showCheckBox() {
    const { fieldContainer, alignCenter, labelStyle } = styles;

    return (
      <TouchableOpacity
        style={[fieldContainer, alignCenter]}
        onPress={this.toggleAdmin}>
        {this.state.isAdmin ? (
          <Icon name="ios-checkbox-outline" size={25} color="#000" />
        ) : (
            <Icon name="ios-square-outline" size={25} color="#000" />
          )}
        <Text
          style={[
            labelStyle,
            {
              margin: 5,
              color: '#000',
            },
          ]}>
          Make admin
        </Text>
      </TouchableOpacity>
    );
  }

  onSelectedItemsChange = (selectedItems) => {
    if (selectedItems.length > 0)
      this.setState({ parent: selectedItems[0], selectedItems: selectedItems });
  };

  renderPicker() {
    return (
      <Structure
        onSelectedItemsChange={this.onSelectedItemsChange}
        selectedItems={this.state.selectedItems}
        structures={this.state.structures}
      />)
  }
  renderField({ label, name, secure }) {
    const { fieldContainer, inputContainer, labelStyle, inputStyle } = styles;

    return (
      <View style={fieldContainer}>
        <View style={inputContainer}>
          <Text style={labelStyle}>{label}</Text>
          <TextInput
            style={inputStyle}
            autoCorrect={false}
            underlineColorAndroid="transparent"
            onChangeText={value => this.setState({ [name]: value })}
            secureTextEntry={secure}
            value={this.state[name]}
          />
        </View>
      </View>
    );
  }

  render() {
    if (this.state.loading) return <Spinner />;
    return (
      <View style={{ flex: 1, backgroundColor: '#FFF' }}>
        {this.header()}
        <KeyboardAwareScrollView
          enableResetScrollToCoords={false}
          enableAutoAutomaticScroll={false}
          style={{ flex: 1 }}>
          <View style={styles.mainContainer}>
            {this.showPicker()}
            {this.renderField({
              label: 'First name:',
              name: 'firstName',
              secure: false,
            })}
            {this.renderField({
              label: 'Last name:',
              name: 'lastname',
              secure: false,
            })}
            {this.renderField({
              label: 'Email:',
              name: 'email',
              secure: false,
            })}
            {this.renderField({
              label: 'Password',
              name: 'password',
              secure: true,
            })}
            {this.renderField({
              label: 'Repeat password',
              name: 'repeatPassword',
              secure: true,
            })}
            {this.renderField({
              label: 'Position',
              name: 'position',
              secure: false,
            })}
            {this.showCheckBox()}
            <Text style={styles.errorText}>{this.state.error}</Text>
            <View style={styles.fieldContainer}>
              <Button onPress={this.saveContact}>Add</Button>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

export { NewContact };
