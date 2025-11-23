import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ACHIEVEMENTS } from '../game/achievements';
import { gameState } from '../game/GameState';

export const AchievementsScreen = () => {
  const navigation = useNavigation<any>();

  const unlockedCount = ACHIEVEMENTS.filter(a => a.unlocked).length;
  const totalExp = ACHIEVEMENTS.filter(a => a.unlocked).reduce((sum, a) => sum + a.expReward, 0);

  // 🎯 FUNCTION XỬ LÝ CLICK ACHIEVEMENT
  const handleAchievementPress = (achievementId: string) => {
    switch (achievementId) {
      case 'first_project':
      case 'project_master':
        // Điều hướng đến Projects Screen
        navigation.navigate('Projects');
        break;

      case 'skill_explorer':
        // Điều hướng đến Skill Tree Screen  
        navigation.navigate('SkillTree');
        break;

      case 'career_historian':
        // Điều hướng đến Experience Screen
        navigation.navigate('Experience');
        break;

      case 'level_5':
      case 'level_10':
      case 'exp_master':
        // Điều hướng về Home Screen (để xem level/EXP)
        navigation.navigate('Home');
        break;

      default:
        // Mặc định không làm gì
        break;
    }
  };

  // 🎯 FUNCTION LẤY MÔ TẢ HÀNH ĐỘNG - HIỂN THỊ CHO CẢ UNLOCKED VÀ LOCKED
  const getActionDescription = (achievementId: string, unlocked: boolean) => {
    const actionText = unlocked ? '👉 Nhấp để xem' : '👉 Nhấp để hoàn thành';

    switch (achievementId) {
      case 'first_project':
      case 'project_master':
        return `${actionText} dự án`;

      case 'skill_explorer':
        return `${actionText} kỹ năng`;

      case 'career_historian':
        return `${actionText} kinh nghiệm`;

      case 'level_5':
      case 'level_10':
      case 'exp_master':
        return `${actionText} level & EXP`;

      default:
        return `${actionText} khám phá`;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏆 Achievements</Text>

      {/* STATS */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{unlockedCount}/{ACHIEVEMENTS.length}</Text>
          <Text style={styles.statLabel}>Đã mở khóa</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{totalExp}</Text>
          <Text style={styles.statLabel}>Tổng EXP</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{Math.round((unlockedCount / ACHIEVEMENTS.length) * 100)}%</Text>
          <Text style={styles.statLabel}>Hoàn thành</Text>
        </View>
      </View>

      <ScrollView style={styles.achievementsList}>
        {ACHIEVEMENTS.map(achievement => (
          <TouchableOpacity
            key={achievement.id}
            style={[
              styles.achievementCard,
              achievement.unlocked ? styles.unlocked : styles.locked
            ]}
            onPress={() => handleAchievementPress(achievement.id)}
          // 🎯 XÓA DÒNG NÀY: disabled={!achievement.unlocked}
          >
            <View style={styles.achievementHeader}>
              <Text style={styles.achievementIcon}>{achievement.icon}</Text>
              <View style={styles.achievementInfo}>
                <Text style={styles.achievementName}>{achievement.name}</Text>
                <Text style={styles.achievementDescription}>{achievement.description}</Text>

                {/* 🎯 ACTION DESCRIPTION CHO CẢ UNLOCKED VÀ LOCKED */}
                <Text style={[
                  styles.actionText,
                  achievement.unlocked ? styles.actionUnlocked : styles.actionLocked
                ]}>
                  {getActionDescription(achievement.id, achievement.unlocked)}
                </Text>
              </View>
              <View style={styles.expBadge}>
                <Text style={styles.expText}>+{achievement.expReward} EXP</Text>
              </View>
            </View>

            <View style={styles.statusContainer}>
              {achievement.unlocked ? (
                <Text style={styles.unlockedText}>✅ Đã mở khóa</Text>
              ) : (
                <Text style={styles.lockedText}>🔒 Chưa mở khóa</Text>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>← Quay Lại</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4cc9f0',
    textAlign: 'center',
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#2d2d44',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f72585',
  },
  statLabel: {
    fontSize: 12,
    color: '#8d99ae',
    marginTop: 5,
  },
  achievementsList: {
    flex: 1,
  },
  achievementCard: {
    backgroundColor: '#2d2d44',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    borderLeftWidth: 4,
  },
  unlocked: {
    borderLeftColor: '#4cc9f0',
  },
  locked: {
    borderLeftColor: '#6b7280',
    opacity: 0.7,
  },
  achievementHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  achievementIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  achievementDescription: {
    fontSize: 14,
    color: '#d1d5db',
    marginBottom: 6,
  },
  // 🎯 THÊM STYLE CHO ACTION TEXT
  actionText: {
    fontSize: 12,
    fontStyle: 'italic',
    marginTop: 4,
  },
  actionUnlocked: {
    color: '#4cc9f0', // Màu xanh cho đã unlock
  },
  actionLocked: {
    color: '#f59e0b', // Màu vàng cho chưa unlock - khuyến khích hoàn thành
  },
  expBadge: {
    backgroundColor: '#f59e0b',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  expText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  statusContainer: {
    alignItems: 'flex-end',
  },
  unlockedText: {
    color: '#4cc9f0',
    fontWeight: 'bold',
  },
  lockedText: {
    color: '#6b7280',
    fontStyle: 'italic',
  },
  backButton: {
    backgroundColor: '#7209b7',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});