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
import { getsBTCEnrollmentTool } from "./getsBTCEnrollment";
import { getsBTCCurrentCycleTool } from "./getsBTCCurrentCycle";
import { getsBTCRewardAddressTool } from "./getsBTCRewardAddress";
import { getsBTCRewardsByCycleAddressTool } from "./getsBTCRewardsByCycleAddress";
import { enrollsBTCIncentivesTool } from "./enrollsBTCIncentives";
import { changesBTCRewardAddressTool } from "./changesBTCRewardAddress";

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
   * Get the confirmation if a wallet is enrolled in sBTC incentives
   */
   get_sbtc_enrollment: getsBTCEnrollmentTool,
  /**
   * Get the current cycle for sBTC incentives
   */
   get_sbtc_currentcycle: getsBTCCurrentCycleTool,
  /**
   * Get the current reward address for sBTC incentives
   */
   get_sbtc_rewardaddress: getsBTCRewardAddressTool,
  /**
   * Get the rewards for an address for sBTC incentives
   */
   get_sbtc_rewardsbycycleaddress: getsBTCRewardsByCycleAddressTool,

  
  /**
   * Send a transaction to another address 
   */
   send_transaction: sendTransactionTool,
  
  /**
   * Enroll to sBTC incentives
   */
   enroll_sbtc_incentives: enrollsBTCIncentivesTool,
  /**
   * Change the reward address for sBTC incentives
   */
   change_sbtc_rewardaddress: changesBTCRewardAddressTool,
};
