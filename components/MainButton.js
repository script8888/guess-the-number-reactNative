import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";

function MainButton(props) {
  let TouchableComp = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableComp = TouchableNativeFeedback;
  }
  return (
    <View style={styles.buttonContainer}>
      <TouchableComp activeOpacity={0.6} onPress={props.onPress}>
        <View style={{ ...styles.button, backgroundColor: props.color }}>
          <Text style={styles.btnText}>{props.children}</Text>
        </View>
      </TouchableComp>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 25,
    overflow: "hidden",
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 25,
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
