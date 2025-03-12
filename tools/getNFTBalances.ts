import { getNFTBalancesFromAddress } from "../src/stacks/getWalletInfo";
import type { ToolConfig } from "./allTools.js";

import type { GetBalanceArgs } from "../interface/index.js";

/**
 * Get the balance of a wallet.
 *
 * This tool takes a single parameter, the wallet address to get the balance
 * from.
 */
export const getNFTBalancesTool: ToolConfig<GetBalanceArgs> = {
  definition: {
    type: "function",
    function: {
      name: "get_nft_balances",
      description: "Get the NFT balances of a wallet",
      parameters: {
        type: "object",
        properties: {
          wallet: {
            type: "string",
            //pattern: "^0x[a-fA-F0-9]{40}$",
            description: "The wallet address to get the balance from",
          },
        },
        required: ["wallet"],
      },
    },
  },
  handler: async ({ wallet }) => {
    return await getBalance(wallet);
  },
};

async function getBalance(wallet: string) {
  const balance = await getNFTBalancesFromAddress(wallet);
  return balance;
}
