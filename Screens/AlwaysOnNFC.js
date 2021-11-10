import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, Dimensions, Switch } from "react-native";

import NfcManager, { NfcTech, Ndef, NfcEvents } from "react-native-nfc-manager";


export default function AlwaysOnNFC() {
  useEffect(() => {
    initNfc();
  });

  const [scanMessage, setScanMessage] = useState("");
  const [isEnabled, setIsEnabled] = useState(false);

  //https://reactnative.dev/docs/switch
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);





  // Pre-step, call this before any NFC operations
  async function initNfc() {
    await NfcManager.start();
  }

  async function writeNdef({ type, value }) {
    let result = false;

    try {
      // Step 1
      await NfcManager.requestTechnology(NfcTech.Ndef, {
        alertMessage: "Ready to write some NDEF",
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

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.headerTextContainer}>
        <Text style={styles.headerText}>NFC Read/Write MVP</Text>
      </View>

      <View style={styles.nfcbutton}>
        <Text style={styles.nfcButtonText}>NFC Reader is OFF</Text>
      </View>
      <View>
        <Button title="Write" onPress={writeNdef}></Button>
        <Button title="Read" onPress={readNdef}></Button>
      </View>
      <View style={styles.switchContainer}>
        <Text style={{fontSize: 15, fontWeight: "500", paddingRight: 10}}>Off</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#0A0D64" }}
          thumbColor={isEnabled ? "white" : "#0A0D64"}
          ios_backgroundColor="white"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>


      <Text>{scanMessage}</Text>
    </View>
  );
}



const styles = StyleSheet.create({
  safeAreaViewContainer: {
    backgroundColor: 'black'
  },
  container: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "space-around",
    ...Platform.select({
      ios: {
        height: Dimensions.get('window').height,
      }
    })
  },
  logo: {
    height: '50%',
    width: '50%',
    resizeMode: 'contain',
  },
  container2: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#090C68",
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      ios: {
        height: Dimensions.get('window').height,
      }
    })
  },
  headerTextContainer: {
    display: "flex",
    flexDirection: "row",
    alignSelf: "flex-start",
    justifyContent: "center",
    paddingLeft: 40,
  },
  headerText: {
    fontSize: 25,
    fontWeight: "600",
  },
  nfcbutton: {
    borderRadius: 256,
    width: 300,
    height: 300,
    backgroundColor: "#0A0D64",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  nfcButtonText: {
    color: "white",
    fontSize: 30,
  },
  switchContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  }
});