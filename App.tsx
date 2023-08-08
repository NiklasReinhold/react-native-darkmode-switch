import React from "react";
import {
  Button,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import Switch from "./Switch";
import Cloud from "./Cloud";

export default function App() {
  const [pressed, setPressed] = React.useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.switch_container}
        onPress={() => setPressed(!pressed)}
      >
        <Switch
          value={pressed}
          width={styles.switch_container.width}
          height={styles.switch_container.height}
        />
      </TouchableOpacity>
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
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
});
