import tokens from '../config/constants/tokens';
import BigNumber from 'bignumber.js';
import { PriceContext } from 'contexts/PriceProvider';
import { useContext, useMemo } from 'react';
import useActiveWeb3React from './useActiveWeb3React';

export const useKacoPrice = () => {
  const { priceVsBusdMap } = useContext(PriceContext);
  const { chainId } = useActiveWeb3React();

  const kacoPrice = useMemo(
    () => priceVsBusdMap[tokens.kaco.address[chainId].toLowerCase()] || new BigNumber(0),
    [priceVsBusdMap, chainId],
  );

  return kacoPrice;
};
