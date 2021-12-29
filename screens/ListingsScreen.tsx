import React from "react";
import {
  View,
  StyleSheet,
  Platform,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { CoinStackParams } from "../App";
import { Black } from "../components/Font";
import Svg, { Path } from "react-native-svg";
import List from "../components/List";

type Props = NativeStackScreenProps<CoinStackParams, "ListingsScreen">;

const ListingsScreen: React.FC<Props> = ({ route, navigation }) => {
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
        <Black style={styles.headingText}>{route.params.title}</Black>
      </View>
      <View>
        <List url={route.params.url} dataKey={route.params.dataKey} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flex: 1,
    backgroundColor: "white",
  },
  heading: {
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  headingText: {
    fontSize: 34,
    marginLeft: 16,
  },
  button: {
    backgroundColor: "#fff1f1",
    padding: 6,
    borderRadius: 6,
  },
});

export default ListingsScreen;
