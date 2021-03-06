import React, { Component } from 'react';
import { View } from 'react-native';
import { Spinner, FloatButton } from '../../common';
import { contactStyles } from '../../styles';
import ConversationList from './ConversationList';
import Utils from '../../utils';

class Conversation extends Component {
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
        <ConversationList
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

export { Conversation };
