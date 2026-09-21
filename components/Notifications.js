import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// Spørg om tilladelse
export async function registerForPush() {
  if (!Device.isDevice) return null;

  const { status: existing } = await Notifications.getPermissionsAsync();
  let finalStatus = existing;
  if (existing !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== 'granted') return null;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.DEFAULT,
    });
  }
  return true;
}

// Planlæg en daglig notifikation kl 21:00
export async function scheduleDailyReminder() {
  await Notifications.cancelAllScheduledNotificationsAsync(); // rydder gamle
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Books",
      body: "Tid til at læse lidt i din bog!",
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour: 19,
      minute: 0,
    },
  });
}
