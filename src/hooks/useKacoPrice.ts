import tokens from '../config/constants/tokens';
import BigNumber from 'bignumber.js';

import { useMemo } from 'react';
import useActiveWeb3React from './useActiveWeb3React';

export const useKacoPrice = () => {
  const { chainId } = useActiveWeb3React();
  const address = tokens.kaco.address[chainId].toLowerCase();
  const { priceVsBusdMap } = window;
  const kacoPrice = useMemo(() => priceVsBusdMap[address] || new BigNumber(0), [priceVsBusdMap, address]);

  return kacoPrice;
};
