import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../screens/Home";
import Reviews from "../screens/Reviews";
import History from "../screens/History";
import Faqs from "../screens/Faqs";

const Stack = createNativeStackNavigator();

export const AppNavigator = () => (
  <Stack.Navigator
    initialRouteName="Home"
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen
      name="Home"
      component={Home}
      options={{
        presentation: "modal",
        animation: "slide_from_right",
      }}
    />
    <Stack.Screen
      name="Reviews"
      component={Reviews}
      options={{
        presentation: "modal",
        animation: "slide_from_right",
      }}
    />
    <Stack.Screen
      name="History"
      component={History}
      options={{
        presentation: "modal",
        animation: "slide_from_right",
      }}
    />
    <Stack.Screen
      name="Faqs"
      component={Faqs}
      options={{
        presentation: "modal",
        animation: "slide_from_right",
      }}
    />
  </Stack.Navigator>
);
