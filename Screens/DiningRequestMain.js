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

export default function DiningRequestMain({ navigation, route }) {

  const [search, setSearch] = useState("");

  const DATA = [
    {
      id: '0',
      title: 'Pancakes',
      price: 1.50,
      image: Images.patientHomeImage,
      quantity: 0,
    },
    {
      id: '1',
      title: 'Waffles',
      price: 1.50,
      image: Images.patientHomeImage,
      quantity: 0,
    },
    {
      id: '2',
      title: 'Bacon',
      price: 0.50,
      image: Images.patientHomeImage,
      quantity: 0,
    },
  ];

  const Item = ({ title, price, image, quantity }) => (
    <View style={styles.listItem}>
      <Image style={styles.logo} source={image} />
      <View style={styles.listTextContainer}>
        <Text style={styles.listTextHeader}>{title}</Text>
        <Text style={styles.listTextSubheader}>$ {price}</Text>
      </View>
      <View style={styles.incrementContainer}>
        <TouchableOpacity>
          <Ionicons name="add-circle-outline" size={25} color="gray" />
        </TouchableOpacity>
        <Text style={styles.incrementText}>{quantity}</Text>
        <TouchableOpacity>
          <Ionicons name="remove-circle-outline" size={25} color="gray" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderItem = ({ item }) => (
    <Item title={item.title} price={item.price} image={item.image} quantity={item.quantity} />
  );


  return (
    <View>
      <View style={styles.container}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerText}>Dining Request</Text>
        </View>
        <View style={styles.subheadingContainer}>
          <Text style={styles.subheaderText}>Please select which food item you would like.</Text>
        </View>
        <View style={styles.searchBarContainer}>
          <SearchBar
            placeholder="Type Here..."
            onChangeText={(search) => setSearch(search)}
            value={search}
            style={styles.searchBar}
            platform={Platform.OS}
          />
        </View>
        <View style={styles.flatListContainer}>
          <FlatList
            data={DATA}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </View>
        <CustButton title="Review Order" icon="chevron-forward-outline" size={20} fontSize={25} color="white" backgroundColor="#090C68" onPress={() => navigation.navigate('Patient Home Screen')}></CustButton>
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
    width: '20%',
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
    // paddingHorizontal: 50,
    ...Platform.select({
      ios: {
        height: Dimensions.get("window").height * 0.3,
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
    justifyContent: "flex-start",
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
    fontSize: 25,
    fontWeight: "700",
    paddingBottom: 5,
    color: "#0A0D64",
  },
  listTextSubheader: {
    fontSize: 20,
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