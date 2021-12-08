import React, { useState, useEffect } from "react";
import {
  Animated,
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
  RefreshControl,
  Modal,
  Pressable,
} from "react-native";
import { SearchBar } from "react-native-elements";
import {Picker} from '@react-native-picker/picker';
import { Images } from "../App/Themes";
import CustButton from "../App/Components/CustButton";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { TabView, SceneMap } from 'react-native-tab-view';

const dbConfig = require('../App/Config/database.config');

const Tab = createMaterialTopTabNavigator();
const TabStack = createStackNavigator();

import {Ionicons} from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons'; 

export default function PendingRequests( {navigation, route, item}) {
  const [reqHeader, setReqHeader] = useState('')
  const [allReq, setAllReq] = useState([]);
  const [allStaff, setAllStaff] = useState([]);
  const [allPatient, setAllPatient] = useState([]);
  const [tabLength, setTabLength] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [figureType, setFigureType] = useState('');
  const [modalImage, setModalImage] = useState('');
  const [requestType, setRequestType] = useState('');
  const [selectedGeneralRequest, setSelectedGeneralRequest] = useState('');
  const [currentReq, setCurrentReq] = useState({});
  const [currentName, setCurrentName] = useState('');
  // const [writeString, setWriteString] = useState('');

  //console.log('hi')
  //console.log(item)


  //https://stackoverflow.com/questions/53332321/react-hook-warnings-for-async-function-in-useeffect-useeffect-function-must-ret
  // useEffect(() => {
  //   let i=0;
  //   setLoading(true)
  //   async function getPatientReq() {
  //     await fetch(`http://${dbConfig.mobileURL}:5000/patient-requests`)
  //     .then((resp) => resp.json())
  //     .then((data) => {
  //       data.forEach(request => {
  //         if(request.status === 'error'){
  //           setTabLength(tabLength => [...tabLength, request])
  //           //setTabLength()
  //         }
  //         setAllReq(allReq => [...allReq, request])
  //         //allReq.push(request)
  //       })
  //       setReqHeader(data[0].patient_id)
  //       setLoading(false)
  //     })
  //   }

  //   getPatientReq()
  // }, [])
  

  const loadRequests = async () => {
    setLoading(true)
    setAllReq([])
    await fetch(`http://${dbConfig.mobileURL}:5000/patient-requests`)
    .then((resp) => resp.json())
    .then((data) => {
      data.forEach(request => {
        if(request.status === 'error'){
          setTabLength(tabLength => [...tabLength, request])
          //setTabLength()
        }
        setAllReq(allReq => [...allReq, request])
        //allReq.push(request)
      })
      setReqHeader(data[0].patient_id)
      setLoading(false)
    })
  }

  const onRefresh = React.useCallback(() => {
    console.log('refreshing')
    setRefreshing(true);
    loadRequests();
    setRefreshing(false);
  }, []);

  useEffect(() => { loadRequests() }, []);

  //console.log(allReq);

  // useEffect(() => {
  //   fetch(`http://${dbConfig.mobileURL}:5000/providers`)
  //     .then((resp2) => resp2.json())
  //     .then((data2) => {
  //       console.log(data2);
  //       //setReqHeader(data[0].patient_id)
  //     })
  // }, [])

  useEffect(() => {
    fetch(`http://${dbConfig.mobileURL}:5000/staff`)
      .then((resp3) => resp3.json())
      .then((data3) => {
        data3.forEach(staff => {
          //console.log(staff)
          setAllStaff(allStaff => [...allStaff, staff])
        })
        //setReqHeader(data[0].patient_id)
      })
  }, [])

  useEffect(() => {
    fetch(`http://${dbConfig.mobileURL}:5000/patient`)
      .then((resp4) => resp4.json())
      .then((data4) => {
        data4.forEach(patient => {
          //console.log(patient)
          setAllPatient(allPatient => [...allPatient, patient])
        })
        //setReqHeader(data[0].patient_id)
      })
  }, [])

  const Item = ({ patient_id, provider_id, timestamp, status, message_id, msg_payload, name, item }) => (
    <TouchableOpacity style={styles.listItem} onPress={() => {
      setModalVisible(true),
      setFigureType("nurse figure"),
      setModalImage("nurseRequestPic1"),
      setRequestType("General Request"),
      setCurrentReq(item);
      setCurrentName(name);
    }}>
      {/* <FontAwesome5 name={icon} size={40} color="#090C68" /> */}

      {Object.keys(msg_payload[0])[0] === "1" ? <FontAwesome5 name="prescription-bottle-alt" size={30} color="#090C68" /> : <Text style={{display: "none"}}></Text>}
        {Object.keys(msg_payload[0])[0] === "2" ? <FontAwesome5 name="toilet" size={30} color="#090C68" /> : <Text style={{display: "none"}}></Text>}
        {Object.keys(msg_payload[0])[0] === "3" ? <FontAwesome5 name="hand-holding-medical" size={30} color="#090C68" /> : <Text style={{display: "none"}}></Text>}
        {Object.keys(msg_payload[0])[0] === "4" ? <FontAwesome5 name="coffee" size={30} color="#090C68" /> : <Text style={{display: "none"}}></Text>}
        {Object.keys(msg_payload[0])[0] === "5" ? <FontAwesome5 name="bed" size={30} color="#090C68" /> : <Text style={{display: "none"}}></Text>}

      <View style={styles.listTextContainer}>
        <Text style={styles.listTextHeader}>{name}</Text>
        {Object.keys(msg_payload[0])[0] === "1" ? <Text style={styles.listTextSubheader}>Pain/Medical Request</Text> : <Text style={{display: "none"}}></Text>}
        {Object.keys(msg_payload[0])[0] === "2" ? <Text style={styles.listTextSubheader}>Restroom Request</Text> : <Text style={{display: "none"}}></Text>}
        {Object.keys(msg_payload[0])[0] === "3" ? <Text style={styles.listTextSubheader}>General Request</Text> : <Text style={{display: "none"}}></Text>}
        {Object.keys(msg_payload[0])[0] === "4" ? <Text style={styles.listTextSubheader}>Dining Request</Text> : <Text style={{display: "none"}}></Text>}
        {Object.keys(msg_payload[0])[0] === "5" ? <Text style={styles.listTextSubheader}>Housekeeping Request</Text> : <Text style={{display: "none"}}></Text>}
        {/* https://stackoverflow.com/questions/3224834/get-difference-between-2-dates-in-javascript */}
        <Text style={styles.listTextTertiary}>{Math.ceil((new Date(Date.now()) - new Date(timestamp).getTime()) / (1000 * 60))} mins ago</Text>
      </View>
      <View style={styles.badgeAndCaretContainer}>
        <View style={styles.badge}>
          {(Object.keys(msg_payload[0])[0] === "1" && Object.values(msg_payload[0])[0] === "1") ? <Text style={styles.badgeText}>HELP</Text> : <Text style={{display: "none"}}></Text>}
          {(Object.keys(msg_payload[0])[0] === "1" && Object.values(msg_payload[0])[0] === "2") ? <Text style={styles.badgeText}>Medication - Tylenol</Text> : <Text style={{display: "none"}}></Text>}
          {(Object.keys(msg_payload[0])[0] === "1" && Object.values(msg_payload[0])[0] === "3") ? <Text style={styles.badgeText}>Medication - Aleve</Text> : <Text style={{display: "none"}}></Text>}
          {(Object.keys(msg_payload[0])[0] === "1" && Object.values(msg_payload[0])[0] === "4") ? <Text style={styles.badgeText}>Medication - Advil</Text> : <Text style={{display: "none"}}></Text>}
          {(Object.keys(msg_payload[0])[0] === "1" && Object.values(msg_payload[0])[0] === "5") ? <Text style={styles.badgeText}>Medication - Motrin</Text> : <Text style={{display: "none"}}></Text>}
          {(Object.keys(msg_payload[0])[0] === "1" && Object.values(msg_payload[0])[0] === "6") ? <Text style={styles.badgeText}>Medication - Celebrex</Text> : <Text style={{display: "none"}}></Text>}

          {(Object.keys(msg_payload[0])[0] === "2" && Object.values(msg_payload[0])[0] === "1") ? <Text style={styles.badgeText}>Help to/from Restroom</Text> : <Text style={{display: "none"}}></Text>}

          {(Object.keys(msg_payload[0])[0] === "3" && Object.values(msg_payload[0])[0] === "1") ? <Text style={styles.badgeText}>Help Getting Out of Bed</Text> : <Text style={{display: "none"}}></Text>}
          {(Object.keys(msg_payload[0])[0] === "3" && Object.values(msg_payload[0])[0] === "2") ? <Text style={styles.badgeText}>Change gauze/bandages</Text> : <Text style={{display: "none"}}></Text>}
          {(Object.keys(msg_payload[0])[0] === "3" && Object.values(msg_payload[0])[0] === "3") ? <Text style={styles.badgeText}>Counseling patient/family</Text> : <Text style={{display: "none"}}></Text>}
          {(Object.keys(msg_payload[0])[0] === "3" && Object.values(msg_payload[0])[0] === "4") ? <Text style={styles.badgeText}>Control Lighting</Text> : <Text style={{display: "none"}}></Text>}
          {(Object.keys(msg_payload[0])[0] === "3" && Object.values(msg_payload[0])[0] === "5") ? <Text style={styles.badgeText}>Change Thermostat</Text> : <Text style={{display: "none"}}></Text>}
          {(Object.keys(msg_payload[0])[0] === "3" && Object.values(msg_payload[0])[0] === "6") ? <Text style={styles.badgeText}>Request shower/wash assistance</Text> : <Text style={{display: "none"}}></Text>}

          {(Object.keys(msg_payload[0])[0] === "4" && Object.values(msg_payload[0])[0] === "1") ? <Text style={styles.badgeText}>Request shower/wash assistance</Text> : <Text style={{display: "none"}}></Text>}

          {(Object.keys(msg_payload[0])[0] === "5" && Object.values(msg_payload[0])[0] === "1") ? <Text style={styles.badgeText}>Request Blankets</Text> : <Text style={{display: "none"}}></Text>}
          {(Object.keys(msg_payload[0])[0] === "5" && Object.values(msg_payload[0])[0] === "2") ? <Text style={styles.badgeText}>Request Pillow</Text> : <Text style={{display: "none"}}></Text>}
          {(Object.keys(msg_payload[0])[0] === "5" && Object.values(msg_payload[0])[0] === "3") ? <Text style={styles.badgeText}>Request Room Cleaning</Text> : <Text style={{display: "none"}}></Text>}
          {(Object.keys(msg_payload[0])[0] === "5" && Object.values(msg_payload[0])[0] === "4") ? <Text style={styles.badgeText}>Out of Toilet Paper</Text> : <Text style={{display: "none"}}></Text>}
          {(Object.keys(msg_payload[0])[0] === "5" && Object.values(msg_payload[0])[0] === "5") ? <Text style={styles.badgeText}>Out of Tissues</Text> : <Text style={{display: "none"}}></Text>}
          {(Object.keys(msg_payload[0])[0] === "5" && Object.values(msg_payload[0])[0] === "6") ? <Text style={styles.badgeText}>Out of Soap</Text> : <Text style={{display: "none"}}></Text>}
            {/* <Text style={{padding: 5, color: "white", fontSize: 10}}>{Object.keys(msg_payload[0])[0]}</Text> */}
        </View>
        <Ionicons name="chevron-forward-outline" size={40} color="#090C68" />
      </View>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => {
    let name = "";
    if(item.status === "error"){
        allPatient.forEach(patient => {
          if(patient.patient_id === item.patient_id){
            name = patient.name;
          }
        })
        return <Item item={item} name={name} patient_id={name} provider_id={item.provider_id} timestamp={item.req_timestamp} status={item.status} message_id={item.message_id} msg_payload={item.msg_payload} />
    }
  };

  const List = ({error, loading}) => {
    let content;
    if (error){
      content = <View><Text>Error</Text></View>
    } else if (loading === true){
      content = <View><ActivityIndicator style={styles.activityIndicator} size="large" color="black" /></View>
    } else {
      content = <FlatList
        data={allReq}
        renderItem={renderItem}
        keyExtractor={(item) => item._id.toString()}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        style={{marginTop: 0}}
        />
    }
    return <View>{content}</View>
  }

  const MyModal = () => {
    console.log(currentReq)
    if (currentReq !== undefined){
      return <View style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
              <View>
                {Object.keys(currentReq.msg_payload[0])[0] === "1" ? <FontAwesome5 name="prescription-bottle-alt" size={80} color="#090C68" /> : <Text style={{display: "none"}}></Text>}
                {Object.keys(currentReq.msg_payload[0])[0] === "2" ? <FontAwesome5 name="toilet" size={80} color="#090C68" /> : <Text style={{display: "none"}}></Text>}
                {Object.keys(currentReq.msg_payload[0])[0] === "3" ? <FontAwesome5 name="hand-holding-medical" size={80} color="#090C68" /> : <Text style={{display: "none"}}></Text>}
                {Object.keys(currentReq.msg_payload[0])[0] === "4" ? <FontAwesome5 name="coffee" size={80} color="#090C68" /> : <Text style={{display: "none"}}></Text>}
                {Object.keys(currentReq.msg_payload[0])[0] === "5" ? <FontAwesome5 name="bed" size={80} color="#090C68" /> : <Text style={{display: "none"}}></Text>}
              </View>
              <Text style={styles.listTextHeader}>{currentName}</Text>
              <View style={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                <Text style={{color: 'red', fontSize: 15}}>Request: </Text>
                {Object.keys(currentReq.msg_payload[0])[0] === "1" ? <Text style={styles.listTextSubheader2}>Pain/Medical Request</Text> : <Text style={{display: "none"}}></Text>}
                {Object.keys(currentReq.msg_payload[0])[0] === "2" ? <Text style={styles.listTextSubheader2}>Restroom Request</Text> : <Text style={{display: "none"}}></Text>}
                {Object.keys(currentReq.msg_payload[0])[0] === "3" ? <Text style={styles.listTextSubheader2}>General Request</Text> : <Text style={{display: "none"}}></Text>}
                {Object.keys(currentReq.msg_payload[0])[0] === "4" ? <Text style={styles.listTextSubheader2}>Dining Request</Text> : <Text style={{display: "none"}}></Text>}
                {Object.keys(currentReq.msg_payload[0])[0] === "5" ? <Text style={styles.listTextSubheader2}>Housekeeping Request</Text> : <Text style={{display: "none"}}></Text>}
              </View>
              
      </View>
    }
  }

  return (
    <View>
      <View style={styles.container}>
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
                  {/* <Text style={styles.modalText}>
                    Please tap the {figureType} to the bedside phone.
                  </Text> */}
                  <TouchableOpacity onPress={() => setModalVisible(false)}>
                    <Ionicons name="close" size={40} color="black" />
                  </TouchableOpacity>
                </View>
                <MyModal />
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
                  onPress={console.log('Do things')}
                >
                  <Text style={styles.textStyle}>Ready to Scan</Text>
                </Pressable>
                {/* <Button title="Text" onPress={constructWriteString}></Button> */}
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
        <List loading={loading} />
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
        // paddingTop: 50,
      }
    })
  },
  logo: {
    height: '100%',
    width: '10%',
    resizeMode: "contain",
    // tintColor: '#090C68'
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
        height: Dimensions.get("window").height * 0.7,
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
    paddingHorizontal: 10,
    width: Dimensions.get("screen").width
  },
  listTextContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  listTextHeader: {
    fontSize: 20,
    fontWeight: "700",
    paddingBottom: 5,
    color: "#0A0D64",
  },
  listTextSubheader: {
    fontSize: 15,
    fontWeight: "500",
    paddingBottom: 5,
    color: "#0A0D64",
  },
  listTextSubheader2: {
    fontSize: 15,
    fontWeight: "500",
    color: "#0A0D64",
  },
  listTextTertiary: {
    fontSize: 10,
    fontWeight: "400",
    color: "gray",
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
  badgeAndCaretContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  badge: {
      borderRadius: 16,
      backgroundColor: "#090C68",
  },
  badgeText: {
    padding: 5, 
    color: "white", 
    fontSize: 10
  },
  topTabContainer: {
    width: Dimensions.get("window").width,
    // marginTop: 200
  },

  centeredView: {
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    marginTop: Dimensions.get("screen").height * 0.15,
    width: Dimensions.get("screen").width,
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
    justifyContent: "flex-end",
    alignItems: "center",
    width: Dimensions.get("screen").width,
    paddingRight: 20
  }
});