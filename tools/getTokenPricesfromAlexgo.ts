import { getTokenPrices } from "../src/alexgo/protocolInformation";
import type { ToolConfig } from "./allTools.js";

import type { GetAvailableTokensAlexGoArgs } from "../interface/index.js";

/**
 * Get tokens prices from alexgo platform
 *
 * This tool takes a single optional parameter, the token symbol
 * from.
 */
export const getTokenPricesfromAlexgoTool: ToolConfig<GetAvailableTokensAlexGoArgs> = {
  definition: {
    type: "function",
    function: {
      name: "get_tokenprices_alexgo",
      description: "Get the price of the tokens in USD to swap in AlexGo protocol",
      parameters: {
        type: "object",
        properties: {
          
        },
        required: [],
      },
    },
  },
  handler: async () => {
    return await getInformation();
  },
};

async function getInformation() {
  const response = await getTokenPrices();
  return response;
}
