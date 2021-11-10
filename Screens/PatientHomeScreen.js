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
import CustCard from "../App/Components/CustCard";
import {Ionicons, FontAwesome5} from '@expo/vector-icons';

export default function PatientHomeScreen({ navigation, route }) {

  // const { myParam } = route.params;

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.headerText}>Welcome, Sophia</Text>
        <View style={styles.requestCard}>
          <Image style={styles.logo} source={Images.patientHomeScreenImage} />
          <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: Dimensions.get('screen').width * 0.4}}>
            <Text style={styles.requestCardText}>Make a Request</Text>
            <Ionicons name="chevron-forward-outline" size={40} color="#090C68" />
          </View>
        </View>
        <View style={styles.previousRequestsContainer}>
          <View style={styles.previousRequestItem}>
            <View style={styles.iconContainer}>
              <FontAwesome5 name="prescription-bottle-alt" size={20} color="#7FA8D6" />
            </View>
            <View style={styles.previousRequestsTextContainer}>
              <Text style={{fontSize: 20}}>Nurse Station</Text>
              <Text style={{fontSize: 12}}>Medication - Advil</Text>
              <Text style={{paddingTop: 5, color: "#7FA8D6", fontSize: 12}}>Time Made: 10:00am</Text>
            </View>
            <Ionicons name="checkmark-circle-outline" size={40} color="green" />
          </View>
        </View>
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
    // height: '50%',
    // width: '50%',
    resizeMode: 'contain',
    marginBottom: 10,
  },
  headerText: {
    color: "#090C68",
    textAlign: "center",
    fontSize: 40,
    fontWeight: "600",
  },
  requestCard: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 50,
    shadowOffset: {width: 0, height: 4},
    shadowColor: "black",
    shadowRadius: 4,
    shadowOpacity: 0.25,
  },
  requestCardText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#090C68",
  },
  previousRequestsContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
    marginHorizontal: 10,
  },
  previousRequestItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 50,
    shadowOffset: {width: 0, height: 4},
    shadowColor: "black",
    shadowRadius: 4,
    shadowOpacity: 0.25,
    padding: 10,
  },
  previousRequestsTextContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingRight: 20,
  },  
  iconContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#D4E2F1",
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  }
});