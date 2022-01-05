import React, { useEffect, useState } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { FontAwesome } from "@expo/vector-icons";
import auth from "@react-native-firebase/auth";

import { Black, Bold } from "../components/Font";
import { GRAY } from "../utils/colors";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { login, logout } from "../store/userSlice";
import { NativeStackScreenProps } from "@react-navigation/native-stack/lib/typescript/src/types";
import { AuthNavigationParams } from "../App";

type Props = NativeStackScreenProps<AuthNavigationParams, "LoginScreen">;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const user = useSelector((state: RootState) => state.user.user);

  async function onGoogleButtonPress() {
    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    return auth().signInWithCredential(googleCredential);
  }

  return (
    <View style={styles.container}>
      <Black>Login Screen</Black>
      {user && <Black>{user.displayName}</Black>}
      <Pressable
        style={styles.button}
        onPress={() => {
          onGoogleButtonPress().then(() => console.log("Done"));
        }}
      >
        <FontAwesome
          name="google"
          size={24}
          color="black"
          style={{
            marginRight: 12,
            alignItems: "center",
          }}
        />
        <Bold>Sign In with Google</Bold>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  button: {
    paddingHorizontal: 26,
    paddingVertical: 16,
    backgroundColor: GRAY,
    borderRadius: 12,
    marginVertical: 10,
    flexDirection: "row",
  },
});

export default LoginScreen;
