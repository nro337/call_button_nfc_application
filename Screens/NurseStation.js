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
} from "react-native";
import { Images } from "../App/Themes";
import CustButton from "../App/Components/CustButton";

import NfcManager, { NfcTech, Ndef, NfcEvents } from "react-native-nfc-manager";

export default function NurseStation({ navigation, route }) {
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


  return (
    <View>
      <View style={styles.container}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerText}>Nurse Station</Text>
        </View>
        <View style={styles.subheadingContainer}>
          <Text style={styles.subheaderText}>How would you like "a nurse" to assist you?</Text>
        </View>
        <View style={styles.buttonStyle}>
          <TouchableOpacity title='buttonTitle' onPress={readNdef} backgroundColor={'transparent'} style={{paddingHorizontal: 10}}>
            <Text style={{color: '#090C68', fontSize: 26}}>General Request</Text>
          </TouchableOpacity>
          <Image style={styles.logo} source={Images.nurseBottleDark} />
        </View>
        {/* <View style={styles.buttonStyle}>
          <TouchableOpacity title='buttonTitle' onPress={readNdef} backgroundColor={'transparent'} style={{paddingHorizontal: 10}}>
            <Text style={{color: '#090C68', fontSize: 26}}>Pain Indication</Text>
          </TouchableOpacity>
          <Image style={{}} source={Images.painRequest} />
        </View> */}
        <CustButton title="Pain Indication" icon="medkit-outline" size={20} fontSize={25} color="#090C68" backgroundColor="white" onPress={readNdef}></CustButton>
        <CustButton title="Bathroom" icon="water-outline" size={20} fontSize={25} color="#090C68" backgroundColor="white" onPress={readNdef}></CustButton>
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
    width: '10%',
    resizeMode: 'contain',
    tintColor: '#090C68'
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
    fontSize: 20,
    fontWeight: "600",
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
  buttonStyle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderColor: "#090C68",
    borderWidth: 3,
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 32,
    shadowOffset: {width: 4, height: 4},
    shadowColor: "black",
    shadowRadius: 4,
    shadowOpacity: 0.25,
    margin: 5,
    //width: Dimensions.get("screen").width * 0.8
  }
});