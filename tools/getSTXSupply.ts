import { getSTXSupply } from "../src/stacks/getNetworkInfo";
import type { ToolConfig } from "./allTools.js";

import type { GetSTXSupplyArgs } from "../interface/index.js";

/**
 * Gets the connected wallet address.
 */
export const getSTXSupplyTool: ToolConfig<GetSTXSupplyArgs> = {
  definition: {
    type: "function",
    function: {
      name: "get_stx_supply",
      description: "Get the STX supply in the network",
      // No parameters needed since we're getting the connected wallet
      parameters: {
        type: "object",
        properties: {},
        required: [],
      },
    },
  },
  handler: async () => {
    return await getSupply();
  },
};

/**
 * Gets the connected wallet address.
 */
async function getSupply(): Promise<string> {
  const total = await getSTXSupply();
  return total;
}
