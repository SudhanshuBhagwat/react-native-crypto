import React from "react";
import { View, StyleSheet, Pressable, Image, Dimensions } from "react-native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { FontAwesome } from "@expo/vector-icons";
import auth from "@react-native-firebase/auth";

import { Black, Bold } from "../components/Font";
import { GRAY } from "../utils/colors";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { NativeStackScreenProps } from "@react-navigation/native-stack/lib/typescript/src/types";
import { AuthNavigationParams } from "../App";

type Props = NativeStackScreenProps<AuthNavigationParams, "LoginScreen">;

const { height, width } = Dimensions.get("screen");

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const user = useSelector((state: RootState) => state.user.user);

  async function onGoogleButtonPress() {
    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    return auth().signInWithCredential(googleCredential);
  }

  return (
    <View style={styles.container}>
      <Image source={require("../assets/stocks.png")} style={styles.image} />
      <Black style={styles.title}>Cryto Buddy</Black>
      <Bold style={styles.subheading}>
        A simple way to manage and review your favourite Crypto Currencies
      </Bold>
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
    alignItems: "center",
    marginTop: 60,
  },
  button: {
    paddingHorizontal: 26,
    paddingVertical: 16,
    backgroundColor: GRAY,
    borderRadius: 12,
    marginVertical: 20,
    flexDirection: "row",
  },
  image: {
    height: height * 0.4,
    width: width * 0.8,
    backgroundColor: "transparent",
    marginVertical: 20,
  },
  title: {
    fontSize: 30,
    marginBottom: 10,
  },
  subheading: {
    fontSize: 20,
    textAlign: "center",
  },
});

export default LoginScreen;
