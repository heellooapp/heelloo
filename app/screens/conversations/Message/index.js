import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import FastImage from 'react-native-fast-image'
import { styles, flattenedStyles } from './styles'

export default function Message({ side, data, targetUser }) {
  const isLeftSide = side === 'left'

  const containerStyles = isLeftSide ? styles.container : flattenedStyles.container
  const textContainerStyles = isLeftSide ? styles.textContainer : flattenedStyles.textContainer
  const textStyles = isLeftSide ? flattenedStyles.leftText : flattenedStyles.rightText
  showAvatar = (profileImg) => {
    if (profileImg) {
      return <FastImage source={{ uri: profileImg }} style={styles_.profile} />;
    } else {
      return <Image source={require('../../../images/no-avatar.png')} style={styles_.profile} />;
    }
  }
  return (
    <View style={containerStyles}>
      {isLeftSide && this.showAvatar(targetUser.profileImg)}
      <View style={textContainerStyles}>
        <Text style={textStyles}>
          {data.message}
        </Text>
      </View>
    </View>
  )
}
const styles_ = StyleSheet.create({
  profile: {
    width: 30,
    height: 30,
    borderRadius: 15,
  }
});
