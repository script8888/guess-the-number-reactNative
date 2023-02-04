import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

function MainButton(props) {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={{ ...styles.button, backgroundColor: props.color }}>
        <Text style={styles.btnText}>{props.children}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 25 
  },
  btnText: {
    color: "#fff",
    fontFamily: "open-sans",
    fontSize: 18,
    textAlign: "center",
    textTransform: "capitalize",
  },
});

export default MainButton;
