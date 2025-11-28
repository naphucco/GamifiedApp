import React, { useRef, ReactNode } from 'react';
import { TouchableOpacity, Animated, StyleSheet, View } from 'react-native';

interface CustomCardProps {
  children: ReactNode;
  onPress: () => void;
  backgroundColor: string;
  shadowColor?: string;
  borderColor?: string;
  disabled?: boolean;
  borderRadius?: number;
  translateY?: number;
}

// Giá trị mặc định
const DEFAULT_TRANSLATE_Y = 8;
const DEFAULT_BORDER_RADIUS = 16;
const DEFAULT_BORDER_WIDTH = 3;

export const CustomCard: React.FC<CustomCardProps> = ({
  children,
  onPress,
  backgroundColor,
  shadowColor,
  borderColor,
  disabled = false,
  borderRadius = DEFAULT_BORDER_RADIUS,
  translateY = DEFAULT_TRANSLATE_Y,
}) => {
  const translateYAnim = useRef(new Animated.Value(0)).current;

  // Nếu không có shadowColor tùy chỉnh, sử dụng backgroundColor
  const finalShadowColor = shadowColor || backgroundColor;
  // Nếu không có borderColor tùy chỉnh, sử dụng backgroundColor
  const finalBorderColor = borderColor || backgroundColor;

  const handlePressIn = () => {
    Animated.spring(translateYAnim, {
      toValue: translateY,
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
      {/* Shadow layer */}
      {!disabled && (
        <View
          style={[
            styles.dynamicShadowLayer,
            {
              top: translateY,
              backgroundColor: finalShadowColor,
              borderRadius: borderRadius,
            }
          ]}
        />
      )}

      {/* Main button với animation */}
      <Animated.View
        style={{
          transform: [{ translateY: translateYAnim }]
        }}
      >
        <TouchableOpacity
          style={[
            styles.baseButton,
            {
              backgroundColor: backgroundColor,
              borderColor: finalBorderColor,
              borderWidth: DEFAULT_BORDER_WIDTH,
              borderRadius: borderRadius,
            },
            disabled && styles.disabledButton
          ]}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={handlePress}
          activeOpacity={0.9}
          disabled={disabled}
        >
          {children}
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'relative'
  },
  dynamicShadowLayer: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: '100%',
  },
  baseButton: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    zIndex: 1,
  },
  disabledButton: {
    backgroundColor: '#cccccc',
    borderWidth: 4,
    borderColor: '#cccccc',
  },
});