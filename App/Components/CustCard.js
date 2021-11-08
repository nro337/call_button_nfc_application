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
  Platform,
} from "react-native";
import {Ionicons} from '@expo/vector-icons';

const CustCard = (props, {onPress}) => {
  return (
    <View style={{
      // backgroundColor: props.backgroundColor, borderRadius: 32, width: '50%', borderWidth: 2
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      padding: 10,
      backgroundColor: props.backgroundColor,
      borderRadius: props.borderRadius,
      // backgroundColor: props.backgroundColor,
      // borderColor: props.color,
      // borderWidth: 3,
      // paddingVertical: 10,
      // paddingHorizontal: 60,
      // borderRadius: 32,
      shadowOffset: {width: 4, height: 4},
      shadowColor: "black",
      shadowRadius: 4,
      shadowOpacity: 0.25,
      // margin: 5,
      
      }}>
        <Text>Hi</Text>
      {/* <TouchableOpacity title={props.title} color={props.color} onPress={props.onPress} backgroundColor={'transparent'}>
        <Text style={{color: props.color, fontSize: props.fontSize}}>{props.title}</Text>
      </TouchableOpacity>
      <Ionicons name={props.icon} size={props.fontSize} color={props.color} /> */}
    </View>

  );
}

const styles = StyleSheet.create({

});

export default CustCard;