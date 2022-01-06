import type { VercelRequest, VercelResponse } from "@vercel/node";
import { load } from "cheerio";
import axios from "axios";
import { Coin, Result } from "../types";

export default async (request: VercelRequest, response: VercelResponse) => {
  const { limit } = request.query;
  const pageData = await axios.get(`https://coinmarketcap.com/new/`);
  const $ = load(pageData.data);
  const coins: Coin[] = [];

  const table = $("tbody").children();
  table.each((index, row) => {
    const ranking = $(row).find("p").first().text();
    const imgSource = $(row).children().find("img").attr("src");
    const paras = $(row).children().find("p");
    const values = paras.map((index, element) => {
      return $(element).text();
    });

    const spans = $(row).children().find("span");
    const isUp = spans.hasClass("icon-Caret-down");
    const prices = spans.map((index, element) => {
      return !isUp ? $(element).text() : `-${$(element).text()}`;
    });

    coins.push({
      rank: Number(ranking),
      logo: imgSource,
      name: values[1],
      symbol: values[2],
      price: prices[2],
      change: Number(prices[5].substring(0, prices[5].length - 1)),
    });
  });

  response.status(200).send({
    data: limit ? coins.slice(0, Number(limit)) : coins,
  });
};
