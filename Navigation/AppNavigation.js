import React, { useState, useEffect } from "react";
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

import { MaterialCommunityIcons } from '@expo/vector-icons'; 

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();
const dbConfig = require('../App/Config/database.config');

// function MyStack() {
//   return (

//   );
// };



export default function AppNavigation({navigation}) {

  const [pendingTabLength, setPendingTabLength] = useState([]);
  const [acceptedTabLength, setAcceptedTabLength] = useState([]);
  const [completedDeniedTabLength, setCompletedDeniedTabLength] = useState([]);

  useEffect(() => {
    fetch(`http://${dbConfig.mobileURL}:5000/patient-requests`)
      .then((resp) => resp.json())
      .then((data) => {
        data.forEach(request => {
          if(request.status === 'error'){
            setPendingTabLength(pendingTabLength => [...pendingTabLength, request])
            //setTabLength()
          }
          if(request.status === 'accepted'){
            setAcceptedTabLength(acceptedTabLength => [...acceptedTabLength, request])
          }
          if(request.status === 'complete' || request.status === 'fail'){
            setCompletedDeniedTabLength(completedDeniedTabLength => [...completedDeniedTabLength, request])
          }

        })
      })
  }, [])

  const TabNav = () => {
  //console.log(pendingTabLength.length)
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
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarLabel: ({focused}) => {
            let iconColor;
            if(route.name === 'Pending'){
              iconColor = focused ? 'yellow' : 'white'
            } else if(route.name === 'Accepted'){
              iconColor = focused ? 'lightgreen' : 'white'
            } else {
              iconColor = focused ? 'red' : 'white'
            }
            return <Text style={{color: iconColor, fontSize: 20, textAlign: "center"}}>{route.name}</Text>
          },
          tabBarStyle: {backgroundColor: '#090C68', borderColor: 'white', borderRadius: 1, borderStyle: "solid"},
          // tabBarIcon: ({focused, color, size}) => {
          //   let iconName;
          //   if(route.name === 'Pending'){
          //     focused ? color="white" : color="gray"
          //     iconName = 'numeric-' + pendingTabLength.length.toString();
          //   }
          //   else if(route.name === 'Accepted'){
          //     focused ? color="white" : color="gray"
          //     iconName = 'numeric-' + acceptedTabLength.length.toString();
          //   }
          //   else if(route.name === 'Completed/Denied'){
          //     focused ? color="white" : color="gray"
          //     iconName = 'numeric-' + completedDeniedTabLength.length.toString();
          //   }

          //   return <View style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
          //     <MaterialCommunityIcons name={iconName} size={30} color={color} />
          //   </View>
          // },
          tabBarIconStyle: {}
        })}
      >
        <Tab.Screen name="Pending">{() => <PendingRequests item={pendingTabLength.length}/>}</Tab.Screen>
        <Tab.Screen name="Accepted">{() => <AcceptedRequests item={acceptedTabLength.length}/>}</Tab.Screen>
        <Tab.Screen name="Completed/Denied">{() => <CompletedRequests item={completedDeniedTabLength.length}/>}</Tab.Screen>
      </Tab.Navigator>
    </View>

  )
}

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
        options={ ({ navigation, route }) => ({
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