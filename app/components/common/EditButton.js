import React from 'react';
import { View, StyleSheet } from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Entypo';

const EditButton = (props) => {
  return (
    <ActionButton buttonColor="#E74C3C" style={styles.containerStyle}>
      <ActionButton.Item buttonColor='#E74C3C' title="Edit Contact" onPress={props.onEditPress}>
        <Icon name="user" style={styles.actionButtonIcon} />
      </ActionButton.Item>
    </ActionButton>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    marginBottom: 50
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});

export { EditButton };
