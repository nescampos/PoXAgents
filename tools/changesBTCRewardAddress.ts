import { changeRewardAddress } from "../src/sbtc/yieldActions";
import type { ToolConfig } from "./allTools.js";

import type { GetsBTCRewardAddressArgs } from "../interface/index.js";

/**
 * Get the sBTC Incentives enrollment of a wallet.
 *
 * This tool takes a single parameter, the wallet address to get the enrollment
 * from.
 */
export const changesBTCRewardAddressTool: ToolConfig<GetsBTCRewardAddressArgs> = {
  definition: {
    type: "function",
    function: {
      name: "change_sbtc_rewardaddress",
      description: "Change the sBTC reward address for this wallet",
      parameters: {
        type: "object",
        properties: {
          wallet: {
            type: "string",
            //pattern: "^0x[a-fA-F0-9]{40}$",
            description: "The new wallet address to get the sBTC rewards",
          },
        },
        required: [],
      },
    },
  },
  handler: async ({wallet}) => {
    return await newAddress(wallet);
  },
};

async function newAddress(wallet:string) {
  const response = await changeRewardAddress(wallet);
  return response;
}
