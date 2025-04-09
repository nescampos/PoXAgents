import { getFeeRateBetweenTokens } from "../src/alexgo/protocolInformation";
import type { ToolConfig } from "./allTools.js";

import type { GetFeeRateAlexGoArgs } from "../interface/index.js";

/**
 * Get fee rate information from alexgo platform
 *
 * This tool takes a single optional parameter, the token symbol
 * from.
 */
export const getFeeRatefromAlexgoTool: ToolConfig<GetFeeRateAlexGoArgs> = {
  definition: {
    type: "function",
    function: {
      name: "get_feerate_alexgo",
      description: "Get the fee rate in swapping between 2 tokens in AlexGo protocol",
      parameters: {
        type: "object",
        properties: {
          token0: {
            type: "string",
            //pattern: "^0x[a-fA-F0-9]{40}$",
            description: "The symbol for the first token to get fee rate",
          },
          token1: {
            type: "string",
            //pattern: "^0x[a-fA-F0-9]{40}$",
            description: "The symbol for the second token to get fee rate",
          },
        },
        required: ["token0","token1"],
      },
    },
  },
  handler: async ({ token0,token1 }) => {
    return await getInformation(token0,token1);
  },
};

async function getInformation(token0: string, token1: string) {
  const response = await getFeeRateBetweenTokens(token0, token1);
  return response;
}
