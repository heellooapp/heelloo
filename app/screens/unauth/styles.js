import { ifIphoneX } from 'react-native-iphone-x-helper'

const styles = {
  container: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  errorText: {
    textAlign: 'center',
    color: '#F44336',
    fontSize: 14,
    marginBottom: 6,
    fontFamily: 'Montserrat-Regular',
    backgroundColor: 'transparent',
  },
  logo: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 180,
  },
  logoStyle: {
    width: 140,
    height: 45,
  },
  btn: {
    flexDirection: 'row',
    marginTop: 5,
  },
  forgetPassword: {
    marginTop: 40,
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center',
    color: '#686868'
  },
  viewStyle: {
    backgroundColor: '#2a8aed',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    fontSize: 18,
    textAlign:'center'
  },
};

export default styles;
