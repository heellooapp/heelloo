import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  Picker,
  Platform,
  ListView,
  TextInput,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Spinner } from '../components/common'
import firebase from '../utils/firebase';
import ActionButton from 'react-native-action-button';

class NewStructure extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			loading: true,
			parent: 0,
		}
	}

	componentDidMount() {
    ref = firebase.database().ref('structures');
    ref.on('value', this.handleQuery);
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

  header() {
    const { viewStyle, searchSection, iconLeft, iconList, textInput, textStyle } = styles;
    return (
    <View style={viewStyle}>
      <TouchableOpacity  onPress={() => Actions.contact()} >
	      <Icon name="caret-left" size={45} color="#fff" style={iconLeft}/>
      </TouchableOpacity>
      <Text style={textStyle}>Add Structure</Text>
      <TouchableOpacity onPress={this.saveStructure.bind(this)}>
	      <Icon name="check" size={30} color="#fff" style={iconList} />
      </TouchableOpacity>
    </View>
  )}

  saveStructure() {
    if (this.state.name.length === 0)
      return;
    firebase.database().ref()
      .child('structures')
      .push({
        'name': this.state.name,
        'parent': this.state.parent
      });
    this.setState({ name: '' });
  }

  renderPicker() {
  	if (this.state.structures === null)
  		return;
		let structureItems = Object.keys(this.state.structures).map((s, i) => {
			return <Picker.Item key={i} label = {this.state.structures[s].name} value={s}/>
		});
  	return (
	    <Picker
	    	selectedValue={this.state.parent}
	    	onValueChange={(parent) => this.setState({ parent })}
        mode="dropdown"
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
				<View style={{padding: 10,}}>
					<TextInput
		        placeholder='Structure name'
		        autoCorrect={false}
		        style={inputStyle}
		        value={this.state.name}
		        onChangeText={name => this.setState({ name })}
		        autoCapitalize='none'
		        underlineColorAndroid='transparent'
		      />
		      {this.renderPicker()}
		    </View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
  inputStyle: {
    color: '#555',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 16,
    lineHeight: 23,
    height: 50,
    borderWidth: 1,
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
});

export default NewStructure;