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
      <Text style={textStyle}>Add structure</Text>
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
				<View style={styles.containerStyle}>
          <Icon style={styles.iconOddStyle} name="sitemap" size={20} color="#67686c"/>
					<TextInput
		        placeholder='Structure name'
		        autoCorrect={false}
		        style={inputStyle}
		        value={this.state.name}
		        onChangeText={name => this.setState({ name })}
		        autoCapitalize='none'
		        underlineColorAndroid='transparent'
		      />
		    </View>
        {this.renderPicker()}
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
  viewStyle: {
    backgroundColor: '#6fa8dc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 75,
    paddingTop: (Platform.OS === 'ios') ? 20 : 0,
  },
  containerStyle: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    marginBottom: 8,
    marginRight: 20,
    marginLeft: 20,
    marginTop: 14,
    borderColor: '#cccccc'
  },
  iconOddStyle: {
    padding: 10,
    backgroundColor: '#cccccc',
    width: 39,
    alignItems: 'center',
    justifyContent: 'center'
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