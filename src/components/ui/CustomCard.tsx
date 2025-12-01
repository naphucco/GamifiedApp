import React, { useRef, ReactNode } from 'react';
import { TouchableOpacity, Animated, StyleSheet, View } from 'react-native';

/**
 * Props for the CustomCard component
 * @interface CustomCardProps
 */
interface CustomCardProps {
  /** Content to be rendered inside the card */
  children: ReactNode;
  /** Callback function when card is pressed */
  onPress?: () => void;
  /** Background color of the card */
  backgroundColor: string;
  /** Color of the shadow layer (optional) */
  shadowColor?: string;
  /** Color of the border (optional) */
  borderColor?: string;
  /** Whether the card is disabled (optional) */
  disabled?: boolean;
  /** Border radius of the card (optional) */
  borderRadius?: number;
  /** Translation value for press animation (optional) */
  translateY?: number;
}

// Default values for optional props
const DEFAULT_TRANSLATE_Y = 8; // Default translateY value for press animation
const DEFAULT_BORDER_RADIUS = 16; // Default border radius
const DEFAULT_BORDER_WIDTH = 3; // Default border width

/**
 * A customizable card component with press animation and shadow effects
 * Features include:
 * - Press animation with translateY effect
 * - Dynamic shadow layer
 * - Customizable colors and border radius
 * - Disabled state support
 */
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
  // Animation value for translateY effect
  const translateYAnim = useRef(new Animated.Value(0)).current;

  // Use backgroundColor as fallback if shadowColor is not provided
  const finalShadowColor = shadowColor || backgroundColor;
  // Use backgroundColor as fallback if borderColor is not provided
  const finalBorderColor = borderColor || backgroundColor;

  /**
   * Handles the press-in animation
   * Animates the card downward to create a pressing effect
   */
  const handlePressIn = () => {
    Animated.spring(translateYAnim, {
      toValue: translateY, // Move down by translateY pixels
      friction: 5, // Controls the bounciness of the animation
      useNativeDriver: true, // Use native driver for better performance
    }).start();
  };

  /**
   * Handles the press-out animation
   * Returns the card to its original position
   */
  const handlePressOut = () => {
    Animated.spring(translateYAnim, {
      toValue: 0, // Return to original position
      friction: 5,
      useNativeDriver: true,
    }).start();
  };

  /**
   * Handles the main press event
   * Calls the provided onPress callback if available
   */
  const handlePress = () => {
    onPress?.();
  };

  return (
    <View style={styles.buttonContainer}>
      {/* Shadow layer that creates the depth effect */}
      {/* Only visible when card is not disabled */}
      {!disabled && (
        <View
          style={[
            styles.dynamicShadowLayer,
            {
              top: translateY, // Position shadow below the main card
              backgroundColor: finalShadowColor,
              borderRadius: borderRadius, // Match card's border radius
            }
          ]}
        />
      )}

      {/* Main button container with animation */}
      <Animated.View
        style={{
          transform: [{ translateY: translateYAnim }] // Apply translateY animation
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
            disabled && styles.disabledButton // Apply disabled styles when disabled
          ]}
          onPressIn={handlePressIn} // Triggered when touch starts
          onPressOut={handlePressOut} // Triggered when touch ends
          onPress={handlePress} // Triggered when press is completed
          activeOpacity={0.9} // Slight opacity change on press
          disabled={disabled} // Disable touch events when disabled
        >
          {children}
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  /** Main container with relative positioning for shadow layer */
  buttonContainer: {
    position: 'relative' // Allows absolute positioning of shadow layer
  },
  
  /** Shadow layer that sits behind the main button */
  dynamicShadowLayer: {
    position: 'absolute', // Position absolutely within buttonContainer
    left: 0, // Stretch to full width
    right: 0, // Stretch to full width
    height: '100%', // Match height of the main button
  },
  
  /** Base styles for the main button */
  baseButton: {
    paddingHorizontal: 24, // Horizontal padding
    paddingVertical: 16, // Vertical padding
    alignItems: 'center', // Center content horizontally
    justifyContent: 'center', // Center content vertically
    position: 'relative', // Establish stacking context
    zIndex: 1, // Ensure button appears above shadow layer
  },
  
  /** Styles applied when button is disabled */
  disabledButton: {
    backgroundColor: '#cccccc', // Gray background for disabled state
    borderWidth: 4, // Thicker border for disabled state
    borderColor: '#cccccc', // Gray border for disabled state
  },
});