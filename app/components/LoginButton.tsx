import { useEffect, useState } from "react";
import { Dimensions, Pressable, StyleSheet, Text } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const LoginButton = () => {
  const [isExploding, setIsExploding] = useState(false);
  const [buttonWidth, setButtonWidth] = useState(0);
  const [buttonHeight, setButtonHeight] = useState(0);

  const [pressCount, setPressCount] = useState(0);

  // TODO: Rather than explode, the button can hinge on either side, then fall off the screen (rotating on the way down)

  const buttonRotate = useSharedValue("0deg");
  const buttonTop = useSharedValue(0);
  const buttonFallRotate = useSharedValue("0deg");

  const buttonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: buttonWidth / 2 },
        { translateY: buttonHeight / 2 },
        { rotate: buttonRotate.value },
        { translateX: -buttonWidth / 2 },
        { translateY: -buttonHeight / 2 },
        { rotate: buttonFallRotate.value },
      ],
      top: buttonTop.value,
    };
  });

  useEffect(() => {
    if (pressCount === 5) buttonRotate.value = withSpring("-90deg");
    if (pressCount === 10) {
      buttonTop.value = withTiming(Dimensions.get("window").height, {
        duration: 2000,
        easing: Easing.in(Easing.cubic),
      });
    }

    switch (pressCount) {
      case 5:
        buttonRotate.value = withSpring("-90deg");
        break;
      case 10:
        buttonTop.value = withTiming(Dimensions.get("window").height, {
          duration: 2000,
          easing: Easing.in(Easing.cubic),
        });
        buttonFallRotate.value = withTiming("-145deg", { duration: 4000 });
        break;
      default:
    }
  }, [pressCount]);

  return (
    <Animated.View
      onLayout={(e) => {
        const { height, width } = e.nativeEvent.layout;
        setButtonHeight(height);
        setButtonWidth(width);
      }}
      style={[styles.button, styles.heavyShadow, buttonStyle, { top: 20 }]}
    >
      <Pressable onPress={() => setPressCount((val) => val + 1)}>
        <Text>Login {pressCount}</Text>
      </Pressable>
    </Animated.View>
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
