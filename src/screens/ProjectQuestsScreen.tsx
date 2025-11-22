import { useNavigation } from "@react-navigation/native";
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { gameState } from "../game/GameState";
import { useState } from "react";

export const ProjectQuestsScreen = () => {

  const navigation = useNavigation<any>();

  const [projects, setProjects] = useState([
    {
      id: 1,
      title: 'Gamified Portfolio App',
      description: 'Ứng dụng portfolio tương tác với yếu tố game hóa',
      tech: ['React Native', 'TypeScript', 'Animation'],
      difficulty: 'medium',
      expReward: 100,
      status: 'completed',
      claimed: false // ← THÊM TRẠNG THÁI ĐÃ NHẬN THƯỞNG CHƯA
    },
    {
      id: 2,
      title: 'E-Commerce Mobile App',
      description: 'Ứng dụng mua sắm với thanh toán online',
      tech: ['React Native', 'Node.js', 'MongoDB'],
      difficulty: 'hard',
      expReward: 150,
      status: 'completed',
      claimed: false
    },
    {
      id: 3,
      title: 'AI Chat Assistant',
      description: 'Trợ lý ảo sử dụng machine learning',
      tech: ['Python', 'TensorFlow', 'React'],
      difficulty: 'hard',
      expReward: 200,
      status: 'in-progress',
      claimed: false
    }
  ]);

  const handleClaimReward = (projectId: number) => {
    const project = projects.find((p: any) => p.id === projectId);

    if (!project) return;

    if (project.status !== 'completed') {
      Alert.alert('Chưa hoàn thành', 'Bạn cần hoàn thành dự án này trước!');  // Popup
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

    Alert.alert(
      '🎉 Nhận Thưởng Thành Công!',
      `Bạn nhận được +${project.expReward} EXP từ dự án "${project.title}"`
    );
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
          <View key={project.id} style={styles.projectCard}>
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
  projectsContainer: {
    flex: 1,
  },
  projectCard: {
    backgroundColor: '#2d2d44',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#4361ee',
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
    color: '#fff',
    flex: 1,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 10,
  },
  difficultyText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  projectDescription: {
    fontSize: 14,
    color: '#d1d5db',
    marginBottom: 12,
    lineHeight: 20,
  },
  techStack: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  techTag: {
    backgroundColor: '#374151',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 6,
    marginBottom: 6,
  },
  techText: {
    color: '#9ca3af',
    fontSize: 12,
  },
  projectFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  expReward: {
    color: '#fbbf24',
    fontWeight: 'bold',
    fontSize: 16,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
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
  claimButton: {
    backgroundColor: '#10b981',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  claimButtonDisabled: {
    backgroundColor: '#6b7280',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  claimButtonClaimed: {
    backgroundColor: '#374151',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  claimButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

