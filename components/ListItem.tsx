import React from "react";
import { View, StyleSheet, Image, Alert } from "react-native";
import Caret from "./icons/Caret";
import { Medium, Regular } from "./Font";
import { Coin } from "../functions/types";
import { GRAY } from "../utils/colors";

interface Props {
  coin: Coin;
}

const IMAGE_SIZE = 40;
const CARET_SIZE = 12;

const ListItem: React.FC<Props> = ({ coin }) => {
  return (
    <View style={styles.container}>
      <View style={styles.coinContainer}>
        <Image
          style={styles.image}
          source={{
            uri: coin.logo,
          }}
        />
        <View style={styles.coin}>
          <Medium style={styles.name}>{coin.name}</Medium>
          <Regular style={styles.symbol}>{coin.symbol.toUpperCase()}</Regular>
        </View>
      </View>
      <View style={styles.priceContainer}>
        <Regular style={styles.price}>
          ${" "}
          {Number(coin.price) > 1
            ? Number.parseFloat(coin.price).toFixed(2)
            : Number.parseFloat(coin.price).toFixed(6)}
        </Regular>
        <View style={styles.changeContainer}>
          <Caret
            isUp={Number(coin.change) > 0}
            style={{
              marginTop: 4,
            }}
          />
          <Regular
            style={[
              styles.change,
              { color: Number(coin.change) < 0 ? "red" : "green" },
            ]}
          >
            {Number.parseFloat(`${coin.change}`).toFixed(2)}%
          </Regular>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  name: {
    fontSize: 20,
  },
  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    marginRight: 16,
  },
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    backgroundColor: GRAY,
    paddingHorizontal: 10,
    borderRadius: 14,
  },
  coinContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  coin: {
    flexDirection: "column",
  },
  symbol: {},
  priceContainer: {
    flexDirection: "column",
    alignItems: "flex-end",
  },
  price: {
    fontSize: 16,
  },
  changeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  change: {
    marginTop: 4,
    marginRight: 4,
  },
});

export default ListItem;
