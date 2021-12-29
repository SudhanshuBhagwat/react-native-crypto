import React from "react";
import axios from "axios";
import { Coin } from "../functions/types";

type Props = {
  url: string;
  dataKey?: string;
  queryParams?: {
    [key: string]: any;
  };
};

const useData = ({ url, dataKey, queryParams }: Props) => {
  const [list, setList] = React.useState<Coin[]>([]);

  async function getData() {
    const { data } = await axios.get(url, {
      params: queryParams,
    });
    const resultData = dataKey ? data[dataKey] : data;

    resultData.forEach(async (d: any) => {
      setList((trend) => {
        return [
          ...trend,
          {
            id: d.rank,
            logo: d.logo ?? d.image,
            name: d.name,
            symbol: d.symbol,
            price: d.price ?? d.current_price,
            change: d.change ?? d.price_change_percentage_1h_in_currency,
            rank: d.rank ?? d.market_cap_rank,
          },
        ];
      });
    });
  }

  React.useEffect(() => {
    getData();
  }, []);

  return list;
};

export default useData;
