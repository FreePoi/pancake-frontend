import { BigNumber } from '@ethersproject/bignumber';
import { useContract } from 'hooks/useContract';
import { useSingleCallResult } from 'state/multicall/hooks';
import Abi from 'config/abi/factory.json';
import { FACTORY_ADDRESS } from 'config/constants';

function usePairLength(): number {
  const contract = useContract(FACTORY_ADDRESS[process.env.REACT_APP_CHAIN_ID], Abi);
  const length: BigNumber | undefined = useSingleCallResult(contract, 'allPairsLength')?.result?.[0];

  return length?.toNumber() || 0;
}

export default usePairLength;
