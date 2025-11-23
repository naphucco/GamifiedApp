import { GameState } from '../types/game';
import { ACHIEVEMENTS } from './achievements';

class PortfolioGameState {
  private state: GameState = {
    level: 1,
    exp: 0,
    expToNextLevel: 100,
    unlockedAchievements: [],
    completedProjects: [],
    discoveredSkills: [],
    experienceViewed: 0,
    totalExp: 0,
  };

  private listeners: ((state: GameState) => void)[] = [];

  addExp(amount: number) {
    this.state.exp += amount;
    this.state.totalExp += amount;

    if (this.state.exp >= this.state.expToNextLevel) {
      this.state.level++;
      this.state.exp = 0;
      this.state.expToNextLevel = Math.floor(this.state.expToNextLevel * 1.5);
    }

    this.notifyListeners(); // ← THÔNG BÁO CHO LISTENERS
  }

  getState(): GameState {
    return { ...this.state };
  }

  /**
 * KIỂM TRA VÀ MỞ KHÓA ACHIEVEMENTS TỰ ĐỘNG
 * 
 * Method này được gọi mỗi khi user thực hiện action (xem project, skill, etc.)
 * Sẽ tự động check tất cả achievements chưa unlock và mở khóa nếu điều kiện thỏa mãn
 * 
 * Flow:
 * 1. Duyệt qua tất cả achievements trong hệ thống
 * 2. Với mỗi achievement chưa unlock, kiểm tra điều kiện
 * 3. Nếu condition trả về true → unlock achievement
 * 4. Thêm EXP thưởng và thông báo
 * 5. Cập nhật UI thông qua notifyListeners()
 * 
 * Ví dụ: 
 * - User xem project đầu tiên → unlock "Project Explorer"
 * - User đạt level 5 → unlock "Rising Star" 
 * - User xem 5 skills → unlock "Skill Explorer"
 */
  checkAchievements() {
    // Duyệt qua tất cả achievements trong hệ thống
    ACHIEVEMENTS.forEach(achievement => {
      // Chỉ xử lý achievements chưa được mở khóa
      if (!achievement.unlocked && achievement.condition(this.state)) {
        // 🎉 MỞ KHÓA ACHIEVEMENT
        achievement.unlocked = true;

        // Thêm achievement ID vào danh sách đã unlock
        this.state.unlockedAchievements.push(achievement.id);

        // 🎁 THƯỞNG EXP CHO USER
        this.addExp(achievement.expReward);

        // 📝 LOG ĐỂ DEBUG (có thể thay bằng popup trong tương lai)
        console.log(`🎉 Achievement unlocked: ${achievement.name} (+${achievement.expReward} EXP)`);
      }
    });

    // 🔄 THÔNG BÁO CHO TẤT CẢ COMPONENTS ĐANG LẮNG NGHE
    // Để cập nhật UI (AchievementsScreen, HomeScreen, etc.)
    this.notifyListeners();
  }

  // METHOD MỚI: Track user actions
  trackProjectView(projectId: string) {
    if (!this.state.completedProjects.includes(projectId)) {
      this.state.completedProjects.push(projectId);
      this.checkAchievements();
    }
  }

  trackSkillView(skillId: string) {
    if (!this.state.discoveredSkills.includes(skillId)) {
      this.state.discoveredSkills.push(skillId);
      this.checkAchievements();
    }
  }

  trackExperienceView() {
    this.state.experienceViewed++;
    this.checkAchievements();
  }

  // đăng lý một listener
  subscribe(listener: (state: GameState) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener(this.getState()));
  }
}

export const gameState = new PortfolioGameState(); // ← GLOBAL INSTANCE

// Có thể dùng cách khác do data ngoài GLOBAL INSTANCE
// 1. React Context
// const GameContext = createContext();

// 2. Redux/Zustand
// const useGameStore = create(() => ({ ... }));

// 3. Local State + Prop Drilling
// <HomeScreen gameState={gameState} />