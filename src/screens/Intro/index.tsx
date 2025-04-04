import { StyleSheet, Text, Image, TouchableOpacity, View } from "react-native";

export default function Intro({ navigation }: any) {

  function handleNavigateToLogin() {
    navigation.navigate("Login");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.bankName}>Your Bank</Text>

      {/* Imagem de url <Image
        source={{
          uri: "https://static.vecteezy.com/system/resources/previews/021/944/628/non_2x/bank-logo-or-icon-design-on-white-background-illustration-vector.jpg",
          width: 100,
          height: 100,
        }}
      /> */}

      <Image
        source={require("../../../assets/Logo.png")}
        style={styles.bankLogo}
        testID="bank-logo"
      />

      <View>
        <Text style={styles.title}>Um mundo financeiro sem complexidades!</Text>
        <TouchableOpacity
          onPress={handleNavigateToLogin}
          activeOpacity={0.8}
          style={styles.button}
        >
          <Text>Começar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#150230",
    padding: 20,
    justifyContent: "space-between",
  },
  bankName: {
    color: "#fff",
    fontSize: 36,
    fontWeight: "bold",
  },
  bankLogo: {
    width: 250,
  
    alignSelf: "center",
    objectFit: 'contain'
  },
  title: {
    color: "#fff",
    fontSize: 34,
    fontWeight: "bold",
    width: "75%",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
});
