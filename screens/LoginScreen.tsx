import React, { useEffect, useState } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { FontAwesome } from "@expo/vector-icons";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";

import { Black, Bold } from "../components/Font";
import { GRAY } from "../utils/colors";

GoogleSignin.configure({
  webClientId:
    "380105339462-h8iqv8a21fb5al5qbk1fn3t3dojlokuc.apps.googleusercontent.com",
});

const LoginScreen = () => {
  const [initializing, setInitializing] = useState<boolean>(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User>();

  function onAuthStateChanged(user: any) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  async function onGoogleButtonPress() {
    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    return auth().signInWithCredential(googleCredential);
  }

  return (
    <View style={styles.container}>
      <Black>Login Screen</Black>
      {user && <Black>{user?.displayName}</Black>}
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
      {user && (
        <Pressable
          style={styles.button}
          onPress={() => {
            auth()
              .signOut()
              .then(() => "Signed Out");
          }}
        >
          <Bold>Logout</Bold>
        </Pressable>
      )}
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
