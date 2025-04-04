import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const Header = () => {
  const saldo = "R$ 1500"; // Valor de saldo do usuário
  const name = "Henrique Douglas Calcante Costa".split(" ");
  const firtName = name[0];

  const [showBalance, setShowBalance] = useState(false);

  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.totalMoney}>{showBalance ? saldo : "***"}</Text>
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
            uri: "https://lh3.googleusercontent.com/a/ACg8ocKcl_rB94Py1qw03nYRxBD4mHOuyMZawCHt_vclTr8jqQC82Sk=s192-c-mo",
            width: 50,
            height: 50,
          }}
          style={{ borderRadius: 30, alignSelf: "center" }}
          testID="photo-user"
        />
        <Text style={styles.userName}>{firtName}</Text>
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
