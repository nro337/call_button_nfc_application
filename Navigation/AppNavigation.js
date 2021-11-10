import * as React from "react";
import {
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import {Ionicons} from '@expo/vector-icons';
import { NavigationContainer } from "@react-navigation/native";

import { createStackNavigator } from "@react-navigation/stack";

import FunctionSelectScreen from "../Screens/FunctionSelectScreen";
import OnboardingCTAScreen from "../Screens/OnboardingCTAScreen";
import AlwaysOnNFC from "../Screens/AlwaysOnNFC";
import PatientLogin from "../Screens/PatientLogin";
import PatientHomeScreen from "../Screens/PatientHomeScreen";
import MakeARequestScreen from "../Screens/MakeARequestScreen";
import DiningRequestMain from "../Screens/DiningRequestMain";

const Stack = createStackNavigator();

// function MyStack() {
//   return (

//   );
// };

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
