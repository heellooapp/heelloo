import React, {Component} from 'react';
import Modal from 'react-native-modal';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {modalWrapperStyle} from '../../../styles';

const styles = modalWrapperStyle;

class ModalWrapperClose extends Component {
  constructor(props) {
    super(props);
  }

  render() {const {isVisible, onClose, children} = this.props;
    const {modal, btnContainer, btn, btntextStyle} = styles;
    return (
      <Modal isVisible={isVisible}>
        <View style={modal}>
          {children}
          <View style={btnContainer}>
            <TouchableOpacity style={btn} onPress={onClose}>
              <Text style={btntextStyle}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}

export {ModalWrapperClose};