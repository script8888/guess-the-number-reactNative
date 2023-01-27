import { View, Text, StyleSheet, Button } from "react-native";

function GameOverScreen(props) {
  return (
    <View style={styles.screen}>
      <Text>GAME OVER at round {props.round} BITCHESS</Text>
      <Button title="Start again dear?" onPress={props.startOver} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, justifyContent: "center", alignItems: "center" },
});
export default GameOverScreen;
