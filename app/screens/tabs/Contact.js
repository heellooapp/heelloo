import React, {Component} from 'react';
import {View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import ActionButton from 'react-native-action-button';
import {firebase} from '../../config';
import Sidemenu from '../Sidemenu';
import {Spinner, FloatButton} from '../common';
import {contactStyles} from '../styles';
import ContactList from '../ContactList';
import Utils from '../utils';

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdmin: false
    };
  }

  componentDidMount() {
    Utils.isAdmin((err, val) => {
      this.setState({isAdmin: val});
    });
  }

  render() {
    if (this.state.loading) return <Spinner/>;
    return (
      <View style={contactStyles.container}>
        <ContactList
          openDrawer={this.props.openDrawer}
          isAdmin={this.state.isAdmin}
        />
        {this.state.isAdmin && (
          <FloatButton
            onContactPress={() => Actions.newContact()}
            onStructurePress={() => Actions.newStructure()}
          />
        )}
      </View>
    );
  }
}

export {Contact};
