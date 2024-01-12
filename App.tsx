import React, { useEffect } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Switch from "./Switch";
import { StatusBar } from "expo-status-bar";

export default function App() {
  const [pressed, setPressed] = React.useState(false);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: !pressed ? "#000" : "#fff",
        },
      ]}
    >
      <TouchableOpacity
        style={styles.switch_container}
        onPress={() => setPressed(!pressed)}
      >
        <Switch value={pressed} borderWidth={4} handlePadding={2} />
      </TouchableOpacity>
      <StatusBar style={!pressed ? "light" : "dark"} />
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
    width: 170,
    height: 80,
  },
});
