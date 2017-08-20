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
import { Spinner } from '../../components/common';
import firebase from '../../utils/firebase';
import ActionButton from 'react-native-action-button';

class EditStructure extends Component {
	constructor(props) {
		super(props);
    structure = props.structure;
    console.log(structure);
    console.log(props.hasChild);
		this.state = {
			loading: true,
      name: structure.name,
			parent: structure.parent,
      id: structure.id,
      hasChild: props.hasChild,
      error: ''
		}
	}

	componentDidMount() {
    ref = firebase.database().ref('structures');
    ref.on('value', this.handleQuery);
	}

  handleQuery = (snapshot) => {
    val = snapshot.val();
    this.setState({ loading: false, structures: val });

  }

  header() {
    const { viewStyle, searchSection, iconLeft, iconList, textInput, textStyle } = styles;
    return (
    <View style={viewStyle}>
      <TouchableOpacity  onPress={() => Actions.structure()} >
	      <Icon name="caret-left" size={45} color="#fff" style={iconLeft}/>
      </TouchableOpacity>
      <Text style={textStyle}>Edit structure</Text>
      <TouchableOpacity onPress={this.saveStructure.bind(this)}>
	      <Icon name="check" size={30} color="#fff" style={iconList} />
      </TouchableOpacity>
    </View>
  )}

  saveStructure() {
    if (this.state.name.length === 0)
      return;
    if (this.state.id === this.state.parent) {
      this.setState({ error: 'You can\' pick same structure as parent structure.' });
      return;
    }
    this.setState({ error: '' });
    firebase.database().ref()
      .child('structures')
      .child(this.state.id)
      .update({
        name: this.state.name,
        parent: this.state.parent
      });
    this.setState({ name: '', parent: 0 });

    Actions.structure();
  }

  deleteStructure() {
    if (this.state.hasChild) {
      this.setState({ error: 'This structure contains sub structure or contact.' });
      return;
    }
    this.setState({ error: '' });

    firebase.database()
      .ref()
      .child('structures')
      .child(this.state.id)
      .remove();

    Actions.structure();
  }

  renderPicker() {
  	if (this.state.structures === null)
  		return;
		let structureItems = Object.keys(this.state.structures).map((s, i) => {
      if (this.state.id === s) 
        return;
			return <Picker.Item key={i} label = {this.state.structures[s].name} value={s}/>
		});
    structureItems.unshift(
      <Picker.Item key={-1} label='' value={0}/>
    );
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
        <View style={styles.container}>
  				<View style={styles.inputContainer}>
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
          <Text style={styles.errorText}>{this.state.error}</Text>
          <TouchableOpacity onPress={this.deleteStructure.bind(this)}>
            <View style={{ alignItems: 'center', backgroundColor: '#FF6666' }}>
              <Icon name="trash-o" size={30} color="#FFF"/>
              <Text>Delete</Text>
            </View>
          </TouchableOpacity>
        </View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  errorText: {
    textAlign: 'center',
    color: '#F44336',
    fontSize: 16,
    marginBottom: 6
  },
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
  inputContainer: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
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

export { EditStructure };