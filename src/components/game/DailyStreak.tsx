// components/game/DailyStreak.js
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Text } from '../ui/StyledText';

// Mock data
type StreakHistoryType = {
  [key: string]: boolean;
};

let mockStreakData: {
  streak: number;
  lastCheckIn: string;
  streakHistory: StreakHistoryType;
} = {
  streak: 7,
  lastCheckIn: '2024-01-10',
  streakHistory: {
    '2024-01-04': true,
    '2024-01-05': true,
    '2024-01-06': true,
    '2024-01-07': true,
    '2024-01-08': true,
    '2024-01-09': true,
    '2024-01-10': true,
  }
};

interface DailyStreakProps {
  onCheckInSuccess: (streak: number) => void;
}

export const DailyStreak: React.FC<DailyStreakProps> = ({ onCheckInSuccess }) => {
  const [currentStreak, setCurrentStreak] = useState(mockStreakData.streak);
  const [isCheckedInToday, setIsCheckedInToday] = useState(false);
  const [flameScale] = useState(new Animated.Value(1));

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setIsCheckedInToday(mockStreakData.lastCheckIn === today);
  }, []);

  const animateFlame = () => {
    Animated.sequence([
      Animated.timing(flameScale, {
        toValue: 1.2,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(flameScale, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleCheckIn = () => {
    if (isCheckedInToday) return;
    
    animateFlame();
    
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    let newStreak = currentStreak;
    const newHistory = { ...mockStreakData.streakHistory };

    if (yesterdayStr in mockStreakData.streakHistory) {
      newStreak += 1;
    } else {
      newStreak = 1;
    }

    newHistory[todayStr] = true;

    setCurrentStreak(newStreak);
    setIsCheckedInToday(true);

    mockStreakData = {
      streak: newStreak,
      lastCheckIn: todayStr,
      streakHistory: newHistory
    };

    if (onCheckInSuccess) {
      onCheckInSuccess(newStreak);
    }
  };

  const renderFlame = () => {
    const flames = [];
    const flameCount = Math.min(currentStreak, 7);
    
    for (let i = 0; i < flameCount; i++) {
      flames.push(
        <Animated.View
          key={i}
          style={[
            styles.flame,
            {
              transform: i === flameCount - 1 ? [{ scale: flameScale }] : [],
              opacity: 0.8 + (i * 0.03)
            }
          ]}
        >
          <Text style={styles.flameEmoji}>🔥</Text>
        </Animated.View>
      );
    }
    return flames;
  };

  const renderCalendarDays = () => {
    const days = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const isChecked = mockStreakData.streakHistory[dateStr] || false;
      const isToday = i === 0;
      const dayName = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'][date.getDay()];
      
      days.push(
        <View key={i} style={styles.dayContainer}>
          <Text style={styles.dayName}>{dayName}</Text>
          <View style={[
            styles.dayCircle,
            isChecked && styles.checkedDay,
            isToday && styles.todayCircle
          ]}>
            <Text style={[
              styles.dayNumber,
              isChecked && styles.checkedDayNumber,
              isToday && styles.todayNumber
            ]}>
              {date.getDate()}
            </Text>
          </View>
          {isToday && (
            <View style={styles.todayIndicator}>
              <View style={styles.todayDot} />
            </View>
          )}
        </View>
      );
    }
    return days;
  };

  const getRewardForStreak = (streak: number) => {
    if (streak < 3) return 10;
    if (streak < 7) return 25;
    if (streak < 14) return 50;
    if (streak < 30) return 100;
    return 200;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>🔥 Daily Streak</Text>
          <Text style={styles.subtitle}>Check-in every day to keep your streak alive!</Text>
        </View>
        <View style={styles.streakCounter}>
          <View style={styles.flameContainer}>
            {renderFlame()}
          </View>
          <Text style={styles.streakNumber}>{currentStreak}</Text>
          <Text style={styles.streakLabel}>days streak</Text>
        </View>
      </View>

      <View style={styles.calendarContainer}>
        <View style={styles.calendarHeader}>
          <Text style={styles.calendarTitle}>This Week</Text>
          <Text style={styles.calendarSubtitle}>Your activity</Text>
        </View>
        <View style={styles.daysRow}>
          {renderCalendarDays()}
        </View>
      </View>

      <TouchableOpacity
        style={[
          styles.checkInButton,
          isCheckedInToday && styles.checkedInButton
        ]}
        onPress={handleCheckIn}
        disabled={isCheckedInToday}
        activeOpacity={0.8}
      >
        <View style={styles.buttonContent}>
          <Text style={[
            styles.checkInButtonText,
            isCheckedInToday && styles.checkedInButtonText
          ]}>
            {isCheckedInToday ? 'Checked In Today' : 'Check In Now'}
          </Text>
          <View style={styles.rewardBadge}>
            <Text style={styles.rewardText}>+{getRewardForStreak(currentStreak)} XP</Text>
          </View>
        </View>
        <Text style={styles.buttonHint}>
          {isCheckedInToday 
            ? 'Come back tomorrow to continue your streak!' 
            : 'Tap to claim your daily reward'
          }
        </Text>
      </TouchableOpacity>

      <View style={styles.progressContainer}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressTitle}>Next Milestone</Text>
          <Text style={styles.progressValue}>{Math.min(currentStreak + 1, 30)} days</Text>
        </View>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill,
              { width: `${(currentStreak % 7) * 14.28}%` }
            ]} 
          />
        </View>
        <View style={styles.milestoneInfo}>
          <Text style={styles.milestoneReward}>
            Reward: +{getRewardForStreak(currentStreak + 1)} XP
          </Text>
          <Text style={styles.daysLeft}>
            {7 - (currentStreak % 7)} days left
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    marginVertical: 15,
    width: '100%',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#6B7280',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  streakCounter: {
    alignItems: 'center',
    marginLeft: 16,
  },
  flameContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  flame: {
    marginHorizontal: -3,
  },
  flameEmoji: {
    fontSize: 20,
  },
  streakNumber: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#F59E0B',
    textShadowColor: 'rgba(245, 158, 11, 0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  streakLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '600',
    letterSpacing: 0.5,
    marginTop: 2,
  },
  calendarContainer: {
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  calendarTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  calendarSubtitle: {
    fontSize: 12,
    color: '#6B7280',
  },
  daysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayContainer: {
    alignItems: 'center',
  },
  dayName: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 8,
    fontWeight: '500',
  },
  dayCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  checkedDay: {
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    borderColor: '#F59E0B',
  },
  todayCircle: {
    borderColor: '#3B82F6',
  },
  dayNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4B5563',
  },
  checkedDayNumber: {
    color: '#D97706',
  },
  todayNumber: {
    color: '#3B82F6',
  },
  todayIndicator: {
    position: 'absolute',
    bottom: -6,
  },
  todayDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#3B82F6',
  },
  checkInButton: {
    backgroundColor: '#F59E0B',
    borderRadius: 16,
    padding: 18,
    marginBottom: 20,
  },
  checkedInButton: {
    backgroundColor: '#E5E7EB',
  },
  buttonContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  checkInButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  checkedInButtonText: {
    color: '#6B7280',
  },
  rewardBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  rewardText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  buttonHint: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
  progressContainer: {
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressTitle: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  progressValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F59E0B',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#F59E0B',
    borderRadius: 3,
  },
  milestoneInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  milestoneReward: {
    fontSize: 13,
    color: '#6B7280',
  },
  daysLeft: {
    fontSize: 13,
    color: '#F59E0B',
    fontWeight: '600',
  },
});