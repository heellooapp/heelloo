import {Dimensions, Platform} from 'react-native';
Width = Dimensions.get('window').width;

const profileStyles = {
	mainStyle: {
    flexDirection: 'row',
    padding: 10,
    marginTop: 5,
  },
  mainContainer: {
    flexDirection: 'column',
    backgroundColor: '#2A8AED',
    flex: 1,
  },
  tabContainer: {
    flexDirection: 'row',
    zIndex: 1,
    backgroundColor: '#fff',
    shadowColor: '#222222',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.2,
    elevation: 2,
    borderBottomWidth: 0
  },
  tabItem: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    padding: Width <= 320 ? 5 : 8,
    backgroundColor: '#FFF',
    borderColor: '#e6e6e6',
    borderRightWidth: 1,
    borderBottomWidth: 0,
  },
  tabText: {
    color: '#b3b3b3',
    fontFamily: 'Montserrat-Regular',
    fontSize: Width <= 320 ? 9 : 10,
    textAlign: 'center',
  },
  selectedTabItem: {
    backgroundColor: '#2a8aed',
    borderColor: '#18a4e9',
    borderTopWidth: 1,
  },
  selectedTabIcon: {
    tintColor: '#FFF',
  },
  selectedTabText: {
    color: '#FFF',
  },
  tabIcon: {
    tintColor: '#000',
    marginBottom: 5,
    width: 20,
    height: 20,
  },
  userName: {
    marginLeft: 24,
    width: 140,
  },
  mainTitle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mainTitleText: {
    fontWeight: 'bold',
    justifyContent: 'center',
  },
  viewStyle: {
    backgroundColor: '#2a8aed',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'ios' ? 20 : 0
  },
  headerStyle: {
    flexDirection: 'row',
    marginTop: 10,
  },
  avatarStyle: {
    flexDirection: 'column',
    marginTop: 8,
    alignItems: 'center',
  },
  positionStyle: {
    marginTop: 8,
    marginBottom: 15,
    alignItems: 'center',
  },
  btnGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  btnGreen: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    width: Width <= 320 ? 60 : 70,
    height: Width <= 320 ? 60 : 70,
    borderRadius: Width <= 320 ? 30 : 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnStyle: {
    width: 25,
    height: 25,
  },
  headBtn: {
    flex: 1,
  },
  editBtn: {
    flex: 1,
  },
  tabView: {
  	backgroundColor: '#FFF',
  },
  nameStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    flex: 5,
  },
  nameTitle: {
    fontFamily: 'Montserrat-Regular',
    color: '#FFF',
    fontSize: Width <= 320 ? 15 : 18
  },
  subTitle: {
    color: '#FFF',
    fontSize: Width <= 320 ? 12 : 15,
    fontFamily: 'Montserrat-Light',
    marginBottom: 5,
  },
  positionTitle: {
    fontFamily: 'Montserrat-Regular',
    color: '#FFF',
    textAlign: 'center',
    marginLeft: 15,
    marginRight: 15,
    fontSize: Width <= 320 ? 14 : 15,
  },
  teamTitle: {
    fontFamily: 'Montserrat-Light',
    textAlign: 'center',
    marginLeft: 15,
    marginRight: 15,
    color: '#FFF',
    fontSize: Width <= 320 ? 12 : 14,
  },
  iconRight: {
    alignSelf: 'center',
  },
  iconLeft: {
    alignSelf: 'center',
  },
  profileImage: {
    width: Width <= 320 ? 90 : 100,
    height: Width <= 320 ? 90 : 100,
    borderRadius: Width <= 320 ? 45 : 50,
    resizeMode: 'cover',
  }
};

export {profileStyles};