import addresses from 'config/constants/contracts';
import multicall from 'utils/multicall';
import { BIG_TEN, BIG_ZERO } from 'utils/bigNumber';
import BigNumber from 'bignumber.js';
import masterChef from 'config/abi/masterchef.json';
import masterchefABI from 'config/abi/masterchef.json';
import { getMasterChefAddress } from 'utils/addressHelpers';
import { PoolConfig } from 'config/constants/types';

const base = BIG_TEN.pow(new BigNumber(18));
export const useTokenPerBlock = async () => {
  const res = await multicall(masterChef, [
    {
      address: addresses.masterChef[56],
      name: 'cakePerBlock',
    },
  ]);

  const tokenPerBlock = new BigNumber(res.toString()).div(base);
  return tokenPerBlock;
};
export const usePoolWeight = async (pool: PoolConfig) => {
  const { sousId } = pool;

  // Only make masterchef calls if farm has pid
  const [info, totalAllocPoint] =
    sousId || sousId === 0
      ? await multicall(masterchefABI, [
          {
            address: getMasterChefAddress(),
            name: 'poolInfo',
            params: [sousId],
          },
          {
            address: getMasterChefAddress(),
            name: 'totalAllocPoint',
          },
        ])
      : [null, null];

  const allocPoint = info ? new BigNumber(info.allocPoint?._hex) : BIG_ZERO;
  const poolWeight = totalAllocPoint ? allocPoint.div(new BigNumber(totalAllocPoint)) : BIG_ZERO;
  return poolWeight;
};
