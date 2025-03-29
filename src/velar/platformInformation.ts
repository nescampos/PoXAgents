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