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

  addExp(amount: number) {
    this.state.exp += amount;
    this.state.totalExp += amount;
    
    // Level up logic đơn giản
    if (this.state.exp >= this.state.expToNextLevel) {
      this.state.level++;
      this.state.exp = 0;
      this.state.expToNextLevel = Math.floor(this.state.expToNextLevel * 1.5);
    }
  }

  getState(): GameState {
    return { ...this.state };
  }
}

export const gameState = new PortfolioGameState();