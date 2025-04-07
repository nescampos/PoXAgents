import { fetchCallReadOnlyFunction, Cl, privateKeyToAddress } from '@stacks/transactions';
import { sBTC_CONTRACT_ADDRESS, sBTC_CONTRACT_NAME } from "../constants/stackseco";
import { generateWallet } from "@stacks/wallet-sdk";


export async function isWalletEnrolled(address:string) {

    const isCurrentEnrolledResult = await fetchCallReadOnlyFunction({
        contractName: sBTC_CONTRACT_NAME,
        contractAddress: sBTC_CONTRACT_ADDRESS,
        functionName: "is-enrolled-this-cycle",
        functionArgs:[Cl.principal(address)],
        senderAddress:address,
        network:"mainnet"
      });

    const isCurrentEnrolled = isCurrentEnrolledResult.type;

    const isNextCycleEnrolledResult = await fetchCallReadOnlyFunction({
        contractName: sBTC_CONTRACT_NAME,
        contractAddress: sBTC_CONTRACT_ADDRESS,
        functionName: "is-enrolled-in-next-cycle",
        functionArgs:[Cl.principal(address)],
        senderAddress:address,
        network:"mainnet"
      });

    const isNextCycleEnrolled = isNextCycleEnrolledResult.type;


    return `The wallet is enrolled for this cycle?: ${isCurrentEnrolled}, is enrolled for the next cycle? ${isNextCycleEnrolled}`;
}

export async function getCurrentCycle() {

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

    const currentCycle = await fetchCallReadOnlyFunction({
        contractName: sBTC_CONTRACT_NAME,
        contractAddress: sBTC_CONTRACT_ADDRESS,
        functionName: "current-cycle-id",
        functionArgs:[],
        senderAddress:address,
        network:"mainnet"
      });


    return `The current cycle Id for sBTC Rewards: ${currentCycle.value}`;
    
}

export async function getRewardAddress(address:string) {

    const rewardAddressResult = await fetchCallReadOnlyFunction({
        contractName: sBTC_CONTRACT_NAME,
        contractAddress: sBTC_CONTRACT_ADDRESS,
        functionName: "get-latest-reward-address",
        functionArgs:[Cl.principal(address)],
        senderAddress:address,
        network:"mainnet"
      });

    const rewardAddress = rewardAddressResult.value.value;



    return `The reward address in sBTC incentives for ${rewardAddress} is ${rewardAddress}`;
}