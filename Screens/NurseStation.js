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
  Alert,
  Modal,
  Pressable,
} from "react-native";
import {Picker} from '@react-native-picker/picker';
import { Images } from "../App/Themes";
import CustButton from "../App/Components/CustButton";

import NfcManager, { NfcTech, Ndef, NfcEvents } from "react-native-nfc-manager";
import {Ionicons, FontAwesome5} from '@expo/vector-icons';
const dbConfig = require('../App/Config/database.config');

export default function NurseStation({ navigation, route }) {
    useEffect(() => {
        initNfc();
      });
    
    const [scanMessage, setScanMessage] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [figureType, setFigureType] = useState('');
    const [modalImage, setModalImage] = useState('');
    const [requestType, setRequestType] = useState('');
    const [selectedGeneralRequest, setSelectedGeneralRequest] = useState('');
    const [writeString, setWriteString] = useState('');


  // Pre-step, call this before any NFC operations
  async function initNfc() {
    await NfcManager.start();
  }

  async function constructWriteString(){
    const patient_id_string = "123";
    const provider_id_string = "1";
    let message_id_string = "";
    var requestTypeString = "";
    const status_string = "new";

    if(requestType === "General Request"){
      requestTypeString = "3"
    }
    var msg_payload = [];
    var orderObject = {};
    orderObject[requestTypeString] = selectedGeneralRequest
    msg_payload.push(JSON.stringify(orderObject));

    await fetch(`http://${dbConfig.mobileURL}:5000/patient-requests`)
      .then((resp) => resp.json())
      .then((data) => {
        let latest_message_id = data[data.length - 1]["message_id"]
        message_id_string = (parseInt(latest_message_id) + 1).toString()
        var myObj = {}
        myObj['patient_id'] = patient_id_string
        myObj['provider_id'] = provider_id_string
        myObj['status'] = status_string
        myObj['message_id'] = message_id_string
        myObj['msg_payload'] = msg_payload
        //console.log(JSON.stringify(myObj))
        // let final_arr = [];
        // final_arr.push(`"${patient_id_string}"`, `"${provider_id_string}"`, `"${status_string}"`, `"${message_id_string}"`, `"${msg_payload}"`);
        //var test = `${final_arr}`;
        setWriteString(JSON.stringify(myObj))
      })

  }

  console.log(writeString)

  async function writeNdef({ type, value }) {
    setModalVisible(false)

    await constructWriteString();

    let result = false;

    try {
      // Step 1
      await NfcManager.requestTechnology(NfcTech.Ndef, {
        alertMessage: "Ready to write to NFC",
      });

      const bytes = Ndef.encodeMessage([Ndef.textRecord(writeString)]);
      

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


  return (
    <View>
      <View style={styles.container}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerText}>Nurse Station</Text>
        </View>
        <View style={styles.subheadingContainer}>
          <Text style={styles.subheaderText}>
            How would you like a "nurse" to assist you?
          </Text>
        </View>
        <View style={styles.buttonStyle}>
          <TouchableOpacity
            title="buttonTitle"
            onPress={() => {
              setModalVisible(true),
                setFigureType("nurse figure"),
                setModalImage("nurseRequestPic1"),
                setRequestType("General Request");
            }}
            backgroundColor={"transparent"}
            style={{ paddingHorizontal: 10 }}
          >
            <Text style={{ color: "#090C68", fontSize: 26 }}>
              General Request
            </Text>
          </TouchableOpacity>
          <Image style={styles.logo} source={Images.nurseBottleDark} />
        </View>
        <View style={styles.buttonStyle}>
          <TouchableOpacity
            title="buttonTitle"
            onPress={() => {
              setModalVisible(true),
                setFigureType("pain indication figure"),
                setModalImage("painRequest"),
                setRequestType("Pain Request");
            }}
            backgroundColor={"transparent"}
            style={{ paddingHorizontal: 10 }}
          >
            <Text style={{ color: "#090C68", fontSize: 26 }}>
              Pain Indication
            </Text>
          </TouchableOpacity>
          <Ionicons name="medkit-outline" size={25} color="#090C68" />
        </View>
        <View style={styles.buttonStyle}>
          <TouchableOpacity
            title="buttonTitle"
            onPress={() => {
              setModalVisible(true),
                setFigureType("bathroom figure"),
                setModalImage("bathroom"),
                setRequestType("Bathroom Request");
            }}
            backgroundColor={"transparent"}
            style={{ paddingHorizontal: 10 }}
          >
            <Text style={{ color: "#090C68", fontSize: 26 }}>Bathroom</Text>
          </TouchableOpacity>
          <FontAwesome5 name="toilet" size={20} color="#090C68" />
        </View>
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
                  <Text style={styles.modalText}>
                    Please tap the {figureType} to the bedside phone.
                  </Text>
                  <TouchableOpacity onPress={() => setModalVisible(false)}>
                    <Ionicons name="close" size={40} color="black" />
                  </TouchableOpacity>
                </View>
                <View style={{height: 180, width: Dimensions.get("screen").width}}>
                  <Picker
                    selectedValue={selectedGeneralRequest}
                    onValueChange={(itemValue, itemIndex) =>
                      setSelectedGeneralRequest(itemValue)
                    }
                    itemStyle={{color: 'black'}}
                  >
                    <Picker.Item label="Help Getting Out of Bed" value="1" color='black' />
                    <Picker.Item label="Change Gauze/Bandages" value="2" color='black'/>
                    <Picker.Item label="Counseling Patient/Family" value="3" color='black'/>
                    <Picker.Item label="Control Lighting" value="4" color='black'/>
                    <Picker.Item label="Change Thermostat" value="5" color='black'/>
                    <Picker.Item label="Request Shower/Wash Help" value="6" color='black'/>
                  </Picker>
                </View>

                <View style={styles.modalImageContainer}>
                  <Text
                    style={{
                      fontWeight: "600",
                      fontSize: 18,
                      maxWidth: 200,
                      textAlign: "center",
                    }}
                  >
                    Request: {requestType}
                  </Text>
                  <Image
                    style={styles.modalImage}
                    source={Images[`${modalImage}`]}
                  />
                </View>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={writeNdef}
                >
                  <Text style={styles.textStyle}>Ready to Scan</Text>
                </Pressable>
                <Button title="Text" onPress={constructWriteString}></Button>
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
  logo: {
    height: '100%',
    width: '10%',
    resizeMode: 'contain',
    tintColor: '#090C68'
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
    width: Dimensions.get("screen").width * 0.8
  },

  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    marginTop: Dimensions.get("screen").height * 0.15,
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