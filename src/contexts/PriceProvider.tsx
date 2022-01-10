import React from 'react';
import { useSingleCurrencyTradeExact } from 'hooks/Trades';
import DEFAULT_TOKEN_LIST from 'config/constants/tokenLists/pancake-default.tokenlist.json';

export const PriceProvider = React.memo(() => {
  if (
    Object.values(window.priceVsBusdMap).filter((v) => v.toNumber() > 0).length === DEFAULT_TOKEN_LIST.tokens.length
  ) {
    return null;
  }
  DEFAULT_TOKEN_LIST.tokens.map((v) => GetCurrencyExact(v.address));
  return null;
});

const GetCurrencyExact = (address: string): React.ReactElement => {
  useSingleCurrencyTradeExact(address);
  return null;
};
