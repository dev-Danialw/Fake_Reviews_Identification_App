import { View, Text } from "react-native";
import React from "react";

const Separator = () => {
  return <View style={separatorStyles}></View>;
};

const separatorStyles = {
  width: "100%",
  height: 1,
  backgroundColor: "#e5e5e5",
  marginVertical: 5,
};

export default Separator;
