import React, { useEffect, useState} from "react";
import { View, StyleSheet, Alert, ScrollView, Dimensions, Text } from "react-native";
import Header from "./Header";
import axios from "axios";

const Home = () => {
  const [cards, setCards] = useState([]);

//   const getCards = async () => {
//     try {
//         const response = await axios.get("http://192.168.0.37:3000/cartoes")
//         setCards(response.data)
//     } catch (error) {
        
//     }
//   }

  useEffect(() => {
    axios.get("http://192.168.0.37:3000/cartoes")
    .then((response) => {
      setCards(response.data);
    })
    .catch(() => Alert.alert("Erro ao pegar os cartões"))
  }, []);

  return (
    <View style={styles.container}>
      <Header />

      <Text>{Dimensions.get('window').width}</Text>

    <ScrollView horizontal>
      <View style={styles.creditCard}>
      </View>
      <View style={styles.creditCard}>
      </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  creditCard: {
    width: Dimensions.get('window').width - 40,
    height: 200,
    borderRadius: 8,
    backgroundColor: "#150230",
   
  }
});

export default Home;
