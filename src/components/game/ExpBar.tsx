import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

interface ExpBarProps {
  currentExp: number;
  maxExp: number;
  height?: number;
  showLabel?: boolean;
}

export const ExpBar: React.FC<ExpBarProps> = ({
  currentExp,
  maxExp,
  height = 25,
  showLabel = true
}) => {
  const progress = (currentExp / maxExp) * 100;
  const animatedWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: progress,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const widthInterpolate = animatedWidth.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={[styles.container, { height }]}>
      <View style={[styles.backgroundBar, { height }]} />
      <Animated.View
        style={[
          styles.progressBar,
          {
            height,
            width: widthInterpolate
          }
        ]}
      />
      {showLabel && (
        <Text style={styles.text}>
          {currentExp} / {maxExp} EXP
        </Text>
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    width: '80%',
    borderRadius: 15,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  backgroundBar: {
    position: 'absolute',
    width: '100%',
    backgroundColor: '#333',
    borderRadius: 15,
  },
  progressBar: {
    position: 'absolute',
    left: 0,
    backgroundColor: '#4cc9f0',
    borderRadius: 15,
  },
  text: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    zIndex: 1,
  },
});