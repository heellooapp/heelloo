import React, { Component } from 'react';
import { View } from 'react-native';
import { Spinner, FloatButton } from '../../common';
import { anniversaryStyles } from '../../styles';
import AnniversaryList from './AnniversaryList';
import Utils from '../../utils';

class Anniversary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdmin: false,
    };
    // console.log(props.navigation);
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
    if (this.state.loading) return <Spinner />;
    return (
      <View style={anniversaryStyles.container}>
        <AnniversaryList
          openDrawer={this.props.openDrawer}
          isAdmin={this.state.isAdmin} />
        {this.state.isAdmin &&
          <FloatButton
            isAdmin={this.state.isAdmin}
            onBravoPress={() => this.props.navigation.navigate('AddBravo')}
            onContactPress={() => this.props.navigation.navigate('NewContact')}
            onStructurePress={() => this.props.navigation.navigate('NewStructure')}
          />
        }
      </View>
    );
  }
}

export { Anniversary };
