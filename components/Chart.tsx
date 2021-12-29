import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { GRAY, GREEN } from "../utils/colors";
import { Bold } from "./Font";
import { LineChart } from "react-native-svg-charts";
import * as shape from "d3-shape";

const TIME_SPAN: Record<string, string> = {
  "1D": "1",
  "7D": "7",
  "1M": "30",
  "3M": "90",
  "1Y": "365",
  MAX: "max",
};
const { width: SIZE } = Dimensions.get("window");

const URL = (id: string, timeSpan: string) =>
  `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${timeSpan}`;

type Props = {
  id: string;
};

const Chart: React.FC<Props> = ({ id }) => {
  const [price, setPrice] = useState([]);
  const [current, setCurrent] = useState("1");

  async function getData(timeStamp: string) {
    const {
      data: { prices },
    } = await axios.get(URL(id, timeStamp));
    setPrice(prices);
  }

  useEffect(() => {
    getData(current);
  }, [current]);

  return (
    <View>
      <LineChart
        style={{ height: 200 }}
        data={price.map(([_, y]: [x: number, y: number]) => y)}
        svg={{ stroke: GREEN }}
        contentInset={{ top: 20, bottom: 20 }}
        curve={shape.curveNatural}
      />
      <View style={styles.buttonContainer}>
        {Object.keys(TIME_SPAN).map((time) => {
          return (
            <TouchableOpacity
              key={time}
              style={[styles.button]}
              onPress={() => {
                setCurrent(TIME_SPAN[time]);
              }}
            >
              <Bold
                style={{
                  color: TIME_SPAN[time] === current ? "black" : "#cccccc",
                }}
              >
                {time}
              </Bold>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginTop: 10,
  },
  button: {
    backgroundColor: GRAY,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
});

export default Chart;
