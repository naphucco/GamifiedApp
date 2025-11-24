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
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    color: (opacity = 1) => `rgba(37, 99, 235, ${opacity})`, // Blue for light mode
    strokeWidth: 2,
    barPercentage: 0.6,
    useShadowColorFromDataset: false,
    decimalPlaces: 0,
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
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <View style={[styles.chartContainer, { marginLeft: 15 }]}>
              <PieChart
                data={techDistributionData}
                width={chartWidth * 0.5}
                height={chartHeight}
                chartConfig={chartConfig}
                accessor="population"
                backgroundColor="transparent"
                paddingLeft="30"
                absolute
                hasLegend={false}
              />
            </View>

            {/* Legend - đẩy sát vào pie */}
            <View style={[styles.chartLegend]}>
              {techDistributionData.map((item, index) => (
                <View key={index} style={styles.legendItem}>
                  <View style={[styles.legendColor, { backgroundColor: item.color }]} />
                  <Text style={styles.legendText}>{item.name}</Text>
                </View>
              ))}
            </View>

            {/* Empty space bên phải */}
            <View style={{ width: 10 }} />
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
    backgroundColor: '#f8fafc',
    padding: 20,
  },
  header: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  year: {
    fontSize: 16,
    color: '#dc2626',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  jobTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 5,
  },
  company: {
    fontSize: 16,
    color: '#6b7280',
    fontStyle: 'italic',
  },
  section: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#4b5563',
    lineHeight: 24,
  },
  chartSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 15,
    fontStyle: 'italic',
  },
  // SỬA CHART CONTAINER CHO PIE
  chartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    overflow: 'visible',
    height: 200,
    flex: 1.5, // Tăng thêm để pie chiếm nhiều chỗ hơn
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
    color: '#1f2937',
    fontSize: 10,
    fontWeight: 'bold',
  },
  chartLegend: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6, // Tăng khoảng cách dọc
    marginHorizontal: 0, // Reset khoảng cách ngang
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: {
    color: '#4b5563',
    fontSize: 12,
  },
  techStack: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  techTag: {
    backgroundColor: '#e5e7eb',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  techText: {
    color: '#4b5563',
    fontSize: 12,
  },
  backButton: {
    backgroundColor: '#7c3aed',
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