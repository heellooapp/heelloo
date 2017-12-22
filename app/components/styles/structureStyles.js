const structureStyles = {
  viewStyle: {
    backgroundColor: '#2a8aed',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 70,
  },
  structureView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  titleNavbar: {
    fontFamily: 'Montserrat-Light',
    color: '#FFF',
    fontSize: 18,
  },
  mainContainer: {
    // marginTop: Platform.OS !== 'ios' ? 54 : 64
  },
  error: {
    fontFamily: 'Montserrat-Regular',
    color: 'red',
    fontSize: 12,
    textAlign: 'center',
    margin: 10,
  },
  mainStructure: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderColor: '#f1f1f1',
  },
  titleStyle: {
    fontFamily: 'Montserrat-Light',
  },
  subTitle: {
    fontFamily: 'Montserrat-Light',
  },
  childStructure: {
    // marginLeft: 10,
    // paddingLeft: 10,
  },
  textStyle: {
    fontSize: 23,
    color: '#fff',
  },
  iconLeft: {
    width: 25,
    height: 25,
    marginLeft: 15,
    alignSelf: 'center',
  },
  iconRight: {
    width: 25,
    height: 25,
    marginRight: 8,
    alignSelf: 'center',
  },
  iconStructure: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
  contactListStyle: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
  },
  nameStyle: {
    paddingLeft: 15,
    color: '#000',
    // fontSize: windowWidth <= 320 ? 12 : 14,
    fontFamily: 'Montserrat-Medium',
  },
  positionStyle: {
    fontSize: 11,
    paddingLeft: 15,
    fontFamily: 'Montserrat-Light',
    paddingTop: 5,
  },
  listProfileImage: {
    marginLeft: 25,
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  addStructure: {
    margin: 15,
    flexDirection: 'column',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f1f1f1',
    marginTop: 20,
    marginBottom: 20,
  },
  labelStyle: {
    fontFamily: 'Montserrat-Light',
    color: '#858585',
    fontSize: 13
  },
  inputStyle: {
    textAlign: 'left',
    marginLeft: 10,
    flex: 1,
    fontFamily: 'Montserrat-Light',
    fontSize: 13
  },
  error: {
    margin: 10,
    fontFamily: 'Montserrat-Light',
    color: 'red',
  }
};

export {structureStyles};