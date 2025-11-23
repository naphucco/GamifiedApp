import React, { useRef } from 'react';
import { TouchableOpacity, Text, Animated, StyleSheet, View } from 'react-native';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  expAmount?: number;
  type?: 'primary' | 'secondary';
  disabled?: boolean;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  expAmount,
  type = 'primary',
  disabled = false
}) => {
  const translateYAnim = useRef(new Animated.Value(0)).current;

  const handlePressIn = () => {
    Animated.spring(translateYAnim, {
      toValue: type === 'primary' ? 8 : 6,
      friction: 5,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(translateYAnim, {
      toValue: 0,
      friction: 5,
      useNativeDriver: true,
    }).start();
  };

  const handlePress = () => {
    onPress?.();
  };

  return (
    <View style={styles.buttonContainer}>
      {/* Shadow layer cho primary */}
      {!disabled && type === 'primary' && (
        <View style={styles.primaryShadowLayer} />
      )}

      {/* Shadow layer cho secondary */}
      {!disabled && type === 'secondary' && (
        <View style={styles.secondaryShadowLayer} />
      )}

      {/* Main button với animation */}
      <Animated.View
        style={{
          transform: [{ translateY: translateYAnim }]
        }}
      >
        <TouchableOpacity
          style={[
            type === 'primary' ? styles.primaryButton : styles.secondaryButton,
            disabled && styles.disabledButton
          ]}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={handlePress}
          activeOpacity={0.9}
          disabled={disabled}
        >
          <Text style={type === 'primary' ? styles.primaryButtonText : styles.secondaryButtonText}>
            {title}
          </Text>
          {expAmount && (
            <Text style={[
              styles.expText,
              type === 'primary' ? styles.primaryExpText : styles.secondaryExpText
            ]}>
              +{expAmount} EXP
            </Text>
          )}
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  primaryShadowLayer: {
    position: 'absolute',
    top: 8,
    left: 0,
    right: 0,
    height: '100%',
    borderRadius: 16,
    backgroundColor: '#4a9e00',
  },
  secondaryShadowLayer: {
    position: 'absolute',
    top: 6,
    left: 0,
    right: 0,
    height: '100%',
    borderRadius: 14,
    backgroundColor: '#d1d1d1',
  },
  primaryButton: {
    backgroundColor: '#58cc02',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: '#58cc02',
    minWidth: 250,
    position: 'relative',
    zIndex: 1,
  },
  secondaryButton: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#d1d1d1',
    minWidth: 250,
    position: 'relative',
    zIndex: 1,
  },
  disabledButton: {
    backgroundColor: '#cccccc',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: '#cccccc',
    minWidth: 250,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    includeFontPadding: false,
  },
  secondaryButtonText: {
    color: '#1cb0f6',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    includeFontPadding: false,
  },
  expText: {
    fontSize: 14,
    fontWeight: '800',
    marginTop: 4,
    includeFontPadding: false,
  },
  primaryExpText: {
    color: '#ffffff',
    opacity: 0.9,
  },
  secondaryExpText: {
    color: '#ff9600',
  },
});