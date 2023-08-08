import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Switch from "./Switch";
import Cloud from "./Cloud";

export default function App() {
  const [pressed, setPressed] = React.useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.switch_container}
        onPress={() => setPressed(!pressed)}
      ></TouchableOpacity>
      <Switch
        value={pressed}
        width={styles.switch_container.width}
        height={styles.switch_container.height}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  switch_container: {
    width: 170,
    height: 80,
    backgroundColor: "#d9d9d9",
    justifyContent: "center",
    alignItems: "center",
  },
});
