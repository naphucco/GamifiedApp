// src/components/game/AppNavigator.js - GIẢI PHÁP ĐƠN GIẢN
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SkillTreeScreen } from '../../screens/SkillTreeScreen';
import { ProjectQuestsScreen } from '../../screens/ProjectQuestsScreen';
import { ExperienceScreen } from '../../screens/ExperienceScreen';
import { AchievementsScreen } from '../../screens/AchievementsScreen';
import { ContactScreen } from '../../screens/ContactScreen';
import AnimatedTabBar from './AnimatedTabBar';

const Tab = createBottomTabNavigator();

export const AppNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <AnimatedTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Skills" component={SkillTreeScreen} />
      <Tab.Screen name="Projects" component={ProjectQuestsScreen} />
      <Tab.Screen name="Experience" component={ExperienceScreen} />
      <Tab.Screen name="Achievements" component={AchievementsScreen} />
      <Tab.Screen name="Contact" component={ContactScreen} />
    </Tab.Navigator>
  );
};