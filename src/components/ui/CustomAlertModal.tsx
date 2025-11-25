import React, { useRef, useEffect } from 'react';
import { Modal, View, Text, Animated, StyleSheet, TouchableOpacity } from 'react-native';

interface CustomAlertProps {
  isVisible: boolean;
  title: string;
  message: string;
  onClose: () => void;
  type: 'error' | 'success'; // Có thể mở rộng
}

const ERROR_COLOR = '#f87171';
const SUCCESS_COLOR = '#58cc02';
// ĐÃ XÓA: const SHADOW_HEIGHT = 6;

// Đặt giá trị cố định của chiều cao Modal ở đây (đồng bộ với styles.contentWrapper)
const MODAL_HEIGHT = 300; 

export const CustomAlertModal: React.FC<CustomAlertProps> = ({
  isVisible,
  title,
  message,
  onClose,
  type = 'error',
}) => {
  const scaleAnim = useRef(new Animated.Value(0.1)).current;
  const mainColor = type === 'error' ? ERROR_COLOR : SUCCESS_COLOR;
  // ĐÃ XÓA: const shadowColor = type === 'error' ? '#c84444' : '#4a9e00';
  const icon = type === 'error' ? '❌' : '✅';

  useEffect(() => {
    if (isVisible) {
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 7, // Hiệu ứng bật nảy
        useNativeDriver: true,
      }).start();
    } else {
      scaleAnim.setValue(0.1); // Reset scale
    }
  }, [isVisible]);

  const handleClose = () => {
    Animated.timing(scaleAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
    }).start(() => onClose());
  };

  return (
    <Modal
      transparent={true}
      visible={isVisible}
      animationType="fade"
      onRequestClose={handleClose}
    >
      <View style={styles.centeredView}>
        {/* CONTAINER CHUNG ĐỂ CĂN CHỈNH MODAL */}
        <View style={styles.contentWrapper}>
            
            {/* Modal chính với Animation - ĐÃ XÓA DỊCH CHUYỂN TRANSLATEY */}
            <Animated.View
                style={[
                    styles.modalContainer,
                    { 
                        transform: [{ scale: scaleAnim }],
                    },
                ]}
            >
                {/* Custom Button Style for Modal */}
                <View style={[styles.modalContent, { borderColor: mainColor, backgroundColor: '#ffffff' }]}>
                    <Text style={styles.icon}>{icon}</Text>
                    <Text style={[styles.title, { color: mainColor }]}>{title}</Text>
                    <Text style={styles.message}>{message}</Text>
                    
                    {/* Nút Đóng (Tái sử dụng logic CustomButton) */}
                    <TouchableOpacity 
                        onPress={handleClose}
                        style={[styles.closeButton, { backgroundColor: mainColor, borderColor: mainColor, marginTop: 20 }]}
                    >
                        <Text style={styles.closeButtonText}>OK</Text>
                    </TouchableOpacity>

                </View>
            </Animated.View>

        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  // CONTAINER CHUNG
  contentWrapper: {
    width: 300,
    height: MODAL_HEIGHT,
    position: 'relative', 
    // ĐÃ XÓA: Mọi thứ liên quan đến shadowLayer và zIndex
  },
  modalContainer: {
    width: '100%', 
    height: '100%',
    borderRadius: 18,
    borderWidth: 0,
    position: 'absolute', 
    top: 0,
    left: 0,
  },
  modalContent: {
    padding: 20,
    borderRadius: 18,
    borderWidth: 4,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  // ĐÃ XÓA: shadowLayer và các style liên quan.
  icon: {
    fontSize: 50,
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
    marginBottom: 10,
  },
  closeButton: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 14,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 150,
  },
  closeButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});