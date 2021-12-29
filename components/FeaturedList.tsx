import React from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { Bold, SemiBold } from "./Font";
import { Coin } from "./List";
import FeaturedItem from "./FeauredItem";
import { useNavigation } from "@react-navigation/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CoinStackParams } from "../App";
import useData from "../hooks/useData";

type Props = {
  url: string;
  dataKey?: string;
  title: string;
  queryParams?: {
    [key: string]: any;
  };
};

const FeaturedList: React.FC<Props> = ({
  url,
  dataKey,
  title,
  queryParams,
}) => {
  // const [list, setList] = React.useState<Coin[]>([]);
  const list = useData({
    url,
    dataKey,
    queryParams,
  });
  const navigation =
    useNavigation<NativeStackNavigationProp<CoinStackParams>>();

  // async function getData() {
  //   const result = await fetch(url);
  //   const data = await result.json();
  //   const resultData = dataKey ? data[dataKey] : data;

  //   resultData.forEach(async (d: any) => {
  //     setList((trend) => {
  //       return [
  //         ...trend,
  //         {
  //           id: d.rank,
  //           logo: d.logo ?? d.image,
  //           name: d.name,
  //           symbol: d.symbol,
  //           price: d.price ?? d.current_price,
  //           price_change: d.change ?? d.price_change_percentage_1h_in_currency,
  //           market_cap_rank: d.rank ?? d.market_cap_rank,
  //         },
  //       ];
  //     });
  //   });
  // }

  // React.useEffect(() => {
  //   getData();
  // }, []);

  return (
    <View>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Bold
          style={{
            fontSize: 24,
            paddingHorizontal: 20,
          }}
        >
          {title}
        </Bold>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("ListingsScreen", {
              url,
              dataKey,
              title,
            });
          }}
        >
          <SemiBold
            style={{
              fontSize: 16,
              paddingHorizontal: 20,
              color: "#06d6a0",
            }}
          >
            Show More
          </SemiBold>
        </TouchableOpacity>
      </View>
      <FlatList
        style={{ marginTop: 8, marginBottom: 18, marginHorizontal: 20 }}
        horizontal
        data={list}
        maxToRenderPerBatch={10}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          padding: 2,
        }}
        keyExtractor={(item) => `${item.name}-${item.rank}`}
        renderItem={({ item, index }) => {
          return <FeaturedItem item={item} size={list.length} index={index} />;
        }}
      />
    </View>
  );
};

export default FeaturedList;
