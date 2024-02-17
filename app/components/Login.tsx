import { StyleSheet, View } from "react-native";
import LoginButton from "./LoginButton";
import Password from "./Password";
import Username from "./Username";

/**
 * // TODO:
 * - Focus username on click anywhere inside view
 */

const Login = () => {
  return (
    <View style={styles.container}>
      <Username />
      <Password />
      <LoginButton />
    </View>
  );
};

export default Login;

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
