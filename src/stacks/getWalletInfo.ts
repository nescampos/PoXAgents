import { generateWallet } from "@stacks/wallet-sdk";
import { privateKeyToAddress, fetchCallReadOnlyFunction } from "@stacks/transactions";
import axios from "axios";

/**
 * Get the address from the mnemonic in the environment file
 *
 *
 * @returns The STX address
 */
export async function getAddress() {
  // Check if the mnemonic environment variable is set
  if (!process.env.WALLET_MNEMONIC) {
    throw new Error(
      "WALLET_MNEMONIC environment variable is not set. You need to set it to create a wallet client."
    );
  }

  

  // Create a wallet from the mnemonic
  const wallet = await generateWallet({
    secretKey: process.env.WALLET_MNEMONIC,
    password: '',
  });

  const address = privateKeyToAddress(wallet.accounts[0].stxPrivateKey, 'mainnet');

  return address;
}


/**
 * Get the native balance from an address
 *
 *
 * @returns The STX balance
 */
 export async function getNativeBalanceFromAddress(address:string) {
  // Check if the mnemonic environment variable is set
  if (!process.env.WALLET_MNEMONIC) {
    throw new Error(
      "WALLET_MNEMONIC environment variable is not set. You need to set it to create a wallet client."
    );
  }

  let header = undefined;
  if (process.env.HIRO_API_KEY) {
    header = {
        headers: {
            'X-API-Key': process.env.HIRO_API_KEY
        }
    };
  }

  const targetPath = `https://api.hiro.so/extended/v1/address/${address}/stx`;

    try {
        const {data} = await axios.get(
            targetPath,header
        );
        const totalBalance = Number(data.balance) / 10**6;
        const lockedBalance = Number(data.locked) / 10**6;
        const availableBalance = totalBalance - lockedBalance;
        // Return the balance for the account
        return `Total: ${totalBalance}, Locked: ${lockedBalance}, Available: ${availableBalance}`

    } catch (error) {
        throw(error);
    };
}


/**
 * Get the token balances from an address
 *
 *
 * @returns The token balances
 */
 export async function getTokenBalancesFromAddress(address:string) {
  // Check if the mnemonic environment variable is set
  if (!process.env.WALLET_MNEMONIC) {
    throw new Error(
      "WALLET_MNEMONIC environment variable is not set. You need to set it to create a wallet client."
    );
  }

  let header = undefined;
  if (process.env.HIRO_API_KEY) {
    header = {
        headers: {
            'X-API-Key': process.env.HIRO_API_KEY
        }
    };
  }

  const targetPath = `https://api.hiro.so/extended/v1/address/${address}/balances`;

    try {
        const {data} = await axios.get(
            targetPath, header
        );
        const fungibleTokens = data.fungible_tokens;
        let balances = "";
        // Return the balance for the account
        for (const tokenName in fungibleTokens) {
          const token = fungibleTokens[tokenName];
          const tokenComponents = tokenName.split("::");
          const contract = tokenComponents[0].split(".");
          const contractId = contract[0];
          const contractName = contract[1];
          const decimalResult = await fetchCallReadOnlyFunction({
            contractName: contractName,
            contractAddress: contractId,
            functionName: "get-decimals",
            functionArgs:[],
            senderAddress:address,
            network:"mainnet"
          });
          const symbolResult = await fetchCallReadOnlyFunction({
            contractName: contractName,
            contractAddress: contractId,
            functionName: "get-symbol",
            functionArgs:[],
            senderAddress:address,
            network:"mainnet"
          });
          const symbol = symbolResult.value.value;
          const formattedBalance =  Number(token.balance) / 10**Number(decimalResult.value.value);
          //console.log("Decimals: "+ decimalsToken);
          balances = balances.concat(`Token: ${symbol}, Balance: ${formattedBalance}, Token Id: ${tokenComponents[0]}\n`);
          
        }
        return balances;

    } catch (error) {
        throw(error);
    };
}

/**
 * Get the NFT balances from an address
 *
 *
 * @returns The balances
 */
 export async function getNFTBalancesFromAddress(address:string) {
  // Check if the mnemonic environment variable is set
  if (!process.env.WALLET_MNEMONIC) {
    throw new Error(
      "WALLET_MNEMONIC environment variable is not set. You need to set it to create a wallet client."
    );
  }

  let header = undefined;
  if (process.env.HIRO_API_KEY) {
    header = {
        headers: {
            'X-API-Key': process.env.HIRO_API_KEY
        }
    };
  }

  const targetPath = `https://api.hiro.so/extended/v1/address/${address}/balances`;

    try {
        const {data} = await axios.get(
            targetPath, header
        );
        const nftTokens = data.non_fungible_tokens;
        let balances = "";
        // Return the balance for the account
        for (const tokenName in nftTokens) {
          if (nftTokens.hasOwnProperty(tokenName)) {
            const token = nftTokens[tokenName];
            balances = balances.concat(`Token: ${tokenName}, Quantity: ${token.count}\n`);
          }
        }
        return balances;

    } catch (error) {
        throw(error);
    };
}


/**
 * Get the last 10 transactions from an address
 *
 *
 * @returns The transactions
 */
 export async function getTransactionsFromAddress(address:string) {
  // Check if the mnemonic environment variable is set
  if (!process.env.WALLET_MNEMONIC) {
    throw new Error(
      "WALLET_MNEMONIC environment variable is not set. You need to set it to create a wallet client."
    );
  }
  let header = undefined;
  if (process.env.HIRO_API_KEY) {
    header = {
        headers: {
            'X-API-Key': process.env.HIRO_API_KEY
        }
    };
  }

  const targetPath = `https://api.hiro.so/extended/v2/addresses/${address}/transactions?limit=10`;

    try {
        const {data} = await axios.get(
            targetPath, header
        );
        const transactions = data.results;
        // Return the balance for the account
        const mapping = transactions.map((tx) => `Id: ${tx.tx.tx_id}, From: ${tx.tx.sender_address}, Status: ${tx.tx.tx_status}, STX Sent: ${tx.tx.stx_sent}, STX Received: ${tx.tx.stx_received}`).join("\n");
        return mapping;

    } catch (error) {
        throw(error);
    };
}