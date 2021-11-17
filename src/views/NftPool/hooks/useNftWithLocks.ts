import { useWeb3React } from '@web3-react/core';
import { NFT } from './../components/GoodsInPool';
import type { BigNumber } from '@ethersproject/bignumber';
import _ from 'lodash';
import { NFT_TYPE } from 'config/constants/nft';
import { useContract } from 'hooks/useContract';
import { useEffect, useState, useMemo } from 'react';
import NFT100Pair721 from 'config/abi/NFT100Pair721.json';
import NFT100Pair1155 from 'config/abi/NFT100Pair1155.json';
import { fetchNftInfo } from '../util/fetchNft';

export type LockInfo = { lastBlock: number; unlocker: string; amount?: number };
export type NftLockInfo = {
  id: number;
  lastBlock: number;
  unlocker: string;
  amount?: number;
};
export type Locks = { [key: number]: LockInfo };
export type NftInfoWithLock = LockInfo & NFT;

const defaultAddress = '0x0000000000000000000000000000000000000001';

export const useNftWithLocks = (pair?: { type: NFT_TYPE; address: string; nftAddress: string }) => {
  // const [fetching, setFetching] = useState(true);
  const contract = useContract(pair?.address, pair?.type === NFT_TYPE.NFT1155 ? NFT100Pair1155 : NFT100Pair721);
  const [locksInfo, setLocksInfo] = useState<NftInfoWithLock[]>();
  const { account: _account } = useWeb3React();

  const account = useMemo(() => _account || defaultAddress, [_account]);

  useEffect(() => {
    if (!contract || !pair) {
      return;
    }
    if (pair.type === NFT_TYPE.NFT721) {
      contract.getLockInfos().then(async ([ids, locksInfo]: [BigNumber[], [number, string][]]) => {
        const promises = ids.map(async (id) => fetchNftInfo(pair.nftAddress, id.toNumber(), account, null));

        const results = await Promise.all(promises);

        const nfts: NftInfoWithLock[] = results.filter(Boolean).map((nft, index) => ({
          lastBlock: locksInfo[index][0],
          unlocker: locksInfo[index][1],
          ...nft,
        }));

        setLocksInfo(nfts);
      }, console.log);
    } else {
      contract.getLockInfos().then(async (lockInfos: [BigNumber, string, number, BigNumber][]) => {
        const promises = lockInfos.map(async (lockInfo) =>
          fetchNftInfo(pair.nftAddress, lockInfo[0].toNumber(), account, lockInfo[0]),
        );

        const results = await Promise.all(promises);
        const nfts: NftInfoWithLock[] = results.filter(Boolean).map((nft, index) => ({
          lastBlock: lockInfos[index][2],
          unlocker: lockInfos[index][1],
          amount: lockInfos[index][3].toNumber(),
          ...nft,
        }));

        setLocksInfo(nfts);
      }, console.log);
    }
  }, [contract, pair, account]);

  return locksInfo;
};

export const useNftWithLockInfo = (pair?: { type: NFT_TYPE; address: string }) => {
  const contract = useContract(pair?.address, pair?.type === NFT_TYPE.NFT1155 ? NFT100Pair1155 : NFT100Pair721);
  const [locksInfo, setLocksInfo] = useState<Locks>({});

  useEffect(() => {
    if (!contract || !pair) {
      return;
    }

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

export const useNfts = (pair?: { type: NFT_TYPE; address: string }) => {
  const contract = useContract(pair?.address, pair?.type === NFT_TYPE.NFT1155 ? NFT100Pair1155 : NFT100Pair721);
  const [locksInfo, setLocksInfo] = useState<NftLockInfo[]>([]);

  useEffect(() => {
    if (!contract || !pair) {
      return;
    }

    if (pair?.type === NFT_TYPE.NFT721) {
      contract.getLockInfos().then(([ids, locksInfo]: [BigNumber[], [number, string][]]) => {
        const locks: NftLockInfo[] = ids.map((id, index) => ({
          id: id.toNumber(),
          lastBlock: locksInfo[index][0],
          unlocker: locksInfo[index][1],
        }));

        setLocksInfo((old) => (_.isEqual(old, locks) ? old : locks));
      }, console.log);
    } else {
      contract.getLockInfos().then((lockInfos: [BigNumber, string, number, BigNumber][]) => {
        const locks: NftLockInfo[] = lockInfos.map((curr) => ({
          id: curr[0].toNumber(),
          lastBlock: curr[2],
          unlocker: curr[1],
          amount: curr[3].toNumber(),
        }));

        setLocksInfo((old) => (_.isEqual(old, locks) ? old : locks));
      }, console.log);
    }
  }, [contract, pair]);

  return locksInfo;
};
