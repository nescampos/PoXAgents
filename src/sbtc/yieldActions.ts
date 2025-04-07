import { fetchCallReadOnlyFunction, Cl } from '@stacks/transactions';


export async function isWalletEnrolled(address:string) {

    const isCurrentEnrolledResult = await fetchCallReadOnlyFunction({
        contractName: "sbtc-yield-rewards-v3",
        contractAddress: "SP804CDG3KBN9M6E00AD744K8DC697G7HBCG520Q",
        functionName: "is-enrolled-this-cycle",
        functionArgs:[Cl.principal(address)],
        senderAddress:address,
        network:"mainnet"
      });

    const isCurrentEnrolled = isCurrentEnrolledResult.type;

    const isNextCycleEnrolledResult = await fetchCallReadOnlyFunction({
        contractName: "sbtc-yield-rewards-v3",
        contractAddress: "SP804CDG3KBN9M6E00AD744K8DC697G7HBCG520Q",
        functionName: "is-enrolled-in-next-cycle",
        functionArgs:[Cl.principal(address)],
        senderAddress:address,
        network:"mainnet"
      });

    const isNextCycleEnrolled = isNextCycleEnrolledResult.type;


    return `The wallet is enrolled for this cycle?: ${isCurrentEnrolled}, is enrolled for the next cycle? ${isNextCycleEnrolled}`;
    
}