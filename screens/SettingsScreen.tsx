import React from "react";
import {
  View,
  StyleSheet,
  Platform,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Svg, { Path } from "react-native-svg";

import { CoinStackParams } from "../App";
import { Black } from "../components/Font";
import { GRAY } from "../utils/colors";

type Props = NativeStackScreenProps<CoinStackParams, "SettingsScreen">;

const SettingsScreen: React.FC<Props> = ({ route, navigation }) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Svg viewBox="0 0 24 24" height="30" width="30">
            <Path
              fill="black"
              d="M13.293 6.293L7.586 12l5.707 5.707l1.414-1.414L10.414 12l4.293-4.293z"
            />
          </Svg>
        </TouchableOpacity>
        <View style={styles.heading}>
          <Black style={styles.headingText}>Settings</Black>
        </View>
      </View>
      <View style={{ flex: 1 }}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 20,
  },
  heading: {
    paddingVertical: 10,
  },
  headingText: {
    fontSize: 34,
  },
  button: {
    backgroundColor: GRAY,
    padding: 6,
    borderRadius: 6,
    marginRight: 10,
  },
});

export default SettingsScreen;
