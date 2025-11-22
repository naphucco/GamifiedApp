import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';
import AnimatedBarChart from '../components/game/AnimatedBarChart';

const screenWidth = Dimensions.get('window').width;

export const ExperienceDetailScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute();

  const experience = (route.params as any)?.experience || {
    year: 'Không có dữ liệu',
    title: 'Không có dữ liệu',
    company: 'Không có dữ liệu',
    description: 'Không có dữ liệu mô tả',
    tech: []
  };

  // DỮ LIỆU CHO 3 LOẠI CHART KHÁC NHAU
  const skillProgressData = {
    labels: ['React', 'TypeScript', 'Node.js', 'UI/UX', 'AWS'],
    datasets: [{
      data: [85, 90, 75, 80, 70]
    }]
  };

  const projectTimelineData = {
    labels: ['2020', '2021', '2022', '2023', '2024'],
    datasets: [{
      data: [15, 8, 12, 5, 10]
    }]
  };

  const techDistributionData = [
    {
      name: 'Frontend',
      population: 45,
      color: '#4cc9f0',
      legendFontColor: '#fff',
      legendFontSize: 12
    },
    {
      name: 'Backend',
      population: 30,
      color: '#f72585',
      legendFontColor: '#fff',
      legendFontSize: 12
    },
    {
      name: 'Mobile',
      population: 25,
      color: '#7209b7',
      legendFontColor: '#fff',
      legendFontSize: 12
    }
  ];

  const chartConfig = {
    backgroundColor: '#1a1a2e',
    backgroundGradientFrom: '#2d2d44',
    backgroundGradientTo: '#2d2d44',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(76, 201, 240, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#4cc9f0'
    }
  };

  const chartWidth = screenWidth - 80;
  const chartHeight = 170; // Rất nhỏ gọn

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

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Test custom chart</Text>
          <View style={styles.chartContainer}>
            <AnimatedBarChart
              data={[85, 90, 75, 80, 70]}
              labels={['React', 'TS', 'Node', 'UI/UX', 'AWS']}
              colors={['#4cc9f0', '#f72585', '#7209b7', '#4361ee', '#3a0ca3']}
            />
          </View>
        </View>

        {/* 1. LINE CHART - Skill Progress */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tiến Trình Kỹ Năng</Text>
          <View style={styles.chartContainer}>
            <LineChart
              data={skillProgressData}
              width={chartWidth} // Vừa với padding
              height={chartHeight} // Giảm height đáng kể
              chartConfig={chartConfig}
              bezier
              style={styles.chart}
              fromZero
            />
          </View>
        </View>

        {/* 2. BAR CHART - Project Timeline */}        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dự Án Theo Năm</Text>
          <View style={styles.chartContainer}>
            <BarChart
              data={projectTimelineData}
              width={chartWidth}
              height={chartHeight}
              chartConfig={chartConfig}
              style={styles.chart}
              yAxisLabel=""
              yAxisSuffix=""
            />
          </View>
        </View>

        {/* 3. PIE CHART - Tech Distribution */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Phân Bố Công Nghệ</Text>
          <View style={styles.chartContainer}>
            <PieChart
              data={techDistributionData}
              width={chartWidth}
              height={chartHeight}
              chartConfig={chartConfig}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="15"
              absolute
            />
          </View>
        </View>

        {/* TECH STACK */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🛠 Công Nghệ Sử Dụng</Text>
          <View style={styles.techStack}>
            {experience.tech.map((tech: string, index: number) => (
              <View key={index} style={styles.techTag}>
                <Text style={styles.techText}>{tech}</Text>
              </View>
            ))}
          </View>
        </View>
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
    justifyContent: 'center',
    marginVertical: 10,
    overflow: 'visible', // Cho phép text hiển thị đầy đủ
    height: 200, // Set fixed height cho container
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