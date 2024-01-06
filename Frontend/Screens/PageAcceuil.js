import React, { useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';

const PageAccueil = ({ navigation }) => {
  useEffect(() => {
    // Utilisez setTimeout pour retarder la navigation vers la page suivante
    const timeout = setTimeout(() => {
      navigation.navigate('Page2');
    }, 3000); // Temps en millisecondes (ici, 5000 ms ou 5 secondes)

    // Nettoyer le timeout si le composant est démonté avant la fin du délai
    return () => clearTimeout(timeout);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});

export default PageAccueil;
