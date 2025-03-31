import { Text, TouchableOpacity, View, StyleSheet } from "react-native";

interface ItemListProps {
  options: {value: number, label: string}[];
  handleChangeValue(valueOption: number): void;
  value: string | number;
}

export default function ItemList({
  options,
  handleChangeValue,
  value,
}: ItemListProps) {
  return (
    <View style={styles.rechargeOptionContainer}>
      {options.map((item) => (
        <TouchableOpacity
          key={item.value}
          onPress={() => handleChangeValue(item.value)}
          style={[
            styles.rechargeOption,
            { backgroundColor: item.value === value ? "#CCC" : "#150230" },
          ]}
        >
          <Text style={styles.rechargeTextOption}>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
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
});
