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
  KeyboardAvoidingView
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import ActionButton from 'react-native-action-button';
import { Spinner, Input, Card, CardSection } from '../../components/common'
import firebase from '../../utils/firebase';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

class NewContact extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			parent: 0,
      isAdmin: false,
      firstName: '',
      lastname: '',
      email: '',
      password: '',
      repeatPassword: '',
      position: '',
		}

    this.setRepeatPassword = this.setRepeatPassword.bind(this);
    this.saveAccount = this.saveAccount.bind(this);
    this.signInBack = this.signInBack.bind(this);
	}

	componentDidMount() {
    ref = firebase.database().ref('structures');
    ref.on('value', this.handleQuery);
    AsyncStorage.getItem('USER', (err, result) => {
      // console.log(result);
      this.setState({ currentPassword: result });
    });
  }

  handleQuery = (snapshot) => {
    val = snapshot.val();
    if (val !== null && this.state.parent === 0) {
      this.updateParent(Object.keys(val)[0]);
    }
    this.setState({ loading: false, structures: val });

  }

  updateParent(parent) {
    this.setState({ parent });
  }

  saveAccount() {
    if (this.state.firstName.length === 0) {
      this.setState({ error: 'Fill First name' });
      return;
    }
    if (this.state.lastname.length === 0) {
      this.setState({ error: 'Fill Last name' });
      return;
    }
    if (this.state.email.length === 0) {
      this.setState({ error: 'Fill email' });
      return;
    }
    if (this.state.password.length === 0) {
      this.setState({ error: 'Fill password' });
      return;
    }
    if (this.state.password !== this.state.repeatPassword) {
      this.setState({ error: "Password doesn't match" });
      return;
    }
    if (this.state.position.length === 0) {
      this.setState({ error: 'Fill position' });
      return;
    }
    this.setState({ error: '' });

    currentUser = firebase.auth().currentUser;

    email = currentUser.email;


    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((user) => {
        this.signInBack(email, user.uid);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  signInBack(email, uid) {
    firebase.auth().signInWithEmailAndPassword(email, this.state.currentPassword)
      .then((user) => {
        firebase.database().ref('users/' + uid)
          .set({
            anniversary: {
              firstDay: new Date().toISOString().split('T')[0]
            },
            isAdmin: this.state.isAdmin,
            email : this.state.email,
            firstName : this.state.firstName,
            lastname : this.state.lastname,
            position : this.state.position,
            uid : uid,
            structure: this.state.parent
          });
        this.setState({ error: 'Success' });
        console.log(user);
        Actions.pop();
      })
      .catch((err) => {
        console.log(err);
      });

  }
  
  header() {
    const { viewStyle, searchSection, iconLeft, iconList, textInput, textStyle } = styles;
    return (
    <View style={viewStyle}>
      <TouchableOpacity  onPress={() => Actions.pop()} >
        <Icon name="caret-left" size={45} color="#fff" style={iconLeft}/>
      </TouchableOpacity>
      <Text style={textStyle}>Add contact</Text>
      <TouchableOpacity onPress={this.saveAccount}>
        <Icon name="check" size={30} color="#fff" style={iconList} />
      </TouchableOpacity>
    </View>
  )}

  renderPicker() {
    if (this.state.structures === null)
      return;
    let structureItems = Object.keys(this.state.structures).map((s, i) => {
      return <Picker.Item key={i} label = {this.state.structures[s].name} value={s}/>
    });
    return (
      <Picker
       style={{marginBottom: 8}}
        selectedValue={this.state.parent}
        onValueChange={(parent) => this.setState({ parent })}
      >
        {structureItems}
      </Picker>
    )
  }

  setRepeatPassword(repeatPassword) {
    this.setState({ repeatPassword });
    if (this.state.password !== repeatPassword)
      this.setState({ error: "Password doesn't match" });
    else 
      this.setState({ error: '' });
  }

  render() {
    if (this.state.loading) {
      return <Spinner />;
    }
    const { inputStyle } = styles;
    return (
      <View style={{marginBottom: 60}}>
          {this.header()}
        <ScrollView>
        <KeyboardAwareScrollView
          behavior="padding"
        >
          <Card style={{marginBottom: 145}}>
            <TouchableOpacity onPress={() => this.setState({isAdmin: !this.state.isAdmin})}>
              <CardSection style={{flexDirection: 'row' }}>
                <Text style={styles.labelStyle}>Admin: </Text>
                {
                  this.state.isAdmin
                    ? <Icon name="check-square-o" size={25} color='#555' />
                    : <Icon name="square-o" size={25} color='#555' />
                }
              </CardSection>
            </TouchableOpacity>
            <Text style={styles.labelStyle}>Choose department :</Text>
            {this.renderPicker()}
            <CardSection>
              <Input
                icon='ios-contact'
                placeholder='First name'
                style={inputStyle}
                value={this.state.firstName}
                onChangeText={firstName => this.setState({ firstName })}
                autoCapitalize='words'
              />
            </CardSection>
            <CardSection>
              <Input
                icon='ios-contact-outline'
                placeholder='Last name'
                style={inputStyle}
                value={this.state.lastname}
                onChangeText={lastname => this.setState({ lastname })}
                autoCapitalize='words'
              />
            </CardSection>
            <CardSection>
              <Input
                icon='ios-mail'
                placeholder='Email'
                style={inputStyle}
                value={this.state.email}
                onChangeText={email => this.setState({ email })}
                autoCapitalize='none'
              />
            </CardSection>
            <CardSection>
              <Input
                icon='ios-lock'
                secureTextEntry={true}
                placeholder='Password'
                style={inputStyle}
                value={this.state.password}
                onChangeText={password => this.setState({ password })}
                autoCapitalize='none'
              />
            </CardSection>
            <CardSection>
              <Input
                icon='ios-lock'
                secureTextEntry={true}
                placeholder='Repeat password'
                style={inputStyle}
                value={this.state.repeatPassword}
                onChangeText={repeatPassword => this.setRepeatPassword(repeatPassword)}
                autoCapitalize='none'
              />
            </CardSection>
            <Text style={styles.errorText}>{this.state.error}</Text>
            <CardSection>
              <Input
                icon='ios-navigate'
                placeholder='Position'
                style={inputStyle}
                value={this.state.position}
                onChangeText={position => this.setState({ position })}
                autoCapitalize='none'
              />
            </CardSection>
          </Card>
         </KeyboardAwareScrollView>
        </ScrollView>
      </View>
      )
  }
}

const styles = StyleSheet.create({
  inputStyle: {
    color: '#333',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 14,
    lineHeight: 23,
    flex: 1
  },
  containerStyle: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    marginBottom: 8,
    marginRight: 20,
    marginLeft: 20,
    borderColor: '#cccccc'
  },
  errorText: {
    textAlign: 'center',
    color: '#F44336',
    fontSize: 16,
  },
  labelStyle: {
    color: '#555',
    fontSize: 16,
    padding: 5
  },
  iconStyle: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 11,
    backgroundColor: '#cccccc',
    width: 39,
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconOddStyle: {
    padding: 10,
    backgroundColor: '#cccccc',
    width: 39,
    alignItems: 'center',
    justifyContent: 'center'
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
  border: {
    borderBottomWidth: 5,
    borderColor: '#eee',
    marginBottom: 30,
    marginTop: 25
  }
});

export { NewContact };