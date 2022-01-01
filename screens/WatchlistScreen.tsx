import React, { useEffect, useState } from "react";
import { View, StyleSheet, Platform, StatusBar } from "react-native";
import { Black } from "../components/Font";
import List from "../components/List";
import { STORAGE_KEY } from "../utils/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Coin } from "../functions/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { CoinStackParams, TabNavigationParams } from "../App";

type Props = NativeStackScreenProps<TabNavigationParams, "Watchlist">;

const WatchlistScreen: React.FC<Props> = ({ navigation }) => {
  const [list, setList] = useState<Coin[]>();

  async function getStorage() {
    const storage = await AsyncStorage.getItem(STORAGE_KEY);
    const data = storage !== null ? JSON.parse(storage) : null;
    const storeList: Coin[] = Object.keys(data).map((key) => data[key]);
    setList(storeList);
  }

  useEffect(() => {
    getStorage();
    const willFocusSubscription = navigation.addListener("focus", () => {
      getStorage();
    });

    return willFocusSubscription;
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Black style={styles.headingText}>Watchlist</Black>
      </View>
      <View>
        <List data={list!} />
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
    paddingVertical: 10,
  },
  headingText: {
    fontSize: 34,
  },
});

export default WatchlistScreen;
