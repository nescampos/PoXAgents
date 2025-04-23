import { AlexSDK, Currency } from 'alex-sdk';

export async function getFeeRateBetweenTokens() {
    const alex = new AlexSDK();
    const feeRate = await alex.getFeeRate(Currency.STX, Currency.ALEX);
    const feeRate2 = await alex.getFeeRate(Currency.ALEX, Currency.STX);

    return `The fee rate to swap from STX to ALEX is ${Number(feeRate) / 10**8} STX and from ALEX to STX is ${Number(feeRate2)/10**8} ALEX`;
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