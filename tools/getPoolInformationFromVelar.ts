import { getTokensAvailable } from "../src/velar/platformInformation";
import type { ToolConfig } from "./allTools.js";

import type { GetTokenInformationArgs } from "../interface/index.js";

/**
 * Get token information from Velar platform
 *
 * This tool takes a single optional parameter, the token symbol
 * from.
 */
export const getTokenInformationVelarTool: ToolConfig<GetTokenInformationArgs> = {
  definition: {
    type: "function",
    function: {
      name: "get_token_information_velar",
      description: "Get information about tokens available in Velar Protocol",
      parameters: {
        type: "object",
        properties: {
          token: {
            type: "string",
            //pattern: "^0x[a-fA-F0-9]{40}$",
            description: "The symbol of the token to look for",
          },
        },
        required: [],
      },
    },
  },
  handler: async ({ token }) => {
    return await getInformation(token);
  },
};

async function getInformation(token?: string) {
  const tokens = await getTokensAvailable(token);
  return tokens;
}
