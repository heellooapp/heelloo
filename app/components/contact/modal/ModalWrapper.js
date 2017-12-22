import React, {Component} from 'react';
import Modal from 'react-native-modal';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {modalWrapperStyle} from '../../styles';

const styles = modalWrapperStyle;

class ModalWrapper extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      title,
      icon,
      isVisible,
      onEdit,
      onChangeText,
      value,
      onSave,
      onDelete,
      onHide,
      children,
    } = this.props;
    const {modal, modalTitle, btnContainer, btn, btntextStyle} = styles;
    return (
      <Modal isVisible={isVisible}>
        <View style={modal}>
          <Text style={modalTitle}>{title}</Text>
          {children}
          <View style={btnContainer}>
            <TouchableOpacity style={btn} onPress={onSave}>
              <Text style={btntextStyle}>Save</Text>
            </TouchableOpacity>
            {onEdit ? (
              <TouchableOpacity
                style={[btn, {backgroundColor: '#f9536c'}]}
                onPress={onDelete}>
                <Text style={btntextStyle}>Delete</Text>
              </TouchableOpacity>
            ) : null}
            <TouchableOpacity style={btn} onPress={onHide}>
              <Text style={btntextStyle}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}

export {ModalWrapper};