import {Platform, Dimensions} from 'react-native';

const common = {
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    backgroundColor: '#2A8AED',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 70,
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
  },
  title: {
    fontFamily: 'Montserrat-Light',
    color: '#FFF',
    fontSize: 18,
  },
  backBtn: {
    padding: 4,
  },
  backIcon: {
    marginLeft: 15,
    alignSelf: 'center',
  },
  createIcon: {
    width: 25,
    height: 25,
    marginRight: 8,
    alignSelf: 'center',
  },
  emptyIcon: {
    height: 25,
    width: 25,
  },
};

export {common};
