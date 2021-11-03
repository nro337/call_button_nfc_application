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
import Svg, {Path} from 'react-native-svg';
// import { LinearGradient } from 'expo-linear-gradient';

import CustButton from "../App/Components/CustButton";

export default function FunctionSelectScreen({ navigation }) {
  return (
    <View>
      <View style={styles.functionSelectContainer}>
        <Image style={styles.logo} source={Images.patientHomeImage} />
        <Svg height={550} width={Dimensions.get("screen").width}>
          <Path
            d="M -730 450 Q 400 -450 800 450" // put your path here
            fill="white"
            stroke="white"
          />  
        </Svg>
        <View style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", clipPath: "ellipse(54% 100% at 50% 100%)", position: 'absolute', backgroundColor: 'transparent', width: Dimensions.get("screen").width, height: '10%', top: '62%', left: 0}}>
          <Text style={styles.titleText}>How would you like to access this application?</Text>
          <CustButton title="Patient" icon="" size={20} fontSize={30} color="white" backgroundColor="#090C68" onPress={() => navigation.navigate('Function Select Screen')}></CustButton>
          <CustButton title="Staff" icon="" size={20} fontSize={30} color="#090C68" backgroundColor="white" onPress={() => navigation.navigate('Function Select Screen')}></CustButton>
          <CustButton title="NFC Reader" icon="" size={20} fontSize={30} color="#090C68" backgroundColor="white" onPress={() => navigation.navigate('NFC Reader')}></CustButton>
        </View>
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
    backgroundColor: "#9D9EC1",
    //background: linear-gradient(180deg, #9D9EC1 0%, #CCDCEF 82.81%);

    ...Platform.select({
      ios: {
        height: Dimensions.get('window').height,
      }
    })
  },
  logo: {
    height: '60%',
    width: '60%',
    resizeMode: 'contain',
  },
  titleText: {
    fontSize: 20,
    paddingHorizontal: 10,
    paddingTop: 30,
    textAlign: "center"
  }
});
