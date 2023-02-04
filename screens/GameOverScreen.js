import { View, Text, StyleSheet, Image } from "react-native";
import colors from "../constants/colors";
import MainButton from "../components/MainButton";

function GameOverScreen(props) {
  return (
    <View style={styles.screen}>
      <Text>GAME OVER at round {props.round} BITCHESS</Text>
      <Image
        style={styles.image}
        source={{
          uri: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
        }}
        resizeMode="cover"
      />
      <Text style={styles.resultText}>
        The guessed number is
        <Text style={styles.highlight}> {props.guessedNumber}</Text>
      </Text>
      <MainButton onPress={props.startOver} color={"green"}>
        Start again dear?
      </MainButton>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, justifyContent: "center", alignItems: "center" },
  image: { width: "80%", height: 300, borderRadius: 10 },
  resultText: {
    textAlign: "center",
  },
  highlight: {
    color: colors.primary,
    fontFamily: "open-sans-bold",
    fontSize: 16,
  },
});
export default GameOverScreen;
