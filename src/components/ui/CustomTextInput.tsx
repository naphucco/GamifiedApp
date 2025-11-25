import React from 'react';
import { TextInput, StyleSheet, View, TextInputProps } from 'react-native';
import { Text } from './StyledText';

interface CustomTextInputProps extends TextInputProps {
  label?: string;
  error?: string | boolean;
  multiline?: boolean;
}

// Chiều cao tối đa cho không gian hiển thị lỗi (ví dụ 20px)
const ERROR_SPACE_HEIGHT = 20; 
const INPUT_VERTICAL_PADDING = 12;

export const CustomTextInput: React.FC<CustomTextInputProps> = ({
  label,
  error,
  multiline = false,
  style,
  ...rest
}) => {
  const isError = typeof error === 'string' || error === true;

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      
      <View style={styles.shadowLayer} /> 

      <TextInput
        style={[
          styles.input,
          multiline && styles.textArea,
          isError && styles.inputError,
          style,
        ]}
        placeholderTextColor={isError ? '#ef4444' : '#8d99ae'}
        multiline={multiline}
        numberOfLines={multiline ? 4 : 1}
        {...rest}
      />
      
      {/* KHÔNG GIAN LỖI CỐ ĐỊNH */}
      <View style={styles.errorSpace}>
        {isError && typeof error === 'string' && (
          <Text style={styles.errorText}>{error}</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    // Giữ khoảng cách ở phía dưới cố định, KHÔNG DÙNG marginBottom lớn nữa
    marginBottom: 8, 
    paddingTop: 4, 
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#3c3c3c',
    marginBottom: 4,
    paddingLeft: 4,
  },
  shadowLayer: {
    position: 'absolute',
    top: 0, 
    left: 0,
    right: 0,
    height: '100%',
    zIndex: 0,
  },
  input: {
    backgroundColor: '#ffffff',
    color: '#333333',
    paddingHorizontal: 16,
    paddingVertical: INPUT_VERTICAL_PADDING,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#d1d5db',
    fontSize: 16,
    zIndex: 1, 
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  inputError: {
    borderColor: '#ff6347',
    backgroundColor: '#fef2f2',
    borderWidth: 2,
  },
  // BƯỚC KHẮC PHỤC: Tạo một không gian có chiều cao cố định cho lỗi
  errorSpace: {
    height: ERROR_SPACE_HEIGHT, // Chiều cao cố định
    justifyContent: 'center', // Canh giữa theo chiều dọc (tùy chọn)
    paddingHorizontal: 5,
  },
  errorText: {
    color: '#ff6347',
    fontSize: 12,
    // Loại bỏ margin bottom lớn
    margin: 0, 
    fontWeight: '500',
  },
});