import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";

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
];

export default function Recharges() {

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Recargas</Text>

      <Text>Qual o número você quer recarregar ?</Text>
      <TextInput
        placeholder="(00) 00000-0000"
        underlineColorAndroid={"#150230"}
      />

      <Text>Escolha a valor que deseja recarregar ?</Text>

      <View style={styles.rechargeOptionContainer}>
        {values.map((item) => (
          <TouchableOpacity style={styles.rechargeOption}>
            <Text style={styles.rechargeTextOption}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text>Escolha a operadora ?</Text>

      <TouchableOpacity style={styles.operatorOption}>
        <Image
          source={{
            uri: "https://reactnative.dev/img/tiny_logo.png",
            width: 40,
            height: 40,
          }}
        />
        <Text>Claro</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.operatorOption}>
        <Image
          source={{
            uri: "https://reactnative.dev/img/tiny_logo.png",
            width: 40,
            height: 40,
          }}
        />
        <Text>Tim</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.operatorOption}>
        <Image
          source={{
            uri: "https://reactnative.dev/img/tiny_logo.png",
            width: 40,
            height: 40,
          }}
        />
        <Text>OI</Text>
      </TouchableOpacity>
      
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 2,
    borderColor: '#150230',
    padding: 5,
    marginVertical: 10
  }
});
