import React from 'react';
import { View } from 'react-native';

const CardSection = (props) => {
  return (
    <View style={[styles.containerStyle, props.style]}>
      {props.children}
    </View>
  );
};

const styles = {
  containerStyle: {
    // borderWidth: 1,
    borderBottomWidth: 1,
    padding: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'relative',
    // borderRadius: 2,
    borderColor: '#F2F2F2',
    marginBottom: 10,
    // backgroundColor: '#fafafa',
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: -5,
    // elevation: 1,
  }
};

export { CardSection };
