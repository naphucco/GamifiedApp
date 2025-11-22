import { GameState } from '../types/game';

class PortfolioGameState {
  private state: GameState = {
    level: 1,
    exp: 0,
    expToNextLevel: 100,
    unlockedAchievements: [],
    completedProjects: [],
    discoveredSkills: [],
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