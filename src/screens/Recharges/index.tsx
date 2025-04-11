import axios from "axios";
import { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  Button,
} from "react-native";

import ItemList from "./ItemList";
import AsyncStorage from "@react-native-async-storage/async-storage";

const values = [
  {
    value: 20,
    label: "R$ 20,00",
  },
  {
    value: 30,
    label: "R$ 30,00",
  },
  {
    value: 40,
    label: "R$ 40,00",
  },
  {
    value: 50,
    label: "R$ 50,00",
  },
  {
    value: 100,
    label: "R$ 100,00",
  },
  {
    value: 150,
    label: "R$ 150,00",
  },
];

const DddOptions = [
  {
    value: "85",
    label: "85",
  },
  {
    value: "55",
    label: "55",
  },
  {
    value: "44",
    label: "44",
  },
];

type Operator = {
  id: number;
  name: string;
  cover: string;
};

export default function Recharges() {
  const [phone, setPhone] = useState("");
  const [value, setValue] = useState(0);
  const [operator, setOperator] = useState("");

  const [operatorsOptions, setOperatorsOptions] = useState<Operator[]>([]);

  const [ddd, setDdd] = useState("");

  function handleChangeValue(valueOption: number) {
    setValue(valueOption);
  }

  function handleChangeDdd(valueOption: string) {
    setDdd(valueOption);
  }

  function handleChangeOperator(operatorOption: string) {
    setOperator(operatorOption);
  }

  async function handleCreateRecharge() {
    const regexPhone = /^\(\d{2}\)\s\d{5}-\d{4}$/;

    if (!regexPhone.test(phone)) {
      Alert.alert("Aviso", "O telefone está no formato inválido");
    } else if (!value) {
      Alert.alert("Aviso", "Selecione um valor");
    } else if (!operator) {
      Alert.alert("Aviso", "Selecione uma operadora");
    } else {
      const token = await AsyncStorage.getItem("@token");

      axios
        .post(
          "http://192.168.0.37:3000/recharges",
          {
            number: phone,
            value: value,
            operator: operator,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(() => {
          Alert.alert("Aviso", "Recarga realizada com sucesso");
        })
        .catch(() =>
          Alert.alert(
            "Aviso",
            "Não foi possivel realizar a recarga. Tente novamente em alguns minutos."
          )
        )
        .finally(() => {
          setPhone("");
          setValue(0);
          setOperator("");
        });
    }
  }

  async function getOperators() {
    const token = await AsyncStorage.getItem("@token");

    axios
      .get("http://192.168.0.37:3000/operators", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setOperatorsOptions(response.data);
      })
      .catch(() => Alert.alert("Erro ao carregar operadoras"));
  }

  useEffect(() => {
    getOperators();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recargas</Text>

      <Text>Qual o número você quer recarregar ?</Text>
      <TextInput
        placeholder="(00) 00000-0000"
        underlineColorAndroid={"#150230"}
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />

      <Text>Escolha a valor que deseja recarregar ? </Text>

      <ItemList
        options={values}
        handleChangeValue={handleChangeValue}
        value={value}
      />

      {/* <ItemList options={DddOptions} handleChangeValue={handleChangeDdd} value={ddd} /> */}

      <Text>Escolha a operadora ?</Text>
      {operatorsOptions.map((item) => (
        <TouchableOpacity
          key={item.id}
          onPress={() => handleChangeOperator(item.name)}
          style={[
            styles.operatorOption,
            { backgroundColor: item.name === operator ? "#CCC" : "#FFF" },
          ]}
        >
          <Image
            source={{
              uri: item.cover,
              width: 40,
              height: 40,
            }}
            style={{ objectFit: "contain" }}
          />
          <Text>{item.name}</Text>
        </TouchableOpacity>
      ))}

      <Button title="Confirmar" onPress={handleCreateRecharge} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#150230",
  },
  rechargeOptionContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  rechargeOption: {
    width: "30%",
    height: 40,
    backgroundColor: "#150230",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  rechargeTextOption: {
    color: "#FFF",
  },
  operatorOption: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderWidth: 2,
    borderColor: "#150230",
    padding: 5,
    marginVertical: 10,
  },
});
