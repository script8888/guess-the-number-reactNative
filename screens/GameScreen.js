import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, Alert, ScrollView } from "react-native";
import Card from "../components/Card";
import MainButton from "../components/MainButton";
import { Ionicons } from "@expo/vector-icons";

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};

const renderListItem = (data, numOfRound) => {
  return (
    <View key={data} style={styles.listItem}>
      <Text>#{numOfRound}</Text>
      <Text>{data}</Text>
    </View>
  );
};
function GameScreen(props) {
  const initialGuess = generateRandomBetween(1, 100, props.userChoice);
  const [currentGuess, setCurrentGuess] = useState(
    generateRandomBetween(1, 100, props.userChoice)
  );

  const [guesses, setGuesses] = useState([initialGuess]);

  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const { userChoice, onGameOver } = props;
  useEffect(() => {
    if (currentGuess === userChoice) {
      props.onGameOver(guesses.length);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const nextGuessHandler = (direction) => {
    if (
      (direction === "lower" && currentGuess < userChoice) ||
      (direction === "greater" && currentGuess > userChoice)
    ) {
      Alert.alert("You fucking liar.", "Spazzy Bastard");
      return;
    }

    if (direction === "lower") {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess + 1;
    }

    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextNumber);
    setGuesses((guess) => [nextNumber, ...guess]);
  };

  return (
    <View style={styles.screen}>
      <Text>Opponent's Guess</Text>
      <Text>{currentGuess}</Text>
      <Card style={styles.buttonContainer}>
        <MainButton
          color={"black"}
          onPress={nextGuessHandler.bind(this, "lower")}
        >
          <Ionicons name="md-remove" size={24} color="white" />
        </MainButton>

        <MainButton
          color={"black"}
          onPress={nextGuessHandler.bind(this, "greater")}
        >
          <Ionicons name="md-add" size={24} color="white" />
        </MainButton>
      </Card>
      <View style={styles.scrollView_parent}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          {guesses.map((data, i) => renderListItem(data, guesses.length - i))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    width: 300,
    maxWidth: "80%",
  },
  scrollView_parent: {
    width: "80%",
    height: "100%",
    flex: 1,
    marginBottom: 100,
  },
  scrollView: { alignItems: "center", justifyContent: "flex-end", flexGrow: 1 },
  listItem: {
    borderColor: "#000",
    padding: 15,
    marginVertical: 10,
    backgroundColor: "#fff",
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
  },
});
export default GameScreen;
