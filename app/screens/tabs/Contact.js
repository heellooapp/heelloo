import React, { Component } from 'react';
import { View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Spinner, FloatButton } from '../../common';
import { contactStyles } from '../../styles';
import ContactList from './ContactList';
import Utils from '../../utils';

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdmin: false
    };
  }

  componentDidMount() {
    this._mounted = true;
    Utils.isAdmin((err, val) => {
      if (this._mounted)
        this.setState({ isAdmin: val });
    });
  }
  componentWillUnmount() {
    this._mounted = false;
    // this.unsubscribe();
  }

  render() {
    return (
      <View style={contactStyles.container}>
        <ContactList
          openDrawer={this.props.openDrawer}
          isAdmin={this.state.isAdmin}
        />
        {this.state.isAdmin && (
          <FloatButton
            isAdmin={this.state.isAdmin}
            onBravoPress={() => Actions.bravo()}
            onContactPress={() => Actions.newContact()}
            onStructurePress={() => Actions.newStructure()}
          />
        )}
      </View>
    );
  }
}

export { Contact };
