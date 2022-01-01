import { useNavigation } from "@react-navigation/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import {
  FlatList,
  StyleSheet,
  View,
  Dimensions,
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
                coin: item,
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
