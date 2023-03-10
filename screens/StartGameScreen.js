import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  Alert,
} from "react-native";
import Card from "../components/Card";
import Colors from "../constants/colors";
import Input from "../components/Input";
import BodyText from "../components/BodyText";
import MainButton from "../components/MainButton";

function StartGameScreen(props) {
  const [enteredValue, setEnteredValue] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();
  const [widths, setWidths] = useState({
    buttonWidth: Dimensions.get("window").width / 4,
    inputContainerWidth: Dimensions.get("window").width / 1,
  });

  useEffect(() => {
    const updateLayout = (e) => {
      const { width } = e.window;
      setWidths((allWidth) => ({
        buttonWidth: width / 4,
        inputContainerWidth: width / 1,
      }));
    };
    const dimensionsHandler = Dimensions.addEventListener(
      "change",
      updateLayout
    );
    return () => {
      dimensionsHandler.remove();
    };
  });

  const numInputHandler = (text) => {
    setEnteredValue(text.replace(/[^0-9]/g, ""));
  };

  const resetInputHandler = () => {
    setEnteredValue("");
    setConfirmed(false);
  };

  const confirmInputHandler = () => {
    const chosenNo = parseInt(enteredValue);
    if (isNaN(chosenNo) || chosenNo <= 0 || chosenNo > 99) {
      Alert.alert("Invalid Number!", "Number has to be between 1 and 99.", [
        { text: "Okay", style: "destructive", onPress: resetInputHandler },
      ]);
      return;
    }
    setConfirmed(true);
    setSelectedNumber(chosenNo);
    setEnteredValue("");
    Keyboard.dismiss();
  };

  let confirmedOutput;
  if (confirmed) {
    confirmedOutput = (
      <View>
        <Text style={styles.chosenNumber}>Chosen Number: {selectedNumber}</Text>
        <MainButton
          color={Colors.primary}
          onPress={() => props.onStartGame(selectedNumber)}
        >
          Start Game
        </MainButton>
      </View>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.screen}>
        <Text style={styles.title}>Start a New Game!</Text>
        <Card
          style={{
            ...styles.inputContainer,
            width: widths.inputContainerWidth,
          }}
        >
          <BodyText>Select a Number</BodyText>
          <Input
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="number-pad"
            maxLength={2}
            blurOnSubmit
            value={enteredValue}
            onChangeText={numInputHandler}
            styles={styles.input}
          />

          <View style={styles.buttonContainer}>
            <View style={{ width: widths.buttonWidth }}>
              <MainButton
                color={Colors.accentColor}
                onPress={resetInputHandler}
              >
                Reset
              </MainButton>
            </View>
            <View style={{ width: widths.buttonWidth }}>
              <MainButton color={Colors.primary} onPress={confirmInputHandler}>
                Confirm
              </MainButton>
            </View>
          </View>
        </Card>
        {confirmedOutput}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 10, alignItems: "center" },
  title: {
    fontSize: 20,
    fontFamily: "open-sans-bold",
    marginVertical: 10,
  },
  inputContainer: {
    maxWidth: "80%",
    alignItems: "center",
  },
  input: {
    width: 100,
    textAlign: "center",
  },
  buttonContainer: {
    overflow: "hidden",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  chosenNumber: {
    marginTop: 18,
    marginBottom: 6,
    fontSize: 24,
  },
});

export default StartGameScreen;
