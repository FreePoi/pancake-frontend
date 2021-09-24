import type { BigNumber } from '@ethersproject/bignumber';
import _ from 'lodash';
import { NFT_TYPE } from 'config/constants/nft';
import { useContract } from 'hooks/useContract';
import { useEffect, useState } from 'react';
import NFT100Pair721 from 'config/abi/NFT100Pair721.json';
import NFT100Pair1155 from 'config/abi/NFT100Pair1155.json';

export type LockInfo = { lastBlock: number; unlocker: string; amount?: number };
export type Locks = { [key: number]: LockInfo };

export const useNftWithLocks = (pair?: { type: NFT_TYPE; address: string }) => {
  const contract = useContract(pair?.address, pair?.type === NFT_TYPE.NFT1155 ? NFT100Pair1155 : NFT100Pair721);
  const [locksInfo, setLocksInfo] = useState<Locks>([]);

  useEffect(() => {
    if (!contract || !pair) {
      return;
    }

    console.log('contract', contract);

    if (pair?.type === NFT_TYPE.NFT721) {
      contract.getLockInfos().then(([ids, locksInfo]: [string[], [number, string][]]) => {
        const locks: Locks = ids.reduce((all: Locks, id, index) => {
          all[id] = {
            lastBlock: locksInfo[index][0],
            unlocker: locksInfo[index][1],
          };

          return all;
        }, {});

        setLocksInfo((old) => (_.isEqual(old, locks) ? old : locks));
      }, console.log);
    } else {
      contract.getLockInfos().then((lockInfos: [BigNumber, string, number, BigNumber][]) => {
        const locks: Locks = lockInfos.reduce((all: Locks, curr) => {
          all[curr[0].toString()] = {
            lastBlock: curr[2],
            unlocker: curr[1],
            amount: curr[3].toString(),
          };

          return all;
        }, {});

        setLocksInfo((old) => (_.isEqual(old, locks) ? old : locks));
      }, console.log);
    }
  }, [contract, pair]);

  return locksInfo;
};
