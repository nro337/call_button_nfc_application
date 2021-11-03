import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { createStackNavigator } from "@react-navigation/stack";

import FunctionSelectScreen from "../Screens/FunctionSelectScreen";
import TemplateScreen from "../Screens/TemplateScreen";

const Stack = createStackNavigator();

// function MyStack() {
//   return (

//   );
// };

export default function AppNavigation() {
  return (
    <NavigationContainer>
      {/* <MyStack /> */}
      <Stack.Navigator>
      <Stack.Screen
        name="TemplateScreen"
        component={TemplateScreen}
      />
      <Stack.Screen
        name="FunctionSelectScreen"
        component={FunctionSelectScreen}
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
