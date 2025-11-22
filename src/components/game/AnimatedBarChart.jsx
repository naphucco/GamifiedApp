import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';

const AnimatedBarChart = ({ data, labels, colors }) => {
  const animations = useRef(data.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    const animationsList = data.map((value, index) =>
      Animated.timing(animations[index], {
        toValue: value,
        duration: 1000 + index * 200,
        useNativeDriver: false,
      })
    );
    
    Animated.stagger(100, animationsList).start();
  }, []);

  const maxValue = Math.max(...data);

  return (
    <View style={styles.chart}>
      {data.map((value, index) => (
        <View key={index} style={styles.barContainer}>
          <View style={styles.barBackground}>
            <Animated.View 
              style={[
                styles.bar,
                { 
                  backgroundColor: colors[index],
                  height: animations[index].interpolate({
                    inputRange: [0, maxValue],
                    outputRange: ['0%', '100%']
                  })
                }
              ]} 
            />
          </View>
          <Text style={styles.label}>{labels[index]}</Text>
          <Text style={styles.value}>{value}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  chart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 150,
    marginVertical: 10,
  },
  barContainer: {
    alignItems: 'center',
    flex: 1,
  },
  barBackground: {
    height: 120,
    width: 25,
    // backgroundColor: '#374151',
    borderRadius: 5,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  bar: {
    width: '100%',
    borderRadius: 5,
  },
  label: {
    color: '#fff',
    fontSize: 10,
    marginTop: 5,
    textAlign: 'center',
  },
  value: {
    color: '#4cc9f0',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 2,
  },
});

export default AnimatedBarChart;