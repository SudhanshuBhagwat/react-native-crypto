import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Platform,
  StatusBar,
  TouchableOpacity,
  Pressable,
  Switch,
  Text,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Svg, { Path } from "react-native-svg";
import auth from "@react-native-firebase/auth";

import { CoinStackParams } from "../App";
import { Black, Bold } from "../components/Font";
import { BLACK, CREAM, GRAY } from "../utils/colors";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/userSlice";
import { useTheme } from "@react-navigation/native";
import { RootState } from "../store";
import { toggleTheme } from "../store/themeSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DARK_MODE } from "../utils/constants";

type Props = NativeStackScreenProps<CoinStackParams, "SettingsScreen">;

const SettingsScreen: React.FC<Props> = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { colors } = useTheme();
  const { mode } = useSelector((state: RootState) => state.theme);

  const changeTheme = async (value: boolean) => {
    dispatch(toggleTheme(value));
    await AsyncStorage.setItem(DARK_MODE, `${value}`);
  };

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
          <Black style={[styles.headingText, { color: colors.text }]}>
            Settings
          </Black>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, marginTop: 10 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Bold style={[styles.settingItem, { color: colors.text }]}>
              Toggle Theme
            </Bold>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontSize: 24 }}>☀️</Text>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                onValueChange={changeTheme}
                value={mode === "DARK"}
              />
              <Text style={{ fontSize: 24 }}>🌕</Text>
            </View>
          </View>
        </View>
        <Pressable
          style={styles.signout}
          onPress={() => {
            auth()
              .signOut()
              .then(() => {
                dispatch(logout);
                dispatch(toggleTheme(false));
              });
          }}
        >
          <Bold
            style={{
              textAlign: "center",
              fontSize: 20,
            }}
          >
            Logout
          </Bold>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
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
  signout: {
    backgroundColor: GRAY,
    padding: 12,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  settingItem: {
    color: CREAM,
    fontSize: 24,
  },
});

export default SettingsScreen;
