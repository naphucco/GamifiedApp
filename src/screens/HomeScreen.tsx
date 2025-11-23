import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { gameState } from '../game/GameState';
import { ExpBar } from '../components/game/ExpBar';
import { useNavigation } from '@react-navigation/native';

export const HomeScreen = () => {
  const navigation = useNavigation();
  const [currentExp, setCurrentExp] = useState(gameState.getState().exp);
  const [level, setLevel] = useState(gameState.getState().level);
  const [expToNextLevel, setExpToNextLevel] = useState(gameState.getState().expToNextLevel);

  // LẮNG NGHE THAY ĐỔI TỪ GAMESTATE
  useEffect(() => {
    const unsubscribe = gameState.subscribe((newState) => {
      setCurrentExp(newState.exp);
      setLevel(newState.level);
      setExpToNextLevel(newState.expToNextLevel);
    });

    return unsubscribe; // CLEANUP KHI COMPONENT UNMOUNT
  }, []);

  const handleExplore = () => {
    gameState.addExp(10);
  };

  const handleSkillTree = () => {
    gameState.addExp(5);
    gameState.trackExperienceView();
    navigation.navigate('SkillTree' as never); // ĐẨY SkillTree lên top of stack
  };

  const handleProjects = () => {
    gameState.addExp(15);
    gameState.trackExperienceView();
    navigation.navigate('Projects' as never); // ĐẨY SkillTree lên top of stack
  };

  const handleExperience = () => {
    gameState.addExp(20);
    gameState.trackExperienceView();
    navigation.navigate('Experience' as never); // ĐẨY SkillTree lên top of stack
  };

  const handleAchievements = () => {
    gameState.addExp(25);
    navigation.navigate('Achievements' as never);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎮 Developer's Journey</Text>
      <Text style={styles.levelText}>Level {level}</Text>

      <ExpBar
        currentExp={currentExp}
        maxExp={expToNextLevel}
        height={30}
        showLabel={true}
      />

      <Text style={styles.subtitle}>Khám phá portfolio của tôi!</Text>

      <TouchableOpacity style={styles.button} onPress={handleExplore}>
        <Text style={styles.buttonText}>🚀 Khám Phá Dự Án (+10 EXP)</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryButton} onPress={handleSkillTree}>
        <Text style={styles.buttonText}>🎯 Xem Skill Tree (+5 EXP)</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryButton} onPress={handleProjects}>
        <Text style={styles.buttonText}>📂 Project Quests (+15 EXP)</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryButton} onPress={handleExperience}>
        <Text style={styles.buttonText}>📜 Career Journey (+20 EXP)</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryButton} onPress={handleAchievements}>
        <Text style={styles.buttonText}>🏆 Achievements (+25 EXP)</Text>
      </TouchableOpacity>

      <Text style={styles.hint}>Tổng EXP: {gameState.getState().totalExp}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4cc9f0',
    textAlign: 'center',
    marginBottom: 10,
  },
  levelText: {
    fontSize: 24,
    color: '#f72585',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 40,
    marginTop: 20,
  },
  button: {
    backgroundColor: '#4361ee',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    elevation: 5,
    marginBottom: 15,
    width: '80%',
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: '#7209b7',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    elevation: 5,
    width: '80%',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  hint: {
    fontSize: 14,
    color: '#8d99ae',
    textAlign: 'center',
    marginTop: 30,
    fontStyle: 'italic',
    paddingHorizontal: 20,
  },
});