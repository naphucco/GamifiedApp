// HomeScreen.js
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { gameState } from '../game/GameState';
import { ExpBar } from '../components/game/ExpBar';
import { DailyStreak } from '../components/game/DailyStreak';
import { useNavigation } from '@react-navigation/native';
import { CustomButton } from '../components/ui/CustomButton';
import { Text } from '../components/ui/StyledText';

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

  const handleCheckInSuccess = (streak: number) => {
    // Reward logic based on streak
    let expReward = 10;

    if (streak === 7) {
      expReward = 50;
    } else if (streak === 14) {
      expReward = 100;
    } else if (streak === 30) {
      expReward = 200;
    }

    gameState.addExp(expReward);

    // Optional: Show notification
    console.log(`🎉 Daily check-in! +${expReward} XP | Streak: ${streak} days`);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <Text style={styles.title}>🎮 Developer's Journey</Text>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{level}</Text>
            <Text style={styles.statLabel}>Level</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{gameState.getState().totalExp}</Text>
            <Text style={styles.statLabel}>Total XP</Text>
          </View>
        </View>

        <ExpBar
          currentExp={currentExp}
          maxExp={expToNextLevel}
          height={12}
          showLabel={true}
        />

        {/* New Daily Streak Component với theme light */}
        <DailyStreak onCheckInSuccess={handleCheckInSuccess} />

        {/* Xóa style prop vì CustomButton không hỗ trợ */}
        <CustomButton
          title="🚀 Start Journey"
          expAmount={5}
          type="primary"
          onPress={handleStartJourney}
        />

        <Text style={styles.welcomeText}>
          Explore my developer journey through this gamified portfolio.
          Each interaction earns you XP and unlocks new content!
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    minHeight: '100%',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#58cc02',
    textAlign: 'center',
    marginBottom: 24,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E9ECEF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6C757D',
    fontWeight: '500',
  },
  welcomeText: {
    fontSize: 14,
    color: '#6C757D',
    textAlign: 'center',
    lineHeight: 22,
    marginTop: 20,
    paddingHorizontal: 10,
  },
});