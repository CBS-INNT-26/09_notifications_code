import React, { useEffect, useRef, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { addBook } from '../components/Library';
import cameraStyle from '../style/camerascreen_style';

export default function CameraScreen({ navigation }) {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!permission || !permission.granted) requestPermission();
  }, [permission]);

  const takePhoto = async () => {
    if (cameraRef.current && !busy) {
      setBusy(true);
      const photo = await cameraRef.current.takePictureAsync({ quality: 0.9 });
      const saved = await addBook(photo.uri);
      navigation.goBack();
      setBusy(false);
    }
  };

  if (!permission?.granted) {
    return (
        <TouchableOpacity style={cameraStyle.shutter} onPress={requestPermission}>
        <Text style={cameraStyle.shutterIcon}>📸</Text>
        </TouchableOpacity>
    );
  }

  return (
    <View style={cameraStyle.container}>
      <CameraView style={StyleSheet.absoluteFill} ref={cameraRef} />
      <TouchableOpacity style={cameraStyle.shutter} onPress={takePhoto}>
        <Text style={{ fontSize: 32 }}></Text>
      </TouchableOpacity>
    </View>
  );
}
