import { ifIphoneX } from 'react-native-iphone-x-helper'

const newContactStyles = {
  mainContainer: {
    flexDirection: 'column',
    flex: 1,
  },
  alignCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewStyle: {
    backgroundColor: '#2a8aed',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...ifIphoneX({
        paddingTop: 30,
        height: 80,
    }, {
        paddingTop: 15,
        height: 70,
    })
  },
  titleNavbar: {
    fontFamily: 'Montserrat-Light',
    color: '#FFF',
    fontSize: 18,
  },
  department: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 5,
    marginBottom: 10,
    borderColor: '#eee',
    borderBottomWidth: 1,
  },
  fieldContainer: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#f1f1f1',
  },
  labelStyle: {
    fontFamily: 'Montserrat-Light',
    color: '#858585',
    fontSize: 13,
  },
  inputStyle: {
    textAlign: 'right',
    flex: 1,
    fontFamily: 'Montserrat-Light',
    fontSize: 13,
  },
  errorText: {
    textAlign: 'center',
    color: '#F44336',
    marginTop: 5,
    fontSize: 15,
    fontFamily: 'Montserrat-Light',
  },
  textStyle: {
    fontFamily: 'Montserrat-Light',
    fontSize: 13,
  },
  iconLeft: {
    marginLeft: 20,
  },
};

export {newContactStyles};
