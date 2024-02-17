import { useEffect, useState } from "react";
import { StyleSheet, TextInput } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const Password = () => {
  const [password, setPassword] = useState("");
  const [passwordWidth, setPasswordWidth] = useState(0);
  const [passwordHeight, setPasswordHeight] = useState(0);
  const [maxLengthReached, setMaxLengthReached] = useState(0);

  const passwordRotate = useSharedValue("-2deg");

  const passwordStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: passwordWidth / 2 },
        { translateY: passwordHeight / 2 },
        { rotate: passwordRotate.value },
        { translateX: -passwordWidth / 2 },
        { translateY: -passwordHeight / 2 },
      ],
    };
  });

  useEffect(() => {
    if (password.length <= maxLengthReached) return;
    setMaxLengthReached(password.length);
    // TODO: Add tweak here so that after 7 it has a more dramatic drop
    if (password.length > 10) passwordRotate.value = withSpring("-90deg");
    else if (password.length > 7)
      passwordRotate.value = withSpring(`-${password.length * 0.8 + 30}deg`);
    else if (password.length > 4)
      passwordRotate.value = withSpring(`-${password.length * 0.8 + 10}deg`);
    else passwordRotate.value = `-${Math.min(password.length * 0.8, 90)}deg`;
  }, [password]);

  return (
    <Animated.View
      onLayout={(e) => {
        const { width, height } = e.nativeEvent.layout;
        setPasswordWidth(width);
        setPasswordHeight(height);
      }}
      style={[styles.input, styles.lightShadow, { zIndex: 1 }, passwordStyle]}
    >
      <AnimatedTextInput value={password} onChangeText={setPassword} />
    </Animated.View>
  );
};

export default Password;

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
