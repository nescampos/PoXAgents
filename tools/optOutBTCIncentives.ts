import { optoutToIncentives } from "../src/sbtc/yieldActions";
import type { ToolConfig } from "./allTools.js";

import type { GetsBTCCurrentCycleArgs } from "../interface/index.js";

/**
 * Get the sBTC Incentives enrollment of a wallet.
 *
 * This tool takes a single parameter, the wallet address to get the enrollment
 * from.
 */
export const optoutsBTCIncentivesTool: ToolConfig<GetsBTCCurrentCycleArgs> = {
  definition: {
    type: "function",
    function: {
      name: "optout_sbtc_incentives",
      description: "Unenroll/opt-out for sBTC incentives",
      parameters: {
        type: "object",
        properties: {
        },
        required: [],
      },
    },
  },
  handler: async () => {
    return await unenroll();
  },
};

async function unenroll() {
  const unenrolled = await optoutToIncentives();
  return unenrolled;
}
