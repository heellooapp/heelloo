import { ifIphoneX } from 'react-native-iphone-x-helper'

const routerStyles = {
  tabBarStyle: {
    backgroundColor: 'transparent',
    height: 70,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 4 },
    shadowOpacity: 0.4,
    ...ifIphoneX({
      marginBottom: -25,
    }, {

    })
  },
  tabItemStyle: {
    borderWidth: 0,
    elevation: 2,
    // height:70,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 28,
  },
  tabIconStyle: {
    width: 40,
    height: 40,
  },
  drawer: {
    backgroundColor: '#000',
    width: 100,
  },
  navbarStyle: {
    backgroundColor: '#2a8aed',
  },
  titleStyle: {
    color: '#fff',
    fontFamily: 'Montserrat-Light',
  },
  iconLeft: {
    width: 25,
    height: 25,
    alignSelf: 'center',
  },
};

export { routerStyles };
