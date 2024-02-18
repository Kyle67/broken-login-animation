import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 8,
    minWidth: "70%",
    maxWidth: "70%",
    backgroundColor: "white",
    fontSize: 28,
  },
  lightShadow: {
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  heavyShadow: {
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 2,
  },
  button: {
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "white",
  },
});
