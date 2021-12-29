import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Platform,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { CoinStackParams } from "../App";
import hmacSHA256 from "crypto-js/hmac-sha256";
import Svg, { Path } from "react-native-svg";
import DetailsNav from "../components/DetailsNav";

type Props = NativeStackScreenProps<CoinStackParams, "Details">;

const BASE_URL = "https://api.coindcx.com";
const API_KEY = "4576e64c1a44a0b5c204a7a0806ed13459c179ab99c8ad08";
const API_SECRET =
  "4c604a827f7c81ddf8960bb0226d0cb915f440cc5775d045784826156c52c425";

const DetailsScreen: React.FC<Props> = ({ route, navigation }) => {
  React.useEffect(() => {
    async function getData() {
      const timeStamp = Math.floor(Date.now());
      const body = {
        timeStamp,
      };

      const payload = JSON.stringify(body);
      const signature = hmacSHA256(payload, API_SECRET).toString();

      try {
        const result = await fetch(`${BASE_URL}/exchange/v1/users/balances`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-AUTH-APIKEY": API_KEY,
            "X-AUTH-SIGNATURE": signature,
          },
          body: JSON.stringify(body),
        });
        const data = await result.json();
        const mine = data.filter(
          (d: { balance: any }) => Number(d.balance) > 0
        );
      } catch (e) {
        console.error(e);
      }
    }

    getData();
  });

  return (
    <View style={styles.container}>
      <DetailsNav name={route.params.name.toLocaleUpperCase()} />
      <View style={styles.content}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight! + 16 : 0,
    paddingHorizontal: 20,
  },
  content: {
    marginTop: 10,
  },
  heading: {
    fontSize: 34,
    fontWeight: "bold",
  },
});

export default DetailsScreen;
