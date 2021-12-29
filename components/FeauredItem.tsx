import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { Coin } from "../functions/types";
import { GRAY } from "../utils/colors";
import { Bold, Regular, SemiBold } from "./Font";
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
        style={[
          styles.textContainer,
          {
            alignItems: "flex-start",
          },
        ]}
      >
        <View style={{ flex: 1 }}>
          <Bold style={styles.coin}>{item.name}</Bold>
          <Regular style={styles.symbol}>{item.symbol.toUpperCase()}</Regular>
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
              fontSize: 12,
            }}
          >
            USD
          </Regular>
          <SemiBold
            style={{
              fontWeight: "bold",
              fontSize: 14,
              flexWrap: "wrap",
            }}
          >
            $ {item.price}
          </SemiBold>
        </View>
        <View style={styles.changeContainer}>
          <Caret isUp={Number(item.change) > 0} />
          <Bold
            style={{
              color: Number(item.change) > 0 ? "green" : "red",
            }}
          >
            {Number.parseFloat(`${item.change}`).toFixed(2)}%
          </Bold>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 140,
    width: 240,
    backgroundColor: GRAY,
    elevation: 2,
    borderRadius: 10,
    padding: 12,
  },
  coin: {
    fontSize: 18,
    flexWrap: "wrap",
  },
  symbol: {
    fontSize: 12,
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
