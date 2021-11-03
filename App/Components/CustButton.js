
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

const CustButton = (props, {onPress}) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity title={props.title} color={props.color} onPress={props.onPress} backgroundColor={'transparent'}>
        <Text style={{color: props.color}}>{props.title}</Text>
      </TouchableOpacity>
      <Ionicons name={props.icon} size={props.size} color={props.color} />
    </View>

  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#090C68",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 32,
    shadowOffset: {width: 4, height: 4},
    shadowColor: "black",
    shadowRadius: 4,
    shadowOpacity: 0.25,
  },

});

export default CustButton;