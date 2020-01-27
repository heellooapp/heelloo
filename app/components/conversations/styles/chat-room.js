import { StyleSheet } from 'react-native'
import { ifIphoneX } from 'react-native-iphone-x-helper'

import COLORS from './colors'

export default StyleSheet.create({
  messagesContainer: {
    // height: '100%',
    flex: 1,
    paddingBottom: 10,
  },
  inputContainer: {
    width: '100%',
    // height: 100,
    // position: 'absolute',
    bottom: 0,
    paddingVertical: 10,
    paddingLeft: 20,

    borderTopWidth: 1,
    borderTopColor: COLORS.GREY
  },
  viewStyle: {
    backgroundColor: '#2a8aed',
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    ...ifIphoneX({
      paddingTop: 30,
      height: 90,
    }, {
      paddingTop: 15,
      height: 70,
    })
  },
  titleNavbar: {
    fontFamily: 'Montserrat-Light',
    color: '#FFF',
    marginLeft: 15,
    fontSize: 18,
  },
  profileHeader: {
    marginLeft: 15,
    width: 40,
    height: 40,
    resizeMode: 'cover',
    borderRadius: 40 / 2,
  }
})
