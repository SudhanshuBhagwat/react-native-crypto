export type Coin = {
  rank: number;
  logo?: string;
  name: string;
  symbol: string;
  price: string;
  change: number;
};

export type Result = {
  [key: string]: Coin[];
};
