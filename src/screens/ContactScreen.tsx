import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, ScrollView, TextInput, Alert, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { gameState } from '../game/GameState';
import { Text } from '../components/ui/StyledText';
import { CustomTextInput } from '../components/ui/CustomTextInput';
import { CustomButton } from '../components/ui/CustomButton';
import { CustomAlertModal } from '../components/ui/CustomAlertModal';

export const ContactScreen = () => {
  const navigation = useNavigation<any>();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    message: false
  });
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // NEW: Hàm xác thực riêng cho từng trường
  const validateFormForField = (field: keyof typeof errors, value: string) => {
    let isError = false;
    const trimmedValue = value.trim();

    switch (field) {
      case 'name':
        isError = !trimmedValue;
        break;
      case 'email':
        // Chỉ kiểm tra regex nếu có giá trị (không trống) để tránh lỗi khi ô trống
        isError = !trimmedValue || !validateEmail(trimmedValue);
        break;
      case 'message':
        isError = !trimmedValue;
        break;
    }

    setErrors(prev => ({ ...prev, [field]: isError }));
    return !isError;
  };

  // OLD: Hàm xác thực toàn bộ form (chủ yếu dùng khi nhấn nút Gửi)
  const validateForm = () => {
    const newErrors = {
      name: !name.trim(),
      email: !email.trim() || !validateEmail(email),
      message: !message.trim()
    };

    setErrors(newErrors);
    return !newErrors.name && !newErrors.email && !newErrors.message;
  };

  const handleSubmitContact = () => {
    // --- Xử lý Lỗi Validation ---
    if (!validateForm()) {
      showAlert(
        'Lỗi',
        'Vui lòng điền đầy đủ thông tin bắt buộc!',
        'error'
        // Không có onConfirm, chỉ đóng Modal
      );
      return;
    }

    // --- Xử lý Thành công ---
    showAlert(
      'Thành công!',
      `Cảm ơn ${name}! Tin nhắn của bạn đã được gửi. Tôi sẽ liên hệ lại sớm.`,
      'success',
      // Hành động sau khi nhấn OK: Quay lại trang trước
      () => navigation.goBack()
    );

    gameState.addExp(30); // EXP cho việc gửi contact

    // Reset form
    setName('');
    setEmail('');
    setMessage('');
    setErrors({ name: false, email: false, message: false });
  };

  // Thêm state cho Custom Alert Modal
  const [alertState, setAlertState] = useState({
    isVisible: false,
    title: '',
    message: '',
    type: 'error' as 'error' | 'success', // Hoặc type tùy ý
    onConfirm: () => { }, // Hành động sau khi nhấn OK (quan trọng cho Success/Linking)
  });

  // Hàm đóng modal chung
  const closeAlert = () => {
    setAlertState(prev => ({ ...prev, isVisible: false }));
    // Thực hiện hành động xác nhận sau khi Modal đóng (nếu có)
    if (alertState.onConfirm) {
      alertState.onConfirm();
    }
  };

  // Hàm hiển thị modal
  const showAlert = (title: string, message: string, type: 'error' | 'success', onConfirm: () => void = () => { }) => {
    setAlertState({
      isVisible: true,
      title,
      message,
      type,
      onConfirm,
    });
  };

  // UPDATED: Cập nhật state và gọi hàm xác thực
  const handleInputChange = (field: keyof typeof errors, value: string) => {
    // 1. Cập nhật state của trường
    switch (field) {
      case 'name':
        setName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'message':
        setMessage(value);
        break;
    }

    // 2. Thực hiện xác thực ngay lập tức
    validateFormForField(field, value);
  };

  const openLink = (url: string) => {
    Linking.openURL(url).catch(err => {
      // Xử lý Lỗi Mở Link
      showAlert(
        'Lỗi Mở Link',
        'Đã xảy ra lỗi, không thể mở liên kết này. Vui lòng thử lại sau.',
        'error'
      );
      // Không có onConfirm, chỉ đóng Modal
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>📞 Liên Hệ</Text>
        <Text style={styles.subtitle}>Hãy kết nối với tôi!</Text>

        {/* SOCIAL LINKS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔗 Mạng Xã Hội</Text>
          <View style={styles.socialLinks}>
            <CustomButton
              title="💼 LinkedIn"
              onPress={() => openLink('https://linkedin.com')}
              customColor="#1cb0f6"
              customShadowColor="#168ec2"
            />
            <CustomButton
              title="📧 Email"
              onPress={() => openLink('mailto:example@email.com')}
              customColor="#1cb0f6"
              customShadowColor="#168ec2"
            />
          </View>
        </View>

        {/* CONTACT FORM */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📝 Liên Hệ Với Tôi</Text>

          <CustomTextInput
            placeholder="Tên của bạn *"
            value={name}
            onChangeText={(value) => handleInputChange('name', value)}
            error={errors.name ? 'Vui lòng nhập tên của bạn' : false}
          />
          <CustomTextInput
            placeholder="Email *"
            value={email}
            onChangeText={(value) => handleInputChange('email', value)}
            keyboardType="email-address"
            error={
              errors.email
                ? (!email.trim() ? 'Vui lòng nhập email' : 'Email không hợp lệ')
                : false
            }
          />
          <CustomTextInput
            placeholder="Tin nhắn *"
            value={message}
            onChangeText={(value) => handleInputChange('message', value)}
            multiline={true} // Bật chế độ multiline
            error={errors.message ? 'Vui lòng nhập tin nhắn' : false}
          />
          <CustomButton
            title="🚀 Gửi Tin Nhắn"
            onPress={handleSubmitContact}
            expAmount={30} // Dùng prop expAmount để hiển thị +30 EXP
            type="primary" // Dùng primary type (màu xanh lá Duolingo)
          />
        </View>

        {/* DOWNLOAD CV */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📥 Tải CV</Text>
          <TouchableOpacity style={styles.downloadButton}>
            <Text style={styles.downloadButtonText}>📄 Tải CV Của Tôi</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>← Quay Lại</Text>
      </TouchableOpacity>

      <CustomAlertModal
        isVisible={alertState.isVisible}
        title={alertState.title}
        message={alertState.message}
        type={alertState.type}
        // Khi Modal đóng, nó sẽ gọi closeAlert để thực hiện hành động onConfirm đã lưu
        onClose={closeAlert}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#58cc02',
    textAlign: 'center',
    marginBottom: 10,
    lineHeight: 48
  },
  subtitle: {
    fontSize: 18,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 30,
  },
  section: {
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e9ecef',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1cb0f6',
    marginBottom: 15,
  },
  socialLinks: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  socialButton: {
    backgroundColor: '#1cb0f6',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    shadowColor: '#1cb0f6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  socialText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  downloadButton: {
    backgroundColor: '#ff9600',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#ff9600',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  downloadButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  backButton: {
    backgroundColor: '#58cc02',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#58cc02',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  backButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
});