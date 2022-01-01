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
import { Coin } from "../functions/types";
import useData from "../hooks/useData";
import ListItem from "./ListItem";

const WIDTH = Dimensions.get("screen").width;

interface Trending {
  id: string;
  coin_id: string;
}

type Props = {
  data: Coin[];
};

const List: React.FC<Props> = ({ data }) => {
  const navigate = useNavigation<NativeStackNavigationProp<CoinStackParams>>();

  return (
    <FlatList
      data={data}
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
