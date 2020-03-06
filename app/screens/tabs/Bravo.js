import React, { Component } from 'react';
import { View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Spinner, FloatButton } from '../../common';
import { contactStyles } from '../../styles';
import BravoList from './BravoList';
import Utils from '../../utils';

class Bravo extends Component {
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
    this.unsubscribe();
  }

  render() {
    if (this.state.loading) return <Spinner />;
    return (
      <View style={contactStyles.container}>
        <BravoList
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

export { Bravo };
