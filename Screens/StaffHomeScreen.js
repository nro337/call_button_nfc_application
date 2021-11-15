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
  FlatList,
} from "react-native";
import { SearchBar } from "react-native-elements";
import { Images } from "../App/Themes";
import CustButton from "../App/Components/CustButton";

import {Ionicons} from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons'; 

export default function StaffHomeScreen({ navigation, route }) {

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

  const Item = ({ name, roomNumber, icon, requestType, order }) => (
    <TouchableOpacity style={styles.listItem}>
      <FontAwesome5 name={icon} size={40} color="#090C68" />
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

  const renderItem = ({ item }) => (
    <Item name={item.name} roomNumber={item.roomNumber} icon={item.icon} requestType={item.requestType} order={item.order} />
  );


  return (
    <View>
      <View style={styles.container}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerText}>Patient Requests</Text>
        </View>
        <View style={styles.subheadingContainer}>
          <Text style={styles.subheaderText}>View all patient requests below.</Text>
        </View>
        <View style={styles.flatListContainer}>
          <FlatList
            data={DATA}
            renderItem={renderItem}
            keyExtractor={item => item.id}
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
  }
});