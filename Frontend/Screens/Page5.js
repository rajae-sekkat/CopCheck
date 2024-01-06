import React, { useState } from "react";
import { View, Image, TouchableOpacity, Text, StyleSheet } from "react-native";

const Page5 = ({ route }) => {
  const [searchResult, setSearchResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      const formData = new FormData();
      formData.append("image", {
        uri: route.params.photo,
        type: "image/jpg",
        name: "photo.jpg",
      });

      const response = await fetch("http://192.168.180.126:5000/person", {
        method: "POST",
        body: formData,
      });

      console.log("Server Response Status:", response.status);

      const responseData = await response.json();

      if ("error" in responseData) {
        setError(responseData.error);
        setSearchResult(null);
      } else if ("message" in responseData) {
        setError(responseData.message);
        setSearchResult(null);
      } else {
        setSearchResult(responseData);
        setError(null);
      }
    } catch (error) {
      console.error("Error:", error.message);
      setError("Erreur de connexion");
      setSearchResult(null);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: route.params.photo }} style={styles.photoPreview} />

      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Text style={styles.buttonText}>Rechercher</Text>
      </TouchableOpacity>

      {error && <Text style={styles.errorText}>{error}</Text>}

      {searchResult && (
        <View style={styles.resultContainer}>
          {/* Display the fetched information here */}
          <View style={styles.inlineContainer}>
            <Text style={styles.boldText}>ID:</Text>
            <Text>{searchResult.ID}</Text>
          </View>
          <View style={styles.inlineContainer}>
            <Text style={styles.boldText}>Name:</Text>
            <Text>{searchResult.Name}</Text>
          </View>
          <View style={styles.inlineContainer}>
            <Text style={styles.boldText}>Address:</Text>
            <Text>{searchResult.Address}</Text>
          </View>
          <View style={styles.inlineContainer}>
            <Text style={styles.boldText}>Profession:</Text>
            <Text>{searchResult.Profession}</Text>
          </View>
          <View style={styles.inlineContainer}>
            <Text style={styles.boldText}>Identity Card:</Text>
            <Text>{searchResult.Identity}</Text>
          </View>
          <View style={styles.inlineContainer}>
            <Text style={styles.boldText}>City:</Text>
            <Text>{searchResult.City}</Text>
          </View>
          <View style={styles.inlineContainer}>
            <Text style={styles.boldText}>Age:</Text>
            <Text>{searchResult.Age}</Text>
          </View>
          <View style={styles.inlineContainer}>
            <Text style={styles.boldText}>Description:</Text>
            <Text>{searchResult.Description}</Text>
          </View>
          {/* You can also display the image if it's available */}
          <Image
            source={{ uri: searchResult.Image }}
            style={styles.resultImage}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  photoPreview: {
    width: 200,
    height: 200,
    resizeMode: "cover",
    marginBottom: 20,
  },
  button: {
    width: "40%",
    padding: 10,
    marginVertical: 10,
    backgroundColor: "#5DACBD",
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#5E6774",
    fontWeight: "bold",
    fontSize: 17,
  },
  resultContainer: {
    marginTop: 20,
  },
  inlineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5, // Optional: Adds some space between each label-value pair
  },
  boldText: {
    fontWeight: 'bold',
    marginRight: 5, // Optional: Adds some space between the bold label and the value
  },
  resultImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginVertical: 10,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});

export default Page5;
