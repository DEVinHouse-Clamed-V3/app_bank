import { Text, View, StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";

export default function Recharges() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recargas</Text>

      <Text>Qual o número você quer recarregar ?</Text>
      <TextInput 
        placeholder="(00) 00000-0000"
        underlineColorAndroid={"#150230"}
      />
    </View>
  ); 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#150230"
  }
})