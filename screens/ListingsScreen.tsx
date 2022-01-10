import React from "react";
import {
  View,
  StyleSheet,
  Platform,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ActivityIndicator } from "react-native-paper";
import Svg, { Path } from "react-native-svg";

import { CoinStackParams } from "../App";
import { Black } from "../components/Font";
import List from "../components/List";
import { GRAY } from "../utils/colors";
import useData from "../hooks/useData";
import { useTheme } from "@react-navigation/native";

type Props = NativeStackScreenProps<CoinStackParams, "ListingsScreen">;

const ListingsScreen: React.FC<Props> = ({
  route: {
    params: { url, dataKey, title },
  },
  navigation,
}) => {
  const [list, isLoading] = useData({ url, dataKey });
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
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
        <Black style={[styles.headingText, { color: colors.text }]}>
          {title}
        </Black>
      </View>
      <View style={{ flex: 1 }}>
        {isLoading ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <List data={list} swipeable={false} onSwipeOpen={() => {}} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flex: 1,
  },
  heading: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  headingText: {
    fontSize: 34,
    marginLeft: 16,
  },
  button: {
    backgroundColor: GRAY,
    padding: 6,
    borderRadius: 6,
  },
});

export default ListingsScreen;
