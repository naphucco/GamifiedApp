import React from 'react';
import { View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Text } from '../components/ui/StyledText';

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
          <TouchableOpacity
            key={exp.id}
            style={styles.timelineItem}
            onPress={() => navigation.navigate('ExperienceDetail', { experience: exp })}
          >
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

              {/* THÊM HINT NHẤP ĐỂ XEM CHI TIẾT */}
              <Text style={styles.detailHint}>👉 Nhấp để xem thống kê chi tiết</Text>
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
    backgroundColor: '#1cb0f6',
    zIndex: 1,
  },
  timelineLine: {
    flex: 1,
    width: 2,
    backgroundColor: '#1cb0f6',
    marginTop: 4,
  },
  timelineContent: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#1cb0f6',
    borderWidth: 1,
    borderColor: '#e9ecef',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  year: {
    fontSize: 14,
    color: '#ff9600',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 2,
  },
  company: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
    fontStyle: 'italic',
  },
  description: {
    fontSize: 14,
    color: '#555555',
    lineHeight: 20,
    marginBottom: 10,
  },
  techStack: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  techTag: {
    backgroundColor: '#e9ecef',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 6,
    marginBottom: 6,
  },
  techText: {
    color: '#495057',
    fontSize: 11,
  },
  expBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#ff9600',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  expText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#58cc02',
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
  detailHint: {
    fontSize: 12,
    color: '#888888',
    fontStyle: 'italic',
    marginTop: 8,
    textAlign: 'center',
  },
});