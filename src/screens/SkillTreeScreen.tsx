import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { gameState } from '../game/GameState';
import { Text } from '../components/ui/StyledText';
import { withScreenTransition } from '../components/game/ScreenTransition';
import { CustomCard } from '../components/ui/CustomCard';

const { width: screenWidth } = Dimensions.get('window');
const CARD_MARGIN = 8;
const CARD_WIDTH = (screenWidth - 40 - CARD_MARGIN) / 2;

const SkillTreeComponent = () => {
  const skills = [
    { id: 'react_native', name: 'React Native', level: 5, category: 'Mobile' },
    { id: 'typescript', name: 'TypeScript', level: 5, category: 'Language' },
    { id: 'nodejs', name: 'Node.js', level: 4, category: 'Backend' },
    { id: 'ui_ux', name: 'UI/UX Design', level: 4, category: 'Design' },
    { id: 'aws', name: 'AWS', level: 3, category: 'Cloud' },
    { id: 'python', name: 'Python', level: 3, category: 'Language' },
    { id: 'react', name: 'React', level: 4, category: 'Frontend' },
    { id: 'mongodb', name: 'MongoDB', level: 3, category: 'Database' },
  ];

  useEffect(() => {
    gameState.trackExperienceView();
  }, []);

  const handleSkillView = (skillId: string) => {
    gameState.trackSkillView(skillId);
  };

  const renderSkillRows = () => {
    const rows = [];
    for (let i = 0; i < skills.length; i += 2) {
      const rowSkills = skills.slice(i, i + 2);
      rows.push(
        <View key={i} style={styles.skillRow}>
          {rowSkills.map(skill => (
            <View key={skill.id} style={styles.skillCard}>
              <CustomCard
                key={skill.id}
                backgroundColor="#ffffff"
                borderColor="#e0e0e0"
                shadowColor="#e0e0e0"
                borderRadius={15}
                translateY={6}
                onPress={() => handleSkillView(skill.id)}
              >
                <View style={styles.skillCardContent}>
                  <View style={styles.skillHeader}>
                    <Text style={styles.skillName} numberOfLines={1}>
                      {skill.name}
                    </Text>
                  </View>
                  <Text style={styles.skillLevel}>Lv.{skill.level}</Text>
                  <View style={styles.progressBar}>
                    <View
                      style={[
                        styles.progressFill,
                        { width: `${(skill.level / 5) * 100}%` }
                      ]}
                    />
                  </View>
                  <Text style={styles.skillCategory} numberOfLines={1}>
                    {skill.category}
                  </Text>
                  <Text style={styles.viewHint}>👉 Khám phá</Text>
                </View>
              </CustomCard>
            </View>
          ))}
          {rowSkills.length === 1 && <View style={styles.placeholderCard} />}
        </View>
      );
    }
    return rows;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎯 Skill Tree</Text>
      <Text style={styles.subtitle}>Tech Stack & Proficiency</Text>

      <ScrollView
        style={styles.skillsContainer}
        showsVerticalScrollIndicator={false}
      >
        {renderSkillRows()}
      </ScrollView>
    </View>
  );
};

export const SkillTreeScreen = withScreenTransition(SkillTreeComponent, 'slideRight');

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
  skillsContainer: {
    flex: 1,
  },
  skillRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  skillCard: {
    width: CARD_WIDTH,
    marginBottom: 0, // Override marginBottom mặc định từ buttonContainer
  },
  skillCardContent: {
    width: '100%',
    padding: 8,
    alignItems: 'center',
  },
  skillHeader: {
    width: '100%',
    marginBottom: 6,
  },
  skillName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
  },
  skillLevel: {
    fontSize: 14,
    color: '#ff9600',
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  progressBar: {
    height: 6,
    width: '100%',
    backgroundColor: '#f0f0f0',
    borderRadius: 3,
    marginBottom: 6,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#1cb0f6',
    borderRadius: 3,
  },
  skillCategory: {
    fontSize: 12,
    color: '#888888',
    textAlign: 'center',
    marginBottom: 4,
  },
  viewHint: {
    fontSize: 10,
    color: '#999999',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  placeholderCard: {
    width: CARD_WIDTH,
  },
});