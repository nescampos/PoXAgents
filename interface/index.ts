
/**
 * Arguments for the get_balance tool
 */
export interface GetBalanceArgs {
  /**
   * The wallet to get the balance of
   */
  wallet: string;
}

/**
 * Arguments for the search_hash tool
 */
 export interface SearchHashArgs {
  /**
   * The hash to search
   */
  hash: string;
}

export interface GetSTXSupplyArgs {}

// No arguments needed since we're getting the connected wallet
export interface GetWalletAddressArgs {}

export interface SendTransactionArgs {
  /**
   * The recipient address
   */
  to: string;
  /**
   * The amount of STX to send (in STX, not micro-STX)
   */
  value: string;
  /**
   * The token Id to use for the transaction
   */
  token?: string;
}
