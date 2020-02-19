import React, { Component } from 'react';
import {
  Text,
  View,
  Picker,
  TextInput,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Spinner, Button, BackBtn } from '../../common';
import { firebase } from '../../config';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { newStructureStyles } from '../../styles';

const styles = newStructureStyles;

class NewStructure extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      loading: true,
      parent: 0,
      error: '',
      selectedItems: [],
    };

    this.structureRef = this.getRef().child('structures');

    this.saveStructure = this.saveStructure.bind(this);
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
      structures: val,
    });
  };

  saveStructure() {
    if (this.state.name.length === 0) {
      this.setState({ error: 'Department name should not be empty.' });
      return;
    }

    this.structureRef.push({
      name: this.state.name,
      parent: this.state.parent,
    });

    this.setState({
      name: '',
      parent: 0,
    });

    Actions.pop();
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

  renderPicker() {
    if (this.state.structures === null) return;
    let items = Object.keys(this.state.structures)
      .filter((s, i) => (this.state.structures[s].parent == 0))
      .map((s, i) => {
        return (
          <Picker.Item key={i} label={this.state.structures[s].name} value={s} />
        );
      });

    items.unshift(<Picker.Item key={-1} label="" value={0} />);
    return (
      <Picker
        selectedValue={this.state.parent}
        onValueChange={parent => this.setState({ parent })}
        mode="dropdown">
        {items}
      </Picker>
    );
  }

  header() {
    const { viewStyle, iconLeft, iconRight, titleNavbar } = styles;
    return (
      <View style={viewStyle}>
        <BackBtn />
        <Text style={titleNavbar}>ADD STRUCTURE</Text>
        <View style={iconRight} />
      </View>
    );
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
            <Text style={styles.labelStyle}>Department:</Text>
            <TextInput
              style={styles.inputStyle}
              onChangeText={name => this.setState({ name })}
              value={this.state.name}
              autoCorrect={false}
              multiline
              autoCapitalize="none"
              underlineColorAndroid="transparent"
            />
          </View>
          <View style={styles.labelContainer}>
            <Text style={styles.titleStyle}>Choose head department</Text>
          </View>
          {this.renderPicker()}
          <View style={{ flexDirection: 'row' }}>
            <Button onPress={this.saveStructure}>Add</Button>
          </View>
          {this.showError()}
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

export { NewStructure };
