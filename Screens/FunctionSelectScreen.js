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

export default function FunctionSelectScreen({ navigation }) {
  return (
    <View>
      <View style={styles.functionSelectContainer}>
        <Image style={styles.logo} source={Images.logo} />
        <Button title="Button" onPress={() => navigation.navigate('Home')}></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  functionSelectContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black"
  },
  logo: {
    height: '50%',
    width: '50%',
    resizeMode: 'contain',
  }
});
