import {Dimensions } from 'react-native';

Width = Dimensions.get("window").width

const componentStyle = {
  container: {
    flexDirection: 'column',
    backgroundColor: '#FFF',
  },
  fieldContainer: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 20,
    paddingBottom: 20,
    borderColor: '#ededed',
    borderBottomWidth: 1,
    justifyContent: 'space-between'
  },
  label: {
    color: '#b3b3b3',
    fontSize: Width <= 320 ? 12 : 15,
    fontFamily: 'Montserrat-Regular',
  },
  labelValue: {
    flexWrap: 'wrap',
    textAlign: 'right',
    paddingLeft: 5,
    flex: 0.8,
    color: '#000',
    lineHeight: 22,
    fontSize: Width <= 320 ? 12 : 15,
    fontFamily: 'Montserrat-Regular',
  },
  socialContainer: {
    flexDirection: 'row',
  },
  socialIcon: {
    marginLeft: 20
  }
};

export {componentStyle};
