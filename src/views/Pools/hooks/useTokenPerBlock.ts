import addresses from 'config/constants/contracts';
import multicall from 'utils/multicall';
import { BIG_TEN } from 'utils/bigNumber';
import RealBigNumber from 'bignumber.js';
import masterChef from 'config/abi/masterchef.json';

const base = BIG_TEN.pow(new RealBigNumber(18));
const useTokenPerBlock = async () => {
  const res = await multicall(masterChef, [
    {
      address: addresses.masterChef[56],
      name: 'cakePerBlock',
    },
  ]);

  const tokenPerBlock = new RealBigNumber(res.toString()).div(base);
  return tokenPerBlock;
};
export default useTokenPerBlock;
