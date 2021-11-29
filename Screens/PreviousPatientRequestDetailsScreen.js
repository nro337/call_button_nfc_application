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

export default function PreviousPatientRequestDetailsScreen({ navigation, route }) {

  const [search, setSearch] = useState("");

  const { item } = route.params;
  console.log(item)

  const DATA = [
    {
      id: '0',
      title: 'Pancakes',
      price: 1.50,
      image: Images.pancakes,
      quantity: 0,
    },
    {
      id: '1',
      title: 'Waffles',
      price: 1.50,
      image: Images.waffles,
      quantity: 0,
    },
    {
      id: '2',
      title: 'Bacon',
      price: 0.50,
      image: Images.bacon,
      quantity: 0,
    },
    {
      id: '3',
      title: 'Sausage',
      price: 0.50,
      image: Images.sausage,
      quantity: 0,
  },
  {
      id: '4',
      title: 'Toast',
      price: 0.50,
      image: Images.toast,
      quantity: 0,
  },
  ];

  const Item = ({ item }) => (
    <View style={styles.listItem}>
      {/* <Image style={styles.logo} source={image} /> */}
      <View style={styles.listTextContainer}>
        {item.hasOwnProperty('1') ? <Text style={styles.listTextHeader}>Pain/Medical Request</Text> : <Text style={{display: "none"}}></Text>}
        {item.hasOwnProperty('2') ? <Text style={styles.listTextHeader}>Restroom Request</Text> : <Text style={{display: "none"}}></Text>}
        {item.hasOwnProperty('3') ? <Text style={styles.listTextHeader}>General Request</Text> : <Text style={{display: "none"}}></Text>}
        {item.hasOwnProperty('4') ? <Text style={styles.listTextHeader}>Dining Request</Text> : <Text style={{display: "none"}}></Text>}
        {item.hasOwnProperty('5') ? <Text style={styles.listTextHeader}>Housekeeping Request</Text> : <Text style={{display: "none"}}></Text>}

        {item.hasOwnProperty('1') && item['1'] === '1' ? <Text style={styles.listTextSubheader}>HELP</Text> : <Text style={{display: "none"}}></Text>}
        {item.hasOwnProperty('1') && item['1'] === '2' ? <Text style={styles.listTextSubheader}>Medication - Tylenol</Text> : <Text style={{display: "none"}}></Text>}
        {item.hasOwnProperty('1') && item['1'] === '3' ? <Text style={styles.listTextSubheader}>Medication - Aleve</Text> : <Text style={{display: "none"}}></Text>}
        {item.hasOwnProperty('1') && item['1'] === '4' ? <Text style={styles.listTextSubheader}>Medication - Advil</Text> : <Text style={{display: "none"}}></Text>}
        {item.hasOwnProperty('1') && item['1'] === '5' ? <Text style={styles.listTextSubheader}>Medication - Motrin</Text> : <Text style={{display: "none"}}></Text>}
        {item.hasOwnProperty('1') && item['1'] === '6' ? <Text style={styles.listTextSubheader}>Medication - Celebrex</Text> : <Text style={{display: "none"}}></Text>}

        {item.hasOwnProperty('2') && item['2'] === '1' ? <Text style={styles.listTextSubheader}>Help to/from Restroom</Text> : <Text style={{display: "none"}}></Text>}

        {item.hasOwnProperty('3') && item['3'] === '1' ? <Text style={styles.listTextSubheader}>Help Getting Out of Bed</Text> : <Text style={{display: "none"}}></Text>}
        {item.hasOwnProperty('3') && item['3'] === '2' ? <Text style={styles.listTextSubheader}>Change gauze/bandages</Text> : <Text style={{display: "none"}}></Text>}
        {item.hasOwnProperty('3') && item['3'] === '3' ? <Text style={styles.listTextSubheader}>Counseling patient/family</Text> : <Text style={{display: "none"}}></Text>}
        {item.hasOwnProperty('3') && item['3'] === '4' ? <Text style={styles.listTextSubheader}>Control Lighting</Text> : <Text style={{display: "none"}}></Text>}
        {item.hasOwnProperty('3') && item['3'] === '5' ? <Text style={styles.listTextSubheader}>Change Thermostat</Text> : <Text style={{display: "none"}}></Text>}
        {item.hasOwnProperty('3') && item['3'] === '6' ? <Text style={styles.listTextSubheader}>Request shower/wash assistance</Text> : <Text style={{display: "none"}}></Text>}

        {item.hasOwnProperty('4') && item['4'] === '1' ? <Text style={styles.listTextSubheader}>Dining Request TBD...</Text> : <Text style={{display: "none"}}></Text>}

        {item.hasOwnProperty('5') && item['5'] === '1' ? <Text style={styles.listTextSubheader}>Request Blankets</Text> : <Text style={{display: "none"}}></Text>}
        {item.hasOwnProperty('5') && item['5'] === '2' ? <Text style={styles.listTextSubheader}>Request Pillow</Text> : <Text style={{display: "none"}}></Text>}
        {item.hasOwnProperty('5') && item['5'] === '3' ? <Text style={styles.listTextSubheader}>Request Room Cleaning</Text> : <Text style={{display: "none"}}></Text>}
        {item.hasOwnProperty('5') && item['5'] === '4' ? <Text style={styles.listTextSubheader}>Out of Toilet Paper</Text> : <Text style={{display: "none"}}></Text>}
        {item.hasOwnProperty('5') && item['5'] === '5' ? <Text style={styles.listTextSubheader}>Out of Tissue</Text> : <Text style={{display: "none"}}></Text>}
        {item.hasOwnProperty('5') && item['5'] === '6' ? <Text style={styles.listTextSubheader}>Out of Soap</Text> : <Text style={{display: "none"}}></Text>}
        
        {/* <Text style={styles.listTextSubheader}>$ {price}/unit</Text> */}
      </View>
      <View style={styles.incrementContainer}>
        {/* {item.hasOwnProperty('1') ? <Text style={styles.incrementText}>{item['1']}</Text> : <Text style={{display: "none"}}></Text>} */}
        {/* <Text style={styles.incrementText}>{quantity}</Text> */}
      </View>
    </View>
  );

  const renderItem = ({ item }) => (
    <Item item={item} />
  );


  return (
    <View>
      <View style={styles.container}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerText}>Request Details</Text>
        </View>
        <View style={styles.subheadingContainer}>
          <Text style={styles.subheaderText}>Here are the previous request details.</Text>
        </View>
        <View style={styles.flatListContainer}>
          <FlatList
            data={item.msg_payload}
            renderItem={renderItem}
            keyExtractor={item => item._id}
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
  searchBarContainer: {
    width: Dimensions.get("screen").width * 0.8
  },  
  searchBar: {
    
  },
  flatListContainer: {
    width: Dimensions.get("screen").width,
    borderWidth: 2,
    borderColor: "black",
    paddingHorizontal: 1,
    // paddingHorizontal: 50,
    ...Platform.select({
      ios: {
        height: Dimensions.get("window").height * 0.6,
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
  },
  listTextContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  listTextHeader: {
    fontSize: 30,
    fontWeight: "700",
    paddingBottom: 5,
    color: "#0A0D64",
  },
  listTextSubheader: {
    fontSize: 25,
    fontWeight: "500",
    color: "#0A0D64",
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
  }
});