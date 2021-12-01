import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, Dimensions, Switch, TouchableOpacity } from "react-native";

import NfcManager, { NfcTech, Ndef, NfcEvents } from "react-native-nfc-manager";

const dbConfig = require('../App/Config/database.config');


export default function AlwaysOnNFC() {
  useEffect(() => {
    initNfc();
  });

  const [scanMessage, setScanMessage] = useState("");
  const [isEnabled, setIsEnabled] = useState(true);
  const [buttonText, setButtonText] = useState('On');

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

      const bytes = Ndef.encodeMessage([Ndef.textRecord("Hello 123")]);

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
        //var msg = scanMessage.slice(1,-1)
        var obj = JSON.parse(scanMessage)
        //console.log(JSON.parse(obj.msg_payload))
        //console.log(JSON.parse(scanMessage))
        var keyy = Object.keys(JSON.parse(obj.msg_payload))[0]
        var value = Object.values(JSON.parse(obj.msg_payload))[0]
        console.log(JSON.parse(obj.msg_payload))
        
        // let msg2 = `[${scanMessage}]`
        // console.log(JSON.parse(msg2))
        //console.log(JSON.parse(msg2))
        // let a = `"[${scanMessage}]"`;
        // console.log(JSON.parse(a))

        fetch(`http://${dbConfig.mobileURL}:5000/patient-requests`, {
          method: 'POST',
          body: JSON.stringify({
            'patient_id': obj.patient_id,
            'provider_id': obj.provider_id,
            'req_timestamp': new Date(Date.now()),
            'status': obj.status,
            'message_id': obj.message_id,
            'msg_payload': [JSON.parse(obj.msg_payload)],
          }),
          // body: obj,
          headers: {
            "Content-type": "application/json",
            "Accept": "application/json",
          }
        })
          .then((response) => response.json())
          .then((json) => console.log(json))


        //Posting a new review to the DB
        // $(document).ready(function(){
        //   $("#reviewForm").submit(function(e){
        //       var newTitle = $('#userName').val();
        //       var newContent = $("#movieFeedback").val();
        //       var newMovie = $('#movieName').val();
        //       var newRating = $('#movieRating').val();
        //       e.preventDefault();
        //       var data = {};
        //       data.title = newTitle;
        //       data.content = newContent;
        //       data.movie = newMovie;
        //       data.rating = newRating;

        //       $.ajax({
        //           type: 'POST',
        //           data: JSON.stringify(data),
        //           contentType: 'application/json',
        //           url: 'http://127.0.0.1:4200/filmreviews',
        //           success: function(data){
        //               document.getElementById("reviewForm").reset();
        //               window.location.replace("http://127.0.0.1:3000/reviews");
        //               $(document).ready(function(){
        //                   loadReviewList();
        //               });

        //           },
        //           error: function(data){
        //               alert("error" + data.error);
        //           }
        //       })
        //   });
        // })


        NfcManager.setAlertMessageIOS("NFC tag found");
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

  if(!isEnabled){
    setButtonText('Off')
  } 

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.headerTextContainer}>
        <Text style={styles.headerText}>NFC Reader</Text>
      </View>

      <TouchableOpacity style={styles.nfcbutton} onPress={readNdef}>
        <Text style={styles.nfcButtonText}>NFC Reader is {buttonText}</Text>
      </TouchableOpacity>
      <View>
        <Button title="Write" onPress={writeNdef}></Button>
        <Button title="Read" onPress={readNdef}></Button>
      </View>
      {/* <View style={styles.switchContainer}>
        <Text style={{fontSize: 15, fontWeight: "500", paddingRight: 10}}>Off</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#0A0D64" }}
          thumbColor={isEnabled ? "white" : "#0A0D64"}
          ios_backgroundColor="white"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View> */}


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