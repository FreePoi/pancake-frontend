import RealBigNumber from 'bignumber.js';
import { BigNumber } from '@ethersproject/bignumber';

import { useEffect, useState } from 'react';
import { useMasterchef } from 'hooks/useContract';

const useKacPerBlock = (): RealBigNumber => {
  const masterChefContract = useMasterchef();
  const [kacPerBlock, setKacPerBlock] = useState<RealBigNumber>(new RealBigNumber(0));

  useEffect(() => {
    masterChefContract.cakePerBlock().then(
      (kacPerBlock: BigNumber) => setKacPerBlock(new RealBigNumber(kacPerBlock.toString())),
      (e) => console.error(e),
    );
  }, [masterChefContract]);

  return kacPerBlock;
};
export default useKacPerBlock;
