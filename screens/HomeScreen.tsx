import React from "react";
import {
  View,
  StyleSheet,
  Platform,
  StatusBar,
  ScrollView,
  Image,
  Pressable,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Feather } from "@expo/vector-icons";

import { CoinStackParams, TabNavigationParams } from "../App";

import { Bold } from "../components/Font";
import FeaturedList from "../components/FeaturedList";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { BLUE, WHITE } from "../utils/colors";
import { useTheme } from "@react-navigation/native";

const GAINERS_URL = "http://192.168.0.10:3000/api/gainers";
const TRENDING_URL = "http://192.168.0.10:3000/api/trending";
const MOSTVISITED_URL = "http://192.168.0.10:3000/api/most-visited";
const NEW_URL = "http://192.168.0.10:3000/api/new";
const TOP100_URL: string =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&price_change_percentage=1h";

type Props = NativeStackScreenProps<CoinStackParams, "HomeScreen">;

const SIZE = 50;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const user = useSelector((state: RootState) => state.user.user);
  const { colors, dark } = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            source={{ uri: user?.photoUrl }}
            style={{
              borderRadius: SIZE / 2,
              height: SIZE,
              width: SIZE,
              marginRight: 10,
            }}
          />
          <View>
            <Bold
              style={{
                fontSize: 16,
                color: "#9c9c9c",
              }}
            >
              Hello,
            </Bold>
            <Bold
              style={{
                fontSize: 20,
                color: dark ? "#f8edeb" : "#fec5bb",
              }}
            >
              {user?.displayName}
            </Bold>
          </View>
        </View>
        <Pressable onPress={() => navigation.push("SettingsScreen")}>
          <Feather name="settings" size={30} color={colors.text} />
        </Pressable>
      </View>
      <ScrollView
        style={{
          flex: 1,
        }}
      >
        {/* <FeaturedList
          url={TOP100_URL}
          title="Top 100 🔥"
          queryParams={{
            per_page: 10,
          }}
        /> */}
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  heading: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  headingText: {
    fontSize: 34,
  },
  subheading: {
    fontSize: 24,
  },
});

export default HomeScreen;
