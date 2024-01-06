// Page2.js
import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

class Page2 extends Component {
  handleLogin = () => {
    this.props.navigation.navigate("Page3");
  };

  render() {
    return (
      <View style={styles.container}>
        {/* Logo en haut à gauche */}
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/logo.png")}
            style={styles.logo}
          />
        </View>

        {/* Centre de la page */}
        <View style={styles.centerContainer}>
          {/* Texte "Welcome" */}
          <Text style={styles.welcomeText}>Welcome To copcheck</Text>

          {/* Texte de description */}
          <Text style={[styles.descriptionText, { textAlign: 'center', color: '#4B5563' }]}>
            where swift snapshots meet enhanced security, empowering law enforcement with instant, reliable identification. Elevate policing, one click at a time.
          </Text>
        </View>

        {/* Bas de la page */}
        <View style={styles.bottomContainer}>
          {/* Bouton de connexion */}
          <TouchableOpacity style={styles.loginButton} onPress={this.handleLogin}>
          <Text style={[styles.loginButtonText, { textAlign: 'center' }]}>
           Login
          </Text>
        </TouchableOpacity>

          {/* Phrase en dessous du bouton */}
          <Text style={styles.bottomText}>By logging in, you have agreed to the Terms and Conditions and Privacy Policy.</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  logoContainer: {
    alignSelf: "flex-start",
  },
  logo: {

    width: 100,
    height: 125,
    resizeMode: 'contain',
  },
  centerContainer: {
    alignItems: "center",
  },
  welcomeText: {
    color:'#5E6774',
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
   descriptionText: {
    textAlign: 'center',  // Ajout de la propriété textAlign
    color: '#4B5563',     // Ajout de la propriété color
    marginBottom: 20,
  },
  bottomContainer: {
    alignItems: "center",
  },
  loginButton: {
    backgroundColor: '#D6F0F5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 50,
    width:300,
  },
 loginButtonText: {
    color: '#4B5563',
    fontWeight: 'bold',
    textAlign: 'center',  // Ajout de la propriété textAlign
  },
  bottomText: {
    fontStyle: "italic",
    textAlign: 'center',
    marginBottom: 30,
  },
});

export default Page2;
