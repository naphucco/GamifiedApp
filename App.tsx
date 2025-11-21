import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from './src/screens/HomeScreen';

const Stack = createNativeStackNavigator();

function App() {
  const isDarkMode = useColorScheme() === 'dark'; // trả về chế độ màu hiện tại của hệ thống

  return (
    // Đảm bảo nội dung được hiển thị trong vùng an toàn (safe area) của thiết bị, tránh bị che bởi notch, status bar, hoặc cạnh bo tròn.
    <SafeAreaProvider>  
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />      
      <NavigationContainer>                                         {/* Thành phần gốc của React Navigation, quản lý trạng thái điều hướng toàn app. */}
        {/* dạng ngăn xếp màn hình */}
        <Stack.Navigator                                            
          screenOptions={{
            headerShown: false,
            animation: 'fade_from_bottom'
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;