import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  Animated,
  TouchableOpacity,
  SafeAreaView,
  Easing,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { gameState } from '../game/GameState';
import { Text } from '../components/ui/StyledText';
import { CustomCard } from '../components/ui/CustomCard';
import { withScreenTransition } from '../components/game/ScreenTransition';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// =============================================================================
// DỮ LIỆU MẪU CHI TIẾT KỸ NĂNG
// =============================================================================

/**
 * Dữ liệu chi tiết cho mỗi kỹ năng
 */
const skillDetails = {
  react_native: {
    id: 'react_native',
    name: 'React Native',
    tagline: 'Build Native Mobile Apps with JavaScript',
    level: 5,
    category: 'mobile',
    description: 'React Native là framework phát triển ứng dụng mobile đa nền tảng (iOS và Android) sử dụng JavaScript và React. Cho phép xây dựng ứng dụng native thực sự với hiệu suất cao.',
    xp: 1250,
    nextLevelXp: 1500,
    proficiency: 92,
    color: '#61DAFB',
    icon: '📱',

    // Thống kê chi tiết
    stats: {
      projects: 15,
      years: 4,
      certifications: 3,
      weeklyHours: 12,
    },

    // Thẻ hiệu suất
    performance: [
      { label: 'Code Quality', value: 88, color: '#4CAF50' },
      { label: 'Debugging', value: 92, color: '#2196F3' },
      { label: 'Performance', value: 85, color: '#FF9800' },
      { label: 'Testing', value: 80, color: '#9C27B0' },
    ],

    // Dự án nổi bật
    featuredProjects: [
      {
        id: '1',
        name: 'E-Commerce App',
        description: 'Ứng dụng mua sắm với 50k+ người dùng',
        tech: ['Redux', 'Firebase', 'Stripe'],
        role: 'Lead Developer',
      },
      {
        id: '2',
        name: 'Fitness Tracker',
        description: 'Theo dõi hoạt động thể chất & dinh dưỡng',
        tech: ['GraphQL', 'MongoDB', 'AWS'],
        role: 'Full-stack Developer',
      },
    ],

    // Công nghệ liên quan
    relatedTech: ['Expo', 'Redux', 'Firebase', 'GraphQL', 'TypeScript'],

    // Mục tiêu học tập tiếp theo
    learningGoals: [
      'Học React Native Reanimated 2',
      'Master React Native Performance Optimization',
      'Build 3 ứng dụng thực tế trong quý tới',
    ],

    // Khóa học đề xuất
    recommendedCourses: [
      {
        name: 'Advanced React Native Patterns',
        platform: 'Udemy',
        duration: '12 hours',
      },
      {
        name: 'React Native Performance Masterclass',
        platform: 'Frontend Masters',
        duration: '8 hours',
      },
    ],
  },

  typescript: {
    id: 'typescript',
    name: 'TypeScript',
    tagline: 'JavaScript with Syntax for Types',
    level: 5,
    category: 'language',
    description: 'TypeScript là ngôn ngữ lập trình mở rộng từ JavaScript với hệ thống kiểu tĩnh. Giúp phát hiện lỗi sớm, cải thiện chất lượng code và tăng khả năng bảo trì.',
    xp: 1100,
    nextLevelXp: 1500,
    proficiency: 90,
    color: '#3178C6',
    icon: '💬',

    stats: {
      projects: 25,
      years: 3,
      certifications: 2,
      weeklyHours: 8,
    },

    performance: [
      { label: 'Type Safety', value: 95, color: '#4CAF50' },
      { label: 'Tooling', value: 88, color: '#2196F3' },
      { label: 'Advanced Types', value: 82, color: '#FF9800' },
      { label: 'Integration', value: 85, color: '#9C27B0' },
    ],

    featuredProjects: [
      {
        id: '1',
        name: 'Enterprise Dashboard',
        description: 'Dashboard quản lý với complex types',
        tech: ['React', 'Node.js', 'PostgreSQL'],
        role: 'TypeScript Architect',
      },
    ],

    relatedTech: ['React', 'Node.js', 'Next.js', 'NestJS'],
    learningGoals: [
      'Master TypeScript 5.0 Features',
      'Learn TypeScript Decorators',
      'Contribute to TypeScript Open Source',
    ],

    recommendedCourses: [
      {
        name: 'TypeScript Masterclass',
        platform: 'Pluralsight',
        duration: '15 hours',
      },
    ],
  },

  // Thêm các skill khác từ SkillTreeScreen
  nodejs: {
    id: 'nodejs',
    name: 'Node.js',
    tagline: 'JavaScript Runtime Environment',
    level: 4,
    category: 'backend',
    description: 'Node.js là môi trường chạy JavaScript phía server, cho phép xây dựng ứng dụng web scalable và hiệu suất cao.',
    xp: 800,
    nextLevelXp: 1000,
    proficiency: 80,
    color: '#4ECDC4',
    icon: '⚙️',

    stats: {
      projects: 12,
      years: 3,
      certifications: 2,
      weeklyHours: 10,
    },

    performance: [
      { label: 'API Design', value: 85, color: '#4CAF50' },
      { label: 'Performance', value: 82, color: '#2196F3' },
      { label: 'Security', value: 78, color: '#FF9800' },
      { label: 'Testing', value: 75, color: '#9C27B0' },
    ],

    featuredProjects: [
      {
        id: '1',
        name: 'REST API Service',
        description: 'Microservice API cho hệ thống lớn',
        tech: ['Express', 'MongoDB', 'Redis'],
        role: 'Backend Developer',
      },
    ],

    relatedTech: ['Express', 'MongoDB', 'Redis', 'Docker'],
    learningGoals: [
      'Học Node.js Cluster API',
      'Master Node.js Performance Tuning',
      'Build real-time applications với Socket.io',
    ],
  },

  python: {
    id: 'python',
    name: 'Python',
    tagline: 'General Purpose Programming Language',
    level: 3,
    category: 'language',
    description: 'Python là ngôn ngữ lập trình đa năng với cú pháp đơn giản, mạnh mẽ trong data science, AI và web development.',
    xp: 400,
    nextLevelXp: 750,
    proficiency: 53,
    color: '#FF6B6B',
    icon: '🐍',

    stats: {
      projects: 8,
      years: 2,
      certifications: 1,
      weeklyHours: 6,
    },

    performance: [
      { label: 'Syntax', value: 90, color: '#4CAF50' },
      { label: 'Libraries', value: 65, color: '#2196F3' },
      { label: 'Data Science', value: 45, color: '#FF9800' },
      { label: 'Web Dev', value: 50, color: '#9C27B0' },
    ],

    featuredProjects: [
      {
        id: '1',
        name: 'Data Analysis Tool',
        description: 'Công cụ phân tích dữ liệu cho doanh nghiệp',
        tech: ['Pandas', 'NumPy', 'Matplotlib'],
        role: 'Data Analyst',
      },
    ],

    relatedTech: ['Django', 'Flask', 'Pandas', 'NumPy'],
    learningGoals: [
      'Học Django Framework',
      'Master Data Analysis với Pandas',
      'Build machine learning models',
    ],
  },

  // Thêm các skill khác...
  ui_ux: {
    id: 'ui_ux',
    name: 'UI/UX Design',
    tagline: 'User Interface & Experience Design',
    level: 4,
    category: 'design',
    description: 'Thiết kế giao diện và trải nghiệm người dùng tập trung vào usability, accessibility và aesthetics.',
    xp: 750,
    nextLevelXp: 1000,
    proficiency: 75,
    color: '#FFBE0B',
    icon: '✨',

    stats: {
      projects: 18,
      years: 3,
      certifications: 2,
      weeklyHours: 15,
    },

    performance: [
      { label: 'Wireframing', value: 90, color: '#4CAF50' },
      { label: 'Prototyping', value: 85, color: '#2196F3' },
      { label: 'User Research', value: 70, color: '#FF9800' },
      { label: 'Visual Design', value: 80, color: '#9C27B0' },
    ],

    featuredProjects: [
      {
        id: '1',
        name: 'Mobile Banking App',
        description: 'Redesign ứng dụng ngân hàng di động',
        tech: ['Figma', 'Adobe XD', 'User Testing'],
        role: 'UI/UX Designer',
      },
    ],

    relatedTech: ['Figma', 'Adobe XD', 'Sketch', 'User Testing'],
    learningGoals: [
      'Học Design Systems',
      'Master Accessibility Design',
      'Build design portfolio',
    ],
  },

  aws: {
    id: 'aws',
    name: 'AWS',
    tagline: 'Amazon Web Services Cloud Platform',
    level: 3,
    category: 'cloud',
    description: 'Dịch vụ điện toán đám mây hàng đầu với hơn 200 dịch vụ đầy đủ từ data centers toàn cầu.',
    xp: 450,
    nextLevelXp: 750,
    proficiency: 60,
    color: '#96CEB4',
    icon: '☁️',

    stats: {
      projects: 6,
      years: 2,
      certifications: 1,
      weeklyHours: 8,
    },

    performance: [
      { label: 'EC2 & S3', value: 75, color: '#4CAF50' },
      { label: 'Lambda', value: 65, color: '#2196F3' },
      { label: 'RDS', value: 60, color: '#FF9800' },
      { label: 'Security', value: 55, color: '#9C27B0' },
    ],

    featuredProjects: [
      {
        id: '1',
        name: 'Cloud Migration',
        description: 'Di chuyển hệ thống on-premise lên AWS',
        tech: ['EC2', 'S3', 'RDS', 'CloudFront'],
        role: 'Cloud Engineer',
      },
    ],

    relatedTech: ['Docker', 'Kubernetes', 'Terraform', 'CI/CD'],
    learningGoals: [
      'Get AWS Solutions Architect Certification',
      'Learn AWS Serverless Architecture',
      'Master AWS Security Best Practices',
    ],
  },

  react: {
    id: 'react',
    name: 'React',
    tagline: 'JavaScript Library for Building User Interfaces',
    level: 4,
    category: 'frontend',
    description: 'Thư viện JavaScript phổ biến nhất để xây dựng giao diện người dùng tương tác và component-based.',
    xp: 900,
    nextLevelXp: 1000,
    proficiency: 90,
    color: '#45B7D1',
    icon: '⚛️',

    stats: {
      projects: 20,
      years: 4,
      certifications: 2,
      weeklyHours: 10,
    },

    performance: [
      { label: 'Components', value: 95, color: '#4CAF50' },
      { label: 'State Management', value: 88, color: '#2196F3' },
      { label: 'Hooks', value: 92, color: '#FF9800' },
      { label: 'Performance', value: 85, color: '#9C27B0' },
    ],

    featuredProjects: [
      {
        id: '1',
        name: 'Dashboard Admin',
        description: 'Admin dashboard với real-time data',
        tech: ['Redux', 'Chart.js', 'Material-UI'],
        role: 'Frontend Developer',
      },
    ],

    relatedTech: ['Redux', 'Next.js', 'Material-UI', 'React Query'],
    learningGoals: [
      'Học React Server Components',
      'Master React Performance Optimization',
      'Build micro-frontends',
    ],
  },

  mongodb: {
    id: 'mongodb',
    name: 'MongoDB',
    tagline: 'NoSQL Database for Modern Applications',
    level: 3,
    category: 'database',
    description: 'Cơ sở dữ liệu NoSQL document-oriented linh hoạt, scalable cho ứng dụng hiện đại.',
    xp: 350,
    nextLevelXp: 750,
    proficiency: 47,
    color: '#FF8E53',
    icon: '💾',

    stats: {
      projects: 10,
      years: 2,
      certifications: 1,
      weeklyHours: 6,
    },

    performance: [
      { label: 'CRUD Operations', value: 85, color: '#4CAF50' },
      { label: 'Aggregation', value: 60, color: '#2196F3' },
      { label: 'Indexing', value: 45, color: '#FF9800' },
      { label: 'Sharding', value: 35, color: '#9C27B0' },
    ],

    featuredProjects: [
      {
        id: '1',
        name: 'E-commerce Database',
        description: 'NoSQL database cho hệ thống e-commerce',
        tech: ['Mongoose', 'Node.js', 'Express'],
        role: 'Database Developer',
      },
    ],

    relatedTech: ['Mongoose', 'Node.js', 'Express', 'Redis'],
    learningGoals: [
      'Learn MongoDB Aggregation Framework',
      'Master MongoDB Performance Tuning',
      'Study MongoDB Atlas',
    ],
  },

  docker: {
    id: 'docker',
    name: 'Docker',
    tagline: 'Containerization Platform',
    level: 2,
    category: 'cloud',
    description: 'Nền tảng containerization cho phép đóng gói ứng dụng và dependencies vào container portable.',
    xp: 200,
    nextLevelXp: 500,
    proficiency: 40,
    color: '#96CEB4',
    icon: '🐳',

    stats: {
      projects: 5,
      years: 1,
      certifications: 0,
      weeklyHours: 4,
    },

    performance: [
      { label: 'Container Basics', value: 75, color: '#4CAF50' },
      { label: 'Docker Compose', value: 50, color: '#2196F3' },
      { label: 'Dockerfile', value: 65, color: '#FF9800' },
      { label: 'Networking', value: 30, color: '#9C27B0' },
    ],

    featuredProjects: [
      {
        id: '1',
        name: 'Microservices Deployment',
        description: 'Containerization cho hệ thống microservices',
        tech: ['Docker Compose', 'Node.js', 'MongoDB'],
        role: 'DevOps Engineer',
      },
    ],

    relatedTech: ['Kubernetes', 'CI/CD', 'AWS', 'Terraform'],
    learningGoals: [
      'Learn Docker Networking',
      'Study Docker Swarm',
      'Get Docker Certified',
    ],
  },

  graphql: {
    id: 'graphql',
    name: 'GraphQL',
    tagline: 'Query Language for APIs',
    level: 3,
    category: 'backend',
    description: 'Ngôn ngữ truy vấn cho APIs và runtime để thực thi các truy vấn đó với dữ liệu hiện có.',
    xp: 300,
    nextLevelXp: 750,
    proficiency: 40,
    color: '#4ECDC4',
    icon: '🔍',

    stats: {
      projects: 4,
      years: 1,
      certifications: 1,
      weeklyHours: 5,
    },

    performance: [
      { label: 'Queries', value: 70, color: '#4CAF50' },
      { label: 'Mutations', value: 55, color: '#2196F3' },
      { label: 'Subscriptions', value: 30, color: '#FF9800' },
      { label: 'Schema Design', value: 45, color: '#9C27B0' },
    ],

    featuredProjects: [
      {
        id: '1',
        name: 'API Gateway',
        description: 'GraphQL API gateway cho multiple microservices',
        tech: ['Apollo Server', 'Node.js', 'MongoDB'],
        role: 'API Developer',
      },
    ],

    relatedTech: ['Apollo', 'Relay', 'Hasura', 'Prisma'],
    learningGoals: [
      'Learn GraphQL Subscriptions',
      'Master GraphQL Performance',
      'Study GraphQL Federation',
    ],
  },
};

