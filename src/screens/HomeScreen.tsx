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

  console.log('🎯 TEST: HomeScreen loaded');

  useEffect(() => {
    const unsubscribe = gameState.subscribe((newState) => {
      setCurrentExp(newState.exp);
      setLevel(newState.level);
      setExpToNextLevel(newState.expToNextLevel);
    });

    return unsubscribe;
  }, []);

  const handleButtonPress = (action: () => void, expAmount: number) => {
    gameState.addExp(expAmount);
    action();
  };

  const handleExplore = () => handleButtonPress(() => { }, 10);
  const handleSkillTree = () => handleButtonPress(() => {
    gameState.trackExperienceView();
    navigation.navigate('SkillTree' as never);
  }, 5);
  const handleProjects = () => handleButtonPress(() => {
    gameState.trackExperienceView();
    navigation.navigate('Projects' as never);
  }, 15);
  const handleExperience = () => handleButtonPress(() => {
    gameState.trackExperienceView();
    navigation.navigate('Experience' as never);
  }, 20);
  const handleAchievements = () => handleButtonPress(() => {
    navigation.navigate('Achievements' as never);
  }, 25);
  const handleContact = () => handleButtonPress(() => {
    navigation.navigate('Contact' as never);
  }, 10);

  return (
    <Animated.View style={styles.container}>
      <Animated.Text style={[
        styles.title
      ]}>
        🎮 Developer's Journey
      </Animated.Text>

      <Text style={styles.levelText}>Level {level}</Text>

      <ExpBar
        currentExp={currentExp}
        maxExp={expToNextLevel}
        height={25}
        showLabel={true}
      />

      <Text style={styles.subtitle}>Khám phá portfolio của tôi!</Text>

      <CustomButton
        title="🚀 Khám Phá Dự Án"
        expAmount={10}
        type="primary"
        onPress={handleExplore}
      />

      <View style={styles.buttonGrid}>
        <CustomButton
          title="🎯 Skill Tree"
          expAmount={5}
          type="secondary"
          onPress={handleSkillTree}
        />

        <CustomButton
          title="📂 Projects"
          expAmount={15}
          type="secondary"
          onPress={handleProjects}
        />

        <CustomButton
          title="📜 Experience"
          expAmount={20}
          type="secondary"
          onPress={handleExperience}
        />

        <CustomButton
          title="🏆 Achievements"
          expAmount={25}
          type="secondary"
          onPress={handleAchievements}
        />

        <CustomButton
          title="📞 Contact"
          expAmount={10}
          type="secondary"
          onPress={handleContact}
        />
      </View>

      <Text style={styles.hint}>Tổng EXP: {gameState.getState().totalExp}</Text>
    </Animated.View>
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
    fontSize: 18,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  buttonGrid: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  hint: {
    fontSize: 14,
    color: '#999999',
    textAlign: 'center',
    marginTop: 20,
    fontStyle: 'italic',
  },
});