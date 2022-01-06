import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { Coin } from "../functions/types";
import { GRAY } from "../utils/colors";
import { Black, Bold, Regular, SemiBold } from "./Font";
import Caret from "./icons/Caret";

type Props = {
  item: Coin;
  size: number;
  index: number;
};

const IMAGE_SIZE = 40;

const FeaturedItem: React.FC<Props> = ({ item, size, index }) => {
  return (
    <View
      style={[
        styles.card,
        {
          marginRight: index === size - 1 ? 0 : 10,
        },
      ]}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View>
          <Black style={styles.symbol}>{item.symbol.toUpperCase()}</Black>
          <Regular
            style={{
              fontSize: 14,
              marginBottom: 4,
            }}
          >
            {item.name}
          </Regular>
        </View>
        <Image
          source={{ uri: item.logo }}
          style={{
            width: IMAGE_SIZE,
            height: IMAGE_SIZE,
          }}
        />
      </View>
      <View style={[styles.textContainer, { alignItems: "flex-end" }]}>
        <View
          style={{
            alignItems: "flex-start",
            flex: 1,
          }}
        >
          <Regular
            style={{
              fontSize: 14,
              marginBottom: 4,
            }}
          >
            USD
          </Regular>
          <Black
            style={{
              fontSize: 14,
              flexWrap: "wrap",
            }}
          >
            $ {item.price}
          </Black>
        </View>
        <View style={styles.changeContainer}>
          <Bold
            style={{
              fontSize: 14,
              color: Number(item.change) > 0 ? "green" : "red",
            }}
          >
            {Number(item.change) > 0 ? "+" : ""}
            {Number.parseFloat(`${item.change}`).toFixed(2)}%
          </Bold>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 160,
    width: 200,
    backgroundColor: GRAY,
    borderRadius: 10,
    padding: 12,
  },
  coin: {
    fontSize: 18,
    flexWrap: "wrap",
  },
  symbol: {
    fontSize: 24,
  },
  changeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
  },
});

export default FeaturedItem;
