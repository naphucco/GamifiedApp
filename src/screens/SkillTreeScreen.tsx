import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, ScrollView, Dimensions, Animated, TouchableOpacity } from 'react-native';
import { gameState } from '../game/GameState';
import { Text } from '../components/ui/StyledText';
import { withScreenTransition } from '../components/game/ScreenTransition';
import { CustomCard } from '../components/ui/CustomCard';

const { width: screenWidth } = Dimensions.get('window');
const CARD_MARGIN = 12;
const CARD_WIDTH = (screenWidth - 40 - CARD_MARGIN) / 2;

// Dữ liệu skills phong phú hơn
const skillCategories = {
  mobile: { name: '📱 Mobile', color: '#8A2BE2' },
  language: { name: '💬 Languages', color: '#FF6B6B' },
  backend: { name: '⚙️ Backend', color: '#4ECDC4' },
  frontend: { name: '🎨 Frontend', color: '#45B7D1' },
  design: { name: '✨ Design', color: '#FFBE0B' },
  cloud: { name: '☁️ Cloud', color: '#96CEB4' },
  database: { name: '💾 Database', color: '#FF8E53' },
};

const skills = [
  {
    id: 'react_native',
    name: 'React Native',
    level: 5,
    category: 'mobile',
    description: 'Xây dựng ứng dụng mobile đa nền tảng',
    xp: 1250,
    nextLevelXp: 1500
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    level: 5,
    category: 'language',
    description: 'JavaScript với type system',
    xp: 1100,
    nextLevelXp: 1500
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    level: 4,
    category: 'backend',
    description: 'JavaScript runtime environment',
    xp: 800,
    nextLevelXp: 1000
  },
  {
    id: 'ui_ux',
    name: 'UI/UX Design',
    level: 4,
    category: 'design',
    description: 'Thiết kế trải nghiệm người dùng',
    xp: 750,
    nextLevelXp: 1000
  },
  {
    id: 'aws',
    name: 'AWS',
    level: 3,
    category: 'cloud',
    description: 'Dịch vụ điện toán đám mây',
    xp: 450,
    nextLevelXp: 750
  },
  {
    id: 'python',
    name: 'Python',
    level: 3,
    category: 'language',
    description: 'Ngôn ngữ lập trình đa năng',
    xp: 400,
    nextLevelXp: 750
  },
  {
    id: 'react',
    name: 'React',
    level: 4,
    category: 'frontend',
    description: 'Thư viện JavaScript cho web',
    xp: 900,
    nextLevelXp: 1000
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    level: 3,
    category: 'database',
    description: 'Cơ sở dữ liệu NoSQL',
    xp: 350,
    nextLevelXp: 750
  },
  {
    id: 'docker',
    name: 'Docker',
    level: 2,
    category: 'cloud',
    description: 'Containerization platform',
    xp: 200,
    nextLevelXp: 500
  },
  {
    id: 'graphql',
    name: 'GraphQL',
    level: 3,
    category: 'backend',
    description: 'Query language cho APIs',
    xp: 300,
    nextLevelXp: 750
  },
];

