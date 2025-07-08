import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, FlatList, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

export default function ImagePickerComponent(props) {
  const [image, setImage] = useState([]);
  const [uploadDisabled, setUploadDisabled] = useState(false);

  const pickImage = async () => {
    if (image.length >= 5) return;

    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert('Permission to access media library is required!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage([result.assets[0].uri, ...image]);
    }
  };

  const uploadImages = async (uri) => {
    const apiUrl = 'http://localhost:3000/upload';

    try {
      const response = await axios.post(apiUrl, { uri });
      return response.data; // should be the image URL
    } catch (error) {
      console.log('Upload failed:', error);
      return null;
    }
  };

  const handleUpload = async () => {
    setUploadDisabled(true);
    const urls = [];

    for (const uri of image) {
      const url = await uploadImages(uri);
      if (url) urls.push(url);
    }

    props.setUrls(urls); // update parent with all URLs
    props.setReady(true);
  };

  return (
    <View style={{ width: '100%' }}>
      <Text style={{ margin: 20 }}>Upload A Picture</Text>
      <Button
        style={{ marginBottom: 20 }}
        onPress={pickImage}
        title="Upload up to 5 images"
        disabled={image.length === 5}
      />
      <View style={{ height: 120, marginTop: 10 }}>
        <FlatList
          data={image}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Image
              source={{ uri: item }}
              style={{ width: 100, height: 100, marginHorizontal: 5, borderRadius: 8 }}
              resizeMode="cover"
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <Button
        title="Upload"
        disabled={image.length === 0 || uploadDisabled}
        onPress={handleUpload}
      />
    </View>
  );
}


const styles = StyleSheet.create({});
