import axios from "axios";
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";

export default function Login({ navigation }: any) {

  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");

  function handleNavigateToCreateAccount() {
    navigation.navigate("CreateAccount");
  }

  function handleLogin() {
    if(!cpf || !password) {
      Alert.alert("Aviso", "Preencha todos os campos")
    } else {
      axios.post(
        "http://192.168.0.37:3000/login",
        {
          cpf: cpf,
          password: password
        }
      )
      .then((response) => {

        const token = response.data.token

        Alert.alert("Sucesso", token)
        navigation.navigate("Tabs")
      })
      .catch(() => {
        Alert.alert("Erro", "Crendeciais incorretas")
      }) 
    }
  }

  // function handleChangeCpf(value: string) {
  //   const cpfOnlyDigits = value.replace(/\D/g, '')
  //   setCpf(cpfOnlyDigits)
  // }

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/Logo.png")}
        style={styles.bankLogo}
      />

      <TextInput
        style={styles.input}
        placeholder="CPF"
        cursorColor="#150230"
        keyboardType="number-pad"
        value={cpf}
        onChangeText={setCpf}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        cursorColor="#150230"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity>
        <Text style={styles.linkText}>Esqueceu a senha ?</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleLogin} style={styles.buttonLogin}>
        <Text>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleNavigateToCreateAccount}>
        <Text style={[styles.linkText, { textAlign: "center" }]}>
          Criar conta
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bankLogo: {
    width: 250,

    alignSelf: "center",
    objectFit: "contain",
  },
  container: {
    flex: 1,
    backgroundColor: "#150230",
    padding: 20,
    justifyContent: "center",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 4,
    height: 44,
    fontSize: 18,
    paddingHorizontal: 8,
    marginBottom: 20,
  },
  linkText: {
    color: "#FFF",
    textAlign: "right",
    fontSize: 16,
    marginBottom: 40,
  },
  buttonLogin: {
    backgroundColor: "#fff",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    height: 44,
    marginBottom: 20,
  },
});
