import { Text, View, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Profile({navigation}) {
 
  const handleLogout = () => {
    navigation.navigate("Login");
  };

  return (
    <View>
      <Text>profile</Text>
      <Button title="Deslogar" onPress={handleLogout} />
    </View>
  );
}
