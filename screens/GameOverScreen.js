import { View, Text, StyleSheet, Button, Image } from "react-native";

function GameOverScreen(props) {
  return (
    <View style={styles.screen}>
      <Text>GAME OVER at round {props.round} BITCHESS</Text>
      <Image
        style={styles.image}
        // source={require("../assets/success.png")}
        source={{
          uri: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
        }}
        resizeMode="cover"
      />
      <Text>The guessed number is {props.guessedNumber}</Text>
      <Button title="Start again dear?" onPress={props.startOver} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, justifyContent: "center", alignItems: "center" },
  image: { width: "80%", height: 300, borderRadius: 10 },
});
export default GameOverScreen;
