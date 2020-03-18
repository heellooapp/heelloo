import { StyleSheet } from 'react-native'

// import { COLORS } from '../../styles'

const leftStyles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 3,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  textContainer: {
    maxWidth: 300,
    backgroundColor: '#F8F8F8',
    paddingHorizontal: 15,
    paddingVertical: 12,
    minWidth: 120,
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 5,

  },
  leftText: {
    textAlign: 'left',
    color: 'black',
  },
  rightText: {
    textAlign: 'left',
    color: 'black',
  },
  text: {
    fontSize: 14
  },
  time: {
    fontSize: 10,
    alignSelf: 'center',
    marginLeft: 10,
    color: '#C0C0C0',
  }

})

const rightStyles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 3,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    paddingVertical: 3,
  },
  textContainer: {
    maxWidth: 160,
    // backgroundColor: '#F8F8F8',
    backgroundColor: '#7DB6F3',
    paddingHorizontal: 15,
    paddingVertical: 12,
    minWidth: 120,
    borderRadius: 5,
    borderTopRightRadius: 0,
  },
  rightText: {
    textAlign: 'left',
    color: 'white',
  },
  time: {
    fontSize: 10,
    alignSelf: 'center',
    marginRight: 10,
    color: '#C0C0C0',
  }
});

export {
  leftStyles,
  rightStyles
}
