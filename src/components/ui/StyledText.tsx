import React from 'react';
import { Text as RNText, TextProps, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  base: {
    fontFamily: 'Nunito-Regular',
    color: '#1f2937',
    fontSize: 16,
    lineHeight: 24,
  },
  heading: {
    fontFamily: 'Nunito-Black',
    fontSize: 24,
    color: '#58CC02', // Duolingo green
    lineHeight: 32,
  },
  subtitle: {
    fontFamily: 'Nunito-Bold', 
    fontSize: 18,
    color: '#1f2937',
    lineHeight: 24,
  },
  bold: {
    fontFamily: 'Nunito-Bold',
  },
  light: {
    fontFamily: 'Nunito-Light',
    color: '#6b7280',
  },
  caption: {
    fontFamily: 'Nunito-Light',
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  button: {
    fontFamily: 'Nunito-Black',
    fontSize: 18,
    color: '#ffffff',
    textTransform: 'uppercase' as const,
  },
});

interface StyledTextProps extends TextProps {
  variant?: 'base' | 'heading' | 'subtitle' | 'bold' | 'light' | 'caption' | 'button';
}

export const StyledText: React.FC<StyledTextProps> = ({ 
  variant = 'base', 
  style, 
  ...props 
}) => {
  return (
    <RNText
      style={[styles[variant], style]}
      {...props}
    />
  );
};

// 🔥 THÊM TEXT THƯỜNG - DÙNG NHIỀU NHẤT
export const Text = (props: TextProps) => (
  <StyledText variant="base" {...props} />
);

// Named exports cho từng variant
export const Heading = (props: TextProps) => (
  <StyledText variant="heading" {...props} />
);

export const Subtitle = (props: TextProps) => (
  <StyledText variant="subtitle" {...props} />
);

export const BoldText = (props: TextProps) => (
  <StyledText variant="bold" {...props} />
);

export const Caption = (props: TextProps) => (
  <StyledText variant="caption" {...props} />
);

export const ButtonText = (props: TextProps) => (
  <StyledText variant="button" {...props} />
);