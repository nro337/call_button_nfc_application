import React, { useState, useEffect } from "react";
import {
  Animated,
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
  FlatList,
} from "react-native";
import { SearchBar } from "react-native-elements";
import { Images } from "../App/Themes";
import CustButton from "../App/Components/CustButton";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { TabView, SceneMap } from 'react-native-tab-view';

const dbConfig = require('../App/Config/database.config');

const Tab = createMaterialTopTabNavigator();
const TabStack = createStackNavigator();

import {Ionicons} from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons'; 

export default function StaffHomeScreen({ navigation, route }) {
  const [reqHeader, setReqHeader] = useState('')
  const [allReq, setAllReq] = useState([]);
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'First' },
    { key: 'second', title: 'Second' },
  ]);



  const DATA = [
    {
      id: '0',
      name: 'Sophia Novak',
      roomNumber: 123,
      requestType: 'Dining Request',
      icon: 'coffee',
      order: [
        {
            id: '0',
            title: 'Pancakes',
            price: 1.50,
            image: Images.pancakes,
            quantity: 0,
          },
          {
            id: '1',
            title: 'Bacon',
            price: 0.50,
            image: Images.bacon,
            quantity: 0,
          },
      ]
    },
    {
        id: '1',
        name: 'Nick Alico',
        roomNumber: 234,
        requestType: 'Extra Bedding',
        icon: 'bed',
        order: [
          {
              id: '0',
              title: 'Pancakes',
              price: 1.50,
              image: Images.pancakes,
              quantity: 0,
            },
            {
              id: '1',
              title: 'Bacon',
              price: 0.50,
              image: Images.bacon,
              quantity: 0,
            },
        ]
      },
      {
        id: '2',
        name: 'Taryn Campion',
        roomNumber: 345,
        requestType: 'Pain Indication',
        icon: 'pills',
        order: [
          {
              id: '0',
              title: 'Pancakes',
              price: 1.50,
              image: Images.pancakes,
              quantity: 0,
            },
            {
              id: '1',
              title: 'Bacon',
              price: 0.50,
              image: Images.bacon,
              quantity: 0,
            },
        ]
      },
  ];

  useEffect(() => {
    fetch(`http://${dbConfig.mobileURL}:5000/patient-requests`)
      .then((resp) => resp.json())
      .then((data) => {
        data.forEach(request => {

          setAllReq(allReq => [...allReq, request])
          //allReq.push(request)
        })
        setReqHeader(data[0].patient_id)
      })
  }, [])

  //console.log(allReq);

  // useEffect(() => {
  //   fetch(`http://${dbConfig.mobileURL}:5000/providers`)
  //     .then((resp2) => resp2.json())
  //     .then((data2) => {
  //       console.log(data2);
  //       //setReqHeader(data[0].patient_id)
  //     })
  // }, [])

  useEffect(() => {
    fetch(`http://${dbConfig.mobileURL}:5000/staff`)
      .then((resp3) => resp3.json())
      .then((data3) => {
        data3.forEach(staff => {
          console.log(staff)
        })
        //setReqHeader(data[0].patient_id)
      })
  }, [])

  const Item = ({ name, roomNumber, icon, requestType, order }) => (
    <TouchableOpacity style={styles.listItem} onPress={() => console.log(name)}>
      {/* <FontAwesome5 name={icon} size={40} color="#090C68" /> */}
      <View style={styles.listTextContainer}>
        <Text style={styles.listTextHeader}>{name}</Text>
        <Text style={styles.listTextSubheader}>Room {roomNumber}</Text>
        <Text style={styles.listTextTertiary}>10 min ago</Text>
      </View>
      <View style={styles.badgeAndCaretContainer}>
        <View style={styles.badge}>
            <Text style={{padding: 5, color: "white", fontSize: 10}}>{requestType}</Text>
        </View>
        <Ionicons name="chevron-forward-outline" size={40} color="#090C68" />
      </View>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => {
    return <Item name={item.patient_id} roomNumber={item.patient_id} icon={item.patient_id} requestType={item.patient_id} order={item.patient_id} />
    // allReq.forEach(req => {
    //   <Item name={req.patient_id} roomNumber={req.patient_id} icon={req.patient_id} requestType={req.patient_id} order={req.patient_id} />
    // })
  };


  const MyTabBar = ({ state, descriptors, navigation, position }) => {
    return (
      <View style={{ flexDirection: 'row' }}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;
  
          const isFocused = state.index === index;
  
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
  
            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              navigation.navigate({ name: route.name, merge: true });
            }
          };
  
          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };
  
          const inputRange = state.routes.map((_, i) => i);
          const opacity = position.interpolate({
            inputRange,
            outputRange: inputRange.map(i => (i === index ? 1 : 0)),
          });
  
          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{ flex: 1 }}
            >
              <Animated.Text style={{ opacity }}>
                {label}
              </Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }

  function HomeScreen() {
    return(
      <View style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: "blue" }}>
        <Text>Home!</Text>
        {/* <View style={styles.flatListContainer}>
          <FlatList
            data={allReq}
            renderItem={renderItem}
            keyExtractor={(item) => item._id.toString()}
          />
        </View> */}
      </View>
    );
  }

  function SettingsScreen() {
    return(
      <View style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: "green" }}>
        <Text>Settings!</Text>
      </View>
    );
  }

  const renderScene = SceneMap({
    first: HomeScreen,
    second: SettingsScreen,
  })


  return (
    <View>
      <View style={styles.container}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerText}>Patient Requests</Text>
        </View>
        <View style={styles.subheadingContainer}>
          <Text style={styles.subheaderText}>
            View all patient requests below.
          </Text>
        </View>
        {/* <NavigationContainer independent={true}>
          <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
          </Tab.Navigator>
        </NavigationContainer> */}
        {/* <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: Dimensions.get("window").width }}
            style={{backgroundColor: 'red',}}
          /> */}
        <View style={styles.topTabContainer}>
          <NavigationContainer independent={true}>
            <Tab.Navigator>
              <Tab.Screen name="Home" component={HomeScreen} />
              <Tab.Screen name="Settings" component={SettingsScreen} />
            </Tab.Navigator>
          </NavigationContainer>

            {/* <Tab.Navigator>
              <Tab.Screen name="Home" component={HomeScreen} />
              <Tab.Screen name="Settings" component={SettingsScreen} />
            </Tab.Navigator> */}
        </View>
        <View style={styles.flatListContainer}>
          <FlatList
            data={allReq}
            renderItem={renderItem}
            keyExtractor={(item) => item._id.toString()}
          />
        </View>
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
    height: '100%',
    width: '30%',
    resizeMode: "contain",
    // tintColor: '#090C68'
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
    paddingRight: 40,
    marginBottom: 40,
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
  },
  flatListContainer: {
    width: Dimensions.get("screen").width,
    // paddingHorizontal: 50,
    ...Platform.select({
      ios: {
        height: Dimensions.get("window").height * 0.4,
      },
      android: {
        height: Dimensions.get("window").height - 280,
      },
      default: {
        paddingTop: "12%"
      }
    }),
  },
  listItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  listTextContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  listTextHeader: {
    fontSize: 20,
    fontWeight: "700",
    paddingBottom: 5,
    color: "#0A0D64",
  },
  listTextSubheader: {
    fontSize: 15,
    fontWeight: "500",
    paddingBottom: 5,
    color: "#0A0D64",
  },
  listTextTertiary: {
    fontSize: 10,
    fontWeight: "400",
    color: "gray",
  },
  incrementContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  incrementText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#0A0D64",
    paddingHorizontal: 5,
  },
  badgeAndCaretContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  badge: {
      borderRadius: 16,
      backgroundColor: "#090C68",
  },
  topTabContainer: {
    width: Dimensions.get("window").width,
    // paddingTop: 200
  }
});