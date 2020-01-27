import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles'

export default function Button ({ text, disabled, onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} disabled={disabled}>
      <Icon name="chevron-circle-right" size={20} color="white" />
    </TouchableOpacity>
  )
}
