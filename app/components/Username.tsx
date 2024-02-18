import { Component, LegacyRef, useEffect, useRef, useState } from "react";
import { Pressable, TextInput, TextInputProps } from "react-native";
import Animated, {
  AnimateProps,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { styles } from "../styles/style";

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const BASE_ANGLE = 2;

const Username = () => {
  const [username, setUsername] = useState("");
  const [usernameActualWidth, setUsernameActualWidth] = useState(0);
  const [maxLengthReached, setMaxLengthReached] = useState(0);
  const [usernameWidth, setUsernameWidth] = useState(0);
  const [usernameHeight, setUsernameHeight] = useState(0);
  const [isSlideAnimationDone, setIsSlideAnimationDone] = useState(false);

  const inputRef = useRef<TextInput>();

  const usernameRotate = useSharedValue(`${BASE_ANGLE}deg`);
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
    if (username.length === 5 && !isSlideAnimationDone) onSlide();
    if (username.length > 10) usernameRotate.value = withSpring("90deg");
    else if (username.length > 7)
      usernameRotate.value = withSpring(
        `${username.length * 0.8 + 10 + BASE_ANGLE}deg`
      );
    else
      usernameRotate.value = withSpring(
        `${Math.min(username.length * 0.8 + BASE_ANGLE, 90)}deg`
      );
  }, [username]);

  const onSlide = () => {
    const amountToMargin = usernameWidth - usernameActualWidth - 15;
    const animationDuration = 3000;
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
    <AnimatedPressable
      onPress={() => inputRef.current?.focus()}
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
          alignSelf: "center",
        },
        usernameStyle,
      ]}
    >
      <AnimatedTextInput
        ref={
          inputRef as LegacyRef<
            Component<AnimateProps<TextInputProps>, any, any>
          >
        }
        value={username}
        onChangeText={setUsername}
        onContentSizeChange={(e) => {
          setUsernameActualWidth(e.nativeEvent.contentSize.width + 5);
        }}
        style={[
          {
            maxWidth: isSlideAnimationDone ? undefined : usernameActualWidth,
            textAlign: isSlideAnimationDone ? "right" : undefined,
          },
          usernameInputStyle,
        ]}
      />
    </AnimatedPressable>
  );
};

export default Username;
