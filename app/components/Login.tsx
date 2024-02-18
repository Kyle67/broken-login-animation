import { View } from "react-native";
import LoginButton from "./LoginButton";
import Password from "./Password";
import Username from "./Username";

const Login = () => {
  return (
    <View
      style={{
        rowGap: 24,
        marginBottom: "auto",
        marginTop: 100,
      }}
    >
      <Username />
      <Password />
      <LoginButton />
    </View>
  );
};

export default Login;
