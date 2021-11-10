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
import { Images } from "../App/Themes";

import CustButton from "../App/Components/CustButton";

export default function Taryn({ navigation, route }) {

  // const { myParam } = route.params;

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.headerText}>Nurse Station</Text>
        <Text style={styles.header2Text}>How would you like "a nurse" to assist you?</Text>
        <CustButton title="General Request" icon="pint-outline" size={20} fontSize={30} color="#090C68" backgroundColor="white" onPress={() => navigation.navigate('FunctionSelectScreen')}></CustButton>
        <CustButton title="Pain Indication" icon="medkit-outline" size={20} fontSize={30} color="white" backgroundColor="#090C68" onPress={() => navigation.navigate('FunctionSelectScreen')}></CustButton>
        <CustButton title="Bathroom" icon="water-outline" size={20} fontSize={30} color="#090C68" backgroundColor="white" onPress={() => navigation.navigate('FunctionSelectScreen')}></CustButton>
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
  header2Text: {
    color: "#000000",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600",
  },
});