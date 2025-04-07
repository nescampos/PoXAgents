import { getRewardAddress } from "../src/sbtc/yieldActions";
import type { ToolConfig } from "./allTools.js";

import type { GetsBTCRewardAddressArgs } from "../interface/index.js";

/**
 * Get the sBTC Incentives enrollment of a wallet.
 *
 * This tool takes a single parameter, the wallet address to get the enrollment
 * from.
 */
export const getsBTCRewardAddressTool: ToolConfig<GetsBTCRewardAddressArgs> = {
  definition: {
    type: "function",
    function: {
      name: "get_sbtc_rewardaddress",
      description: "Get the sBTC reward address for a specific address",
      parameters: {
        type: "object",
        properties: {
          wallet: {
            type: "string",
            //pattern: "^0x[a-fA-F0-9]{40}$",
            description: "The wallet address to get the sBTC reward address",
          },
        },
        required: [],
      },
    },
  },
  handler: async ({wallet}) => {
    return await getAddress(wallet);
  },
};

async function getAddress(wallet:string) {
  const address = await getRewardAddress(wallet);
  return address;
}
