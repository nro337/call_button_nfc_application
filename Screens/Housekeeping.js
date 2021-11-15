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
} from "react-native";
import { Images } from "../App/Themes";

import CustButton from "../App/Components/CustButton";

import NfcManager, { NfcTech, Ndef, NfcEvents } from "react-native-nfc-manager";

export default function Housekeeping({ navigation, route }) {
    useEffect(() => {
        initNfc();
      });
    
    const [scanMessage, setScanMessage] = useState("");

  // Pre-step, call this before any NFC operations
  async function initNfc() {
    await NfcManager.start();
  }

  function readNdef() {
    const cleanUp = () => {
      NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
      NfcManager.setEventListener(NfcEvents.SessionClosed, null);
    };

    return new Promise((resolve) => {
      let tagFound = null;

      NfcManager.setEventListener(NfcEvents.DiscoverTag, (tag) => {
        tagFound = tag;
        //https://stackoverflow.com/questions/3195865/converting-byte-array-to-string-in-javascript
        setScanMessage(
          String.fromCharCode.apply(null, tagFound.ndefMessage[0].payload).substring(3)
        );
        //NfcManager.setAlertMessageIOS(NfcManager.ndefHandler.getNdefMessage(Ndef.text.decodePayload([tagFound])));
        resolve(tagFound);
        NfcManager.setAlertMessageIOS("NDEF tag found");
        NfcManager.unregisterTagEvent().catch(() => 0);
      });

      NfcManager.setEventListener(NfcEvents.SessionClosed, () => {
        cleanUp();
        if (!tagFound) {
          resolve();
        }
      });

      NfcManager.registerTagEvent();
    });
  }

  // const { myParam } = route.params;

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.headerTextContainer}>
            <Text style={styles.headerText}>Housekeeping</Text>
        </View>
        <View style={styles.subtextContainer}>
            <Text style={styles.header2Text}>How would you like "housekeeping" to assist you?</Text>
        </View>
        <CustButton title="Room Cleanup" icon="bed-outline" size={20} fontSize={25} color="#090C68" backgroundColor="white" onPress={readNdef}></CustButton>
        <CustButton title="Extra Bedding" icon="bed-outline" size={20} fontSize={25} color="#090C68" backgroundColor="white" onPress={readNdef}></CustButton>
        <CustButton title="New Toiletries" icon="medkit-outline" size={20} fontSize={25} color="#090C68" backgroundColor="white" onPress={readNdef}></CustButton>
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
  headerText: {
    color: "#090C68",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "600",
  },
  header2Text: {
    color: "#000000",
    fontSize: 20,
    fontWeight: "600",
  },
  subtextContainer: {
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
});