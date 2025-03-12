import { makeSTXTokenTransfer, broadcastTransaction } from '@stacks/transactions';
import { generateWallet } from "@stacks/wallet-sdk";


export async function sendSTX(amount:string, to_address:string) {
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

    const transaction = await makeSTXTokenTransfer({
        recipient: to_address, // which address you are sending to
        amount: Number(amount) * 10**6, // tokens, denominated in micro-STX
        senderKey: wallet.accounts[0].stxPrivateKey,
        network: "mainnet",
    });

    const tx_result = await broadcastTransaction({ transaction });
    return tx_result;
}


