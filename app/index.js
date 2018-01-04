import React, {Component} from 'react';
import {Alert, Keyboard} from 'react-native';
import Drawer from 'react-native-drawer';
import {Actions} from 'react-native-router-flux';
import {Spinner} from './components/common';
import {firebase} from './config';
import Sidemenu from './components/Sidemenu';
import MainRouter from './components/MainRouter';

class Root extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Drawer
        ref={ref => (this._drawer = ref)}
        content={<Sidemenu />}
        onOpenStart={() => {
          Keyboard.dismiss();
        }}
        tweenHandler={Drawer.tweenPresets.parallax}
        openDrawerOffset={viewport => {
          return 50;
        }}
        tapToClose={true}
        panOpenMask={0.2}
        negotiatePan
        tweenHandler={ratio => ({
          main: {
            opacity: 1,
          },
          mainOverlay: {
            opacity: ratio / 1.7,
            backgroundColor: 'black',
          },
        })}>
        <MainRouter />
      </Drawer>
    );
  }
}

export default Root;
