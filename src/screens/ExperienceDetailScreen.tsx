import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

// Mock charts
const Chart = ({ data, color }: { data: number[], color: string }) => {
  const maxValue = Math.max(...data);
  const chartHeight = 150;

  return (
    <View style={styles.chartContainer}>
      <View style={styles.chart}>
        {data.map((value, index) => (
          <View key={index} style={styles.barContainer}>
            <View 
              style={[
                styles.bar,
                { 
                  height: (value / maxValue) * chartHeight,
                  backgroundColor: color
                }
              ]}
            />
            <Text style={styles.barLabel}>{value}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export const ExperienceDetailScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute();
  
  // Fix: Thêm fallback cho experience
  const experience = (route.params as any)?.experience || {
    year: 'Không có dữ liệu',
    title: 'Không có dữ liệu',
    company: 'Không có dữ liệu',
    description: 'Không có dữ liệu mô tả',
    tech: []
  };

  // Mock data cho charts
  const skillData = [85, 90, 75, 80, 70];
  const projectData = [15, 8, 12, 5, 10];
  const growthData = [30, 50, 75, 90, 100];

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.year}>{experience.year}</Text>
          <Text style={styles.jobTitle}>{experience.title}</Text>
          <Text style={styles.company}>{experience.company}</Text>
        </View>

        {/* DESCRIPTION */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mô Tả Công Việc</Text>
          <Text style={styles.description}>{experience.description}</Text>
        </View>

        {/* SKILLS CHART */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Kỹ Năng Chính</Text>
          <Text style={styles.chartSubtitle}>Mức độ thành thạo các công nghệ</Text>
          <Chart data={skillData} color="#4cc9f0" />
          <View style={styles.chartLegend}>
            <Text style={styles.legendItem}>React Native: 85%</Text>
            <Text style={styles.legendItem}>TypeScript: 90%</Text>
            <Text style={styles.legendItem}>Node.js: 75%</Text>
            <Text style={styles.legendItem}>UI/UX: 80%</Text>
            <Text style={styles.legendItem}>AWS: 70%</Text>
          </View>
        </View>

        {/* PROJECTS CHART */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dự Án Đã Làm</Text>
          <Text style={styles.chartSubtitle}>Số lượng dự án qua các năm</Text>
          <Chart data={projectData} color="#f72585" />
          <View style={styles.chartLegend}>
            <Text style={styles.legendItem}>2020: 15 projects</Text>
            <Text style={styles.legendItem}>2021: 8 projects</Text>
            <Text style={styles.legendItem}>2022: 12 projects</Text>
            <Text style={styles.legendItem}>2023: 5 projects</Text>
            <Text style={styles.legendItem}>2024: 10 projects</Text>
          </View>
        </View>

        {/* GROWTH CHART */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mức Độ Phát Triển</Text>
          <Text style={styles.chartSubtitle}>Tăng trưởng kỹ năng qua thời gian</Text>
          <Chart data={growthData} color="#7209b7" />
          <View style={styles.chartLegend}>
            <Text style={styles.legendItem}>Year 1: 30%</Text>
            <Text style={styles.legendItem}>Year 2: 50%</Text>
            <Text style={styles.legendItem}>Year 3: 75%</Text>
            <Text style={styles.legendItem}>Year 4: 90%</Text>
            <Text style={styles.legendItem}>Year 5: 100%</Text>
          </View>
        </View>

        {/* TECH STACK */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Công Nghệ Sử Dụng</Text>
          <View style={styles.techStack}>
            {experience.tech.map((tech: string, index: number) => (
              <View key={index} style={styles.techTag}>
                <Text style={styles.techText}>{tech}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* BACK BUTTON */}
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
  header: {
    backgroundColor: '#2d2d44',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    alignItems: 'center',
  },
  year: {
    fontSize: 16,
    color: '#f72585',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  jobTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 5,
  },
  company: {
    fontSize: 16,
    color: '#8d99ae',
    fontStyle: 'italic',
  },
  section: {
    backgroundColor: '#2d2d44',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4cc9f0',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#d1d5db',
    lineHeight: 24,
  },
  chartSubtitle: {
    fontSize: 14,
    color: '#8d99ae',
    marginBottom: 15,
    fontStyle: 'italic',
  },
  chartContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  chart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 150,
    marginBottom: 10,
  },
  barContainer: {
    alignItems: 'center',
    marginHorizontal: 8,
  },
  bar: {
    width: 25,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginBottom: 5,
  },
  barLabel: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  chartLegend: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  legendItem: {
    color: '#d1d5db',
    fontSize: 12,
    marginHorizontal: 8,
    marginVertical: 4,
  },
  techStack: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  techTag: {
    backgroundColor: '#374151',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  techText: {
    color: '#9ca3af',
    fontSize: 12,
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