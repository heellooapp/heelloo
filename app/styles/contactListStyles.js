const contactListStyles = {
  hiddenBtn: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  hiddenBtnView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderColor: '#FFF',
  },
  hiddenBtnImage: {
    width: 30,
    height: 30,
    resizeMode: 'cover'
  },
  hiddenBtnText: {
    color: '#FFF',
    marginTop: 5,
    fontSize: 12,
    fontFamily: 'Montserrat-Light',
  },
  listItemName: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  listHiddenRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 0,
    marginLeft: 0,
    marginRight: 0,
    top: 0,
    bottom: 0,
  },
  hiddenButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // width: windowWidth <= 320 ? 60 : 75,
  },
  listContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2',
    marginTop: 0,
    padding: 15,
    backgroundColor: '#fff',
    marginLeft: 0,
    marginRight: 0,
  },
  listProfileImage: {
    width: 55,
    height: 55,
    resizeMode: 'cover',
    borderRadius: 55 / 2,
  },
  middleSectionStyle: {
    marginLeft: 12,
    justifyContent: 'center',
  },
  positionStyle: {
    fontSize: 12,
    fontFamily: 'Montserrat-Light',
    paddingTop: 5,
  },
  nameStyle: {
    color: '#000',
    // fontSize: windowWidth <= 320 ? 14 : 15,
    fontFamily: 'Montserrat-Medium',
  },
  listIconStyle: {
    marginRight: 5,
  },
  menuContainer: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  notification: {
    backgroundColor: '#84fc0b',
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  searchContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  titleNavbar: {
    color: '#FFF',
    fontSize: 18,
    fontFamily: 'Montserrat-Light',
  },
  inputStyle: {
    height: 25,
    fontFamily: 'Montserrat-Light',
    color: '#FFF',
    paddingLeft: 60,
  }
};

export {contactListStyles};