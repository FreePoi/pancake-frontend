import { BigNumber } from '@ethersproject/bignumber';
import { Kaco } from 'config/constants/tokens';
import { useContract } from 'hooks/useContract';
import { useSingleCallResult } from 'state/multicall/hooks';
import Abi from 'config/abi/kaco.json';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
// returns undefined if input token is undefined, or fails to get token contract,
// or contract total supply cannot be fetched
function useCap(): string {
  const { chainId } = useActiveWeb3React();
  const contract = useContract(chainId ? Kaco[chainId].address : '', Abi);

  console.log('contract', contract, chainId);
  const cap: BigNumber = useSingleCallResult(contract, 'cap')?.result?.[0];

  return cap ? cap.div(BigNumber.from(10).pow(18)).toString() : '0';
}

export default useCap;
