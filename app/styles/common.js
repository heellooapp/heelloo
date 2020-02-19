import {Platform, Dimensions} from 'react-native';
import { ifIphoneX } from 'react-native-iphone-x-helper'

const common = {
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    backgroundColor: '#2A8AED',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...ifIphoneX({
        paddingTop: 40,
        height: 80,
    }, {
        paddingTop: 10,
        height: 70,
    })
  },
  title: {
    fontFamily: 'Montserrat-Light',
    color: '#FFF',
    fontSize: 18,
  },
  backBtn: {
    padding: 4,
  },
  backIcon: {
    marginLeft: 15,
    alignSelf: 'center',
  },
  createIcon: {
    width: 25,
    height: 25,
    marginRight: 8,
    alignSelf: 'center',
  },
  emptyIcon: {
    height: 25,
    width: 25,
  },
};

export {common};
