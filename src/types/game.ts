export interface GameState {
  level: number;
  exp: number;
  expToNextLevel: number;
  unlockedAchievements: string[];
  completedProjects: string[];
  discoveredSkills: string[];
  experienceViewed: number;
  totalExp: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  expReward: number;
  icon: string;
  unlocked: boolean;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  expReward: number;
  completed: boolean;
}