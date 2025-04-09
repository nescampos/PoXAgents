import { getRewardsByCycleAddress } from "../src/sbtc/yieldActions";
import type { ToolConfig } from "./allTools.js";

import type { GetsBTCRewardsByCycleAddressArgs } from "../interface/index.js";

/**
 * Get the sBTC Incentives rewards of a wallet.
 *
 */
export const getsBTCRewardsByCycleAddressTool: ToolConfig<GetsBTCRewardsByCycleAddressArgs> = {
  definition: {
    type: "function",
    function: {
      name: "get_sbtc_rewardsbycycleaddress",
      description: "Get the sBTC rewards for a specific cycle and address",
      parameters: {
        type: "object",
        properties: {
          cycle: {
            type: "number",
            //pattern: "^0x[a-fA-F0-9]{40}$",
            description: "The cycle to get the rewards",
          },
          wallet: {
            type: "string",
            //pattern: "^0x[a-fA-F0-9]{40}$",
            description: "The wallet address to get the sBTC rewards",
          },
        },
        required: ["cycle","wallet"],
      },
    },
  },
  handler: async ({cycle, wallet}) => {
    return await getRewards(cycle, wallet);
  },
};

async function getRewards(cycle:number, wallet:string) {
  const rewards = await getRewardsByCycleAddress(cycle, wallet);
  return rewards;
}
