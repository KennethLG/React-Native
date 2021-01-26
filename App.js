import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import xd from "./assets/snack-icon.png";

const App = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>React Native is cool</Text>
      <Image 
      source={xd}
      style={styles.image}
      />
      <TouchableOpacity
        onPress={()=> Alert.alert("Hi")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>XD</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "rgba(0,255,255,.1)"
  },
  title : {
    fontSize: 30,
    color: "rgba(100,100,100,1)"
  },
  image: {
    width: 100,
    height: 100,
    margin: 32
  },
  button: {
    backgroundColor: "gray",
    padding: 7,
    marginTop: 10
  },
  buttonText: {
    color: "white",
    fontSize: 20
  }
})

export default App;
