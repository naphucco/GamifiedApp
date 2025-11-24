import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, Alert, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { gameState } from '../game/GameState';

export const ContactScreen = () => {
  const navigation = useNavigation<any>();
  const [showContactForm, setShowContactForm] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // Mini-game state
  const [codePuzzle, setCodePuzzle] = useState([
    { id: 1, text: 'const greeting = "Hello World"', correct: true },
    { id: 2, text: 'console.log(greeting)', correct: true },
    { id: 3, text: 'funtion sayHello() {', correct: false }, // Lỗi cố ý
    { id: 4, text: 'return greeting', correct: true },
    { id: 5, text: '}', correct: true }
  ]);

  const handleFixCode = (index: number) => {
    const updatedPuzzle = [...codePuzzle];
    if (index === 2) { // Fix lỗi ở dòng 3
      updatedPuzzle[index] = { ...updatedPuzzle[index], text: 'function sayHello() {', correct: true };
      setCodePuzzle(updatedPuzzle);
      
      // Check nếu tất cả đều correct
      if (updatedPuzzle.every(line => line.correct)) {
        Alert.alert('🎉 Thành công!', 'Bạn đã fix code thành công! Contact form đã được mở khóa.');
        setShowContactForm(true);
        gameState.addExp(50); // EXP thưởng cho mini-game
      }
    }
  };

  const handleSubmitContact = () => {
    if (!name || !email || !message) {
      Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin!');
      return;
    }

    Alert.alert(
      'Thành công!',
      `Cảm ơn ${name}! Tin nhắn của bạn đã được gửi. Tôi sẽ liên hệ lại sớm.`,
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
    
    gameState.addExp(30); // EXP cho việc gửi contact
  };

  const openLink = (url: string) => {
    Linking.openURL(url).catch(err => Alert.alert('Lỗi', 'Không thể mở link'));
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
            <TouchableOpacity style={styles.socialButton} onPress={() => openLink('https://github.com')}>
              <Text style={styles.socialText}>🐙 GitHub</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton} onPress={() => openLink('https://linkedin.com')}>
              <Text style={styles.socialText}>💼 LinkedIn</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton} onPress={() => openLink('mailto:example@email.com')}>
              <Text style={styles.socialText}>📧 Email</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* MINI-GAME: CODE PUZZLE */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎮 Code Puzzle</Text>
          <Text style={styles.puzzleDescription}>
            Fix lỗi code bên dưới để mở khóa contact form!
          </Text>
          
          <View style={styles.codeContainer}>
            {codePuzzle.map((line, index) => (
              <TouchableOpacity 
                key={line.id}
                style={[
                  styles.codeLine,
                  line.correct ? styles.codeCorrect : styles.codeError
                ]}
                onPress={() => handleFixCode(index)}
                disabled={line.correct}
              >
                <Text style={styles.codeText}>{line.text}</Text>
                {!line.correct && <Text style={styles.fixHint}>👆 Fix</Text>}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* CONTACT FORM (CHỈ HIỆN SAU KHI HOÀN THÀNH MINI-GAME) */}
        {showContactForm && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📝 Liên Hệ Với Tôi</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Tên của bạn"
              placeholderTextColor="#8d99ae"
              value={name}
              onChangeText={setName}
            />
            
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#8d99ae"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Tin nhắn"
              placeholderTextColor="#8d99ae"
              value={message}
              onChangeText={setMessage}
              multiline
              numberOfLines={4}
            />
            
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmitContact}>
              <Text style={styles.submitButtonText}>🚀 Gửi Tin Nhắn (+30 EXP)</Text>
            </TouchableOpacity>
          </View>
        )}

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
  puzzleDescription: {
    color: '#555555',
    marginBottom: 15,
    textAlign: 'center',
  },
  codeContainer: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  codeLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginBottom: 5,
    borderRadius: 5,
  },
  codeCorrect: {
    backgroundColor: '#d1fae5',
  },
  codeError: {
    backgroundColor: '#fee2e2',
  },
  codeText: {
    color: '#333333',
    fontFamily: 'monospace',
    fontSize: 14,
  },
  fixHint: {
    color: '#ff9600',
    fontWeight: 'bold',
    fontSize: 12,
  },
  input: {
    backgroundColor: '#ffffff',
    color: '#333333',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#10b981',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#10b981',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 16,
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