const SkillTreeComponent = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Tính toán các giá trị cần thiết
  const totalSkills = skills.length;
  const totalLevels = skills.reduce((sum, skill) => sum + skill.level, 0);

  // Lọc skills theo category
  const filteredSkills = skills.filter(skill => {
    return !selectedCategory || skill.category === selectedCategory;
  });

  useEffect(() => {
    gameState.trackExperienceView();

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 0.5,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  }, [selectedCategory]);

  const handleSkillView = (skillId: string) => {
    gameState.trackSkillView(skillId);
  };

  const renderSkillCard = (skill: typeof skills[0]) => {
    const categoryInfo = skillCategories[skill.category as keyof typeof skillCategories];
    const progressPercentage = (skill.xp / skill.nextLevelXp) * 100;

    const getLevelColor = (level: number) => {
      const colors = ['#FF6B6B', '#FFA726', '#FFCA28', '#66BB6A', '#4CAF50'];
      return colors[level - 1] || colors[0];
    };

    return (
      <View key={skill.id} style={styles.skillCard}>
        <CustomCard
          backgroundColor="#ffffff"
          borderColor={categoryInfo.color + '20'}
          shadowColor={categoryInfo.color + '40'}
          borderRadius={16}
          translateY={6}
          onPress={() => handleSkillView(skill.id)}
        >
          <View style={styles.skillCardContent}>
            <View style={styles.skillHeader}>
              <View style={styles.skillTitleContainer}>
                <Text style={styles.skillName} numberOfLines={1}>
                  {skill.name}
                </Text>
                <View style={[styles.levelBadge, { backgroundColor: getLevelColor(skill.level) }]}>
                  <Text style={styles.levelBadgeText}>Lv.{skill.level}</Text>
                </View>
              </View>
            </View>

            <Text style={styles.skillDescription} numberOfLines={2}>
              {skill.description}
            </Text>

            <View style={styles.progressContainer}>
              <View style={styles.xpInfo}>
                <Text style={styles.xpText}>{skill.xp} XP</Text>
                <Text style={styles.xpText}>{skill.nextLevelXp} XP</Text>
              </View>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${progressPercentage}%`,
                      backgroundColor: categoryInfo.color
                    }
                  ]}
                />
              </View>
            </View>

            <View style={[styles.categoryTag, { backgroundColor: categoryInfo.color + '20' }]}>
              <Text style={[styles.categoryText, { color: categoryInfo.color }]}>
                {categoryInfo.name.split(' ')[0]}
              </Text>
            </View>

            <View style={styles.hintContainer}>
              <Text style={styles.viewHint}>👆 Nhấn để khám phá</Text>
            </View>
          </View>
        </CustomCard>
      </View>
    );
  };

  const renderCategoryFilter = () => {
    const categoryCounts = skills.reduce((acc, skill) => {
      acc[skill.category] = (acc[skill.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return (
      <View style={styles.categoryFilterContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryFilterContent}
        >
          {/* All Categories Button */}
          <TouchableOpacity
            style={[
              styles.categoryButton,
              !selectedCategory && styles.categoryButtonActive,
              !selectedCategory && { backgroundColor: '#4CAF50' }
            ]}
            onPress={() => setSelectedCategory(null)}
          >
            <Text style={[
              styles.categoryButtonText,
              !selectedCategory && styles.categoryButtonTextActive
            ]}>
              🌟 Tất cả
            </Text>
          </TouchableOpacity>

          {/* Category Buttons */}
          {Object.entries(skillCategories).map(([key, category]) => {
            const skillCount = categoryCounts[key] || 0;
            const isActive = selectedCategory === key;

            return (
              <TouchableOpacity
                key={key}
                style={[
                  styles.categoryButton,
                  isActive && styles.categoryButtonActive,
                  isActive && { backgroundColor: category.color }
                ]}
                onPress={() => setSelectedCategory(isActive ? null : key)}
              >
                <Text style={[
                  styles.categoryButtonText,
                  isActive && styles.categoryButtonTextActive
                ]}>
                  {category.name}
                </Text>
                {!isActive && (
                  <View style={styles.categoryCount}>
                    <Text style={styles.categoryCountText}>{skillCount}</Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Skill count badge */}
        <View style={styles.skillCountBadge}>
          <Text style={styles.skillCountText}>
            {filteredSkills.length}/{totalSkills}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header đơn giản */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.title}>🎯 Cây Kỹ Năng</Text>
          <Text style={styles.totalLevelText}>Lv.{Math.floor(totalLevels / 3)}</Text>
        </View>
      </View>

      {/* Bộ lọc category */}
      {renderCategoryFilter()}

      {/* Danh sách skills */}
      <View style={styles.skillsWrapper}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.skillsContent}
        >
          <View style={styles.skillsGrid}>
            {filteredSkills.map((skill, index) => (
              <Animated.View
                key={skill.id}
                style={{
                  opacity: fadeAnim,
                  transform: [{
                    translateY: fadeAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [30, 0],
                    }),
                  }],
                }}
              >
                {renderSkillCard(skill)}
              </Animated.View>
            ))}
          </View>

          {filteredSkills.length === 0 && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>🎯</Text>
              <Text style={styles.emptyStateTitle}>Không tìm thấy kỹ năng</Text>
              <Text style={styles.emptyStateDescription}>
                Thử thay đổi bộ lọc category
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export const SkillTreeScreen = withScreenTransition(SkillTreeComponent, 'slideRight');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    backgroundColor: '#667eea',
    padding: 20,
    paddingBottom: 20,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    lineHeight: 34,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  totalLevel: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  totalLevelText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  categoryFilterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#f8f9fa',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  categoryFilterContent: {
    gap: 8,
    paddingRight: 16,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 32,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  categoryButtonActive: {
    borderWidth: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  categoryButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666666',
  },
  categoryButtonTextActive: {
    color: '#ffffff',
    fontWeight: '700',
  },
  categoryCount: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 8,
    marginLeft: 4,
    minWidth: 16,
    alignItems: 'center',
  },
  categoryCountText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#666666',
  },
  skillCountBadge: {
    backgroundColor: '#6c757d',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    marginLeft: 8,
  },
  skillCountText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  skillsWrapper: {
    flex: 1,
  },
  skillsContent: {
    padding: 16,
    paddingBottom: 20,
  },
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  skillCard: {
    width: CARD_WIDTH,
    marginBottom: 18,
  },
  skillCardContent: {
    width: '100%',
    padding: 10,
    alignItems: 'flex-start',
    minHeight: 160,
  },
  skillHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 6,
  },
  skillIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  skillTitleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  skillName: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#333333',
    flex: 1,
  },
  levelBadge: {
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 8,
    marginLeft: 4,
  },
  levelBadgeText: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  skillDescription: {
    fontSize: 10,
    color: '#666666',
    marginBottom: 10,
    lineHeight: 12,
  },
  progressContainer: {
    width: '100%',
    marginBottom: 6,
  },
  xpInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  xpText: {
    fontSize: 9,
    color: '#888888',
    fontWeight: '500',
  },
  progressBar: {
    height: 5,
    width: '100%',
    backgroundColor: '#f0f0f0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  categoryTag: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    marginBottom: 6,
    alignSelf: 'flex-start',
  },
  categoryText: {
    fontSize: 9,
    fontWeight: '600',
  },
  hintContainer: {
    width: '100%',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 6,
  },
  viewHint: {
    fontSize: 9,
    color: '#999999',
    fontStyle: 'italic',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 40,
    marginBottom: 12,
  },
  emptyStateTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 6,
  },
  emptyStateDescription: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
  },
});