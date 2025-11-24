import { useNavigation } from "@react-navigation/native";
import { Alert, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { gameState } from "../game/GameState";
import { useState, useEffect } from "react";
import { Text } from "../components/ui/StyledText";

export const ProjectQuestsScreen = () => {
  const navigation = useNavigation<any>();
  const [projects, setProjects] = useState([
    {
      id: 'portfolio_game', // ĐỔI THÀNH STRING
      title: 'Gamified Portfolio App',
      description: 'Ứng dụng portfolio tương tác với yếu tố game hóa',
      tech: ['React Native', 'TypeScript', 'Animation'],
      difficulty: 'medium',
      expReward: 100,
      status: 'completed',
      claimed: false
    },
    {
      id: 'ecommerce_app',
      title: 'E-Commerce Mobile App',
      description: 'Ứng dụng mua sắm với thanh toán online',
      tech: ['React Native', 'Node.js', 'MongoDB'],
      difficulty: 'hard',
      expReward: 150,
      status: 'completed',
      claimed: false
    },
    {
      id: 'ai_chat',
      title: 'AI Chat Assistant',
      description: 'Trợ lý ảo sử dụng machine learning',
      tech: ['Python', 'TensorFlow', 'React'],
      difficulty: 'hard',
      expReward: 200,
      status: 'in-progress',
      claimed: false
    }
  ]);

  // THÊM: Track khi vào screen
  useEffect(() => {
    gameState.trackExperienceView(); // Track khi vào Projects screen
  }, []);

  const handleClaimReward = (projectId: string) => { // ĐỔI THÀNH string
    const project = projects.find((p: any) => p.id === projectId);

    if (!project) return;

    if (project.status !== 'completed') {
      Alert.alert('Chưa hoàn thành', 'Bạn cần hoàn thành dự án này trước!');
      return;
    }

    if (project.claimed) {
      Alert.alert('Đã nhận thưởng', 'Bạn đã nhận EXP cho dự án này rồi!');
      return;
    }

    // CẬP NHẬT TRẠNG THÁI VÀ THÊM EXP
    setProjects((prev: any) =>
      prev.map((p: any) =>
        p.id === projectId ? { ...p, claimed: true } : p
      )
    );

    gameState.addExp(project.expReward);
    gameState.trackProjectView(projectId); // 🎯 THÊM DÒNG NÀY - Track project view

    Alert.alert(
      '🎉 Nhận Thưởng Thành Công!',
      `Bạn nhận được +${project.expReward} EXP từ dự án "${project.title}"`
    );
  };

  // THÊM: Track khi click vào project card để xem chi tiết
  const handleProjectView = (projectId: string) => {
    gameState.trackProjectView(projectId); // Track khi user xem project
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return '#4ade80';
      case 'medium': return '#f59e0b';
      case 'hard': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getClaimButtonText = (project: any) => {
    if (project.status !== 'completed') return '🔒 Chưa hoàn thành';
    if (project.claimed) return '✅ Đã nhận thưởng';
    return `🎁 Nhận +${project.expReward} EXP`;
  };

  const getClaimButtonStyle = (project: any) => {
    if (project.status !== 'completed') return styles.claimButtonDisabled;
    if (project.claimed) return styles.claimButtonClaimed;
    return styles.claimButton;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🚀 Project Quests</Text>
      <Text style={styles.subtitle}>Hoàn thành dự án để nhận EXP!</Text>

      <ScrollView style={styles.projectsContainer}>
        {projects.map((project: any) => (
          <TouchableOpacity
            key={project.id}
            style={styles.projectCard}
            onPress={() => handleProjectView(project.id)} // 🎯 THÊM DÒNG NÀY
          >
            <View style={styles.projectHeader}>
              <Text style={styles.projectTitle}>{project.title}</Text>
              <View style={[
                styles.difficultyBadge,
                { backgroundColor: getDifficultyColor(project.difficulty) }
              ]}>
                <Text style={styles.difficultyText}>
                  {project.difficulty.toUpperCase()}
                </Text>
              </View>
            </View>

            <Text style={styles.projectDescription}>{project.description}</Text>

            <View style={styles.techStack}>
              {project.tech.map((tech: any, index: any) => (
                <View key={index} style={styles.techTag}>
                  <Text style={styles.techText}>{tech}</Text>
                </View>
              ))}
            </View>

            <View style={styles.projectFooter}>
              <Text style={styles.expReward}>🎯 +{project.expReward} EXP</Text>

              <TouchableOpacity
                style={getClaimButtonStyle(project)}
                onPress={() => handleClaimReward(project.id)}
                disabled={project.status !== 'completed' || project.claimed}
              >
                <Text style={styles.claimButtonText}>
                  {getClaimButtonText(project)}
                </Text>
              </TouchableOpacity>
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
  projectsContainer: {
    flex: 1,
  },
  projectCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#1cb0f6',
    borderWidth: 1,
    borderColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  projectTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    flex: 1,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 10,
  },
  difficultyText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  projectDescription: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 12,
    lineHeight: 20,
  },
  techStack: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  techTag: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 6,
    marginBottom: 6,
  },
  techText: {
    color: '#555555',
    fontSize: 12,
  },
  projectFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  expReward: {
    color: '#ff9600',
    fontWeight: 'bold',
    fontSize: 16,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
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
  claimButton: {
    backgroundColor: '#10b981',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  claimButtonDisabled: {
    backgroundColor: '#cccccc',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  claimButtonClaimed: {
    backgroundColor: '#888888',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  claimButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

