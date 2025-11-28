import React, { useRef } from 'react';
import { TouchableOpacity, Animated, StyleSheet, View } from 'react-native';
import { ButtonText, Text } from './StyledText';

/**
 * Props for the CustomButton component
 * @interface CustomButtonProps
 */
interface CustomButtonProps {
  /** Text displayed on the button */
  title: string;
  /** Callback function when button is pressed */
  onPress: () => void;
  /** Experience points amount to display (optional) */
  expAmount?: number;
  /** Button type that determines the visual style */
  type?: 'primary' | 'secondary';
  /** Whether the button is disabled (optional) */
  disabled?: boolean;
  /** Custom color for the button (optional) */
  customColor?: string;
  /** Custom shadow color for the button (optional) */
  customShadowColor?: string;
}

// Animation constants
const PRIMARY_TRANSLATE_Y = 8; // Press animation distance for primary buttons
const SECONDARY_TRANSLATE_Y = 6; // Press animation distance for secondary buttons
const PRIMARY_BORDER_RADIUS = 16; // Border radius for primary buttons
const SECONDARY_BORDER_RADIUS = 14; // Border radius for secondary buttons

// Default color constants
const GREEN_COLOR = '#58cc02'; // Primary button color
const GREEN_SHADOW_COLOR = '#4a9e00'; // Primary button shadow color
const BLUE_COLOR = '#1cb0f6'; // Secondary button text color
const GRAY_BORDER_COLOR = '#d1d1d1'; // Secondary button border color
const GRAY_SHADOW_COLOR = '#d1d1d1'; // Secondary button shadow color

/**
 * Determines dynamic styles based on button type and customizations
 * @param type - Button type (primary/secondary)
 * @param customColor - Optional custom color override
 * @param customShadowColor - Optional custom shadow color override
 * @returns Object containing all calculated style properties
 */
const getDynamicStyles = (
  type: CustomButtonProps['type'],
  customColor?: string,
  customShadowColor?: string
) => {
  let mainColor = '';
  let shadowColor = '';
  let translateY = PRIMARY_TRANSLATE_Y;
  let borderWidth = 4;
  let borderRadius = PRIMARY_BORDER_RADIUS;
  let textColor = '#ffffff';

  if (customColor) {
    // Custom color mode (secondary-style button with custom colors)
    mainColor = customColor;
    // Use custom shadow color or fall back to main color
    shadowColor = customShadowColor || mainColor;
    translateY = SECONDARY_TRANSLATE_Y;
    borderWidth = 2;
    borderRadius = SECONDARY_BORDER_RADIUS;
    textColor = '#ffffff';
  } else {
    // Default color mode based on button type
    switch (type) {
      case 'secondary':
        mainColor = '#ffffff';
        shadowColor = GRAY_SHADOW_COLOR;
        translateY = SECONDARY_TRANSLATE_Y;
        borderWidth = 2;
        borderRadius = SECONDARY_BORDER_RADIUS;
        textColor = BLUE_COLOR;
        break;
      case 'primary':
      default:
        mainColor = GREEN_COLOR;
        shadowColor = GREEN_SHADOW_COLOR;
        translateY = PRIMARY_TRANSLATE_Y;
        borderWidth = 4;
        borderRadius = PRIMARY_BORDER_RADIUS;
        textColor = '#ffffff';
        break;
    }
  }

  // Determine EXP text color based on button type
  const expColor = (type === 'secondary' && !customColor) ? '#ff9600' : '#ffffff';

  return {
    mainColor,
    shadowColor,
    translateY,
    borderWidth,
    borderRadius,
    textColor,
    expColor
  };
};

/**
 * A customizable button component with press animation and shadow effects
 * Features include:
 * - Primary and secondary button types
 * - Press animation with translateY effect
 * - Dynamic shadow layer
 * - Experience points display
 * - Custom color support
 * - Disabled state
 */
export const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  expAmount,
  type = 'primary',
  disabled = false,
  customColor,
  customShadowColor,
}) => {
  // Animation value for translateY effect
  const translateYAnim = useRef(new Animated.Value(0)).current;
  
  // Calculate dynamic styles based on props
  const {
    mainColor,
    shadowColor,
    translateY,
    borderWidth,
    borderRadius,
    textColor,
    expColor
  } = getDynamicStyles(type, customColor, customShadowColor);

  /**
   * Handles the press-in animation
   * Animates the button downward to create a pressing effect
   */
  const handlePressIn = () => {
    Animated.spring(translateYAnim, {
      toValue: translateY, // Move down by calculated translateY pixels
      friction: 5, // Controls the bounciness of the animation
      useNativeDriver: true, // Use native driver for better performance
    }).start();
  };

  /**
   * Handles the press-out animation
   * Returns the button to its original position
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
      {/* Only visible when button is not disabled */}
      {!disabled && (
        <View
          style={[
            styles.dynamicShadowLayer,
            {
              top: translateY, // Position shadow below the main button
              backgroundColor: shadowColor,
              borderRadius: borderRadius, // Match button's border radius
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
              backgroundColor: mainColor,
              // Use gray border for secondary buttons without custom color
              borderColor: type === 'secondary' && !customColor ? GRAY_BORDER_COLOR : mainColor,
              borderWidth: borderWidth,
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
          {/* Main button text */}
          <ButtonText style={[styles.baseButtonText, { color: textColor }]}>
            {title}
          </ButtonText>
          
          {/* Experience points display (conditional) */}
          {expAmount && (
            <Text style={[
              styles.expText,
              { color: expColor }
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
  /** Main container with relative positioning for shadow layer */
  buttonContainer: {
    position: 'relative', // Allows absolute positioning of shadow layer
    marginBottom: 16, // Spacing between buttons
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

  /** Base styles for button text */
  baseButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    includeFontPadding: false, // Remove extra padding around text
    textTransform: 'none', // Preserve original text case
  },

  /** Styles applied when button is disabled */
  disabledButton: {
    backgroundColor: '#cccccc', // Gray background for disabled state
    borderWidth: 4, // Thicker border for disabled state
    borderColor: '#cccccc', // Gray border for disabled state
  },
  
  /** Styles for experience points text */
  expText: {
    fontSize: 14,
    fontWeight: '800',
    marginTop: 4, // Spacing above EXP text
    includeFontPadding: false, // Remove extra padding around text
  },
});