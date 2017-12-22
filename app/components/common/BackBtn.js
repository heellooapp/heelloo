import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';

const BackBtn = () => {
	return (
		<TouchableOpacity 
      style={{padding: 4}} 
      onPress={() => Actions.pop()}>
      <Icon
        name="md-arrow-back"
        size={25}
        color="#FFF"
        style={{marginLeft: 15, alignSelf: 'center'}}
      />
    </TouchableOpacity>
	);
};

export {BackBtn};