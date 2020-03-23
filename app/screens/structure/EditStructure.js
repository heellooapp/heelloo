import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  Picker,
  ScrollView,
  Platform,
  TextInput,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import images from '../../images';
import { Spinner, Button, BackBtn } from '../../common';
import { firebase } from '../../config';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { editStructureStyles } from '../../styles';

const styles = editStructureStyles;

class EditStructure extends Component {
  constructor(props) {
    super(props);

    structure = props.structure;

    this.state = {
      loading: true,
      name: structure.name,
      parent: structure.parent,
      id: structure.id,
      hasChild: props.hasChild,
      error: ''
    };

    this.structureRef = this.getRef().child('structures');

    this.saveStructure = this.saveStructure.bind(this);
    this.deleteStructure = this.deleteStructure.bind(this);
  }

  getRef() {
    return firebase.database().ref();
  }

  componentDidMount() {
    this.structureRef.on('value', this.handleQuery);
  }

  componentWillUnmount() {
    this.structureRef.off('value', this.handleQuery);
  }

  handleQuery = snapshot => {
    val = snapshot.val() || {};
    this.setState({
      loading: false,
      structures: val
    });
  }

  saveBtn() {
    return (
      <TouchableOpacity onPress={this.saveStructure}>
        <Icon name="md-checkmark" size={30} color="#FFF" />
      </TouchableOpacity>
    );
  }

  showError() {
    let error = this.state.error;
    if (error.length) {
      return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.error}>{this.state.error}</Text>
        </View>
      );
    } else {
      return null;
    }
  }

  isValidToSave() {
    if (this.state.name.length === 0) {
      this.setError('Department name should not be empty.');
      return false;
    }

    if (this.state.id === this.state.parent) {
      this.setError('You can\'t pick same structure as parent structure');
      return false;
    }

    this.setError('');
    return true;
  }

  isValidToDelete() {
    if (this.state.hasChild) {
      this.setError('This structure contains sub structure or contact');
      return false;
    }
    this.setError('');
    return true;
  }

  saveStructure() {
    val = this.isValidToSave();
    if (val) {
      let { id, name, parent } = this.state;
      this.structureRef.child(id).update({
        name: name,
        parent: parent
      })
        .then(() => {
          this.setState({ name: '', parent: 0 });
          this.props.navigation.goBack()
        });
    }
  }

  deleteStructure() {
    val = this.isValidToDelete();
    if (val) {
      this.structureRef.child(this.state.id).remove();
      this.props.navigation.goBack()
    }
  }

  setError(error) {
    this.setState({ error });
  }

  renderPicker() {
    let { structures, parent } = this.state;
    if (structures === null) return;
    let items = Object.keys(structures).map((s, i) => {
      return (
        <Picker.Item
          key={i}
          label={structures[s].name}
          value={s}
        />
      );
    });
    items.unshift(
      <Picker.Item key={-1} label='' value={0} />
    );
    return (
      <Picker
        selectedValue={parent}
        onValueChange={(parent) => this.setState({ parent })}
        mode="dropdown">
        {items}
      </Picker>
    );
  }

  header() {
    const { viewStyle, iconRight, titleNavbar } = styles;
    return (
      <View style={viewStyle}>
        <BackBtn />
        <Text style={titleNavbar}>EDIT STRUCTURE</Text>
        <TouchableOpacity onPress={this.saveStructure}>
          <Icon name="md-checkmark" size={30} color="#FFF" style={iconRight} />
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    if (this.state.loading) return <Spinner />;
    return (
      <View style={{ flex: 1, backgroundColor: '#FFF' }}>
        {this.header()}
        <KeyboardAwareScrollView
          behavior="padding"
          style={styles.mainContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.labelStyle}>
              Department:
            </Text>
            <TextInput
              style={styles.inputStyle}
              onChangeText={name => this.setState({ name })}
              value={this.state.name}
              autoCorrect={false}
              multiline
              autoCapitalize='none'
              underlineColorAndroid='transparent'
            />
          </View>
          <View style={styles.labelContainer}>
            <Text style={styles.titleStyle}>Head department</Text>
          </View>
          {this.renderPicker()}
          <View style={{ flexDirection: 'row' }}>
            <Button btnColor="#f9536c" onPress={this.deleteStructure}>
              Delete
            </Button>
          </View>
          {this.showError()}
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

export { EditStructure };
