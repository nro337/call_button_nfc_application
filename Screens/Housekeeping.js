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
  Alert,
  Modal,
  Pressable,
} from "react-native";
import { Images } from "../App/Themes";
import {Ionicons, FontAwesome5} from '@expo/vector-icons';

import CustButton from "../App/Components/CustButton";

import NfcManager, { NfcTech, Ndef, NfcEvents } from "react-native-nfc-manager";

export default function Housekeeping({ navigation, route }) {
    useEffect(() => {
        initNfc();
      });
    
    const [scanMessage, setScanMessage] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [figureType, setFigureType] = useState('');
    const [modalImage, setModalImage] = useState('');
    const [requestType, setRequestType] = useState('');

  // Pre-step, call this before any NFC operations
  async function initNfc() {
    await NfcManager.start();
  }

  async function writeNdef({ type, value }) {
    setModalVisible(false)
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
        {/* <View style={styles.buttonStyle}>
          <TouchableOpacity title='buttonTitle' onPress={() => {setModalVisible(true), setFigureType('nurse figure'), setModalImage('nurseRequestPic1'), setRequestType('General Request')}} backgroundColor={'transparent'} style={{paddingHorizontal: 10}}>
            <Text style={{color: '#090C68', fontSize: 26}}>General Request</Text>
          </TouchableOpacity>
          <Image style={styles.logo} source={Images.nurseBottleDark} />
        </View> */}
        {/* <View style={styles.buttonStyle}>
          <TouchableOpacity title='buttonTitle' onPress={() => {setModalVisible(true), setFigureType('pain indication figure'), setModalImage('painRequest'), setRequestType('Pain Request')}} backgroundColor={'transparent'} style={{paddingHorizontal: 10}}>
            <Text style={{color: '#090C68', fontSize: 26}}>Pain Indication</Text>
          </TouchableOpacity>
          <Ionicons name="medkit-outline" size={25} color="#090C68" />
        </View>
        <View style={styles.buttonStyle}>
          <TouchableOpacity title='buttonTitle' onPress={() => {setModalVisible(true), setFigureType('bathroom figure'), setModalImage('bathroom'), setRequestType('Bathroom Request')}} backgroundColor={'transparent'} style={{paddingHorizontal: 10}}>
            <Text style={{color: '#090C68', fontSize: 26}}>Bathroom</Text>
          </TouchableOpacity>
          <FontAwesome5 name="toilet" size={20} color="#090C68" />
        </View> */}
        <CustButton title="Room Cleanup" icon="bed-outline" size={20} fontSize={25} color="#090C68" backgroundColor="white" onPress={() => {setModalVisible(true), setFigureType('housekeeping figure'), setModalImage('housekeepingBed'), setRequestType('Room Cleaning Request')}}></CustButton>
        <CustButton title="Extra Bedding" icon="bed-outline" size={20} fontSize={25} color="#090C68" backgroundColor="white" onPress={() => {setModalVisible(true), setFigureType('housekeeping figure'), setModalImage('housekeepingBed'), setRequestType('Extra Bedding Request')}}></CustButton>
        <CustButton title="New Toiletries" icon="medkit-outline" size={20} fontSize={25} color="#090C68" backgroundColor="white" onPress={() => {setModalVisible(true), setFigureType('housekeeping figure'), setModalImage('housekeepingBed'), setRequestType('New Toiletries Request')}}></CustButton>
        <View style={styles.centeredView}>
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View style={styles.topContainer}>
                  <Text style={styles.modalText}>Please tap the {figureType} to the bedside phone.</Text>
                  <TouchableOpacity onPress={() => setModalVisible(false)}><Ionicons name="close" size={40} color="black" /></TouchableOpacity>
                </View>
                <View style={styles.modalImageContainer}>
                  <Text style={{fontWeight: "600", fontSize: 18, maxWidth: 200, textAlign: "center"}}>Request: {requestType}</Text>
                  <Image style={styles.modalImage} source={Images[`${modalImage}`]} />
                </View>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={writeNdef}
                >
                  <Text style={styles.textStyle}>Ready to Scan</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
          {/* <Pressable
            style={[styles.button, styles.buttonOpen]}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.textStyle}>Show Modal</Text>
          </Pressable> */}
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
  modalImage: {
    height: '50%',
    width: '50%',
    resizeMode: "center",
    
  },
  modalImageContainer: {
    display: "flex", 
    flexDirection: "row", 
    justifyContent: "space-evenly", 
    alignItems: "center", 
    height: Dimensions.get("screen").height * 0.3
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
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    marginTop: Dimensions.get("screen").height * 0.3,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 19,
    maxWidth: 300,
  },
  topContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: Dimensions.get("screen").width
  }
});