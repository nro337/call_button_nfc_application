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
  ScrollView,
} from "react-native";
import { Images } from "../App/Themes/";
import CustButton from "../App/Components/CustButton";
import CustCard from "../App/Components/CustCard";
import {Ionicons, FontAwesome5} from '@expo/vector-icons';

export default function PatientHomeScreen({ navigation, route }) {
  const [reqHeader, setReqHeader] = useState('')
  const [allReq, setAllReq] = useState([]);

  useEffect(() => {
    fetch('http://10.0.0.55:5000/patient-requests')
      .then((resp) => resp.json())
      .then((data) => {
        data.forEach(request => {
          setAllReq(allReq => [...allReq, request])
          //allReq.push(request)
        })
        //console.log(data);
        setReqHeader(data[0].patient_id)
      })
  }, [])

  useEffect(() => {
    fetch('http://10.0.0.55:5000/providers')
      .then((resp2) => resp2.json())
      .then((data2) => {
        console.log(data2);
        //setReqHeader(data[0].patient_id)
      })
  }, [])


  const renderPrevRequest = ({item}) => {
    allReq.forEach(req => {
      return <PrevRequest />
    })
  }

  // const { myParam } = route.params;

  const PrevRequest = ({ item }) => (
    <View style={styles.previousRequestItem}>
      <View style={styles.iconContainer}>
        <FontAwesome5 name="coffee" size={20} color="#7FA8D6" />
      </View>
      <View style={styles.previousRequestsTextContainer}>
        <Text style={{ fontSize: 20 }}>{item}</Text>
        <Text style={{ fontSize: 12 }}>Medication - Advil</Text>
        <Text style={{ paddingTop: 5, color: "#7FA8D6", fontSize: 12 }}>
          Time Made: 10:00am
        </Text>
      </View>
      <Ionicons name="close-circle-outline" size={40} color="red" />
    </View>
  );

  return (
    <View>
      <ScrollView>
      <View style={styles.container}>
        <Text style={styles.headerText}>Welcome, Sophia</Text>
        <View style={styles.subheaderContainer}>
          <Ionicons name="location-outline" size={40} color="#090C68" />
          <Text style={styles.subheaderText}>Penn State Hershey Medical Center</Text>
        </View>
        <TouchableOpacity style={styles.requestCard} onPress={() => navigation.navigate('Make A Request')}>
          <Image style={styles.logo} source={Images.patientHomeScreenImage} />
          <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: Dimensions.get('screen').width * 0.4}}>
            <Text style={styles.requestCardText}>Make a Request</Text>
            <Ionicons name="chevron-forward-outline" size={40} color="#090C68" />
          </View>
        </TouchableOpacity>
        <Text style={styles.prevReqSubheading}>View Previous Requests</Text>
        <View style={styles.previousRequestsContainer}>
          <View style={styles.previousRequestItem}>
            <View style={styles.iconContainer}>
              <FontAwesome5 name="prescription-bottle-alt" size={20} color="#7FA8D6" />
            </View>
            <View style={styles.previousRequestsTextContainer}>
              <Text style={{fontSize: 20}}>Nurse Station</Text>
              <Text style={{fontSize: 12}}>Medication - Advil</Text>
              <Text style={{paddingTop: 5, color: "#7FA8D6", fontSize: 12}}>Time Made: 10:00am</Text>
            </View>
            <Ionicons name="checkmark-circle-outline" size={40} color="green" />
          </View>
          <View style={styles.previousRequestItem}>
            <View style={styles.iconContainer}>
              <FontAwesome5 name="coffee" size={20} color="#7FA8D6" />
            </View>
            <View style={styles.previousRequestsTextContainer}>
              <Text style={{fontSize: 20}}>Nurse Station</Text>
              <Text style={{fontSize: 12}}>Medication - Advil</Text>
              <Text style={{paddingTop: 5, color: "#7FA8D6", fontSize: 12}}>Time Made: 10:00am</Text>
            </View>
            <Ionicons name="close-circle-outline" size={40} color="red" />
          </View>
          <View style={styles.previousRequestItem}>
            <View style={styles.iconContainer}>
              <FontAwesome5 name="coffee" size={20} color="#7FA8D6" />
            </View>
            <View style={styles.previousRequestsTextContainer}>
              <Text style={{fontSize: 20}}>{reqHeader}</Text>
              <Text style={{fontSize: 12}}>Medication - Advil</Text>
              <Text style={{paddingTop: 5, color: "#7FA8D6", fontSize: 12}}>Time Made: 10:00am</Text>
            </View>
            <Ionicons name="close-circle-outline" size={40} color="red" />
          </View>
          <PrevRequest item={"Hello"}/>
        </View>
        <Text style={styles.prevReqSubheading}>Usage Tutorial</Text>
        <ScrollView horizontal={true}>
          <View style={styles.usageContainer}>
            <TouchableOpacity style={styles.usageTutorialItem}>
              <Text>Step 1</Text>
            </TouchableOpacity>
            <View style={styles.usageTutorialItem}>
              <Text>Step 2</Text>
            </View>
            <View style={styles.usageTutorialItem}>
              <Text>Step 3</Text>
            </View>
          </View>
        </ScrollView>
      </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    ...Platform.select({
      ios: {
        //height: Dimensions.get('window').height,
        paddingTop: 20,
        paddingBottom: 20,
        marginBottom: 50,
      }
    })
  },
  subheaderContainer: {
    display:"flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  subheaderText: {
    color: "#090C68",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "600",
  },  
  logo: {
    // height: '50%',
    // width: '50%',
    resizeMode: 'contain',
    marginBottom: 10,
  },
  headerText: {
    color: "#090C68",
    textAlign: "center",
    fontSize: 40,
    fontWeight: "600",
  },
  requestCard: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 50,
    shadowOffset: {width: 0, height: 4},
    shadowColor: "black",
    shadowRadius: 4,
    shadowOpacity: 0.25,
  },
  requestCardText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#090C68",
  },
  prevReqSubheading: {
    color: "#090C68",
    alignSelf: "flex-start",
    paddingLeft: 60,
    marginTop: 20,
    fontSize: 15,
    fontWeight: "600",
  },
  previousRequestsContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    marginHorizontal: 10,
  },
  previousRequestItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 50,
    shadowOffset: {width: 0, height: 4},
    shadowColor: "black",
    shadowRadius: 4,
    shadowOpacity: 0.25,
    padding: 10,
    marginVertical: 10,
  },
  previousRequestsTextContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingRight: 20,
  },  
  iconContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#D4E2F1",
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  usageContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginVertical: 10,
  },
  usageTutorialItem: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#D4E2F1",
    borderRadius: 16,
    shadowOffset: {width: 0, height: 4},
    shadowColor: "black",
    shadowRadius: 4,
    shadowOpacity: 0.25,
    padding: 30,
    marginHorizontal: 10,
  }
});