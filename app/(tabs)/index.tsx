// import { Image } from 'expo-image';
// import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import React, { useEffect, useState } from 'react';
import { Alert, Button, Image, StyleSheet, View } from 'react-native';
import 'react-native-gesture-handler';
import '../global.css';
// import { Button } from '@react-navigatiyon/elements';
export default function HomeScreen() {
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission required', 'Camera roll permission is needed!');
      }
      const { status: mediaStatus } = await MediaLibrary.requestPermissionsAsync();
      if (mediaStatus !== 'granted') {
        Alert.alert('Permission required', 'Media library permission is needed!');
      }
    })();
  }, []);
  const pickImage = async () => {
  try {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images', // must be plural: "images", "videos", or "all"
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      saveImage(result.assets[0].uri); // Save to gallery
    }
  } catch (error) {
    console.log(error);
  }
};
  const saveImage = async (uri:any) => {
    try {
      const asset = await MediaLibrary.createAssetAsync(uri);
      await MediaLibrary.createAlbumAsync('MyAppImages', asset, false);
      Alert.alert('Success', 'Image saved to gallery!');
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Failed to save image!');
    }
  };
  
  // const [count, setCount] =useState(0);
  // const add = ()=>{ setCount(count +1);}
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image" onPress={pickImage} />
      {image && (
        <Image source={{ uri: image }} style={{ height: 200, marginTop: 20 }} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
