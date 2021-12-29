import React from "react";
import { View, StyleSheet, Platform, StatusBar } from "react-native";
import { Black } from "../components/Font";

export default function WatchlistScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Black style={styles.headingText}>Watchlist</Black>
      </View>
      <View></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flex: 1,
    backgroundColor: "white",
  },
  heading: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headingText: {
    fontSize: 34,
  },
});
