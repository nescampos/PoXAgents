import { AlexSDK, Currency } from 'alex-sdk';

export async function getFeeRateBetweenTokens(tokenFrom:string, tokenTo:string) {
    const alex = new AlexSDK();
    const feeRate = await alex.getFeeRate(Currency.STX, Currency.ALEX);

    return `The fee rate to swap from ${tokenFrom} to ${tokenTo} is ${feeRate}`;
}