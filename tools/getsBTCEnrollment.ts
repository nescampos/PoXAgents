import { isWalletEnrolled } from "../src/sbtc/yieldActions";
import type { ToolConfig } from "./allTools.js";

import type { GetsBTCEnrollmentArgs } from "../interface/index.js";

/**
 * Get the sBTC Incentives enrollment of a wallet.
 *
 * This tool takes a single parameter, the wallet address to get the enrollment
 * from.
 */
export const getsBTCEnrollmentTool: ToolConfig<GetsBTCEnrollmentArgs> = {
  definition: {
    type: "function",
    function: {
      name: "get_sbtc_enrollment",
      description: "Get the status of the enrollment in sBTC Incentives",
      parameters: {
        type: "object",
        properties: {
          wallet: {
            type: "string",
            //pattern: "^0x[a-fA-F0-9]{40}$",
            description: "The wallet address to get the sBTC Incentives enrollment from",
          },
        },
        required: ["wallet"],
      },
    },
  },
  handler: async ({ wallet }) => {
    return await isEnrolled(wallet);
  },
};

async function isEnrolled(wallet: string) {
  const isEnrolledWallet = await isWalletEnrolled(wallet);
  return isEnrolledWallet;
}
