import { GameState } from '../types/game';

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  expReward: number;
  unlocked: boolean;
  condition: (gameState: GameState) => boolean;
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_project',
    name: 'Project Explorer',
    description: 'Xem dự án đầu tiên',
    icon: '🚀',
    expReward: 50,
    unlocked: false,
    condition: (gameState) => gameState.completedProjects.length >= 1
  },
  {
    id: 'project_master',
    name: 'Project Master', 
    description: 'Xem tất cả dự án',
    icon: '📂',
    expReward: 100,
    unlocked: false,
    condition: (gameState) => gameState.completedProjects.length >= 3
  },
  {
    id: 'skill_explorer',
    name: 'Skill Explorer',
    description: 'Khám phá Skill Tree',
    icon: '🎯',
    expReward: 75,
    unlocked: false,
    condition: (gameState) => gameState.discoveredSkills.length >= 5
  },
  {
    id: 'career_historian',
    name: 'Career Historian',
    description: 'Xem toàn bộ kinh nghiệm làm việc',
    icon: '📜',
    expReward: 80,
    unlocked: false,
    condition: (gameState) => gameState.experienceViewed >= 4
  },
  {
    id: 'level_5',
    name: 'Rising Star',
    description: 'Đạt Level 5',
    icon: '⭐',
    expReward: 150,
    unlocked: false,
    condition: (gameState) => gameState.level >= 5
  },
  {
    id: 'level_10', 
    name: 'Code Wizard',
    description: 'Đạt Level 10',
    icon: '⚡',
    expReward: 200,
    unlocked: false,
    condition: (gameState) => gameState.level >= 10
  },
  {
    id: 'exp_master',
    name: 'EXP Master',
    description: 'Kiếm được 500 EXP',
    icon: '💎',
    expReward: 100,
    unlocked: false,
    condition: (gameState) => gameState.totalExp >= 500
  },
  {
    id: 'portfolio_complete',
    name: 'Portfolio Master',
    description: 'Hoàn thành tất cả achievements',
    icon: '🏆',
    expReward: 300,
    unlocked: false,
    condition: (gameState) => {
      const unlockedCount = ACHIEVEMENTS.filter(a => a.unlocked).length;
      return unlockedCount >= ACHIEVEMENTS.length - 1; // -1 vì achievement này
    }
  }
];