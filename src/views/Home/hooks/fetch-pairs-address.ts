import factoryAbi from 'config/abi/factory.json';
import { getAddress } from 'utils/addressHelpers';
import multicall from 'utils/multicall';
import { Address } from 'config/constants/types';

const fetchPairsAddress = async (length: number, factoryAddress: Address): Promise<string[]> => {
  const factory = getAddress(factoryAddress);
  const calls = new Array(length).fill(1).map((_, index) => ({
    address: factory,
    name: 'allPairs',
    params: [index],
  }));

  return await multicall(factoryAbi, calls);
};

export default fetchPairsAddress;
