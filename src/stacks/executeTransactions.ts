import { makeSTXTokenTransfer, privateKeyToAddress, broadcastTransaction, makeContractCall, Cl, fetchCallReadOnlyFunction } from '@stacks/transactions';
import { generateWallet } from "@stacks/wallet-sdk";
import {getAddress } from "./getWalletInfo";


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
        network: "testnet",
    });

    const tx_result = await broadcastTransaction({ transaction });
    return tx_result;
}

export async function sendFungibleToken(tokenId:string, amount:string, to_address:string) {
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
    const tokenData = tokenId.split(".");
    //const walletAddress = await getAddress();
    const address = privateKeyToAddress(wallet.accounts[0].stxPrivateKey, 'testnet');
    const decimalResult = await fetchCallReadOnlyFunction({
        contractName: tokenData[1],
        contractAddress: tokenData[0],
        functionName: "get-decimals",
        functionArgs:[],
        senderAddress:address,
        network:"testnet"
      });
    const formattedAmount =  Number(amount) * 10**Number(decimalResult.value.value);
    console.log("Real amount: "+formattedAmount);
    const transaction = await makeContractCall({
        contractName: tokenData[1],
        contractAddress: tokenData[0],
        functionName: "transfer",
        functionArgs:[
            Cl.uint(formattedAmount), // amount to transfer
            Cl.principal(address), // sender address
            Cl.principal(to_address), // recipient address
            Cl.none()], // optional memo - passing none
        //senderAddress:address,
        senderKey: wallet.accounts[0].stxPrivateKey,
        validateWithAbi: true,
        network: "testnet",
        postConditions: [],
        //postConditionMode: PostConditionMode.Deny,
        //anchorMode: AnchorMode.Any,
      });
    
    

    const tx_result = await broadcastTransaction({ transaction, network:"testnet" });
    console.log(tx_result);
    return tx_result;
}
