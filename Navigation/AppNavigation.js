import * as React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  StyleSheet
} from "react-native";
import {Ionicons} from '@expo/vector-icons';
import { NavigationContainer } from "@react-navigation/native";

import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import FunctionSelectScreen from "../Screens/FunctionSelectScreen";
import OnboardingCTAScreen from "../Screens/OnboardingCTAScreen";
import AlwaysOnNFC from "../Screens/AlwaysOnNFC";
import PatientLogin from "../Screens/PatientLogin";
import PatientHomeScreen from "../Screens/PatientHomeScreen";
import MakeARequestScreen from "../Screens/MakeARequestScreen";
import DiningRequestMain from "../Screens/DiningRequestMain";
import OrderSummary from "../Screens/OrderSummary";
import Housekeeping from "../Screens/Housekeeping";
import StaffLogin from "../Screens/StaffLogin";
import StaffHomeScreen from "../Screens/StaffHomeScreen";
import NurseStation from "../Screens/NurseStation";
import PreviousPatientRequestDetailsScreen from "../Screens/PreviousPatientRequestDetailsScreen"
import PendingRequests from "../Screens/PendingRequests";
import AcceptedRequests from "../Screens/AcceptedRequests";
import CompletedRequests from "../Screens/CompletedRequests";

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

// function MyStack() {
//   return (

//   );
// };

const TabNav = () => {
  // https://stackoverflow.com/questions/63108520/how-to-add-components-above-creatematerialtoptabnavigator
  return (
    <View style={{height: Dimensions.get("screen").height, backgroundColor: "white"}}>
      <View style={styles.headerTextContainer}>
          <Text style={styles.headerText}>Patient Requests</Text>
        </View>
        <View style={styles.subheadingContainer}>
          <Text style={styles.subheaderText}>
            View all patient requests below.
          </Text>
        </View>
      <Tab.Navigator>
        <Tab.Screen name="Pending" component={PendingRequests} />
        <Tab.Screen name="Accepted" component={AcceptedRequests} />
        <Tab.Screen name="Completed/Denied" component={CompletedRequests} />
      </Tab.Navigator>
    </View>

  )
}

export default function AppNavigation({navigation}) {
  return (
    <NavigationContainer>
      {/* <MyStack /> */}
      <Stack.Navigator>
      <Stack.Screen
        name="Onboarding"
        component={OnboardingCTAScreen}
      />
      <Stack.Screen
        name="Function Select Screen"
        component={FunctionSelectScreen}
      />
      <Stack.Screen
        name="Patient Login"
        component={PatientLogin}
      />
      <Stack.Screen
        name="Patient Home Screen"
        component={PatientHomeScreen}
        options={ ({ navigation }) => ({
          headerRight: () => (
            <TouchableOpacity style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}} onPress={() => navigation.navigate('Function Select Screen')}>
              <Text>Logout</Text>
              <Ionicons name="log-out-outline" size={40} color="#090C68" />
            </TouchableOpacity>
          )
        })}
      />
      <Stack.Screen
        name="Make A Request"
        component={MakeARequestScreen}
        options={ ({ navigation }) => ({
          headerRight: () => (
            <TouchableOpacity style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}} onPress={() => navigation.navigate('Function Select Screen')}>
              <Text>Logout</Text>
              <Ionicons name="log-out-outline" size={40} color="#090C68" />
            </TouchableOpacity>
          )
        })}
      />
      <Stack.Screen
        name="Previous Request Details"
        component={PreviousPatientRequestDetailsScreen}
        options={ ({ navigation }) => ({
          headerRight: () => (
            <TouchableOpacity style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}} onPress={() => navigation.navigate('Function Select Screen')}>
              <Text>Logout</Text>
              <Ionicons name="log-out-outline" size={40} color="#090C68" />
            </TouchableOpacity>
          )
        })}
      />
      <Stack.Screen
        name="Dining Request"
        component={DiningRequestMain}
        options={ ({ navigation }) => ({
          headerRight: () => (
            <TouchableOpacity style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}} onPress={() => navigation.navigate('Function Select Screen')}>
              <Text>Logout</Text>
              <Ionicons name="log-out-outline" size={40} color="#090C68" />
            </TouchableOpacity>
          )
        })}
      />
      <Stack.Screen
        name="Order Summary"
        component={OrderSummary}
        options={ ({ navigation }) => ({
          headerRight: () => (
            <TouchableOpacity style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}} onPress={() => navigation.navigate('Function Select Screen')}>
              <Text>Logout</Text>
              <Ionicons name="log-out-outline" size={40} color="#090C68" />
            </TouchableOpacity>
          )
        })}
      />
      <Stack.Screen
        name="Housekeeping"
        component={Housekeeping}
        options={ ({ navigation }) => ({
          headerRight: () => (
            <TouchableOpacity style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}} onPress={() => navigation.navigate('Function Select Screen')}>
              <Text>Logout</Text>
              <Ionicons name="log-out-outline" size={40} color="#090C68" />
            </TouchableOpacity>
          )
        })}
      />
      <Stack.Screen
        name="Staff Login"
        component={StaffLogin}
      />
      <Stack.Screen
        name="Staff Home Screen"
        component={TabNav}
        options={ ({ navigation }) => ({
          headerRight: () => (
            <TouchableOpacity style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}} onPress={() => navigation.navigate('Function Select Screen')}>
              <Text>Logout</Text>
              <Ionicons name="log-out-outline" size={40} color="#090C68" />
            </TouchableOpacity>
          )
        })}
      />
      <Stack.Screen
        name="Nurse Station"
        component={NurseStation}
        options={ ({ navigation }) => ({
          headerRight: () => (
            <TouchableOpacity style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}} onPress={() => navigation.navigate('Function Select Screen')}>
              <Text>Logout</Text>
              <Ionicons name="log-out-outline" size={40} color="#090C68" />
            </TouchableOpacity>
          )
        })}
      />
      <Stack.Screen
        name="NFC Reader"
        component={AlwaysOnNFC}
      />
    </Stack.Navigator>
      {/* <Stack.Screen name="Home" component={MyStack}/> */}
      {/* <Stack.Navigator initialRouteName='Home'>
        <>
        <Stack.Screen name="FunctionSelect" component={MyStack}></Stack.Screen>
      </Stack.Navigator> */}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
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
    paddingTop: 20,
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
    paddingRight: 40,
    marginBottom: 40,
    ...Platform.select({
      ios: {
        width: Dimensions.get('window').width,
      }
    })
  },  
})