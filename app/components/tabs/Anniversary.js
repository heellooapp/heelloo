import React, {Component} from 'react';
import {View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import ActionButton from 'react-native-action-button';
import {firebase} from '../../config';
import Sidemenu from '../Sidemenu';
import {Spinner, FloatButton} from '../common';
import {anniversaryStyles} from '../styles';
import AnniversaryList from '../AnniversaryList';

class Anniversary extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={anniversaryStyles.container}>
        <AnniversaryList 
          openDrawer={this.props.openDrawer}
          isAdmin={this.props.isAdmin} />
        {this.props.isAdmin && (
          <FloatButton
            onContactPress={() => Actions.newContact()}
            onStructurePress={() => Actions.newStructure()}
          />
        )}
      </View>
    );
  }
}

export {Anniversary};
