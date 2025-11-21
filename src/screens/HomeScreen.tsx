import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { gameState } from '../game/GameState';
import { ExpBar } from '../components/game/ExpBar';

export const HomeScreen = () => {
  const [currentExp, setCurrentExp] = useState(0);
  const [level, setLevel] = useState(1);

  const handleExplore = () => {
    gameState.addExp(10);
    setCurrentExp(gameState.getState().exp);
    setLevel(gameState.getState().level);
  };

  const handleSkillTree = () => {
    gameState.addExp(5);
    setCurrentExp(gameState.getState().exp);
    // TODO: Navigation to Skill Tree
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎮 Developer's Journey</Text>
      <Text style={styles.levelText}>Level {level}</Text>

      <ExpBar
        currentExp={currentExp}
        maxExp={100}
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

      <Text style={styles.hint}>Càng tương tác nhiều, càng mở khóa nhiều content!</Text>
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