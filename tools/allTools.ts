import { getWalletAddressTool } from "./getWalletAddress";
import { getBalanceTool } from "./getBalance";
import { getTokenBalancesTool } from "./getTokenBalances";
import { getNFTBalancesTool } from "./getNFTBalances";
import { getLastTransactionsTool } from "./getLastTransactions";
import { searchHashTool } from "./searchHash";
import { getSTXSupplyTool } from "./getSTXSupply";
import { sendTransactionTool } from "./sendTransaction";
import { getTokenInformationVelarTool } from "./getTokenInformation";
import { getPoolInformationVelarTool } from "./getPoolInformationFromVelar";

export interface ToolConfig<T = any> {
  /**
   * The definition of the tool.
   */
  definition: {
    type: "function";
    function: {
      name: string;
      description: string;
      parameters: {
        type: "object";
        properties: Record<string, unknown>;
        required: string[];
      };
    };
  };

  /**
   * The handler function that will be called when the tool is executed.
   */
  handler: (args: T) => Promise<any>;
}

export const tools: Record<string, ToolConfig> = {
  // == READ == \\
  /**
   * Get the connected wallet address.
   */
  get_wallet_address: getWalletAddressTool,
  /**
   * Get the balance of a wallet address.
   */
   get_balance: getBalanceTool,
  /**
   * Get the token balances of a wallet address.
   */
   get_token_balances: getTokenBalancesTool,
  /**
   * Get the NFT balances of a wallet address.
   */
   get_nft_balances: getNFTBalancesTool,
  /**
   * Get the last transactions of a wallet address.
   */
   get_last_transactions: getLastTransactionsTool,
  /**
   * Search a hash
   */
   search_hash: searchHashTool,
  /**
   * Get the STX supply in the network
   */
   get_stx_supply: getSTXSupplyTool,

  /**
   * Get information about the tokens available in Velar protocol
   */
   get_token_information_velar: getTokenInformationVelarTool,
  
   /**
   * Get information about the tokens available in Velar protocol
   */
  get_pool_information_velar: getPoolInformationVelarTool,

  
  /**
   * Send a transaction to another address 
   */
   send_transaction: sendTransactionTool,
};
