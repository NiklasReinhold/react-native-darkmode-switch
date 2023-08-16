# react-native-darkmode-switch

I tried to animated the most beautiful darkmode switch:

![Watch my showcase](https://raw.githubusercontent.com/NiklasReinhold/react-native-darkmode-switch/main/screenshots/showcase.gif)

## Usage/Examples

Usable in any react native or expo project for android, ios or web.

Only import the "Switch.tsx"-file into your project.
All svg's are imbedded in the file - nothing else needed.


```javascript
import React from "react";
import { TouchableOpacity } from "react-native";
import Switch from "./Switch";

export default function App() {
  const [pressed, setPressed] = React.useState(false);

  return (
    <TouchableOpacity
      style={{ width: 170, height: 80 }}
      onPress={() => setPressed(!pressed)}
    >
      <Switch value={pressed} borderWidth={6} handlePadding={3} />
    </TouchableOpacity>
  );
}
```

Have fun with it and give the users a fancier night experience!
