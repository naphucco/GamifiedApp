import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SkillTreeScreen } from '../../screens/SkillTreeScreen';
import { ProjectQuestsScreen } from '../../screens/ProjectQuestsScreen';
import { ExperienceScreen } from '../../screens/ExperienceScreen';
import { AchievementsScreen } from '../../screens/AchievementsScreen';
import { ContactScreen } from '../../screens/ContactScreen';
import { CodeIcon, ContactIcon, FolderIcon, TimelineIcon, TrophyIcon } from '../icons';


const Tab = createBottomTabNavigator();

export const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#f0f0f0',
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: '#58cc02',
        tabBarInactiveTintColor: '#999999',
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Skills"
        component={SkillTreeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FolderIcon size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Projects"
        component={ProjectQuestsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <CodeIcon size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Experience"
        component={ExperienceScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <TimelineIcon size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Achievements"
        component={AchievementsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <TrophyIcon size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Contact"
        component={ContactScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <ContactIcon size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};