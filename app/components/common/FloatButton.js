import React from 'react';
import { View, StyleSheet } from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Entypo';
const FloatButton = (props) => {
  return (
    <View style={styles.containerStyle}>
      <ActionButton buttonColor="#E74C3C">
        <ActionButton.Item buttonColor='#E74C3C' title="Structure" onPress={props.onStructurePress}>
          <Icon name="flow-tree" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item buttonColor='#E74C3C' title="Contact" onPress={props.onContactPress}>
          <Icon name="user" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    marginBottom: 30
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});

export { FloatButton };
