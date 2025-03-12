import { getTransactionsFromAddress } from "../src/stacks/getWalletInfo";
import type { ToolConfig } from "./allTools.js";

import type { GetBalanceArgs } from "../interface/index.js";

/**
 * Get the balance of a wallet.
 *
 * This tool takes a single parameter, the wallet address to get the transactions
 * from.
 */
export const getLastTransactionsTool: ToolConfig<GetBalanceArgs> = {
  definition: {
    type: "function",
    function: {
      name: "get_last_transactions",
      description: "Get the last 10 transactions from a wallet",
      parameters: {
        type: "object",
        properties: {
          wallet: {
            type: "string",
            //pattern: "^0x[a-fA-F0-9]{40}$",
            description: "The wallet address to get the transactions from",
          },
        },
        required: ["wallet"],
      },
    },
  },
  handler: async ({ wallet }) => {
    return await getTransactions(wallet);
  },
};

async function getTransactions(wallet: string) {
  const txs = await getTransactionsFromAddress(wallet);
  return txs;
}
