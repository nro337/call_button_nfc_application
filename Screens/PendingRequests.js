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
} from "react-native";
import { SearchBar } from "react-native-elements";
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

  const Item = ({ patient_id, provider_id, timestamp, status, message_id, msg_payload, name }) => (
    <TouchableOpacity style={styles.listItem} onPress={() => console.log(name)}>
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
        return <Item name={name} patient_id={name} provider_id={item.provider_id} timestamp={item.req_timestamp} status={item.status} message_id={item.message_id} msg_payload={item.msg_payload} />
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
        />
    }
    return <View>{content}</View>
  }

  return (
    <View>
      <View style={styles.container}>
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
  }
});