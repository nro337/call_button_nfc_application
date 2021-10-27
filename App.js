import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View, Button, Image, Platform, Dimensions } from "react-native";

import { Images } from './App/Themes/';
import NfcManager, { NfcTech, Ndef, NfcEvents } from "react-native-nfc-manager";

import AppNavigation from "./Navigation/AppNavigation";


export default function App() {
  useEffect(() => {
    initNfc();
  });

  const [scanMessage, setScanMessage] = useState("");





  // Pre-step, call this before any NFC operations
  async function initNfc() {
    //wait NfcManager.start();
  }

  // async function writeNdef({ type, value }) {
  //   let result = false;

  //   try {
  //     // Step 1
  //     await NfcManager.requestTechnology(NfcTech.Ndef, {
  //       alertMessage: "Ready to write some NDEF",
  //     });

  //     const bytes = Ndef.encodeMessage([Ndef.textRecord("Hello NFC")]);

  //     if (bytes) {
  //       await NfcManager.ndefHandler // Step2
  //         .writeNdefMessage(bytes); // Step3

  //       if (Platform.OS === "ios") {
  //         await NfcManager.setAlertMessageIOS("Successfully write NDEF");
  //       }
  //     }

  //     result = true;
  //   } catch (ex) {
  //     console.warn(ex);
  //   }

  //   // Step 4
  //   NfcManager.cancelTechnologyRequest().catch(() => 0);
  //   return result;
  // }

  // function readNdef() {
  //   const cleanUp = () => {
  //     NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
  //     NfcManager.setEventListener(NfcEvents.SessionClosed, null);
  //   };

  //   return new Promise((resolve) => {
  //     let tagFound = null;

  //     NfcManager.setEventListener(NfcEvents.DiscoverTag, (tag) => {
  //       tagFound = tag;
  //       //https://stackoverflow.com/questions/3195865/converting-byte-array-to-string-in-javascript
  //       setScanMessage(
  //         String.fromCharCode.apply(null, tagFound.ndefMessage[0].payload).substring(3)
  //       );
  //       //NfcManager.setAlertMessageIOS(NfcManager.ndefHandler.getNdefMessage(Ndef.text.decodePayload([tagFound])));
  //       resolve(tagFound);
  //       NfcManager.setAlertMessageIOS("NDEF tag found");
  //       NfcManager.unregisterTagEvent().catch(() => 0);
  //     });

  //     NfcManager.setEventListener(NfcEvents.SessionClosed, () => {
  //       cleanUp();
  //       if (!tagFound) {
  //         resolve();
  //       }
  //     });

  //     NfcManager.registerTagEvent();
  //   });
  // }



//   let script = document.createElement("script");
// script.setAttribute("type", "text/javascript");
// script.text = "if (!crossOriginIsolated) SharedArrayBuffer = ArrayBuffer;";
// document.body.appendChild(script);



  return (
    <SafeAreaView style={styles.safeAreaViewContainer}>
      <StatusBar />
      <View style={styles.container}>
        <AppNavigation />
      {/* <Text>NFC Read/Write MVP</Text>
      <StatusBar style="auto" />
      <Button title="Write" onPress={writeNdef}></Button>
      <Button title="Read" onPress={readNdef}></Button>
      <Text>{scanMessage}</Text> */}
    </View>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  safeAreaViewContainer: {
    backgroundColor: 'black'
  },
  container: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "black",
    alignItems: "stretch",
    justifyContent: "center",
    ...Platform.select({
      ios: {
        height: Dimensions.get('window').height,
      }
    })
  },
});
