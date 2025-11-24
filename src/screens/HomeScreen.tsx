// HomeScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import { gameState } from '../game/GameState';
import { ExpBar } from '../components/game/ExpBar';
import { useNavigation } from '@react-navigation/native';
import { CustomButton } from '../components/ui/CustomButton';

export const HomeScreen = () => {
  const navigation = useNavigation();
  const [currentExp, setCurrentExp] = useState(gameState.getState().exp);
  const [level, setLevel] = useState(gameState.getState().level);
  const [expToNextLevel, setExpToNextLevel] = useState(gameState.getState().expToNextLevel);

  useEffect(() => {
    const unsubscribe = gameState.subscribe((newState) => {
      setCurrentExp(newState.exp);
      setLevel(newState.level);
      setExpToNextLevel(newState.expToNextLevel);
    });

    return unsubscribe;
  }, []);

  const handleStartJourney = () => {
    gameState.addExp(5);
    navigation.navigate('MainApp' as never);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎮 Developer's Journey</Text>

      <Text style={styles.levelText}>Level {level}</Text>

      <ExpBar
        currentExp={currentExp}
        maxExp={expToNextLevel}
        height={25}
        showLabel={true}
      />

      <Text style={styles.subtitle}>
        Khám phá hành trình phát triển của tôi qua gamified portfolio!
      </Text>

      <Text style={{ fontFamily: 'Nunito-Black', fontSize: 20 }}>
        Nunito Black
      </Text>

      <View style={styles.featureList}>
        <Text style={styles.featureItem}>🎯 Skill Tree - Công nghệ thành thạo</Text>
        <Text style={styles.featureItem}>📂 Projects - Dự án thực tế</Text>
        <Text style={styles.featureItem}>📜 Experience - Hành trình nghề nghiệp</Text>
        <Text style={styles.featureItem}>🏆 Achievements - Thành tích đạt được</Text>
        <Text style={styles.featureItem}>📞 Contact - Kết nối với tôi</Text>
      </View>

      <CustomButton
        title="🚀 Bắt Đầu Hành Trình"
        expAmount={5}
        type="primary"
        onPress={handleStartJourney}
      />

      <Text style={styles.hint}>Tổng EXP: {gameState.getState().totalExp}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  levelText: {
    fontSize: 24,
    color: '#1cb0f6',
    fontWeight: 'bold',
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 30,
    marginTop: 20,
    lineHeight: 22,
  },
  featureList: {
    marginBottom: 40,
    width: '100%',
    paddingHorizontal: 20,
  },
  featureItem: {
    fontSize: 16,
    color: '#555555',
    marginBottom: 12,
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#1cb0f6',
  },
  hint: {
    fontSize: 14,
    color: '#999999',
    textAlign: 'center',
    marginTop: 30,
    fontStyle: 'italic',
  },
});