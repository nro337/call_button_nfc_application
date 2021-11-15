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
import { Images } from "../App/Themes";
import CustButton from "../App/Components/CustButton";
import NfcManager, { NfcTech, Ndef, NfcEvents } from "react-native-nfc-manager";
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';

import {Ionicons} from '@expo/vector-icons';

export default function OrderSummary({ navigation, route }) {
    useEffect(() => {
        initNfc();
      });
    
    const [scanMessage, setScanMessage] = useState("");


      // Pre-step, call this before any NFC operations
  async function initNfc() {
    await NfcManager.start();
  }

  async function writeNdef({ type, value }) {
    let result = false;

    try {
      // Step 1
      await NfcManager.requestTechnology(NfcTech.Ndef, {
        alertMessage: "Please hold toy to phone to send request",
      });

      const bytes = Ndef.encodeMessage([Ndef.textRecord("Hello NFC")]);

      if (bytes) {
        await NfcManager.ndefHandler // Step2
          .writeNdefMessage(bytes); // Step3

        if (Platform.OS === "ios") {
          await NfcManager.setAlertMessageIOS("Successfully write NDEF");
        }
      }

      result = true;
    } catch (ex) {
      console.warn(ex);
    }

    // Step 4
    NfcManager.cancelTechnologyRequest().catch(() => 0);
    return result;
  }

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
    
      const Item = ({ title, price, image, quantity }) => (
        <View style={styles.listItem}>
          <Image style={styles.logo} source={image} />
          <View style={styles.listTextContainer}>
            <Text style={styles.listTextHeader}>{title}</Text>
            <Text style={styles.listTextSubheader}>$ {price}/unit</Text>
            <Text style={styles.listTextItemPrice}>$4.00</Text>
          </View>
          <View style={styles.rowRightContainer}>
            <TouchableOpacity style={{paddingBottom: 10}}>
                <Ionicons name="close-outline" size={30} color="gray" />
            </TouchableOpacity>
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

        </View>
      );
    
      const renderItem = ({ item }) => (
        <Item title={item.title} price={item.price} image={item.image} quantity={item.quantity} />
      );
    
    
      return (
        <View>
          <View style={styles.container}>
            <View style={styles.headerTextContainer}>
              <Text style={styles.headerText}>Order Summary</Text>
            </View>
            <View style={styles.subheadingContainer}>
              <Text style={styles.subheaderText}>Review your selected food items and continue.</Text>
            </View>
            <Text style={styles.flatlistHeaderText}>Items:</Text>
            <View style={styles.flatListContainer}>
              <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={item => item.id}
              />
            </View>
            <View style={styles.totalTextContainer}>
                <Text style={styles.totalText}>Total</Text>
                <Text style={styles.orderTotalText}>$5.50</Text>
            </View>
            <CustButton title="Write to NFC" icon="chevron-forward-outline" size={20} fontSize={25} color="white" backgroundColor="#090C68" onPress={writeNdef}></CustButton>
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
        fontSize: 15,
        fontWeight: "500",
        color: "#0A0D64",
      },
      listTextItemPrice: {
        fontSize: 20,
        fontWeight: "600",
        color: "red",
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
      rowRightContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-end",
      },
      flatlistHeaderText: {
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          width: Dimensions.get("screen").width,
          fontSize: 25,
          paddingBottom: 10,
          paddingLeft: 5,
          color: "#090C68",
          fontWeight: "600",
      },
      totalTextContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: Dimensions.get("screen").width * 0.9,
        paddingBottom: 10,
      },
      totalText: {
          fontSize: 25,
          fontWeight: "600",
          color: "#090C68",
          paddingLeft: 5
      },
      orderTotalText: {
        fontSize: 25,
        fontWeight: "600",
        color: "red",
        
      },
});