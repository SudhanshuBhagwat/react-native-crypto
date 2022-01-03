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
import { STORAGE_KEY } from "../utils/constants";
import ListItem from "./ListItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Swipeable } from "react-native-gesture-handler";

const WIDTH = Dimensions.get("screen").width;

interface Trending {
  id: string;
  coin_id: string;
}

type Props = {
  data: Coin[];
  swipeable: boolean;
  onSwipeOpen: (name: string) => void;
};

const List: React.FC<Props> = ({ data, swipeable = false, onSwipeOpen }) => {
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
            <Swipeable
              enabled={swipeable}
              renderRightActions={() => (
                <View
                  style={{
                    flex: 1,
                    backgroundColor: "red",
                    borderRadius: 14,
                  }}
                />
              )}
              onSwipeableOpen={async () => await onSwipeOpen(item.name)}
            >
              <ListItem coin={item} />
            </Swipeable>
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
