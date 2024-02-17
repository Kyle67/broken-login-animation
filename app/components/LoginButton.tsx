import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import {
  Dimensions,
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
} from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

// TODO: Crack or blur effect? on last 5?

const colourMap: Record<number, `#${string}`> = {
  0: "#2cba00",
  1: "#a3ff00",
  2: "#fff400",
  3: "#ffa700",
  4: "#ff0000",
  5: "#ff0000",
};

const LoginButton = () => {
  const [isExploding, setIsExploding] = useState(false);
  const [buttonWidth, setButtonWidth] = useState(0);
  const [buttonHeight, setButtonHeight] = useState(0);

  const [leftPressCount, setLeftPressCount] = useState(0);
  const [rightPressCount, setRightPressCount] = useState(0); // Change colour via linear gradient based on which is about to break?
  const [finalPressCount, setFinalPressCount] = useState(0);

  // TODO: Rather than explode, the button can hinge on either side, then fall off the screen (rotating on the way down)

  const buttonRotate = useSharedValue("0deg");
  const buttonTop = useSharedValue(0);
  const buttonFallRotate = useSharedValue("0deg");

  const buttonStyle = useAnimatedStyle(() => {
    return {
      transform:
        leftPressCount >= rightPressCount
          ? [
              { translateX: buttonWidth / 2 },
              { translateY: buttonHeight / 2 },
              { rotate: buttonRotate.value },
              { translateX: -buttonWidth / 2 },
              { translateY: -buttonHeight / 2 },
              { rotate: buttonFallRotate.value },
            ]
          : [
              { translateX: -buttonWidth / 2 },
              { translateY: buttonHeight / 2 },
              { rotate: buttonRotate.value },
              { translateX: buttonWidth / 2 },
              { translateY: -buttonHeight / 2 },
              { rotate: buttonFallRotate.value },
            ],
      top: buttonTop.value,
    };
  });

  useEffect(() => {
    if (rightPressCount >= 5 || leftPressCount >= 5) {
      setFinalPressCount((val) => val + 1);
    }

    if (rightPressCount === 5) {
      buttonRotate.value = withSpring("90deg");
    }

    if (leftPressCount === 5) {
      buttonRotate.value = withSpring("-90deg");
    }
  }, [leftPressCount, rightPressCount]);

  useEffect(() => {
    if (finalPressCount === 5) {
      buttonTop.value = withTiming(Dimensions.get("window").height, {
        duration: 2000,
        easing: Easing.in(Easing.cubic),
      });
      buttonFallRotate.value = withTiming(
        rightPressCount < leftPressCount ? "-145deg" : "145deg",
        { duration: 4000 }
      );
    }
  }, [finalPressCount]);

  const onPress = (e: GestureResponderEvent) => {
    if (rightPressCount >= 5 || leftPressCount >= 5) {
      setFinalPressCount((val) => val + 1);
      return;
    }

    const { locationX } = e.nativeEvent;
    if (locationX < buttonWidth / 2) setLeftPressCount((val) => val + 1);
    else setRightPressCount((val) => val + 1);
  };

  return (
    <Animated.View
      onLayout={(e) => {
        const { height, width } = e.nativeEvent.layout;
        setButtonHeight(height);
        setButtonWidth(width);
      }}
      style={[styles.button, styles.heavyShadow, buttonStyle, { top: 20 }]}
    >
      <LinearGradient
        colors={[colourMap[leftPressCount], colourMap[rightPressCount]]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={{
          width: "100%",
          borderRadius: 8, // Hiding overflow doesn't work here, so we just apply the same border radius
        }}
      >
        <Pressable onPress={onPress} style={{ paddingVertical: 10 }}>
          <Text style={{ textAlign: "center" }}>Login</Text>
        </Pressable>
      </LinearGradient>
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
    // backgroundColor: "#f76f98",
    alignItems: "center",
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
