import { getPoolsAvailable } from "../src/velar/platformInformation";
import type { ToolConfig } from "./allTools.js";

import type { GetPoolInformationArgs } from "../interface/index.js";

/**
 * Get pool information from Velar platform
 *
 * This tool takes a single optional parameter, the token symbol
 * from.
 */
export const getPoolInformationVelarTool: ToolConfig<GetPoolInformationArgs> = {
  definition: {
    type: "function",
    function: {
      name: "get_pool_information_velar",
      description: "Get information about pools available in Velar Protocol",
      parameters: {
        type: "object",
        properties: {
          token0: {
            type: "string",
            //pattern: "^0x[a-fA-F0-9]{40}$",
            description: "The contract Id for the first token in the pool",
          },
          token1: {
            type: "string",
            //pattern: "^0x[a-fA-F0-9]{40}$",
            description: "The contract Id for the second token in the pool",
          },
        },
        required: [],
      },
    },
  },
  handler: async ({ token0,token1 }) => {
    return await getInformation(token0,token1);
  },
};

async function getInformation(token0?: string, token1?: string) {
  const tokens = await getPoolsAvailable(token0, token1);
  return tokens;
}
