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
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Images } from "../App/Themes";
import CustButton from "../App/Components/CustButton";

export default function StaffLogin({ navigation, route }) {


  return (
    <View>
      <View style={styles.container}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerText}>Staff</Text>
        </View>
        <View style={styles.subheadingContainer}>
          <Text style={styles.subheaderText}>Please enter Staff ID Number & Password</Text>
        </View>
          <View style={styles.bodyContainer}>
            <TextInput style={styles.textInputStyle} placeholderTextColor="#C4C4C4" placeholder="Staff ID Number"></TextInput>
            <TextInput style={styles.textInputStyle} placeholderTextColor="#C4C4C4" placeholder="Password"></TextInput>
          </View>
        <CustButton title="View Staff Profile" icon="chevron-forward-outline" size={20} fontSize={25} color="white" backgroundColor="#090C68" onPress={() => navigation.navigate('Staff Home Screen')}></CustButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "white",
    ...Platform.select({
      ios: {
        height: Dimensions.get('window').height - 90,
        paddingTop: 50,
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
    textAlign: "left",
    fontSize: 30,
    fontWeight: "600",
  },
  headerTextContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingLeft: 40,
    paddingBottom: 15,
    ...Platform.select({
      ios: {
        width: Dimensions.get('window').width,
      }
    })
  },
  bodyContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    paddingLeft: 40,
    ...Platform.select({
      ios: {
        width: Dimensions.get('window').width,
      }
    })
  },
  subheaderText: {
    fontSize: 15,
    fontWeight: "500",
  },
  subheadingContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingLeft: 40,
    ...Platform.select({
      ios: {
        width: Dimensions.get('window').width,
      }
    })
  },  
  textInputStyle: {
    backgroundColor: "transparent",
    marginVertical: 20,
    height: 40,
    borderBottomWidth: 2,
    borderBottomColor: "#C4C4C4",
    ...Platform.select({
      ios: {
        width: '90%',
      }
    })
  }
});