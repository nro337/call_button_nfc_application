import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useCallback } from "react";
import { SafeAreaView, StyleSheet, Text, View, Button, Image, Platform, Dimensions } from "react-native";
import * as SplashScreen from 'expo-splash-screen';
import { Images } from './App/Themes/';
import NfcManager, { NfcTech, Ndef, NfcEvents } from "react-native-nfc-manager";

import AppNavigation from "./Navigation/AppNavigation";


export default function App() {
  const [scanMessage, setScanMessage] = useState("");
  const [appIsReady, setAppIsReady] = useState(false);
  useEffect(() => {
    initNfc();
    
    async function prepare() {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();
        //await SplashScreen.hideAsync();
        // Pre-load fonts, make any API calls you need to do here
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        //await new Promise(resolve => setTimeout(resolve, 2000));
        //setTimeout(() => appIsReady = true, 2000);
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  });



  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  // if (!appIsReady) {
  //   return null;
  // }


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



  if (!appIsReady){
    return (

            <SafeAreaView style={styles.safeAreaViewContainer}>
            <StatusBar />
            <View style={styles.container2} onLayout={onLayoutRootView}>
              {/* <AppNavigation /> */}
              <Image style={styles.logo} source={Images.logo} />
              {/* <Text>NFC Read/Write MVP</Text>
                  <StatusBar style="auto" />
                  <Button title="Write" onPress={writeNdef}></Button>
                  <Button title="Read" onPress={readNdef}></Button>
                  <Text>{scanMessage}</Text> */}
            </View>
          </SafeAreaView>
    )};

    return (
      <SafeAreaView style={styles.safeAreaViewContainer}>
        <StatusBar />
        <View style={styles.container} onLayout={onLayoutRootView}>
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
});
