import { StyleSheet } from 'react-native'

import { COLORS } from '../styles'

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    paddingBottom:20
  },
  inputContainer: {
    width: '80%',
    borderColor: COLORS.GREY,
    borderWidth:1,
    borderRadius:20,
  },
  input: {
    height: 40,
    borderRadius: 3,
    flexDirection: 'row',
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor:'#F8F8F8',
  },
  spinnerButton: {
    height: 40,
    width: 40,
    borderRadius: 30,
    backgroundColor: '#5FB0FF',
  }
})
