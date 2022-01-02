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

const useData = ({ url, dataKey, queryParams }: Props): [Coin[], boolean] => {
  const [list, setList] = React.useState<Coin[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

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
    setIsLoading(false);
  }, []);

  return [list, isLoading];
};

export default useData;
