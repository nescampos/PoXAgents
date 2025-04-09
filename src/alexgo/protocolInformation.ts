import { AlexSDK, Currency } from 'alex-sdk';

export async function getFeeRateBetweenTokens(tokenFrom:string, tokenTo:string) {
    const alex = new AlexSDK();
    const feeRate = await alex.getFeeRate(Currency.STX, Currency.ALEX);

    return `The fee rate to swap from ${tokenFrom} to ${tokenTo} is ${feeRate}`;
}

export async function getAvailableTokens() {
    const alex = new AlexSDK();
    const swappableCurrencies = await alex.fetchSwappableCurrency();

    const formattedCurrencies = swappableCurrencies.map((token) => `Name: ${token.name}, Id: ${token.underlyingToken}`);

    return formattedCurrencies;
}

export async function getTokenPrices() {
    const alex = new AlexSDK();
    const prices = await alex.getLatestPrices();
    const priceList = Object.entries(prices);
    const formattedPrice = priceList.map(([key, price]) => `The price for ${key} is ${price}`);

    return formattedPrice;
}