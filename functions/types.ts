export type Coin = {
  rank: number;
  logo?: string;
  name: string;
  symbol: string;
  price: string;
  change: number;
  price_change?: string;
  high?: string;
  low?: string;
  volume?: string;
  market_cap?: string;
  market_cap_change?: string;
  circulating_supply?: string;
  total_supply?: string;
  max_supply?: string;
};

export type Result = {
  [key: string]: Coin[];
};
