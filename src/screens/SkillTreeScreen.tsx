import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react'; // Thêm useEffect
import { View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { gameState } from '../game/GameState'; // Thêm import
import { Text } from '../components/ui/StyledText';

export const SkillTreeScreen = () => {
  const navigation = useNavigation<any>();

  const skills = [
    { id: 'react_native', name: 'React Native', level: 5, category: 'Mobile' }, // ĐỔI id THÀNH string
    { id: 'typescript', name: 'TypeScript', level: 5, category: 'Language' },
    { id: 'nodejs', name: 'Node.js', level: 4, category: 'Backend' },
    { id: 'ui_ux', name: 'UI/UX Design', level: 4, category: 'Design' },
    { id: 'aws', name: 'AWS', level: 3, category: 'Cloud' },
    { id: 'python', name: 'Python', level: 3, category: 'Language' },
  ];

  // THÊM: Track khi vào screen
  useEffect(() => {
    gameState.trackExperienceView(); // Track khi vào Skill Tree screen
  }, []);

  // THÊM: Track khi click vào skill
  const handleSkillView = (skillId: string) => {
    gameState.trackSkillView(skillId); // Track khi user xem skill
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎯 Skill Tree</Text>
      <Text style={styles.subtitle}>Tech Stack & Proficiency</Text>

      <ScrollView style={styles.skillsContainer}>
        {skills.map(skill => (
          <TouchableOpacity
            key={skill.id}
            style={styles.skillCard}
            onPress={() => handleSkillView(skill.id)}
          >
            <View style={styles.skillHeader}>
              <Text style={styles.skillName}>{skill.name}</Text>
              <Text style={styles.skillLevel}>Level {skill.level}</Text>
            </View>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${(skill.level / 5) * 100}%` }
                ]}
              />
            </View>
            <Text style={styles.skillCategory}>{skill.category}</Text>

            {/* THÊM: Hint để user biết click tracking */}
            <Text style={styles.viewHint}>👉 Nhấp để khám phá</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
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
    color: '#58cc02', // Xanh lá Duolingo
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#666666', // Xám dịu
    textAlign: 'center',
    marginBottom: 30,
  },
  skillsContainer: {
    flex: 1,
  },
  skillCard: {
    backgroundColor: '#ffffff', // Nền trắng
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#1cb0f6', // Xanh dương Duolingo
    borderWidth: 1,
    borderColor: '#f0f0f0', // Viền xám rất nhạt
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  skillHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  skillName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333', // Đen nhẹ
  },
  skillLevel: {
    fontSize: 16,
    color: '#ff9600', // Cam Duolingo
    fontWeight: '600',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#f0f0f0', // Xám rất nhạt
    borderRadius: 4,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#1cb0f6', // Xanh dương Duolingo
    borderRadius: 4,
  },
  skillCategory: {
    fontSize: 14,
    color: '#888888', // Xám trung bình
  },
  viewHint: {
    fontSize: 12,
    color: '#999999', // Xám nhạt
    fontStyle: 'italic',
    marginTop: 8,
    textAlign: 'center',
  },
  backButton: {
    backgroundColor: '#58cc02', // Xanh lá Duolingo
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