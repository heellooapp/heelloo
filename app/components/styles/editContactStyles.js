import {Platform} from 'react-native';

const editContactStyles = {
	mainContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFF'
  },
  collapseView: {
    flex: 1,
  },
  header: {
    marginTop: 35,
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  close: {
    position: 'absolute',
    padding: 4,
    top: 0,
    left: 0,
    marginLeft: 15,
  },
  profileImg: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  circle: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#2a8aed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleEdit: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#bbb',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  accordionContainer: {
    //marginTop: 30
  },
  accordionHeader: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: '#ebebeb',
    borderTopWidth: 1,
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 15,
    paddingBottom: 15,
  },
  accordianTitle: {
    fontFamily: 'Montserrat-Medium',
  },
  accordianContent: {
    backgroundColor: '#f1f0f0',
    padding: 20,
    flex: 1,
    flexDirection: 'row',
    borderColor: '#e2e2e2',
    borderBottomWidth: 1,
    justifyContent: 'space-between',
  },
  fieldContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  inputStyle: {
    flex: 1,
    height: Platform.OS === 'android' ? 40 : 20,
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
  },
  labelStyle: {
    fontFamily: 'Montserrat-Light',
    marginBottom: 5,
    color: '#818181',
    fontSize: 12,
  },
  regularText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    height: 20,
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
  ProfileImageContainer: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImageText: {
    color: 'red',
    fontFamily: 'Montserrat-Regular',
  },
  profileImageDetail: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderColor: '#eee',
    borderWidth: 1,
    resizeMode: 'contain',
  },
  memberContainer: {
    flexDirection: 'row',
  },
  relationLabel: {
    flex: 1,
    fontFamily: 'Montserrat-Light',
    color: '#555',
    fontSize: 12,
    marginBottom: 5,
  },
  phoneLabel: {
    flex: 1,
    fontFamily: 'Montserrat-Light',
    color: '#555',
    fontSize: 12,
    marginBottom: 5,
    textAlign: 'right',
    marginRight: 25,
  },
  birthdayLabel: {
    flex: 1,
    fontFamily: 'Montserrat-Light',
    color: '#555',
    fontSize: 12,
    textAlign: 'right',
    marginRight: 25,
  },
  nameLabel: {
    flex: 1,
    fontFamily: 'Montserrat-Light',
    color: '#555',
    fontSize: 12,
  },
  addMemberBtn: {
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  btnTextMember: {
    color: '#fff',
    fontFamily: 'Montserrat-Regular',
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
  mInputDate: {
    height: Platform.OS === 'android' ? 40 : 20,
    color: '#555',
    fontSize: 12,
    marginBottom: 10,
    fontFamily: 'Montserrat-Regular',
  },
  mPlaceholder: {
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
  toast: {
    borderRadius: 20,
    backgroundColor: '#555',
  },
  toastText: {
    color: '#FFF',
    fontFamily: 'Montserrat-Light',
  }
};

export {editContactStyles};