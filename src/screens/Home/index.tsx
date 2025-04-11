import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Alert,
  ScrollView,
  Dimensions,
  Text,
  FlatList,
} from "react-native";
import Header from "./Header";
import axios from "axios";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Card {
  id: number;
  client_id: number;
  placeholder: string;
  number: string;
  cvv: string;
  expiration_date: string;
  limit: string;
}

enum TransactionType {
  ENTRADA = "entrada",
  SAIDA = "saida",
}

interface Transaction {
  data: string;
  items: {
    id: number;
    data: string;
    tipo: TransactionType;
    descricao: string;
    valor: string;
  }[];
}

const Home = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  //   const getCards = async () => {
  //     try {
  //         const response = await axios.get("http://192.168.0.37:3000/cartoes")
  //         setCards(response.data)
  //     } catch (error) {

  //     }
  //   }

  async function getCards() {
    const token = await AsyncStorage.getItem("@token");

    axios
      .get("http://192.168.0.37:3000/creditCards", {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      .then((response) => {
        setCards(response.data);
      })
      .catch(() => Alert.alert("Erro ao pegar os cartões"));
  }

  useEffect(() => {
    getCards();
  }, []);

  useEffect(() => {
    axios
      .get("http://192.168.0.37:3000/transacoes")
      .then((response) => {
        setTransactions(response.data);
      })
      .catch(() => Alert.alert("Erro ao pegar as transações"));
  }, []);

  return (
    <View style={styles.container}>
      <Header />

      <Text style={styles.myCards}>Meus cartões</Text>
      <View style={{ height: 220 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {cards.map((item) => (
            <View key={item.number} style={styles.creditCard}>
              <View>
                <Text style={styles.numberCard}>{item.number}</Text>
                <Text style={styles.nameCard}>{item.placeholder}</Text>

                <View style={styles.footerCard}>
                  <Text style={styles.expirationDateCard}>
                    Valid. {item.expiration_date}
                  </Text>
                  <Text style={styles.expirationDateCard}>Cvv: {item.cvv}</Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      <Text style={styles.myCards}>Minhas transações</Text>

      <FlatList
        data={transactions}
        keyExtractor={(item) => item.data}
        renderItem={({ item }) => (
          <View>
            <Text style={styles.dateItem}>{item.data}</Text>

            {item.items.map((transactionItem) => (
              <View key={transactionItem.id} style={styles.transactionItem}>
                <View style={styles.leftContentTransactionItem}>
                  {transactionItem.tipo === TransactionType.ENTRADA ? (
                    <Icon name="plus-circle" size={30} color="#26d826" />
                  ) : (
                    <Icon name="minus-circle" size={30} color="#d82926" />
                  )}

                  <Text style={styles.descriptionTransactionItem}>
                    {transactionItem.descricao}
                  </Text>
                </View>
                <Text style={styles.valueTransactionItem}>
                  R$ {transactionItem.valor}
                </Text>
              </View>
            ))}
          </View>
        )}
      />
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
    width: Dimensions.get("window").width - 40,
    height: 200,
    borderRadius: 8,
    backgroundColor: "#150230",
    justifyContent: "flex-end",
    marginLeft: 20,
  },
  numberCard: {
    fontSize: 22,
    color: "#FFF",
    fontWeight: "bold",
    margin: 20,
    marginVertical: 5,
  },
  myCards: {
    fontSize: 22,
    color: "#000",
    fontWeight: "bold",
    marginTop: 10,
  },
  nameCard: {
    fontSize: 22,
    color: "#FFF",
    fontWeight: "bold",
    margin: 20,
    marginVertical: 5,
  },
  expirationDateCard: {
    fontSize: 18,
    color: "#FFF",
  },
  footerCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 20,
  },
  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#150230",
    height: 54,
    borderRadius: 8,
    padding: 5,
    marginBottom: 20,
  },
  leftContentTransactionItem: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  descriptionTransactionItem: {
    fontSize: 18,
    color: "#FFF",
  },
  valueTransactionItem: {
    fontSize: 20,
    color: "#FFF",
  },
  dateItem: {
    fontSize: 22,
    color: "#000",
    marginVertical: 20,
  },
});

export default Home;
