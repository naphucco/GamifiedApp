import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, ScrollView, Dimensions, Animated, TouchableOpacity } from 'react-native';
import { gameState } from '../game/GameState';
import { Text } from '../components/ui/StyledText';
import { withScreenTransition } from '../components/game/ScreenTransition';
import { CustomCard } from '../components/ui/CustomCard';

const { width: screenWidth } = Dimensions.get('window');
const CARD_MARGIN = 12;
const CARD_WIDTH = (screenWidth - 40 - CARD_MARGIN) / 2; // Tính toán chiều rộng card dựa trên màn hình

// =============================================================================
// DỮ LIỆU SKILLS VÀ CATEGORIES
// =============================================================================

/**
 * Danh mục kỹ năng với màu sắc và icon đại diện
 * Mỗi category có màu chủ đạo riêng để dễ phân biệt
 */
const skillCategories = {
  mobile: { name: '📱 Mobile', color: '#8A2BE2' },
  language: { name: '💬 Languages', color: '#FF6B6B' },
  backend: { name: '⚙️ Backend', color: '#4ECDC4' },
  frontend: { name: '🎨 Frontend', color: '#45B7D1' },
  design: { name: '✨ Design', color: '#FFBE0B' },
  cloud: { name: '☁️ Cloud', color: '#96CEB4' },
  database: { name: '💾 Database', color: '#FF8E53' },
};

/**
 * Danh sách kỹ năng với đầy đủ thông tin:
 * - id: định danh duy nhất
 * - name: tên kỹ năng
 * - level: cấp độ từ 1-5
 * - category: thuộc danh mục nào
 * - description: mô tả ngắn
 * - xp: kinh nghiệm hiện tại
 * - nextLevelXp: XP cần để lên level tiếp theo
 */
const skills = [
  {
    id: 'react_native',
    name: 'React Native',
    level: 5,
    category: 'mobile',
    description: 'Xây dựng ứng dụng mobile đa nền tảng',
    xp: 1250,
    nextLevelXp: 1500
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    level: 5,
    category: 'language',
    description: 'JavaScript với type system',
    xp: 1100,
    nextLevelXp: 1500
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    level: 4,
    category: 'backend',
    description: 'JavaScript runtime environment',
    xp: 800,
    nextLevelXp: 1000
  },
  {
    id: 'ui_ux',
    name: 'UI/UX Design',
    level: 4,
    category: 'design',
    description: 'Thiết kế trải nghiệm người dùng',
    xp: 750,
    nextLevelXp: 1000
  },
  {
    id: 'aws',
    name: 'AWS',
    level: 3,
    category: 'cloud',
    description: 'Dịch vụ điện toán đám mây',
    xp: 450,
    nextLevelXp: 750
  },
  {
    id: 'python',
    name: 'Python',
    level: 3,
    category: 'language',
    description: 'Ngôn ngữ lập trình đa năng',
    xp: 400,
    nextLevelXp: 750
  },
  {
    id: 'react',
    name: 'React',
    level: 4,
    category: 'frontend',
    description: 'Thư viện JavaScript cho web',
    xp: 900,
    nextLevelXp: 1000
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    level: 3,
    category: 'database',
    description: 'Cơ sở dữ liệu NoSQL',
    xp: 350,
    nextLevelXp: 750
  },
  {
    id: 'docker',
    name: 'Docker',
    level: 2,
    category: 'cloud',
    description: 'Containerization platform',
    xp: 200,
    nextLevelXp: 500
  },
  {
    id: 'graphql',
    name: 'GraphQL',
    level: 3,
    category: 'backend',
    description: 'Query language cho APIs',
    xp: 300,
    nextLevelXp: 750
  },
];

// =============================================================================
// COMPONENT CHÍNH - SKILL TREE
// =============================================================================

/**
 * Component chính hiển thị cây kỹ năng
 * Cho phép lọc theo category và xem chi tiết từng kỹ năng
 */
