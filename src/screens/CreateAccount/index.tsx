import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";


import { formatCpf } from "../../utils/formatCpf";
import ItemList from "../Recharges/ItemList";
import api from "../../services/api";

export default function CreateAccount({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [income, setIncome] = useState("");
  const [gender, SetGender] = useState("");

  function handleChangeCpf(value: string) {
    setCpf(formatCpf(value));
  }

  function handleChangeGender(value: string) {
    SetGender(value);
  }

  const handleCreateAccount = () => {
    if (!name) {
      Alert.alert("Aviso", "Preencha o campo nome completo");
    } else if (!email) {
      Alert.alert("Aviso", "Preencha o campo email");
    } else if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf)) {
      Alert.alert(
        "Aviso",
        "Preencha o campo CPF no formato válido. Ex: 000.000.000-00"
      );
    } else if (password !== confirmPassword) {
      Alert.alert("Aviso", "As senhas não coincidem");
    } else if (!gender) {
      Alert.alert("Aviso", "Selecione o seu gênero");
    } else {
      api
        .post(
          "/users/register",
          {
            name: name,
            email: email,
            document: cpf,
            password: password,
            income: income,
            gender: gender,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then(() => {
          Alert.alert("Sucesso", "Conta criada com sucesso!");
          navigation.navigate("Login");
        })
        .catch((error) => {
          Alert.alert(
            "Erro",
            error.response.data?.error || "Erro ao criar conta"
          );
        });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.createAccountText}>Criar conta</Text>
          <Text style={styles.descriptionText}>
            Crie uma conta agora e ganhe seu cartão de crédito com R$ 1000,00 de
            limite!
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Nome completo"
            cursorColor="#150230"
            autoCapitalize="words"
            value={name}
            onChangeText={setName}
            autoFocus
          />

          <TextInput
            style={styles.input}
            placeholder="Email"
            cursorColor="#150230"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            style={styles.input}
            placeholder="CPF"
            cursorColor="#150230"
            keyboardType="number-pad"
            value={cpf}
            onChangeText={handleChangeCpf}
            maxLength={14}
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            cursorColor="#150230"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TextInput
            style={styles.input}
            placeholder="Confirmar senha"
            cursorColor="#150230"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          <TextInput
            style={styles.input}
            placeholder="Qual é a sua renda ?"
            cursorColor="#150230"
            keyboardType="number-pad"
            value={income}
            onChangeText={setIncome}
          />

          <ItemList
            options={[
              { value: "M", label: "Masculino" },
              { value: "F", label: "Feminino" },
            ]}
            value={gender}
            handleChangeValue={handleChangeGender}
          />

          <TouchableOpacity
            onPress={handleCreateAccount}
            style={styles.buttonLogin}
          >
            <Text>Criar conta</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={[styles.linkText, { textAlign: "center" }]}>
              Já tem uma conta? Faça login
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
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
  createAccountText: {
    color: "#FFF",
    fontSize: 34,
    marginBottom: 10,
  },
  descriptionText: {
    color: "#FFF",
    fontSize: 16,
    marginBottom: 40,
  },
});
