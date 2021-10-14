import tokens from '../config/constants/tokens';
import BigNumber from 'bignumber.js';
import { PriceContext } from 'contexts/PriceProvider';
import { useContext, useMemo } from 'react';

export const useKacoPrice = () => {
  const { priceVsBusdMap } = useContext(PriceContext);
  const kacoPrice = useMemo(
    () => priceVsBusdMap[tokens.kaco.address[56].toLowerCase()] || new BigNumber(0),
    [priceVsBusdMap],
  );

  return kacoPrice;
};