const SkillTreeComponent = () => {
  // ===========================================================================
  // STATE VÀ REF
  // ===========================================================================

  const navigation = useNavigation<any>();

  /** State lưu category đang được chọn để filter */
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  /** Ref cho animation fade in/out */
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // ===========================================================================
  // TÍNH TOÁN DỮ LIỆU
  // ===========================================================================

  /** Tổng số kỹ năng */
  const totalSkills = skills.length;

  /** Tổng level của tất cả kỹ năng */
  const totalLevels = skills.reduce((sum, skill) => sum + skill.level, 0);

  /** Lọc skills theo category đã chọn */
  const filteredSkills = skills.filter(skill => {
    return !selectedCategory || skill.category === selectedCategory;
  });

  // ===========================================================================
  // EFFECTS VÀ LIFECYCLE
  // ===========================================================================

  /** Theo dõi khi component mount và trigger animation */
  useEffect(() => {
    // Track analytics khi màn hình được xem
    gameState.trackExperienceView();

    // Animation fade in khi màn hình load
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  /** Animation khi category filter thay đổi */
  useEffect(() => {
    // Tạo hiệu ứng fade out -> fade in khi filter thay đổi
    Animated.timing(fadeAnim, {
      toValue: 0.5,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  }, [selectedCategory]);

  // ===========================================================================
  // HANDLERS
  // ===========================================================================

  /**
   * Xử lý khi người dùng nhấn vào một skill card
   * @param skillId - ID của kỹ năng được chọn
   */
  const handleSkillView = (skillId: string) => {
    // Track analytics cho sự kiện xem kỹ năng
    gameState.trackSkillView(skillId);
    navigation.navigate('SkillDetail', { skillId });
  };

  // ===========================================================================
  // RENDER FUNCTIONS
  // ===========================================================================

  /**
   * Render một skill card
   * @param skill - Dữ liệu kỹ năng
   * @returns JSX element của card
   */
  const renderSkillCard = (skill: typeof skills[0]) => {
    const categoryInfo = skillCategories[skill.category as keyof typeof skillCategories];
    const progressPercentage = (skill.xp / skill.nextLevelXp) * 100;

    /**
     * Lấy màu sắc dựa trên level
     * Level 1: Đỏ -> Level 5: Xanh lá
     */
    const getLevelColor = (level: number) => {
      const colors = ['#FF6B6B', '#FFA726', '#FFCA28', '#66BB6A', '#4CAF50'];
      return colors[level - 1] || colors[0];
    };

    return (
      <View key={skill.id} style={styles.skillCard}>
        <CustomCard
          backgroundColor="#ffffff"
          borderColor={categoryInfo.color + '20'} // Màu border với opacity 20%
          shadowColor={categoryInfo.color + '40'} // Màu shadow với opacity 40%
          borderRadius={16}
          translateY={6} // Độ nổi của card khi hover
          onPress={() => handleSkillView(skill.id)}
        >
          <View style={styles.skillCardContent}>
            {/* Header với tên skill và level badge */}
            <View style={styles.skillHeader}>
              <View style={styles.skillTitleContainer}>
                <Text style={styles.skillName} numberOfLines={1}>
                  {skill.name}
                </Text>
                {/* Badge hiển thị level với màu tương ứng */}
                <View style={[styles.levelBadge, { backgroundColor: getLevelColor(skill.level) }]}>
                  <Text style={styles.levelBadgeText}>Lv.{skill.level}</Text>
                </View>
              </View>
            </View>

            {/* Mô tả ngắn về kỹ năng */}
            <Text
              style={[
                styles.skillDescription,
                styles.fixedHeightText // Style riêng cho chiều cao cố định
              ]}
              numberOfLines={2}
            >
              {skill.description}
            </Text>

            {/* Progress bar hiển thị tiến trình XP */}
            <View style={styles.progressContainer}>
              <View style={styles.xpInfo}>
                <Text style={styles.xpText}>{skill.xp} XP</Text>
                <Text style={styles.xpText}>{skill.nextLevelXp} XP</Text>
              </View>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${progressPercentage}%`,
                      backgroundColor: categoryInfo.color // Màu progress theo category
                    }
                  ]}
                />
              </View>
            </View>

            {/* Tag hiển thị category */}
            <View style={[styles.categoryTag, { backgroundColor: categoryInfo.color + '20' }]}>
              <Text style={[styles.categoryText, { color: categoryInfo.color }]}>
                {categoryInfo.name.split(' ')[0]} {/* Chỉ lấy từ đầu tiên của category name */}
              </Text>
            </View>

            {/* Hint cho người dùng */}
            <View style={styles.hintContainer}>
              <Text style={styles.viewHint}>👆 Nhấn để khám phá</Text>
            </View>
          </View>
        </CustomCard>
      </View>
    );
  };

  /**
   * Render bộ lọc category
   * @returns JSX element của filter bar
   */
  const renderCategoryFilter = () => {
    // Đếm số lượng skill trong mỗi category
    const categoryCounts = skills.reduce((acc, skill) => {
      acc[skill.category] = (acc[skill.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return (
      <View style={styles.categoryFilterContainer}>
        {/* Horizontal scroll cho các category button */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryFilterContent}
        >
          {/* Button "Tất cả" - Reset filter */}
          <TouchableOpacity
            style={[
              styles.categoryButton,
              !selectedCategory && styles.categoryButtonActive,
              !selectedCategory && { backgroundColor: '#4CAF50' }
            ]}
            onPress={() => setSelectedCategory(null)}
          >
            <Text style={[
              styles.categoryButtonText,
              !selectedCategory && styles.categoryButtonTextActive
            ]}>
              🌟 Tất cả
            </Text>
          </TouchableOpacity>

          {/* Các category button */}
          {Object.entries(skillCategories).map(([key, category]) => {
            const skillCount = categoryCounts[key] || 0;
            const isActive = selectedCategory === key;

            return (
              <TouchableOpacity
                key={key}
                style={[
                  styles.categoryButton,
                  isActive && styles.categoryButtonActive,
                  isActive && { backgroundColor: category.color }
                ]}
                onPress={() => setSelectedCategory(isActive ? null : key)}
              >
                <Text style={[
                  styles.categoryButtonText,
                  isActive && styles.categoryButtonTextActive
                ]}>
                  {category.name}
                </Text>
                {/* Hiển thị số lượng skill khi không active */}
                {!isActive && (
                  <View style={styles.categoryCount}>
                    <Text style={styles.categoryCountText}>{skillCount}</Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Badge hiển thị số lượng skill đang hiển thị / tổng số */}
        <View style={styles.skillCountBadge}>
          <Text style={styles.skillCountText}>
            {filteredSkills.length}/{totalSkills}
          </Text>
        </View>
      </View>
    );
  };

  // ===========================================================================
  // RENDER CHÍNH
  // ===========================================================================

  return (
    <View style={styles.container}>
      {/* Header với tiêu đề và level tổng */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.title}>🎯 Cây Kỹ Năng</Text>
          <Text style={styles.totalLevelText}>Lv.{Math.floor(totalLevels / 3)}</Text>
        </View>
      </View>

      {/* Bộ lọc category */}
      {renderCategoryFilter()}

      {/* Danh sách skills với scroll */}
      <View style={styles.skillsWrapper}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.skillsContent}
        >
          <View style={styles.skillsGrid}>
            {filteredSkills.map((skill, index) => (
              <Animated.View
                key={skill.id}
                style={{
                  opacity: fadeAnim,
                  transform: [{
                    translateY: fadeAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [30, 0], // Animation slide up
                    }),
                  }],
                }}
              >
                {renderSkillCard(skill)}
              </Animated.View>
            ))}
          </View>

          {/* Empty state khi không có kỹ năng nào */}
          {filteredSkills.length === 0 && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>🎯</Text>
              <Text style={styles.emptyStateTitle}>Không tìm thấy kỹ năng</Text>
              <Text style={styles.emptyStateDescription}>
                Thử thay đổi bộ lọc category
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

// Export component với screen transition animation
export const SkillTreeScreen = withScreenTransition(SkillTreeComponent, 'slideRight');

// =============================================================================
// STYLES
// =============================================================================

const styles = StyleSheet.create({
  /** Container chính */
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  /** Header với background màu xanh */
  header: {
    backgroundColor: '#667eea',
    padding: 20,
    paddingBottom: 20,
  },

  /** Layout header - tiêu đề và level tổng */
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  /** Tiêu đề chính */
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    lineHeight: 34, // Đảm bảo chữ không bị cắt
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },

  /** Text hiển thị level tổng */
  totalLevelText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
  },

  /** Container cho bộ lọc category */
  categoryFilterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#f8f9fa', // Màu nền xám nhạt
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },

  /** Content container cho horizontal scroll */
  categoryFilterContent: {
    gap: 8,
    paddingRight: 16,
  },

  /** Button cho mỗi category */
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 32, // Bo tròn hoàn toàn
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },

  /** Style khi category button được chọn */
  categoryButtonActive: {
    borderWidth: 0, // Ẩn border khi active
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3, // Shadow cho Android
  },

  /** Text cho category button */
  categoryButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666666',
  },

  /** Text khi category button active */
  categoryButtonTextActive: {
    color: '#ffffff',
    fontWeight: '700',
  },

  /** Badge hiển thị số lượng skill trong category */
  categoryCount: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 8,
    marginLeft: 4,
    minWidth: 16,
    alignItems: 'center',
  },

  /** Text trong category count badge */
  categoryCountText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#666666',
  },

  /** Badge hiển thị tổng số skill */
  skillCountBadge: {
    backgroundColor: '#6c757d',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    marginLeft: 8,
  },

  /** Text trong skill count badge */
  skillCountText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#ffffff',
  },

  /** Wrapper cho danh sách skills */
  skillsWrapper: {
    flex: 1, // Chiếm toàn bộ không gian còn lại
  },

  /** Content container cho scroll view */
  skillsContent: {
    padding: 16,
    paddingBottom: 20,
  },

  /** Grid layout cho các skill card */
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  /** Container cho mỗi skill card */
  skillCard: {
    width: CARD_WIDTH,
    marginBottom: 18, // Khoảng cách giữa các hàng card
  },

  /** Content bên trong skill card */
  skillCardContent: {
    width: '100%',
    padding: 10,
    alignItems: 'flex-start',
    minHeight: 160, // Đảm bảo chiều cao tối thiểu cho tất cả card
  },

  /** Header của skill card (tên và level) */
  skillHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 6,
  },

  /** Container cho tiêu đề skill */
  skillTitleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  /** Tên skill */
  skillName: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#333333',
    flex: 1, // Chiếm không gian còn lại
  },

  /** Badge hiển thị level */
  levelBadge: {
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 8,
    marginLeft: 4,
  },

  /** Text trong level badge */
  levelBadgeText: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#ffffff',
  },

  /** Mô tả skill */
  skillDescription: {
    fontSize: 10,
    color: '#666666',
    marginBottom: 10,
    lineHeight: 12,
  },
  fixedHeightText: {
    height: 36,
    lineHeight: 18,
    textAlignVertical: 'center', // Căn giữa theo chiều dọc
  },

  /** Container cho progress bar */
  progressContainer: {
    width: '100%',
    marginBottom: 6,
  },

  /** Thông tin XP (hiện tại và mục tiêu) */
  xpInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3,
  },

  /** Text hiển thị XP */
  xpText: {
    fontSize: 9,
    color: '#888888',
    fontWeight: '500',
  },

  /** Progress bar background */
  progressBar: {
    height: 5,
    width: '100%',
    backgroundColor: '#f0f0f0',
    borderRadius: 3,
    overflow: 'hidden',
  },

  /** Phần fill của progress bar */
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },

  /** Tag hiển thị category */
  categoryTag: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    marginBottom: 6,
    alignSelf: 'flex-start', // Chỉ chiếm không gian cần thiết
  },

  /** Text trong category tag */
  categoryText: {
    fontSize: 9,
    fontWeight: '600',
  },

  /** Container cho hint text */
  hintContainer: {
    width: '100%',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 6,
  },

  /** Hint text hướng dẫn người dùng */
  viewHint: {
    fontSize: 9,
    color: '#999999',
    fontStyle: 'italic',
  },

  /** Empty state khi không có kỹ năng */
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },

  /** Icon empty state */
  emptyStateText: {
    fontSize: 40,
    marginBottom: 12,
  },

  /** Tiêu đề empty state */
  emptyStateTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 6,
  },

  /** Mô tả empty state */
  emptyStateDescription: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
  },
});