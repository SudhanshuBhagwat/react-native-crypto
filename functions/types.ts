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
};

export type Result = {
  [key: string]: Coin[];
};
