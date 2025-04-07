import { getCurrentCycle } from "../src/sbtc/yieldActions";
import type { ToolConfig } from "./allTools.js";

import type { GetsBTCCurrentCycleArgs } from "../interface/index.js";

/**
 * Get the sBTC Incentives enrollment of a wallet.
 *
 * This tool takes a single parameter, the wallet address to get the enrollment
 * from.
 */
export const getsBTCCurrentCycleTool: ToolConfig<GetsBTCCurrentCycleArgs> = {
  definition: {
    type: "function",
    function: {
      name: "get_sbtc_currentcycle",
      description: "Get the current cycle for sBTC rewards",
      parameters: {
        type: "object",
        properties: {
          
        },
        required: [],
      },
    },
  },
  handler: async () => {
    return await currentCycle();
  },
};

async function currentCycle() {
  const cycle = await getCurrentCycle();
  return cycle;
}
