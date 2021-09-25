import tokens from './tokens';
import { PoolConfig, PoolCategory } from './types';

const pools: PoolConfig[] = [
  {
    sousId: 0,
    stakingToken: tokens.kaco,
    earningToken: tokens.kaco,
    contractAddress: {
      97: '0x7DE7fF5D0290695c7f8a4531ff77FFCC8461C29e',
      56: '0x81b71D0bC2De38e37978E6701C342d0b7AA67D59',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.02',
    sortOrder: 1,
    isFinished: false,
  },
  // {
  //   sousId: 210,
  //   stakingToken: tokens.kaco,
  //   earningToken: tokens.pots,
  //   contractAddress: {
  //     97: '',
  //     56: '0xBeDb490970204cb3CC7B0fea94463BeD67d5364D',
  //   },
  //   poolCategory: PoolCategory.CORE,
  //   harvest: true,
  //   sortOrder: 999,
  //   tokenPerBlock: '0.0868',
  // },
];

export default pools;
