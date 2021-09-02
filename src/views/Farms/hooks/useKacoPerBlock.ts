import addresses from 'config/constants/contracts';
import multicall from 'utils/multicall';

import { BIG_TEN } from './../../../utils/bigNumber';
import RealBigNumber from 'bignumber.js';

import masterChef from 'config/abi/masterchef.json';

import { useEffect, useState } from 'react';

const base = BIG_TEN.pow(new RealBigNumber(18));

const useKacPerBlock = (): RealBigNumber => {
  const [kacPerBlock, setKacPerBlock] = useState<RealBigNumber>(new RealBigNumber(0));

  useEffect(() => {
    multicall(masterChef, [
      {
        address: addresses.masterChef[56],
        name: 'cakePerBlock',
      },
    ]).then(([kacPerBlock]) => setKacPerBlock(new RealBigNumber(kacPerBlock.toString()).div(base)));
  }, []);

  return kacPerBlock;
};
export default useKacPerBlock;
