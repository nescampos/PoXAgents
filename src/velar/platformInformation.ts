import { VELAR_BASE_URL } from "../constants/stackseco";
import axios from "axios";


export async function getTokensAvailable(symbol?:string) {
    if(symbol == undefined || symbol == null || symbol == "") {
        symbol = "all";
    }

    const targetPath = `${VELAR_BASE_URL}/tokens?symbol=${symbol}`;
  
      try {
          const {data} = await axios.get(
              targetPath
          );
          return data.map((token) => `Symbol: ${token.symbol}, Name: ${token.name}, Address: ${token.contractAddress}, Price: ${token.price}, Website: ${token.socialLinks.website}`);
  
      } catch (error) {
          throw(error);
      };
}

export async function getPoolsAvailable(token0?:string, token1?:string) {

  let targetPath = `${VELAR_BASE_URL}/pools`;

  if(token0 !== undefined && token1 !== undefined) {
    targetPath = `${targetPath}/${token0}/${token1}`;
  }

    try {
        const {data} = await axios.get(
            targetPath
        );
        return data.data.map((pool) => `Symbol: ${pool.symbol}, Token 0: ${pool.token0Symbol}, Token 1: ${pool.token1Symbol}, Total value locked (in USD): ${pool.stats.tvl_usd.value}`);

    } catch (error) {
        throw(error);
    };
}