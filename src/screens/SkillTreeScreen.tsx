import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export const SkillTreeScreen = () => {
  
  const navigation = useNavigation();

  const skills = [
    { id: 1, name: 'React Native', level: 5, category: 'Mobile' },
    { id: 2, name: 'TypeScript', level: 5, category: 'Language' },
    { id: 3, name: 'Node.js', level: 4, category: 'Backend' },
    { id: 4, name: 'UI/UX Design', level: 4, category: 'Design' },
  ];

  const handleBack = () => {
    navigation.goBack(); // GỠ SkillTree khỏi stack, trở về HomeScreen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎯 Skill Tree</Text>
      <Text style={styles.subtitle}>Tech Stack & Proficiency</Text>
      
      <ScrollView style={styles.skillsContainer}>
        {skills.map(skill => (
          <TouchableOpacity key={skill.id} style={styles.skillCard}>
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
  subtitle: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 30,
  },
  skillsContainer: {
    flex: 1,
  },
  skillCard: {
    backgroundColor: '#2d2d44',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#4361ee',
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
    color: '#fff',
  },
  skillLevel: {
    fontSize: 16,
    color: '#f72585',
    fontWeight: '600',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#333',
    borderRadius: 4,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4cc9f0',
    borderRadius: 4,
  },
  skillCategory: {
    fontSize: 14,
    color: '#8d99ae',
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