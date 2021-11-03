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

export default function OnboardingCTAScreen({ navigation, route }) {

  // const { myParam } = route.params;

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.headerText}>Keep Care at your Fingertips</Text>
        <Image style={styles.logo} source={Images.onBoardingHandAsset} />
        <CustButton title="Get Started" icon="chevron-forward-outline" size={20} fontSize={30} color="white" backgroundColor="#090C68" onPress={() => navigation.navigate('Function Select Screen')}></CustButton>
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
    ...Platform.select({
      ios: {
        height: Dimensions.get('window').height - 90,
      }
    })
  },
  logo: {
    height: '50%',
    width: '50%',
    resizeMode: 'contain',
    tintColor: '#090C68'
  },
  headerText: {
    color: "#090C68",
    textAlign: "center",
    fontSize: 40,
    fontWeight: "600",
  }
});