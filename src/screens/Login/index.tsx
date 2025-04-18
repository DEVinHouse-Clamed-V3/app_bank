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
import { login } from "../../actions/auth.actions";
import { formatCpf } from "../../utils/formatCpf";
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Login({ navigation }: any) {
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");

  function handleNavigateToCreateAccount() {
    navigation.navigate("CreateAccount");
  }

  function handleLogin() {
    if (!cpf || !password) {
      Alert.alert("Aviso", "Preencha todos os campos");
    } else {
      login(cpf, password)
        .then((response) => {
          
          AsyncStorage.setItem("@name", response.data.name)
          AsyncStorage.setItem("@token", response.data.token)

          navigation.navigate("Tabs");
        })
        .catch((error) => {
          Alert.alert("Erro", error.response.data?.error || "Erro ao fazer login");
        });
    }
  }

  function handleChangeCpf(value: string) {
      setCpf(formatCpf(value));
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
        onChangeText={handleChangeCpf}
        testID="input-cpf"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        cursorColor="#150230"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        testID="input-password"
      />

      <TouchableOpacity>
        <Text style={styles.linkText}>Esqueceu a senha ?</Text>
      </TouchableOpacity>

      <TouchableOpacity testID="button-login" onPress={handleLogin} style={styles.buttonLogin}>
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
