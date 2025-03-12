import { generateWallet } from "@stacks/wallet-sdk";
import { privateKeyToAddress } from "@stacks/transactions";
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
 * Get the address from the mnemonic in the environment file
 *
 *
 * @returns The STX address
 */
 export async function getNativeBalanceFromAddress(address:string) {
  // Check if the mnemonic environment variable is set
  if (!process.env.WALLET_MNEMONIC) {
    throw new Error(
      "WALLET_MNEMONIC environment variable is not set. You need to set it to create a wallet client."
    );
  }

  const targetPath = `https://api.hiro.so/extended/v1/address/${address}/stx`;

    try {
        const {data} = await axios.get(
            targetPath
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