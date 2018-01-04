import {Platform} from 'react-native';

const headerStyles = {
  viewStyle: {
    backgroundColor: '#2a8aed',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 70,
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
  },
  titleSection: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleNavbar: {
    fontFamily: 'Montserrat-Light',
    color: '#FFF',
    fontSize: 18,
  },
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
  },
  iconLeft: {
    marginLeft: 20,
  },
  iconRight: {
    marginRight: 20,
  },
  iconList: {
    marginRight: 20,
    width: 30,
    height: 30,
  },
  textInput: {
    color: '#FFF',
    flex: 1,
    height: 35,
    fontFamily: 'Montserrat-Light',
    paddingVertical: 0,
    justifyContent: 'flex-start',
    fontSize: 15,
  },
  notification: {
    backgroundColor: '#84fc0b',
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  menuContainer: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'center',
  },
};

export {headerStyles};
