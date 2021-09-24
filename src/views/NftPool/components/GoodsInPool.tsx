import React, { FC, useEffect, useState } from 'react';
import { Flex, Grid, Text } from '@kaco/uikit';
import styled from 'styled-components';
import Nft from './Nft';
import { NftPairConfig, NFT_TYPE } from 'config/constants/nft';
import { fetchNfts } from '../util/fetchNft';
import NFT100Pair721 from 'config/abi/NFT100Pair721.json';
import NFT100Pair1155 from 'config/abi/NFT100Pair1155.json';
import { useContract } from 'hooks/useContract';
import PageLoader from 'components/Loader/PageLoader';
import { useTranslation } from 'contexts/Localization';
import Select from 'components/KacoSelect/KacoSelect';
import _ from 'lodash';
import type { BigNumber } from '@ethersproject/bignumber';

export interface Pool {
  poolName: string;
  fragmentName: string;
  nftCount: number;
  liquidity: number;
  floorPrice: number;
  changeDay7: number;
}

export interface NFT {
  id: number;
  balance: number;
  uri: string;
  image: string;
  name: string;
}
export type LockInfo = { lastBlock: number; unlocker: string; amount?: number };
export type Locks = { [key: number]: LockInfo };

const Pools_: FC<{
  className?: string;
  pair: NftPairConfig | undefined;
}> = ({ className, pair }) => {
  const [items, setItems] = useState<NFT[]>([]);
  const [fetching, setFetching] = useState(true);
  const contract = useContract(pair?.address, pair?.type === NFT_TYPE.NFT1155 ? NFT100Pair1155 : NFT100Pair721);
  const { t } = useTranslation();
  const [locksInfo, setLocksInfo] = useState<{ [key: number]: { lastBlock: number; unlocker: string } }>([]);

  useEffect(() => {
    if (!pair?.nftAddress || !pair?.address) {
      return;
    }

    setFetching(true);
    fetchNfts(pair?.nftAddress, pair?.address)
      .then(setItems)
      .finally(() => setFetching(false));
  }, [pair]);

  useEffect(() => {
    if (!contract || !pair) {
      return;
    }

    console.log('contract', contract);

    if (pair.type === NFT_TYPE.NFT721) {
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

  if (fetching) {
    return <PageLoader />;
  }

  return (
    <div className={className}>
      <Flex alignItems="center" mb="30px">
        <Text color="#9DA6A6" fontSize="12px" mr="12px">
          sort:
        </Text>
        <Select
          options={[
            {
              label: t('xxxx'),
              value: 'xxxx',
            },
            {
              label: t('zzzz'),
              value: 'zzzz',
            },
            {
              label: t('yyyy'),
              value: 'yyyy',
            },
          ]}
        />
      </Flex>
      <Grid gridGap="10px" className="pools">
        {items.map((item, index) => (
          <Nft nft={item} key={index} lockInfo={locksInfo[item.id]} />
        ))}
      </Grid>
    </div>
  );
};

export const GoodsInPool = styled(Pools_)`
  background: #122124;
  border-radius: 24px;
  z-index: 2;
  position: relative;
  padding: 20px;
  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: 1fr 1fr 1fr;
    padding: 40px;
  }
  > .pools {
    grid-template-columns: 1fr;
    justify-items: center;

    ${({ theme }) => theme.mediaQueries.md} {
      grid-template-columns: 1fr 1fr 1fr;
    }

    @media screen and (min-width: 1165px) {
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }
  }
`;
