import { Dimensions, Platform } from 'react-native';

const windowWidth = Dimensions.get('window').width;

const structure = {
  structureView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  structureContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderColor: '#f1f1f1',
  },
  titleStyle: {
    fontFamily: 'Montserrat-Light',
    paddingTop: 15,
    paddingBottom: 15
  },
  icon: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
  contactList: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
  },
  contactName: {
    paddingLeft: 15,
    color: '#000',
    fontSize: windowWidth <= 320 ? 12 : 14,
    fontFamily: 'Montserrat-Medium',
  },
  contactPosition: {
    fontSize: 11,
    paddingLeft: 15,
    fontFamily: 'Montserrat-Light',
    paddingTop: 5,
  },
  avatar: {
    marginLeft: 25,
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  circle: {
    backgroundColor: '#2a8aed',
    borderRadius: 20,
    width: 40,
    alignItems: 'center',
    height: 40,
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    // borderStyle: 'solid',
    borderLeftWidth: 20,
    borderRightWidth: 20,
    borderBottomWidth: 40,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'blue'
  },
  numberOf: {
    fontSize: 17,
    marginTop: 9,
    color: 'white',
    zIndex:10,
    fontFamily: 'Montserrat-Medium',

  }
};

export { structure };
