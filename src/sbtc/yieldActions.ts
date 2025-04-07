import { fetchCallReadOnlyFunction, Cl, privateKeyToAddress, makeContractCall, broadcastTransaction } from '@stacks/transactions';
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

export async function getRewardsByCycleAddress(cycle:number,address:string) {

    const rewardsResult = await fetchCallReadOnlyFunction({
        contractName: sBTC_CONTRACT_NAME,
        contractAddress: sBTC_CONTRACT_ADDRESS,
        functionName: "reward-amount-for-cycle-and-address",
        functionArgs:[Cl.uint(cycle),Cl.principal(address)],
        senderAddress:address,
        network:"mainnet"
      });

    console.log(rewardsResult);

    const rewards = Number(rewardsResult.value.value) / 10**8;



    return `The rewards in sBTC incentives for ${cycle} cycle is ${rewards}`;
}

export async function enrollToIncentives() {

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


    const transaction = await makeContractCall({
        contractName: sBTC_CONTRACT_NAME,
        contractAddress: sBTC_CONTRACT_ADDRESS,
        functionName: "enroll",
        functionArgs:[
            Cl.principal(address)],
        senderKey: wallet.accounts[0].stxPrivateKey,
        validateWithAbi: true,
        network: "mainnet",
        postConditions: [],
        //postConditionMode: PostConditionMode.Deny,
      });
    

    const tx_result = await broadcastTransaction({ transaction, network:"mainnet" });
    return `The enrollment for sBTC Incentives was successfully, with transaction id ${tx_result.txid}`;
}