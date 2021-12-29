import React from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Platform,
  StatusBar,
  Text,
  ScrollView,
} from "react-native";
import { Black } from "../components/Font";
import FeaturedList from "../components/FeaturedList";

const GAINERS_URL = "http://192.168.0.10:3000/api/gainers";
const TRENDING_URL = "http://192.168.0.10:3000/api/trending";
const MOSTVISITED_URL = "http://192.168.0.10:3000/api/most-visited";
const NEW_URL = "http://192.168.0.10:3000/api/new";
const TOP100_URL: string =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&price_change_percentage=1h";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Black style={styles.headingText}>Portfolio</Black>
      </View>
      <ScrollView
        style={{
          flex: 1,
        }}
      >
        <FeaturedList
          url={TOP100_URL}
          title="Top 100 🔥"
          queryParams={{
            per_page: 10,
          }}
        />
        <FeaturedList
          url={TRENDING_URL}
          dataKey="data"
          title="Trending 🔥"
          queryParams={{
            limit: 10,
          }}
        />
        <FeaturedList
          url={GAINERS_URL}
          dataKey="Top Gainers"
          title="Top Gainers 📈"
          queryParams={{
            limit: 10,
          }}
        />
        <FeaturedList
          url={GAINERS_URL}
          dataKey="Top Losers"
          title="Top Losers 📉"
          queryParams={{
            limit: 10,
          }}
        />
        <FeaturedList
          url={MOSTVISITED_URL}
          dataKey="data"
          title="Most Visited 🔖"
          queryParams={{
            limit: 10,
          }}
        />
        <FeaturedList
          url={NEW_URL}
          dataKey="data"
          title="Top New 🆕"
          queryParams={{
            limit: 10,
          }}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "white",
  },
  heading: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headingText: {
    fontSize: 34,
  },
  subheading: {
    fontSize: 24,
  },
});
