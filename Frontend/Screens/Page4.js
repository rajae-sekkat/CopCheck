import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

class Page4 extends Component {
  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      this.props.navigation.navigate('Page5', { photo: result.uri });
    }
  };

  navigateToCamera = () => {
    this.props.navigation.navigate('PageCamera');
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={this.navigateToCamera}>
          <Text style={styles.buttonText}>Take Photo</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={this.pickImage}>
          <Text style={styles.buttonText}>Choose Photo</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '80%',
    padding: 20,
    marginVertical: 10,
    backgroundColor: '#5DACBD',
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#5E6774',
    fontWeight: 'bold',
  },
});

export default Page4;