// =============================================================================
// COMPONENT CHÍNH - SKILL DETAIL
// =============================================================================

/**
 * Component chi tiết kỹ năng
 * Hiển thị đầy đủ thông tin, thống kê, và tương tác với skill
 */
const SkillDetailComponent = () => {
  // ===========================================================================
  // STATE VÀ REF
  // ===========================================================================
  const navigation = useNavigation();
  const route = useRoute();
  const { skillId } = route.params as { skillId: string };

  // Lấy skill data trực tiếp từ skillDetails
  const skill = skillDetails[skillId as keyof typeof skillDetails];

  // Animation refs
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  // ===========================================================================
  // EFFECTS
  // ===========================================================================

  useEffect(() => {
    if (skill) {
      // Track analytics
      // gameState.trackSkillDetailView(skillId);

      // Start animations
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 800,
          easing: Easing.out(Easing.back(1.2)),
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(progressAnim, {
          toValue: skill.proficiency / 100,
          duration: 1200,
          easing: Easing.out(Easing.quad),
          useNativeDriver: false,
        }),
      ]).start();
    }
  }, [skillId]);

  // ===========================================================================
  // HANDLERS
  // ===========================================================================

  const handleBack = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      navigation.goBack();
    });
  };

  const handleAddXp = () => {
    // Logic để thêm XP cho skill này
    gameState.addExp(50);
    // Có thể cập nhật UI hoặc hiển thị thông báo
  };

  const handlePractice = () => {
    // Navigation đến mini-game hoặc bài tập thực hành
    // gameState.startSkillPractice(skillId);
  };

  // ===========================================================================
  // RENDER FUNCTIONS
  // ===========================================================================

  /**
   * Render header với thông tin chính
   */
  const renderHeader = () => {
    if (!skill) return null;

    return (
      <Animated.View
        style={[
          styles.header,
          {
            opacity: fadeAnim,
            transform: [
              { translateY: slideAnim },
              { scale: scaleAnim }
            ],
          }
        ]}
      >
        <View style={styles.headerTop}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBack}
          >
            <Text style={styles.backButtonIcon}>←</Text>
          </TouchableOpacity>

          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonIcon}>🔖</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonIcon}>↗️</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.skillHeaderContent}>
          <View style={styles.skillIconContainer}>
            <Text style={styles.skillIcon}>{skill.icon}</Text>
          </View>

          <View style={styles.skillTitleContainer}>
            <Text style={styles.skillName}>{skill.name}</Text>
            <Text style={styles.skillTagline}>{skill.tagline}</Text>
          </View>

          <View style={styles.levelContainer}>
            <View style={[styles.levelBadge, { backgroundColor: skill.color }]}>
              <Text style={styles.levelText}>LEVEL {skill.level}</Text>
            </View>
            <Text style={styles.levelSubtext}>
              {skill.level >= 5 ? 'Master' :
                skill.level >= 4 ? 'Advanced' :
                  skill.level >= 3 ? 'Intermediate' :
                    skill.level >= 2 ? 'Beginner+' :
                      'Beginner'}
            </Text>
          </View>
        </View>

        <View style={styles.progressHeader}>
          <View style={styles.xpContainer}>
            <Text style={styles.xpLabel}>Current XP</Text>
            <Text style={styles.xpValue}>{skill.xp} / {skill.nextLevelXp}</Text>
          </View>

          <View style={styles.progressBarContainer}>
            <View style={styles.progressBarBackground}>
              <Animated.View
                style={[
                  styles.progressBarFill,
                  {
                    width: progressAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0%', `${skill.proficiency}%`],
                    }),
                    backgroundColor: skill.color,
                  }
                ]}
              />
            </View>
            <Text style={styles.progressPercentage}>{skill.proficiency}% proficiency</Text>
          </View>
        </View>
      </Animated.View>
    );
  };

  /**
   * Render thống kê nổi bật
   */
  const renderStats = () => {
    if (!skill) return null;

    return (
      <CustomCard
        backgroundColor="#FFFFFF"
        borderRadius={16}
      >
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>📊 Thống Kê</Text>

          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{skill.stats.projects}</Text>
              <Text style={styles.statLabel}>Dự án</Text>
            </View>

            <View style={styles.statDivider} />

            <View style={styles.statItem}>
              <Text style={styles.statValue}>{skill.stats.years}+</Text>
              <Text style={styles.statLabel}>Năm kinh nghiệm</Text>
            </View>

            <View style={styles.statDivider} />

            <View style={styles.statItem}>
              <Text style={styles.statValue}>{skill.stats.certifications}</Text>
              <Text style={styles.statLabel}>Chứng chỉ</Text>
            </View>

            <View style={styles.statDivider} />

            <View style={styles.statItem}>
              <Text style={styles.statValue}>{skill.stats.weeklyHours}h</Text>
              <Text style={styles.statLabel}>Giờ/tuần</Text>
            </View>
          </View>
        </View>
      </CustomCard>
    );
  };

  /**
   * Render biểu đồ hiệu suất
   */
  const renderPerformance = () => {
    if (!skill) return null;

    return (
      <CustomCard
        backgroundColor="#FFFFFF"
        borderRadius={16}
      >
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>📈 Hiệu Suất</Text>

          <View style={styles.performanceGrid}>
            {skill.performance.map((item: any, index: number) => (
              <View key={index} style={styles.performanceItem}>
                <View style={styles.performanceHeader}>
                  <Text style={styles.performanceLabel}>{item.label}</Text>
                  <Text style={styles.performanceValue}>{item.value}%</Text>
                </View>

                <View style={styles.performanceBarBackground}>
                  <View
                    style={[
                      styles.performanceBarFill,
                      {
                        width: `${item.value}%`,
                        backgroundColor: item.color,
                      }
                    ]}
                  />
                </View>
              </View>
            ))}
          </View>
        </View>
      </CustomCard>
    );
  };

  /**
   * Render dự án nổi bật
   */
  const renderProjects = () => {
    if (!skill) return null;

    return (
      <CustomCard
        backgroundColor="#FFFFFF"
        borderRadius={16}
      >
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>🚀 Dự Án Nổi Bật</Text>

          {skill.featuredProjects && skill.featuredProjects.map((project: any) => (
            <View key={project.id} style={styles.projectItem}>
              <View style={styles.projectHeader}>
                <Text style={styles.projectName}>{project.name}</Text>
                <View style={styles.projectRoleBadge}>
                  <Text style={styles.projectRole}>{project.role}</Text>
                </View>
              </View>

              <Text style={styles.projectDescription}>{project.description}</Text>

              <View style={styles.techStack}>
                {project.tech.map((tech: string, index: number) => (
                  <View key={index} style={styles.techTag}>
                    <Text style={styles.techText}>{tech}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>
      </CustomCard>
    );
  };

  /**
   * Render mục tiêu học tập
   */
  const renderLearningGoals = () => {
    if (!skill) return null;

    return (
      <CustomCard
        backgroundColor="#FFFFFF"
        borderRadius={16}
      >
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>🎯 Mục Tiêu Học Tập</Text>

          {skill.learningGoals.map((goal: string, index: number) => (
            <View key={index} style={styles.learningGoal}>
              <View style={styles.goalCheckbox}>
                <Text style={styles.goalCheckIcon}>✓</Text>
              </View>
              <Text style={styles.goalText}>{goal}</Text>
            </View>
          ))}

          <TouchableOpacity style={styles.addGoalButton}>
            <Text style={styles.addGoalIcon}>+</Text>
            <Text style={styles.addGoalText}>Thêm mục tiêu mới</Text>
          </TouchableOpacity>
        </View>
      </CustomCard>
    );
  };

  /**
   * Render công nghệ liên quan
   */
  const renderRelatedTech = () => {
    if (!skill) return null;

    return (
      <View style={styles.relatedTechCard}>
        <Text style={styles.relatedTechTitle}>🔗 Công Nghệ Liên Quan</Text>

        <View style={styles.techList}>
          {skill.relatedTech.map((tech: string, index: number) => (
            <TouchableOpacity key={index} style={styles.techButton}>
              <Text style={styles.techButtonText}>{tech}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  /**
   * Render action buttons
   */
  const renderActionButtons = () => {
    return (
      <View style={styles.actionButtonsContainer}>
        <TouchableOpacity
          style={[styles.actionButtonLarge, styles.practiceButton]}
          onPress={handlePractice}
        >
          <Text style={styles.actionButtonIconLarge}>▶️</Text>
          <Text style={styles.actionButtonText}>Thực Hành Ngay</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButtonLarge, styles.xpButton]}
          onPress={handleAddXp}
        >
          <Text style={styles.actionButtonIconLarge}>➕</Text>
          <Text style={styles.actionButtonText}>+50 XP</Text>
        </TouchableOpacity>
      </View>
    );
  };

  // ===========================================================================
  // RENDER CHÍNH
  // ===========================================================================

  if (!skill) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Text style={styles.errorText}>Không tìm thấy thông tin kỹ năng</Text>
        <TouchableOpacity style={styles.backButtonLarge} onPress={handleBack}>
          <Text style={styles.backButtonText}>Quay lại</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {renderHeader()}

        <View style={styles.content}>
          {renderStats()}
          {renderPerformance()}
          {skill.featuredProjects && renderProjects()}
          {skill.learningGoals && renderLearningGoals()}
          {skill.relatedTech && renderRelatedTech()}
        </View>

        {renderActionButtons()}
      </ScrollView>
    </SafeAreaView>
  );
};

// Export component với screen transition
export const SkillDetailScreen = withScreenTransition(SkillDetailComponent, 'slideLeft');

// =============================================================================
// STYLES
// =============================================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },

  scrollContent: {
    paddingBottom: 100,
  },

  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    padding: 20,
  },

  errorText: {
    fontSize: 18,
    color: '#FF6B6B',
    marginBottom: 20,
    textAlign: 'center',
  },

  backButtonLarge: {
    backgroundColor: '#667eea',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },

  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },

  header: {
    backgroundColor: '#667eea',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingHorizontal: 20,
    paddingBottom: 25,
    paddingTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },

  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },

  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  backButtonIcon: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

  headerActions: {
    flexDirection: 'row',
    gap: 10,
  },

  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  actionButtonIcon: {
    fontSize: 20,
    color: '#FFFFFF',
  },

  skillHeaderContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },

  skillIconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },

  skillIcon: {
    fontSize: 36,
  },

  skillTitleContainer: {
    flex: 1,
  },

  skillName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },

  skillTagline: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.85)',
    fontWeight: '500',
  },

  levelContainer: {
    alignItems: 'center',
  },

  levelBadge: {
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 15,
    marginBottom: 5,
  },

  levelText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },

  levelSubtext: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.8)',
  },

  progressHeader: {
    marginTop: 10,
  },

  xpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },

  xpLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },

  xpValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },

  progressBarContainer: {
    marginBottom: 10,
  },

  progressBarBackground: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 4,
    overflow: 'hidden',
  },

  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },

  progressPercentage: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginTop: 5,
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 15,
  },

  cardContent: {
    padding: 20,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 15,
  },

  statsGrid: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%', // ← Đảm bảo chiếm toàn bộ chiều rộng
  },

  statItem: {
    flex: 1,
    alignItems: 'center',
  },

  statValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },

  statLabel: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
  },

  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#F0F0F0',
  },

  performanceGrid: {
    gap: 15,
    width: '100%',
    alignSelf: 'stretch',
  },

  performanceItem: {
    marginBottom: 5,
    width: '100%',
  },

  performanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    width: '100%',
  },

  performanceLabel: {
    fontSize: 14,
    color: '#333333',
    fontWeight: '500',
  },

  performanceValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
  },

  performanceBarBackground: {
    height: 6,
    backgroundColor: '#F0F0F0',
    borderRadius: 3,
    overflow: 'hidden',
  },

  performanceBarFill: {
    height: '100%',
    borderRadius: 3,
  },

  projectItem: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },

  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },

  projectName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    flex: 1,
  },

  projectRoleBadge: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 10,
  },

  projectRole: {
    fontSize: 11,
    color: '#1976D2',
    fontWeight: '600',
  },

  projectDescription: {
    fontSize: 13,
    color: '#666666',
    lineHeight: 18,
    marginBottom: 12,
  },

  techStack: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },

  techTag: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },

  techText: {
    fontSize: 11,
    color: '#666666',
    fontWeight: '500',
  },

  learningGoal: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
  },

  goalCheckbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },

  goalCheckIcon: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: 'bold',
  },

  goalText: {
    fontSize: 14,
    color: '#333333',
    lineHeight: 20,
    flex: 1,
  },

  addGoalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderStyle: 'dashed',
    marginTop: 5,
  },

  addGoalIcon: {
    fontSize: 18,
    color: '#667eea',
    marginRight: 8,
  },

  addGoalText: {
    fontSize: 14,
    color: '#667eea',
    fontWeight: '600',
  },

  relatedTechCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },

  relatedTechTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 15,
  },

  techList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },

  techButton: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },

  techButtonText: {
    fontSize: 13,
    color: '#333333',
    fontWeight: '500',
  },

  actionButtonsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginTop: 20,
    marginBottom: 30,
  },

  actionButtonLarge: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },

  practiceButton: {
    backgroundColor: '#4CAF50',
  },

  xpButton: {
    backgroundColor: '#FF9800',
  },

  actionButtonIconLarge: {
    fontSize: 24,
    marginRight: 8,
  },

  actionButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});