import { ifIphoneX } from 'react-native-iphone-x-helper'

const iphoneX = {
  space: {
    backgroundColor: '#2a8aed',
    ...ifIphoneX({
        paddingTop: 40,
    }, {
        paddingTop: 15,
    })
  },
};

export {iphoneX};
