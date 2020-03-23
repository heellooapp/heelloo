import React, { Component } from 'react';
import { View } from 'react-native';
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
          onBravoPress={() => this.props.navigation.navigate('AddBravo')}
          onContactPress={() => this.props.navigation.navigate('NewContact')}
          onStructurePress={() => this.props.navigation.navigate('NewStructure')}
        />
        )}
      </View>
    );
  }
}

export { Contact };
