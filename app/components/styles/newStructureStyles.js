import { ifIphoneX } from 'react-native-iphone-x-helper'

const newStructureStyles = {
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
  error: {
    fontFamily: 'Montserrat-Regular',
    color: 'red',
    fontSize: 12,
    textAlign: 'center',
    margin: 10,
  },
  mainContainer: {
    margin: 15,
    flexDirection: 'column',
  },
  labelContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 15,
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
  titleStyle: {
    fontFamily: 'Montserrat-Light',
    fontSize: 13
  },
  labelStyle: {
    fontFamily: 'Montserrat-Light',
    color: '#858585',
    fontSize: 13,
  },
  inputStyle: {
    marginLeft: 10,
    overflow: 'scroll',
    flex: 1,
    fontFamily: 'Montserrat-Light',
    fontSize: 13,
  },
  iconLeft: {
    marginLeft: 15,
    alignSelf: 'center',
  },
  iconRight: {
    width: 25,
    height: 25,
    alignSelf: 'center',
  },
  error: {
    margin: 10,
    fontFamily: 'Montserrat-Light',
    color: 'red',
  }
};

export {newStructureStyles};
