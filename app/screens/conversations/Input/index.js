import React, { useCallback, useState, useContext } from 'react'
import { View, TextInput, Text } from 'react-native'
import SpinnerButton from 'react-native-spinner-button';
import { firebaseService } from '../services'
// import { UserContext } from '../../contexts'
import Button from '../common/Button'
import styles from './styles'

export default function Input(props) {
  // const { uid } = useContext(UserContext)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const handlePress = useCallback(
    function () {
      if (message) {
        firebaseService
          .createMessage({ conversationId: props.conversationId, sender: props.sender, message: message })
          .then(function () {
            setIsLoading(false)
            setMessage('')
          });

        setIsLoading(true);
      }
    },
    [message]
  )

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} value={message} onChangeText={setMessage} placeholder="Type a message..." />
      </View>
      <SpinnerButton
        buttonStyle={styles.spinnerButton}
        onPress={handlePress}
        isLoading={isLoading}
        indicatorCount={10}
        spinnerType='PulseIndicator'>
        <Button text="Send" onPress={handlePress} disabled={isLoading} />
      </SpinnerButton>
    </View>
  )
}
