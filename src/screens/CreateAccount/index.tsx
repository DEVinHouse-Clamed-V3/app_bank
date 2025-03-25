import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";

export default function CreateAccount() {
  return (
    <View style={styles.container}>

      <TextInput
        style={styles.input}
        placeholder="CPF"
        cursorColor="#150230"
        keyboardType="number-pad"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        cursorColor="#150230"
        secureTextEntry
      />

      <TouchableOpacity>
        <Text style={styles.linkText}>Esqueceu a senha ?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonLogin}>
        <Text>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={[styles.linkText, { textAlign: "center" }]}>
          Criar conta
        </Text>
      </TouchableOpacity>
    </View>
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
});
