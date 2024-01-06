import axios from 'axios';
import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';

class Page3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '', // Correction: Utiliser "password" comme nom de variable
    };
  }

  handleLogin = async () => {
    const { username, password } = this.state; // Correction: Utiliser "password" comme nom de variable
  
    try {
      const response = await axios.post('http://192.168.180.126:9000/login', {
        username,
        password,
      });
  
      if (response.data.success) {
        // Login successful, navigate to the next page
        this.props.navigation.navigate('Page4');
      } else {
        // Login failed, show an error message
        alert('Login incorrect');
      }
    } catch (error) {
      console.error('Error during login:', error);
    
      // Affichez un message d'erreur plus informatif
      alert(`An error occurred: ${error.message}`);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        {/* Logo en haut à gauche */}
        <View style={styles.logoContainer}>
          <Image source={require('../assets/logo.png')} style={styles.logo} />
        </View>

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Login</Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Nom d'utilisateur"
              value={this.state.username}
              onChangeText={(text) => this.setState({ username: text })}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Code confidentiel"
              secureTextEntry={true}
              value={this.state.password}
              onChangeText={(text) => this.setState({ password: text })}
            />
          </View>

          <TouchableOpacity style={styles.loginButton} onPress={this.handleLogin}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Couleur d'arrière-plan semi-transparente
  },
  logoContainer: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 1, // Assurez-vous que le logo est au-dessus du reste du contenu
  },
 logo: {

    width: 100,
    height: 125,
    resizeMode: 'contain',
  },
  loginContainer: {
    backgroundColor: "white",
    padding: 15,
    width: "80%", // Ajustez la largeur en fonction de vos besoins
    borderRadius: 10,
  },
  loginText: {
    color: "#4B5563",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  loginButton: {
    backgroundColor: "#5DACBD",
    padding: 10,
    borderRadius: 5,
  },
  loginButtonText: {
    color: "#5E6774",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Page3;
