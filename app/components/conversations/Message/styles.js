import { StyleSheet } from 'react-native'

// import { COLORS } from '../../styles'

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 3,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  textContainer: {
    maxWidth: 160,
    // backgroundColor: COLORS.GREY,
    backgroundColor:'#2A8AED',
    borderRadius: 40,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginLeft: 10
  },
  rightContainer: {
    justifyContent: 'flex-end',
    alignItems:'flex-end',
    flexDirection:'column',
    paddingVertical: 3,
  },
  rightTextContainer: {
    // backgroundColor: COLORS.PRIMARY,
    marginRight: 10,
  },
  leftText: {
    textAlign: 'left',
    color:'white',
  },
  rightText: {
    textAlign: 'right',
    color:'white',
  },
  text: {
    fontSize: 12
  }
})

const flattenedStyles = {
  container: StyleSheet.flatten([styles.container, styles.rightContainer]),
  textContainer: StyleSheet.flatten([styles.textContainer, styles.rightTextContainer]),
  leftText: StyleSheet.flatten([styles.leftText, styles.text]),
  rightText: StyleSheet.flatten([styles.rightText, styles.text])
}

export {
  styles,
  flattenedStyles
}
