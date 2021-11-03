import React, { useState, useEffect } from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { Images } from "../App/Themes/";

import CustButton from "../App/Components/CustButton";

export default function TemplateScreen({ navigation, route }) {

  // const { myParam } = route.params;

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.headerText}>Text goes here!</Text>
        <CustButton title="Custom Button" icon="chevron-forward-outline" size={20} color="white" onPress={() => navigation.navigate('FunctionSelectScreen')}></CustButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    height: Dimensions.get("screen").height
  },
  headerText: {
    color: "#090C68",
    textAlign: "center",
    fontSize: 40,
    fontWeight: "600",
  },
});