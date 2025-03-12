import { searchHash } from "../src/stacks/getNetworkInfo";
import type { ToolConfig } from "./allTools.js";

import type { SearchHashArgs } from "../interface/index.js";

/**
 * Search an specific hash
 *
 * This tool takes a single parameter, the hash to search
 */
export const searchHashTool: ToolConfig<SearchHashArgs> = {
  definition: {
    type: "function",
    function: {
      name: "search_hash",
      description: "Search blocks, transactions, contracts, or accounts by hash/ID",
      parameters: {
        type: "object",
        properties: {
          hash: {
            type: "string",
            //pattern: "^0x[a-fA-F0-9]{40}$",
            description: "The hash to search the info",
          },
        },
        required: ["hash"],
      },
    },
  },
  handler: async ({ hash }) => {
    return await search(hash);
  },
};

async function search(hash: string) {
  const info = await searchHash(hash);
  return info;
}
