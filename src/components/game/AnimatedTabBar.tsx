// src/components/game/AnimatedTabBar.js
import React from 'react';
import { View, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { Text } from '../ui/StyledText';
import {
  CodeIcon,
  ContactIcon,
  FolderIcon,
  TimelineIcon,
  TrophyIcon
} from '../icons';

interface AnimatedTabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
}

const AnimatedTabBar: React.FC<AnimatedTabBarProps> = ({
  state,
  descriptors,
  navigation
}) => {
  const animationValues = state.routes.map(() => new Animated.Value(0));

  const getIcon = (routeName: any, color: any, size: any) => {
    const iconProps = { size, color };
    switch (routeName) {
      case 'Skills':
        return <FolderIcon {...iconProps} />;
      case 'Projects':
        return <CodeIcon {...iconProps} />;
      case 'Experience':
        return <TimelineIcon {...iconProps} />;
      case 'Achievements':
        return <TrophyIcon {...iconProps} />;
      case 'Contact':
        return <ContactIcon {...iconProps} />;
      default:
        return <FolderIcon {...iconProps} />;
    }
  };

  const handlePress = (route: any, index: any, isFocused: any) => {
    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      // Animation khi chọn tab
      Animated.sequence([
        Animated.timing(animationValues[index], {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(animationValues[index], {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();

      navigation.navigate(route.name);
    }
  };

  return (
    <View style={styles.tabBar}>
      {state.routes.map((route: any, index: any) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const scale = animationValues[index].interpolate({
          inputRange: [0, 1],
          outputRange: [1, 0.8],
        });

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={() => handlePress(route, index, isFocused)}
            style={styles.tabItem}
          >
            <Animated.View style={[
              styles.iconContainer,
              {
                transform: [{ scale }],
                backgroundColor: isFocused ? 'rgba(88, 204, 2, 0.1)' : 'transparent'
              }
            ]}>
              {getIcon(route.name, isFocused ? '#58cc02' : '#999999', 24)}
            </Animated.View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    height: 70,
    paddingBottom: 8,
    paddingTop: 8,
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  activeIndicator: {
    position: 'absolute',
    top: 2,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#58cc02',
  },
});

export default AnimatedTabBar;