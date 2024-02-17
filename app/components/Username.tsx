import { useEffect, useState } from "react";
import { StyleSheet, TextInput } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const Username = () => {
  const [username, setUsername] = useState("");

  const [usernameActualWidth, setUsernameActualWidth] = useState(0);

  const [maxLengthReached, setMaxLengthReached] = useState(0);

  const [usernameWidth, setUsernameWidth] = useState(0);
  const [usernameHeight, setUsernameHeight] = useState(0);
  const [isSlideAnimationDone, setIsSlideAnimationDone] = useState(false);

  const usernameRotate = useSharedValue("2deg");
  const usernamePosition = useSharedValue(0);

  const usernameStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: -(usernameWidth / 2) },
        { translateY: usernameHeight / 2 },
        { rotate: usernameRotate.value },
        { translateX: usernameWidth / 2 },
        { translateY: -(usernameHeight / 2) },
      ],
      // textAlign: 100,
    };
  });

  const usernameInputStyle = useAnimatedStyle(() => {
    return {
      marginLeft: usernamePosition.value,
    };
  });

  useEffect(() => {
    if (username.length <= maxLengthReached) return;
    setMaxLengthReached(username.length);
    // TODO: Add tweak here so that after 7 it has a more dramatic drop
    if (username.length > 5 && !isSlideAnimationDone) onSlide();
    if (username.length > 10) usernameRotate.value = withSpring("90deg");
    else if (username.length > 7)
      usernameRotate.value = withSpring(`${username.length * 0.8 + 10}deg`);
    else usernameRotate.value = `${Math.min(username.length * 0.8, 90)}deg`;
  }, [username]);

  const onSlide = () => {
    const amountToMargin = usernameWidth - usernameActualWidth - 15;
    const animationDuration = 1000;
    // Animated across, then set margin to 0, set text align to right, remove width restrictions
    if (amountToMargin > 0) {
      usernamePosition.value = withTiming(amountToMargin, {
        duration: animationDuration,
        easing: Easing.in(Easing.exp),
      });
      setTimeout(() => {
        setIsSlideAnimationDone(true);
      }, animationDuration);
      setTimeout(() => {
        usernamePosition.value = 0;
      }, animationDuration + 50);
    }
  };

  return (
    <Animated.View
      onLayout={(e) => {
        const { width, height } = e.nativeEvent.layout;
        setUsernameWidth(width);
        setUsernameHeight(height);
      }}
      style={[
        styles.input,
        styles.lightShadow,
        {
          zIndex: 2,
          // backgroundColor: "blue",
          alignSelf: "center",
        },
        usernameStyle,
      ]}
    >
      <AnimatedTextInput
        value={username}
        onChangeText={setUsername}
        onContentSizeChange={(e) => {
          setUsernameActualWidth(e.nativeEvent.contentSize.width + 5);
        }}
        style={[
          {
            maxWidth: isSlideAnimationDone ? undefined : usernameActualWidth,
            // backgroundColor: "yellow",
            textAlign: isSlideAnimationDone ? "right" : undefined,
          },
          usernameInputStyle,
        ]}
      />
    </Animated.View>
  );
};

export default Username;

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
