import React from 'react'
import { ActivityIndicator, View } from 'react-native'

import { COLORS } from '../../styles'

import styles from './styles'

export default function Loader () {
  return (
    <View style={styles.container}>
      <ActivityIndicator animating color={COLORS.PRIMARY} size="small"/>
    </View>
  )
}
