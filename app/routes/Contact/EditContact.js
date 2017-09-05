import React, { Component } from 'react';
import {
  Text,
  View,
  Picker,
  Platform,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import ActionButton from 'react-native-action-button';
import { Spinner, Input, Card, CardSection } from '../../components/common'
import firebase from '../../utils/firebase';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

class EditContact extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			parent: 0,
      isAdmin: false,
      firstName: '',
      lastname: '',
      position: '',
		}

    this.saveAccount = this.saveAccount.bind(this);
	}

	componentDidMount() {
    const { uid } = this.props;
    userRef = firebase.database().ref(`/users/${uid}`);
    userRef.on('value', this.handleUser);
  }

  handleUser = (snapshot) => {
    val = snapshot.val() || {};
    user = val;
    console.log(user);
    this.setState({
      isAdmin: user.isAdmin,
      firstName: user.firstName,
      lastname: user.lastname,
      position: user.position,
      parent: user.structure
    });

    ref = firebase.database().ref('structures');
    ref.on('value', this.handleQuery);
  }

  handleQuery = (snapshot) => {
    val = snapshot.val();
    this.setState({ loading: false, structures: val });
  }

  saveAccount() {
    const { uid } = this.props;

    if (this.state.firstName.length === 0) {
      this.setState({ error: 'Fill First name' });
      return;
    }
    if (this.state.lastname.length === 0) {
      this.setState({ error: 'Fill Last name' });
      return;
    }
    
    if (this.state.position.length === 0) {
      this.setState({ error: 'Fill position' });
      return;
    }
    this.setState({ error: '' });

    firebase.database().ref(`/users/${uid}`)
      .update({
        isAdmin: this.state.isAdmin,
        firstName: this.state.firstName,
        lastname: this.state.lastname,
        position: this.state.position,
        structure: this.state.parent
      })
      .then( () => {
        Actions.pop();
      });
  }

  header() {
    const { viewStyle, searchSection, iconLeft, iconList, textInput, textStyle } = styles;
    return (
    <View style={viewStyle}>
      <TouchableOpacity  onPress={() => Actions.pop()} >
        <Icon name="caret-left" size={45} color="#fff" style={iconLeft}/>
      </TouchableOpacity>
      <Text style={textStyle}>Edit contact</Text>
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

  render() {
    if (this.state.loading) {
      return <Spinner />;
    }
    const { inputStyle } = styles;
    return (
      <View>
        {this.header()}
        <ScrollView>
          <KeyboardAwareScrollView
            style={styles.container}
            behavior="padding"
          >
          <View style={{paddingBottom: 115}}>
          <Card>
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
            <CardSection>
              <Text style={styles.labelStyle}>Department</Text>
            </CardSection>
            {this.renderPicker()}
            <CardSection>
              <Input
                icon='ios-contact'
                placeholder='First name'
                value={this.state.firstName}
                onChangeText={firstName => this.setState({ firstName })}
                autoCapitalize='words'
              />
            </CardSection>
            <CardSection>
              <Input
                icon='ios-contact-outline'
                placeholder='Last name'
                value={this.state.lastname}
                onChangeText={lastname => this.setState({ lastname })}
                autoCapitalize='words'
              />
            </CardSection>
            <Text style={styles.errorText}>{this.state.error}</Text>
            <CardSection >
              <Input
                icon='ios-navigate'
                placeholder='Position'
                value={this.state.position}
                onChangeText={position => this.setState({ position })}
                autoCapitalize='words'
              />
            </CardSection>
          </Card>
         </View>
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
  errorText: {
    textAlign: 'center',
    color: '#F44336',
    fontSize: 16,
    marginBottom: 6
  },
  labelStyle: {
    color: '#555',
    fontSize: 16,
    padding: 5
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

export { EditContact };