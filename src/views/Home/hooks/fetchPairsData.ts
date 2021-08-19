import { BigNumber } from '@ethersproject/bignumber';
import ABI from 'config/abi/pair.json';
import multicall from 'utils/multicall';

type LiquiditiesReserved = {
  address: string;
  reserved: BigNumber;
}[];

const fetchPairsData = async (addresses: string[]): Promise<LiquiditiesReserved> => {
  const calls = addresses
    .map((address) => [
      {
        address: address,
        name: 'getReserves',
      },
      {
        address: address,
        name: 'token0',
      },
      {
        address: address,
        name: 'token1',
      },
    ])
    .reduce((calls, curr) => calls.concat(curr), []);

  const results = await multicall(ABI, calls);
  const map: {
    [key: string]: BigNumber;
  } = {};
  for (let i = 0; i < results.length - 1; i += 3) {
    const [amount0, amount1] = results[i + 0] as [BigNumber, BigNumber];
    const token0Address = results[i + 1][0] as string;
    const token1Address = results[i + 2][0] as string;
    console.log(`pair ${i / 3}:`, amount0.toString(), amount1.toString(), token0Address, token1Address);

    map[token0Address.toLowerCase()] = map[token0Address.toLowerCase()]
      ? map[token0Address.toLowerCase()].add(amount0)
      : amount0;
    map[token1Address.toLowerCase()] = map[token1Address.toLowerCase()]
      ? map[token1Address.toLowerCase()].add(amount1)
      : amount1;
  }

  console.log('map', map);
  return Object.entries(map).map(([address, reserved]) => ({ address, reserved }));
};

export default fetchPairsData;
