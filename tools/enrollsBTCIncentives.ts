import { enrollToIncentives } from "../src/sbtc/yieldActions";
import type { ToolConfig } from "./allTools.js";

import type { GetsBTCCurrentCycleArgs } from "../interface/index.js";

/**
 * Get the sBTC Incentives enrollment of a wallet.
 *
 * This tool takes a single parameter, the wallet address to get the enrollment
 * from.
 */
export const enrollsBTCIncentivesTool: ToolConfig<GetsBTCCurrentCycleArgs> = {
  definition: {
    type: "function",
    function: {
      name: "enroll_sbtc_incentives",
      description: "Enroll to sBTC incentives to get rewards",
      parameters: {
        type: "object",
        properties: {
        },
        required: [],
      },
    },
  },
  handler: async () => {
    return await enroll();
  },
};

async function enroll() {
  const enrolled = await enrollToIncentives();
  return enrolled;
}
