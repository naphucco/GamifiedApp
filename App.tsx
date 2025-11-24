import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from './src/screens/HomeScreen';
import { ExperienceDetailScreen } from './src/screens/ExperienceDetailScreen';
import { AppNavigator } from './src/components/game/AppNavigator';

const Stack = createNativeStackNavigator();

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            animation: 'fade_from_bottom'
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          {/* Thay thế các screen riêng lẻ bằng MainApp */}
          <Stack.Screen name="MainApp" component={AppNavigator} />
          {/* Giữ lại các screen cần navigation stack riêng */}
          <Stack.Screen name="ExperienceDetail" component={ExperienceDetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;