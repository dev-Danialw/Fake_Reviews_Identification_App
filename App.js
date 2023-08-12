import { StatusBar } from "expo-status-bar";

import { NavigationContainer } from "@react-navigation/native";
import { AppNavigator } from "./src/navigation/AppNavigator";

// import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  return (
    <NavigationContainer>
      {/* <SafeAreaView style={{ flex: 1 }}> */}
      <StatusBar style="auto" />
      <AppNavigator />
      {/* </SafeAreaView> */}
    </NavigationContainer>
  );
}
