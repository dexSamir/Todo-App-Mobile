import { StyleSheet, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },

  content: {
    fontSize: 22,
  },
});
