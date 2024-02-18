import { useEffect, useState } from "react";
import { TextInput } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { styles } from "../styles/style";

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const BASE_ANGLE = 2;

const Password = () => {
  const [password, setPassword] = useState("");
  const [passwordWidth, setPasswordWidth] = useState(0);
  const [passwordHeight, setPasswordHeight] = useState(0);
  const [maxLengthReached, setMaxLengthReached] = useState(0);

  const passwordRotate = useSharedValue(`-${BASE_ANGLE}deg`);

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
      passwordRotate.value = withSpring(
        `-${password.length * 0.8 + 30 + BASE_ANGLE}deg`
      );
    else if (password.length > 4)
      passwordRotate.value = withSpring(
        `-${password.length * 0.8 + 10 + BASE_ANGLE}deg`
      );
    else
      passwordRotate.value = withSpring(
        `-${Math.min(password.length * 0.8 + BASE_ANGLE, 90)}deg`
      );
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
