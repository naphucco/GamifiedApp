import React, { useRef } from 'react';
import { TouchableOpacity, Animated, StyleSheet, View } from 'react-native';
import { ButtonText, Text } from './StyledText';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  expAmount?: number;
  type?: 'primary' | 'secondary';
  disabled?: boolean;
  customColor?: string;
  customShadowColor?: string;
}

const PRIMARY_TRANSLATE_Y = 8;
const SECONDARY_TRANSLATE_Y = 6;
const PRIMARY_BORDER_RADIUS = 16;
const SECONDARY_BORDER_RADIUS = 14;

// Màu mặc định
const GREEN_COLOR = '#58cc02';
const GREEN_SHADOW_COLOR = '#4a9e00';
const BLUE_COLOR = '#1cb0f6';
const GRAY_BORDER_COLOR = '#d1d1d1';
const GRAY_SHADOW_COLOR = '#d1d1d1'; // Màu bóng đổ cho secondary

// Hàm xác định style động
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
    // Trường hợp customColor (Nút kiểu secondary nhưng với màu tùy chỉnh)
    mainColor = customColor;
    // Sử dụng màu bóng đổ tùy chỉnh hoặc màu chính
    shadowColor = customShadowColor || mainColor;
    translateY = SECONDARY_TRANSLATE_Y;
    borderWidth = 2;
    borderRadius = SECONDARY_BORDER_RADIUS;
    textColor = '#ffffff';
  } else {
    // Dùng màu mặc định theo type
    switch (type) {
      case 'secondary':
        mainColor = '#ffffff';
        // SỬA LỖI: Cần dùng màu bóng đổ xám
        shadowColor = GRAY_SHADOW_COLOR;
        translateY = SECONDARY_TRANSLATE_Y;
        borderWidth = 2;
        borderRadius = SECONDARY_BORDER_RADIUS;
        textColor = BLUE_COLOR;
        break;
      case 'primary':
      default:
        mainColor = GREEN_COLOR;
        // SỬA LỖI: Cần dùng màu bóng đổ xanh lá đậm
        shadowColor = GREEN_SHADOW_COLOR;
        translateY = PRIMARY_TRANSLATE_Y;
        borderWidth = 4;
        borderRadius = PRIMARY_BORDER_RADIUS;
        textColor = '#ffffff';
        break;
    }
  }

  // Tùy chỉnh màu EXP
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


export const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  expAmount,
  type = 'primary',
  disabled = false,
  customColor,
  customShadowColor,
}) => {
  const translateYAnim = useRef(new Animated.Value(0)).current;
  const {
    mainColor,
    shadowColor,
    translateY,
    borderWidth,
    borderRadius,
    textColor,
    expColor
  } = getDynamicStyles(type, customColor, customShadowColor);

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
      {/* Shadow layer DYNAMIC */}
      {!disabled && (
        <View
          style={[
            styles.dynamicShadowLayer,
            {
              top: translateY,
              backgroundColor: shadowColor,
              borderRadius: borderRadius,
            }
          ]}
        />
      )}

      {/* Main button với animation */}
      <Animated.View
        style={{
          transform: [{ translateY: translateYAnim }] // SỬA LỖI: Dùng translateYAnim
        }}
      >
        <TouchableOpacity
          style={[
            styles.baseButton,
            {
              backgroundColor: mainColor,
              // SỬA LỖI: Border cho secondary mặc định
              borderColor: type === 'secondary' && !customColor ? GRAY_BORDER_COLOR : mainColor,
              borderWidth: borderWidth,
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
          <ButtonText style={[styles.baseButtonText, { color: textColor }]}>
            {title}
          </ButtonText>
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
  buttonContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  // Dynamic Shadow Layer được giữ nguyên
  dynamicShadowLayer: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: '100%',
  },

  // Base style cho Button
  baseButton: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    zIndex: 1,
  },

  baseButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    includeFontPadding: false,
    textTransform: 'none',
  },

  disabledButton: {
    // Bóng đổ cần được xử lý riêng nếu muốn disabled có hiệu ứng khác
    backgroundColor: '#cccccc',
    borderWidth: 4,
    borderColor: '#cccccc',
  },
  expText: {
    fontSize: 14,
    fontWeight: '800',
    marginTop: 4,
    includeFontPadding: false,
  },
});