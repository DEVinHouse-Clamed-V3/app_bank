import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import api from "../../services/api";

const Header = () => {
  // Valor de saldo do usuário

  const [name, setName] = useState("");
  const [balance, setBalance] = useState(0);

  const [showBalance, setShowBalance] = useState(false);

  async function getName() {
    const currentName = (await AsyncStorage.getItem("@name")) || "";
    const firstName = currentName?.split(" ")[0];
    setName(firstName);
  }

  useEffect(() => {
    getName();
  }, []);

  async function getBalance() {
   
    api
      .get("/clients/balance")
      .then((response) => {
        setBalance(response.data.balance);
      })
      .catch(() => Alert.alert("Erro", "Erro ao buscar saldo"));
  }

  useFocusEffect(() => {
    getBalance();
  });

  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.totalMoney}>{showBalance ? balance : "***"}</Text>
        <Text style={styles.yourMoneyText}>Seu saldo</Text>
        <TouchableOpacity
          onPress={() => setShowBalance(!showBalance)}
          testID="button-show-balance"
        >
          <Text style={styles.toggleText}>
            {showBalance ? "Ocultar" : "Mostrar"}
          </Text>
        </TouchableOpacity>
      </View>

      <View>
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/3686/3686930.png",
            width: 50,
            height: 50,
          }}
          style={{ borderRadius: 30, alignSelf: "center" }}
          testID="photo-user"
        />
        <Text style={styles.userName}>{name}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userName: {
    fontSize: 20,
    color: "#150230",
    fontWeight: "bold",
  },
  totalMoney: {
    fontSize: 28,
    color: "#150230",
    fontWeight: "bold",
  },
  yourMoneyText: {
    fontSize: 16,
    color: "#150230",
  },
  toggleText: {
    fontSize: 16,
    color: "#150230",
    fontWeight: "bold",
    marginTop: 5,
  },
});

export default Header;
