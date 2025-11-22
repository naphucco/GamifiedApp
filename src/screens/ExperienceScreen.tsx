import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const ExperienceScreen = () => {
  const navigation = useNavigation<any>();

  const experiences = [
    {
      id: 1,
      year: '2024 - Hiện tại',
      title: 'Senior React Native Developer',
      company: 'Công Ty Tech Startup',
      description: 'Team lead, xây dựng ứng dụng mobile cho 1 triệu users',
      tech: ['React Native', 'TypeScript', 'Node.js', 'AWS'],
      expReward: 200
    },
    {
      id: 2,
      year: '2022 - 2024', 
      title: 'Mid-level Mobile Developer',
      company: 'Công Ty FinTech',
      description: 'Phát triển ứng dụng ngân hàng số, payment gateway',
      tech: ['React Native', 'Redux', 'Firebase', 'REST API'],
      expReward: 150
    },
    {
      id: 3,
      year: '2020 - 2022',
      title: 'Junior Developer',
      company: 'Công Ty Outsourcing',
      description: 'Tham gia 10+ dự án mobile app cho khách hàng US, EU',
      tech: ['React Native', 'JavaScript', 'Git', 'Agile'],
      expReward: 100
    },
    {
      id: 4,
      year: '2018 - 2020',
      title: 'Fresher Developer',
      company: 'Công Ty Product',
      description: 'Bắt đầu sự nghiệp, học tập và phát triển kỹ năng',
      tech: ['HTML/CSS', 'JavaScript', 'React', 'MySQL'],
      expReward: 50
    }
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📜 Career Journey</Text>
      <Text style={styles.subtitle}>Hành trình từ Fresher đến Senior</Text>
      
      <ScrollView style={styles.timelineContainer}>
        {experiences.map((exp, index) => (
          <View key={exp.id} style={styles.timelineItem}>
            {/* TIMELINE DOT & LINE */}
            <View style={styles.timelineLeft}>
              <View style={styles.timelineDot} />
              {index !== experiences.length - 1 && (
                <View style={styles.timelineLine} />
              )}
            </View>
            
            {/* CONTENT */}
            <View style={styles.timelineContent}>
              <Text style={styles.year}>{exp.year}</Text>
              <Text style={styles.jobTitle}>{exp.title}</Text>
              <Text style={styles.company}>{exp.company}</Text>
              <Text style={styles.description}>{exp.description}</Text>
              
              <View style={styles.techStack}>
                {exp.tech.map((tech, techIndex) => (
                  <View key={techIndex} style={styles.techTag}>
                    <Text style={styles.techText}>{tech}</Text>
                  </View>
                ))}
              </View>
              
              <View style={styles.expBadge}>
                <Text style={styles.expText}>+{exp.expReward} EXP</Text>
              </View>
            </View>
          </View>
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
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 30,
  },
  timelineContainer: {
    flex: 1,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 25,
  },
  timelineLeft: {
    alignItems: 'center',
    marginRight: 15,
    width: 30,
  },
  timelineDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#4361ee',
    zIndex: 1,
  },
  timelineLine: {
    flex: 1,
    width: 2,
    backgroundColor: '#4361ee',
    marginTop: 4,
  },
  timelineContent: {
    flex: 1,
    backgroundColor: '#2d2d44',
    padding: 15,
    borderRadius: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#4361ee',
  },
  year: {
    fontSize: 14,
    color: '#f72585',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 2,
  },
  company: {
    fontSize: 14,
    color: '#8d99ae',
    marginBottom: 8,
    fontStyle: 'italic',
  },
  description: {
    fontSize: 14,
    color: '#d1d5db',
    lineHeight: 20,
    marginBottom: 10,
  },
  techStack: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  techTag: {
    backgroundColor: '#374151',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 6,
    marginBottom: 6,
  },
  techText: {
    color: '#9ca3af',
    fontSize: 11,
  },
  expBadge: {
    alignSelf: 'flex-start',
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