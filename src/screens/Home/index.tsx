import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Alert,
  ScrollView,
  Dimensions,
  Text,
  FlatList,
  Button,
} from "react-native";
import Header from "./Header";
import axios from "axios";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

import { format } from "date-fns";

import { ptBR } from "date-fns/locale";

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
  id: number;
  client_id: number;
  value: number;
  type: TransactionType;
  description: string;
  balance: number;
  created_at: string;
  updated_at: string;
}

const Home = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [movements, setMovements] = useState<Transaction[]>([]);
  const [dateFilter, setDateFilter] = useState(
    new Date()
  );
  const [openCalendar, setOpenCalendar] = useState(false);

  //   const getCards = async () => {
  //     try {
  //         const response = await axios.get("http://192.168.0.37:3000/cartoes")
  //         setCards(response.data)
  //     } catch (error) {

  //     }
  //   }

  const onChangeDateFilter = (
    _event: DateTimePickerEvent,
    selectedDate?: Date
  ) => {
    if (selectedDate) setDateFilter(selectedDate);
    setOpenCalendar(false);
  };

  async function getCards() {
    const token = await AsyncStorage.getItem("@token");

    axios
      .get("http://192.168.0.37:3000/creditCards", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCards(response.data);
      })
      .catch(() => Alert.alert("Erro ao pegar os cartões"));
  }

  useEffect(() => {
    getCards();
  }, []);

  async function getMovements() {
    const token = await AsyncStorage.getItem("@token");

    const dateParams = format(dateFilter, "yyyy-MM-dd");

    axios
      .get("http://192.168.0.37:3000/movements", {
        params: {
          date: dateParams,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setMovements(response.data);
      });
  }

  useEffect(() => {
    console.log("Data selecionada:", dateFilter);
    getMovements();
  }, [dateFilter]);

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

      <Button
        title={format(dateFilter, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
        onPress={() => setOpenCalendar(true)}
      />

      {openCalendar && (
        <DateTimePicker
          testID="dateTimePicker"
          value={dateFilter}
          mode="date"
          is24Hour={true}
          onChange={onChangeDateFilter}
        />
      )}

      <FlatList
        data={movements}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={() => <Text>Não tem nada nesse dia</Text>}
        renderItem={({ item }) => (
          <View key={item.id} style={styles.transactionItem}>
            <View style={styles.leftContentTransactionItem}>
              {item.type === TransactionType.ENTRADA ? (
                <Icon name="plus-circle" size={30} color="#26d826" />
              ) : (
                <Icon name="minus-circle" size={30} color="#d82926" />
              )}

              <Text
                style={styles.descriptionTransactionItem}
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                {item.description}
              </Text>
            </View>
            <Text style={styles.valueTransactionItem}>R$ {item.value}</Text>
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
    height: 100,
    borderRadius: 8,
    padding: 5,
    marginVertical: 10,
  },
  leftContentTransactionItem: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    width: "70%",
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
