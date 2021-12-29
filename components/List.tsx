import { useNavigation } from "@react-navigation/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  Dimensions,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { CoinStackParams } from "../App";
import useData from "../hooks/useData";
import ListItem from "./ListItem";

const WIDTH = Dimensions.get("screen").width;

export interface Coin {
  id: string;
  name: string;
  symbol: string;
  logo: string;
  price: string;
  market_cap_rank: string;
  price_change: string;
}

interface Trending {
  id: string;
  coin_id: string;
}

type Props = {
  url: string;
  dataKey?: string;
};

const List: React.FC<Props> = ({ url, dataKey }) => {
  const navigate = useNavigation<NativeStackNavigationProp<CoinStackParams>>();
  const list = useData({ url, dataKey });
  // const [coins, setCoins] = useState<Coin[]>([]);

  // async function getData() {
  //   const coinData: Map<string, Coin> = new Map();
  //   const result = await fetch(url);
  //   const data = await result.json();

  //   data.forEach((d: any) => {
  //     coinData.set(d.id, {
  //       id: d.id,
  //       name: d.name,
  //       symbol: d.symbol,
  //       logo: d.image,
  //       price: d.current_price,
  //       market_cap_rank: d.market_cap_rank,
  //       price_change: d.price_change_percentage_1h_in_currency,
  //     });
  //   });

  //   return coinData;
  // }

  // async function collectData() {
  //   const coinsData: Map<string, Coin> = await getData();

  //   setCoins(Array.from(coinsData.values()));
  // }

  // useEffect(() => {
  //   collectData();
  // }, []);

  return (
    <FlatList
      data={list}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item, _) => `${item.name}-${item.rank}`}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      contentContainerStyle={{
        paddingHorizontal: 20,
      }}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity
            onPress={() => {
              navigate.navigate("Details", {
                name: item.name,
              });
            }}
          >
            <ListItem coin={item} />
          </TouchableOpacity>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  separator: {
    margin: 6,
  },
});

export default List;
