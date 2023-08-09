import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Switch from "./Switch";

export default function App() {
  const [pressed, setPressed] = React.useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.switch_container}
        onPress={() => setPressed(!pressed)}
      >
        <Switch value={pressed} borderWidth={6} handlePadding={3} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  switch_container: {
    width: 170 * 2,
    height: 80 * 2,
  },
});
