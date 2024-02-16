import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

/**
 * // TODO:
 * - Text slides across when too heavy
 * - Not a constant multiplier
 */

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [usernameWidth, setUsernameWidth] = useState(0);
  const [usernameHeight, setUsernameHeight] = useState(0);

  const usernameRotate = useSharedValue("2deg");
  const passwordRotate = useSharedValue("-2deg");

  const usernameStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: -(usernameWidth / 2) },
        { translateY: usernameHeight / 2 },
        { rotate: usernameRotate.value },
        { translateX: usernameWidth / 2 },
        { translateY: -(usernameHeight / 2) },
      ],
    };
  });

  const passwordStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: usernameWidth / 2 },
        { translateY: usernameHeight / 2 },
        { rotate: passwordRotate.value },
        { translateX: -usernameWidth / 2 },
        { translateY: -usernameHeight / 2 },
      ],
    };
  });

  useEffect(() => {
    usernameRotate.value = `${Math.min(username.length * 0.8, 90)}deg`;
  }, [username]);

  useEffect(() => {
    passwordRotate.value = `-${Math.min(password.length * 0.8, 90)}deg`;
  }, [password]);

  return (
    <View style={styles.container}>
      <AnimatedTextInput
        onLayout={(e) => {
          const { width, height } = e.nativeEvent.layout;
          setUsernameWidth(width);
          setUsernameHeight(height);
        }}
        value={username}
        onChangeText={setUsername}
        style={[styles.input, styles.lightShadow, { zIndex: 2 }, usernameStyle]}
      />

      <AnimatedTextInput
        value={password}
        onChangeText={setPassword}
        style={[styles.input, styles.lightShadow, { zIndex: 1 }, passwordStyle]}
      />
      <Pressable>
        <View style={[styles.button, styles.heavyShadow]}>
          <Text>Login</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
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
