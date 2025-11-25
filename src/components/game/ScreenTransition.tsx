// src/components/game/withAutoAnimation.js
import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

export const withScreenTransition = (WrappedComponent: any, animationType = 'fade') => {
  return (props: any) => {
    const isFocused = useIsFocused();
    const animation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      if (isFocused) {
        // Reset và chạy animation khi screen được focus
        animation.setValue(0);

        Animated.timing(animation, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }).start();
      }
    }, [isFocused]);

    const getAnimationStyle = () => {
      switch (animationType) {
        case 'slideUp':
          return {
            opacity: animation,
            transform: [{
              translateY: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [50, 0],
              })
            }]
          };
        case 'slideRight':
          return {
            opacity: animation,
            transform: [{
              translateX: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [-150, 0],
              })
            }]
          };
        case 'scale':
          return {
            opacity: animation,
            transform: [{
              scale: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [0.8, 1],
              })
            }]
          };
        case 'fade':
        default:
          return {
            opacity: animation,
          };
      }
    };

    return (
      <Animated.View style={[{ flex: 1 }, getAnimationStyle()]}>
        <WrappedComponent {...props} />
      </Animated.View>
    );
  };
};