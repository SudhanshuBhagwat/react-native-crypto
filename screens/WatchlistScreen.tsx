import React, { useEffect, useState } from "react";
import { View, StyleSheet, Platform, StatusBar } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { TabNavigationParams } from "../App";

import { Black, Bold } from "../components/Font";
import List from "../components/List";

import { Coin } from "../functions/types";

import { STORAGE_KEY } from "../utils/constants";

type Props = NativeStackScreenProps<TabNavigationParams, "Watchlist">;

const WatchlistScreen: React.FC<Props> = ({ navigation }) => {
  const [list, setList] = useState<Coin[]>([]);

  async function getStorage() {
    const storage = await AsyncStorage.getItem(STORAGE_KEY);
    const data = storage !== null ? JSON.parse(storage) : null;
    const storeList: Coin[] = Object.keys(data).map((key) => data[key]);
    setList(storeList);
  }

  async function removeWatchListItem(name: string) {
    const storage = await AsyncStorage.getItem(STORAGE_KEY);
    const data = storage !== null ? JSON.parse(storage) : null;
    if (data && data[name]) {
      delete data[name];
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        await getStorage();
      } catch (err) {
        console.error(err);
      }
    }
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
      {list?.length > 0 ? (
        <View style={{ flex: 1 }}>
          <List
            data={list!}
            swipeable
            onSwipeOpen={async (name) => await removeWatchListItem(name)}
          />
        </View>
      ) : (
        <View style={styles.error}>
          <Bold>No items in Watchlist</Bold>
        </View>
      )}
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
  error: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default WatchlistScreen;
