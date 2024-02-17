import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const explosion = {
  force: 0.8,
  duration: 3000,
  particleCount: 250,
  width: 1600,
};

const LoginButton = () => {
  const [isExploding, setIsExploding] = useState(false);

  return (
    <Pressable onPress={() => setIsExploding(true)}>
      <View style={[styles.button, styles.heavyShadow]}>
        <Text>Login</Text>
        {/* {isExploding && <ConfettiExplosion {...explosion} />} */}
      </View>
    </Pressable>
  );
};

export default LoginButton;

const styles = StyleSheet.create({
  // TODO: Move to shared reusable spot
  container: {
    rowGap: 24,
    marginBottom: "auto",
    marginTop: 100,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    minWidth: "70%",
    maxWidth: "70%",
    backgroundColor: "white",
    fontSize: 24,
  },
  button: {
    backgroundColor: "#f76f98",
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "white",
  },
  heavyShadow: {
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 2,
  },
  lightShadow: {
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
});
