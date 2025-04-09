import { getAvailableTokens } from "../src/alexgo/protocolInformation";
import type { ToolConfig } from "./allTools.js";

import type { GetAvailableTokensAlexGoArgs } from "../interface/index.js";

/**
 * Get available tokens from alexgo platform
 *
 * This tool takes a single optional parameter, the token symbol
 * from.
 */
export const getAvailableTokensfromAlexgoTool: ToolConfig<GetAvailableTokensAlexGoArgs> = {
  definition: {
    type: "function",
    function: {
      name: "get_availabletokens_alexgo",
      description: "Get the available tokens to swap in AlexGo protocol",
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
  const response = await getAvailableTokens();
  return response;
}
