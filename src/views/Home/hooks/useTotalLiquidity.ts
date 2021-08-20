import BigNumber from 'bignumber.js';
import fetchPairsData, { PairsData, PairsMap } from './fetchPairsData';
import usePairLength from './usePairsLength';
import { useEffect, useState } from 'react';
import fetchPairsAddress from './fetchPairsAddress';
import { BUSD } from 'config/constants/tokens';

function getPriceVsBusd(
  tokenAddress: string,
  source: PairsMap,
  priceVsBusdMap: { [key: string]: BigNumber },
  from?: string,
): BigNumber | undefined {
  const chainId = parseInt(process.env.REACT_APP_CHAIN_ID);
  const busdAddress = BUSD[chainId].address.toLowerCase();

  Object.entries(source[tokenAddress]).find(([quoteTokenAddress, pair]) => {
    if (quoteTokenAddress === from) {
      return false;
    }

    if (quoteTokenAddress === busdAddress) {
      priceVsBusdMap[tokenAddress] = pair.vs;

      return true;
    }

    const quoteVsBusdPrice =
      priceVsBusdMap[quoteTokenAddress] || getPriceVsBusd(quoteTokenAddress, source, priceVsBusdMap, tokenAddress);

    if (quoteVsBusdPrice) {
      priceVsBusdMap[tokenAddress] = quoteVsBusdPrice.times(pair.vs);

      return true;
    }

    return false;
  });

  return priceVsBusdMap[tokenAddress];
}

function countup({ countup, source }: PairsData): BigNumber {
  const priceVsBusdMap: { [key: string]: BigNumber } = {};

  Object.keys(source).forEach((tokenAddress) => getPriceVsBusd(tokenAddress, source, priceVsBusdMap));

  return Object.entries(countup).reduce((all, [tokenAddress, amount]) => {
    const price = priceVsBusdMap[tokenAddress] || new BigNumber(0);

    all = all.plus(amount.times(price));

    return all;
  }, new BigNumber(0));
}

function useTotalLiquidity(): BigNumber {
  const pairsCount = usePairLength();
  const [total, setTotal] = useState<BigNumber>(new BigNumber(0));

  useEffect(() => {
    fetchPairsAddress(pairsCount).then(fetchPairsData).then(countup).then(setTotal).catch(console.log);
  }, [pairsCount]);

  return total;
}

export default useTotalLiquidity;
