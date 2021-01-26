import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';
import uploadToAnonymousFilesAsync from 'anonymous-files';

import Img from './assets/snack-icon.png';

const Index = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  let openImagePicker = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('not allowed');
      return;
    }
    const image = await ImagePicker.launchImageLibraryAsync();
    if (image.cancelled === true) {
      return;
    }

    if (Platform.OS === "web") {
      const remoteUri = await uploadToAnonymousFilesAsync(image.uri);
      setSelectedImage({ localUri: image.uri, remoteUri});
    } else {
      setSelectedImage({ localUri: image.uri });
    }
  }

  const openShareDialog = async () => {
    if (!(await Sharing.isAvailableAsync())) {
      alert(`The image is avaible for sharing at ${selectedImage.remoteUri}`);
      return;
    }

    await Sharing.shareAsync(selectedImage.localUri);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pick an image</Text>
      <TouchableOpacity onPress={openImagePicker}>
        <Image
          source={{
            uri:
              selectedImage !== null
                ? selectedImage.localUri
                : 'https://picsum.photos/200/200',
          }}
          style={styles.image}
        />
      </TouchableOpacity>
      {selectedImage ? (
        <TouchableOpacity onPress={openShareDialog} style={styles.button}>
          <Text style={styles.buttonText}>Share this image</Text>
        </TouchableOpacity>
      ) : (
        <View />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,255,255,.1)',
  },
  title: {
    fontSize: 30,
    color: 'rgba(100,100,100,1)',
  },
  image: {
    width: 100,
    height: 100,
    margin: 32,
    resizeMode: 'contain',
  },
  button: {
    backgroundColor: 'gray',
    padding: 7,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
});

export default Index;
