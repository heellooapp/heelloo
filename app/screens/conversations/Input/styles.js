import { StyleSheet } from 'react-native'

import { COLORS } from '../styles'

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
  },
  inputContainer: {
    width: '70%',

  },
  input: {
    height: 40,
    borderRadius: 3,
    flexDirection: 'row',
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  spinnerButton: {
    height: 40,
    width: 40,
    borderRadius: 30,
    backgroundColor: '#5FB0FF',
  }
})
