import { Platform, Dimensions, StyleSheet } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const sidemenuStyles = StyleSheet.create({
  menu: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-around',
    paddingBottom: 50,
    height: windowHeight,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#f0f0f0',
    marginLeft: 30,
    marginRight: 30,
    paddingBottom: 5,
  },
  arrowContainer: {
    padding: 8,
    alignSelf: 'flex-start',
    marginLeft: 15,
  },
  userPart: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainPart: {
    flex: 1,
  },
  menuText: {
    fontSize: 15,
    color: '#555',
    fontFamily: 'Montserrat-Light',
  },
  userInfo: {
    flexDirection: 'column',
    backgroundColor: 'transparent',
    paddingTop: 20,
  },
  ProfileImg: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },
  userName: {
    fontSize: windowWidth <= 320 ? 16 : 18,
    fontFamily: 'Montserrat-Regular',
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: windowWidth <= 320 ? 14 : 15,
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    paddingRight: 10,
    paddingLeft: 10,
    fontFamily: 'Montserrat-Regular',
    backgroundColor: 'transparent',
  },
  position: {
    // fontSize: windowWidth <= 320 ? 12 : 13,
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    paddingRight: 10,
    paddingLeft: 10,
    fontFamily: 'Montserrat-Light',
    backgroundColor: 'transparent',
  },
  icon: {
    margin: 5,
    width: 20,
    height: 20,
    tintColor: '#555',
  },
  btnContainer: {
    marginBottom: 20,
    padding: 10,
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  btnSignOut: {
    alignSelf: 'center',
    width: 150,
    backgroundColor: '#2b78e4',
    borderRadius: 25,
    borderColor: '#98bce1',
    marginTop: 7,
    marginBottom: 15,
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 5,
    borderColor: '#fff',
    borderWidth: 1,
  },
  modalTitle: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 18,
    padding: 15,
  },
  btn: {
    alignSelf: 'center',
    width: 90,
    backgroundColor: '#2b78e4',
    borderRadius: 25,
    borderColor: '#98bce1',
    marginTop: 7,
    marginBottom: 15,
  },
  btntextStyle: {
    alignSelf: 'center',
    color: '#fff',
    fontFamily: 'Montserrat-Light',
    fontSize: 14,
    fontWeight: '600',
    paddingTop: 8,
    paddingBottom: 8,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  mFieldContainer: {
    flexDirection: 'column',
    backgroundColor: '#f1f1f1',
  },
  mLabel: {
    marginLeft: 20,
    marginTop: 20,
    fontFamily: 'Montserrat-Light',
    marginBottom: 5,
    color: '#818181',
    fontSize: 12,
  },
  mContainer: {
    flexDirection: 'column',
    borderBottomWidth: 1,
    borderColor: '#fff',
  },
  mInputStyle: {
    height: Platform.OS === 'android' ? 40 : 20,
    color: '#555',
    marginLeft: 20,
    fontSize: 12,
    marginBottom: 10,
    fontFamily: 'Montserrat-Regular',
  },
  error: {
    fontFamily: 'Montserrat-Regular',
    color: 'red',
    fontSize: 12,
    textAlign: 'center',
    margin: 10,
  },
});

export { sidemenuStyles };
