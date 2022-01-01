import React, { useState } from "react";
import { View, StyleSheet, Platform, StatusBar, Image } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { CoinStackParams } from "../App";
import DetailsNav from "../components/DetailsNav";
import { Black, Bold, ExtraBold, Regular, SemiBold } from "../components/Font";
import { GRAY, GREEN, RED } from "../utils/colors";
import Chart from "../components/Chart";
import axios from "axios";
import { Coin } from "../functions/types";
import { STORAGE_KEY } from "../utils/constants";

type Props = NativeStackScreenProps<CoinStackParams, "Details">;

const COINGECKO_BASE = "https://api.coingecko.com/api/v3/coins/";
const IMAGE_SIZE = 80;

const DetailsScreen: React.FC<Props> = ({ route, navigation }) => {
  const [coin, setCoin] = useState<Coin>();
  const [error, setError] = useState<string>();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const coin_name = route.params.coin.name
    .split(" ")
    .join("-")
    .toLocaleLowerCase();

  async function getStorage() {
    const storage = await AsyncStorage.getItem(STORAGE_KEY);
    const data = storage !== null ? JSON.parse(storage) : null;
    if (data && data[route.params.coin.name]) {
      setIsBookmarked(true);
    } else {
      setIsBookmarked(false);
    }
  }

  async function setBookmark(name: string) {
    const storage = await AsyncStorage.getItem(STORAGE_KEY);
    const data = storage !== null ? JSON.parse(storage) : null;
    if (data && data[route.params.coin.name]) {
      delete data[route.params.coin.name];
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        setIsBookmarked(false);
      } catch (err) {
        setIsBookmarked(false);
        console.error(err);
      }
    } else {
      try {
        await AsyncStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            ...data,
            [name]: route.params.coin,
          })
        );
        setIsBookmarked(true);
      } catch (err) {
        setIsBookmarked(false);
        console.error(err);
      }
    }
  }

  React.useEffect(() => {
    async function getData() {
      try {
        const { data } = await axios.get(`${COINGECKO_BASE}${coin_name}`);
        setCoin({
          name: route.params.coin.name,
          symbol: data.sumbol ?? route.params.coin.symbol,
          price: data.market_data.current_price.usd ?? route.params.coin.price,
          change:
            Number(data.market_data.price_change_percentage_24h) ??
            route.params.coin.change,
          rank: Number(data.market_cap_rank) ?? route.params.coin.rank,
          logo: data.image.large ?? route.params.coin.logo,
          price_change: data.market_data.price_change_24h,
          high: data.market_data.high_24h.usd,
          low: data.market_data.low_24h.usd,
          market_cap: data.market_data.market_cap.usd,
          market_cap_change: data.market_data.market_cap_change_24h,
          volume: data.market_data.total_volume.usd,
          circulating_supply: data.market_data.circulating_supply,
          max_supply: data.market_data.max_supply,
          total_supply: data.market_data.total_supply,
        });
      } catch (err) {
        setCoin({
          name: route.params.coin.name,
          symbol: route.params.coin.symbol,
          price: route.params.coin.price,
          change: route.params.coin.change,
          rank: route.params.coin.rank,
          logo: route.params.coin.logo,
          price_change: "NAN",
        });
        setError("Market Data not available");
      }
    }

    getData();
    getStorage();
  }, []);

  return (
    <View style={styles.container}>
      <DetailsNav
        isBookmarked={isBookmarked}
        setBookmark={() => setBookmark(coin?.name!)}
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 10,
        }}
      >
        <View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Black style={styles.heading}>{route.params.coin.name}</Black>
            <Black style={styles.rank}>#{route.params.coin.rank}</Black>
          </View>
          <ExtraBold style={{ fontSize: 30 }}>$ {coin?.price}</ExtraBold>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Regular style={{ color: Number(coin?.change) > 0 ? GREEN : RED }}>
              {coin?.price_change} ({coin?.change}%)
            </Regular>
            <Regular>Today</Regular>
          </View>
        </View>
        <Image
          source={{
            uri: coin?.logo,
          }}
          style={{
            width: IMAGE_SIZE,
            height: IMAGE_SIZE,
            marginRight: 10,
          }}
        />
      </View>
      <View style={{ marginTop: 10 }}>
        {error ? (
          <Bold style={{ fontSize: 24 }}>{error}</Bold>
        ) : (
          <Chart id={coin_name} />
        )}
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.comp}>
          <View style={styles.flex}>
            <Bold style={styles.title}>High</Bold>
            <Regular style={styles.value}>{coin?.high ?? "NAN"}</Regular>
          </View>
          <View style={styles.flex}>
            <Bold style={styles.title}>Low</Bold>
            <Regular style={styles.value}>{coin?.low ?? "NAN"}</Regular>
          </View>
        </View>
        <View style={styles.separator} />
        <View style={styles.comp}>
          <View style={styles.flex}>
            <Bold style={styles.title}>Market Cap</Bold>
            <Regular style={styles.value}>{coin?.market_cap ?? "NAN"}</Regular>
          </View>
          <View style={styles.flex}>
            <Bold style={styles.title}>Market Cap Change</Bold>
            <Regular style={styles.value}>
              {coin?.market_cap_change ?? "NAN"}
            </Regular>
          </View>
        </View>
        <View style={styles.separator} />
        <View style={styles.comp}>
          <View style={styles.flex}>
            <Bold style={styles.title}>Volume</Bold>
            <Regular style={styles.value}>{coin?.volume ?? "NAN"}</Regular>
          </View>
          <View style={styles.flex}>
            <Bold style={styles.title}>Circulating Supply</Bold>
            <Regular style={styles.value}>
              {coin?.circulating_supply ?? "NAN"}
            </Regular>
          </View>
        </View>
        <View style={styles.separator} />
        <View style={styles.comp}>
          <View style={styles.flex}>
            <Bold style={styles.title}>Total Supply</Bold>
            <Regular style={styles.value}>
              {coin?.total_supply ?? "NAN"}
            </Regular>
          </View>
          <View style={styles.flex}>
            <Bold style={styles.title}>Max Supply</Bold>
            <Regular style={styles.value}>{coin?.max_supply ?? "NAN"}</Regular>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    paddingTop: 20,
    backgroundColor: "white",
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 34,
  },
  rank: {
    padding: 8,
    backgroundColor: GRAY,
    marginLeft: 10,
    borderRadius: 6,
  },
  detailsContainer: {
    marginTop: 30,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: GRAY,
    paddingVertical: 14,
  },
  comp: {
    flexDirection: "row",
    paddingHorizontal: 14,
  },
  flex: {
    flex: 1,
  },
  title: {
    fontSize: 16,
  },
  value: {
    fontSize: 16,
  },
  separator: {
    height: 2,
    marginVertical: 10,
    backgroundColor: GRAY,
    borderRadius: 10,
  },
});

export default DetailsScreen;
