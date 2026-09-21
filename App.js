import 'react-native-reanimated'; 
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Notifications from 'expo-notifications';

import HomeScreen from './screens/HomeScreen';
import CameraScreen from './screens/CameraScreen';
import { registerForPush, scheduleDailyReminder } from './components/Notifications';

const Stack = createNativeStackNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  useEffect(() => {
    (async () => {
      const ok = await registerForPush();
      if (ok) {
        await scheduleDailyReminder();
      }
    })();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Books" }} />
        <Stack.Screen name="Camera" component={CameraScreen} options={{ title: "Tilføj bog" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

