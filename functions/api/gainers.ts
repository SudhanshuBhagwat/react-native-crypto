import type { VercelRequest, VercelResponse } from "@vercel/node";
import { load } from "cheerio";
import axios from "axios";
import { Coin, Result } from "../types";

export default async (request: VercelRequest, response: VercelResponse) => {
  const { limit } = request.query;
  const pageData = await axios.get(
    `https://coinmarketcap.com/gainers-losers/`,
    {
      withCredentials: true,
      headers: {
        Cookie: `currency=%7B%22id%22%3A2784%2C%22name%22%3A%22Canadian%20Dollar%22%2C%22symbol%22%3A%22cad%22%2C%22token%22%3A%22%24%22%7D`,
      },
    }
  );
  const $ = load(pageData.data);
  const result: Result = {};

  const containers = $("h3").parent();
  containers.each((index, container) => {
    const coins: Coin[] = [];
    const heading = $(container).first().find("h3").text();
    const data = $(container).find("tbody");
    data.children().each((index, element) => {
      const ranking = $(element).children().first().find("p").text();
      const imgSource = $(element).children().find("img").attr("src");
      const paras = $(element).children().find("p");
      const values = paras.map((index, element) => {
        return $(element).text();
      });

      const spans = $(element).children().find("span");
      const isUp = spans.hasClass("icon-Caret-down");
      const prices = spans.map((index, element) => {
        return !isUp ? $(element).text() : `-${$(element).text()}`;
      });

      coins.push({
        rank: Number(ranking),
        logo: imgSource,
        name: values[1],
        symbol: values[2],
        price: prices[0],
        change: Number(prices[1].substring(0, prices[1].length - 1)),
      });
      result[heading] = limit ? coins.slice(0, Number(limit)) : coins;
    });
  });

  response.status(200).send(result);
};
