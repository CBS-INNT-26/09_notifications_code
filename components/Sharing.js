import React from 'react';
import { Image, Text, TouchableOpacity, Alert, Share } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import * as Sharing from 'expo-sharing';
import sharingStyle from '../style/sharing_style';

export default function BookCard({ item, index }) {
  const doShare = async () => {
    try {
      const isAvailable = await Sharing.isAvailableAsync();
      if (isAvailable) {
        await Sharing.shareAsync(item.uri);
        return;
      }
      await Share.share({
        message: 'Se min bog i BookBuddy',
        url: item.uri,
      });
    } catch (e) {
      Alert.alert('Kunne ikke dele', e.message);
    }
  };

  return (
    <Animated.View
      entering={FadeInUp.delay(index * 150).springify()}
      style={sharingStyle.card}
    >
      <Image source={{ uri: item.uri }} style={sharingStyle.img} />
      <Text style={sharingStyle.cardTitle}>Min bog #{item.id}</Text>

      <TouchableOpacity style={sharingStyle.shareBtn} onPress={doShare}>
        <Text style={sharingStyle.shareBtnText}>Del</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}




