import React, { Component } from 'react';
import { View, Animated, Easing } from 'react-native';

class BubbleScreen extends Component {
  constructor(props) {
    super(props);
    this.bigBubbleValue = new Animated.Value(0);
    this.mediumBubbleValue = new Animated.Value(0);
    this.smallBubbleValue = new Animated.Value(0);
  }

  componentDidMount() {
    this.animate();
  }

  animate() {
    this.bigBubbleValue.setValue(0);
    this.mediumBubbleValue.setValue(0);
    this.smallBubbleValue.setValue(0);
    Animated.parallel([
      Animated.timing(this.bigBubbleValue, {
        toValue: 1,
        duration: 9000,
        easing: Easing.linear,
        useNativeDriver: true
      }),
      Animated.timing(this.mediumBubbleValue, {
        toValue: 1,
        duration: 8500,
        delay: 1000,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true
      }),
      Animated.timing(this.smallBubbleValue, {
        toValue: 1,
        duration: 6000,
        delay: 400,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true
      })
    ]).start(() => this.animate());
  }

  render() {
    const moveRightBig = this.bigBubbleValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 40, 0]
    });
    const moveDownBig = this.bigBubbleValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 30, 0]
    });

    const moveRightMedium = this.mediumBubbleValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 25, 0]
    });
    const moveTopMedium = this.mediumBubbleValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, -40, 0]
    });

    const moveLeftSmall = this.smallBubbleValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 8, 0]
    });
    const moveBottomSmall = this.smallBubbleValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, -25, 0]
    });

    return (
      <View style={styles.containerStyle}>
        <Animated.View
          style={[
            styles.bubble, styles.big, {
              transform:[{translateY: moveRightBig}, {translateX: moveDownBig}]
            }
          ]}
        />
        <Animated.View
          style={[
            styles.bubble, styles.medium, {
              transform:[{translateY: moveTopMedium}, {translateX: moveRightMedium}]
            }
          ]}
        />
        <Animated.View style={[
          styles.bubble, styles.small, {
            transform:[{translateY: moveBottomSmall}, {translateX: moveLeftSmall}]
          }
        ]}/>
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    // backgroundColor: 'gray'
  },
  bubble: {
    backgroundColor: '#2676EC',
    opacity: .06
  },
  big: {
    top: -180,
    left: -40,
    width: 350,
    height: 350,
    borderRadius: 350 / 2
  },
  medium: {
    position: 'absolute',
    top: 80,
    left: -180,
    width: 250,
    height: 250,
    borderRadius: 250 / 2
  },
  small: {
    position: 'absolute',
    bottom: -150,
    right: -150,
    width: 340,
    height: 340,
    borderRadius: 340 / 2
  }
};

export { BubbleScreen };
