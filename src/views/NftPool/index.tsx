import React, { FC, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Flex, Grid, Text } from '@kaco/uikit';
import styled from 'styled-components';
import Page from 'components/Layout/Page';
import Nft from './components/Nft';
import ShopCart from './components/ShopCart';
import { PoolHeader } from './components/Header';
import { NftProvider, NftContext } from './providers/nft.provider';
import { chainId } from 'views/NftPools/hooks/useNftPools';
import { NFT_PAIRS } from 'config/constants/nft';
import { fetchNfts } from './util/fetchNft';
import NFT100Pair721 from 'config/abi/NFT100Pair721.json';
import { useContract } from 'hooks/useContract';
import PageLoader from 'components/Loader/PageLoader';
import { useTranslation } from 'contexts/Localization';
import Select from 'components/KacoSelect/KacoSelect';
import _ from 'lodash';

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

const Pools_: FC<{
  className?: string;
  nftAddress?: string;
  pairAddress?: string;
}> = ({ className, nftAddress, pairAddress }) => {
  const [items, setItems] = useState<NFT[]>([]);
  const [fetching, setFetching] = useState(true);
  const contract = useContract(pairAddress, NFT100Pair721);
  const { t } = useTranslation();
  const [locksInfo, setLocksInfo] = useState<{ [key: number]: { lastBlock: number; unlocker: string } }>([]);

  useEffect(() => {
    if (!nftAddress || !pairAddress) {
      return;
    }

    setFetching(true);
    fetchNfts(nftAddress, pairAddress)
      .then(setItems)
      .finally(() => setFetching(false));
  }, [pairAddress, nftAddress]);

  useEffect(() => {
    if (!contract) {
      return;
    }

    contract.getLockInfos().then(([ids, locksInfo]: [string[], [number, string][]]) => {
      console.log(
        'ids',
        ids.map((id) => id.toString()),
        locksInfo.map((info) => `${info[0]} - ${info[1]}`),
      );

      const locks = ids.reduce((all: { [key: number]: { lastBlock: number; unlocker: string } }, id, index) => {
        all[id] = {
          lastBlock: locksInfo[index][0],
          unlocker: locksInfo[index][1],
        };

        return all;
      }, {});

      setLocksInfo((old) => (_.isEqual(old, locks) ? old : locks));
    }, console.log);
  }, [contract]);

  console.log(locksInfo);
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

const GoodsInPool = styled(Pools_)`
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

const NftPool: FC<{ className?: string }> = ({ className }) => {
  const { items } = useContext(NftContext);
  const { pairAddress } = useParams<{ pairAddress: string }>();
  const index = NFT_PAIRS.findIndex(
    (pair) => pair[chainId].address.toLocaleLowerCase() === pairAddress.toLocaleLowerCase(),
  );
  const pair = NFT_PAIRS[index]?.[chainId];

  return (
    <>
      <Page className={className}>
        <PoolHeader pairIndex={index} floorPrice={0.1} />
        <GoodsInPool pairAddress={pairAddress} nftAddress={pair.nftAddress} />
      </Page>
      {!!items.length && <ShopCart floorPrice={0.1} symbol="BUSD" pairAddres={pair.address} />}
    </>
  );
};

const NFTPool = styled(NftPool)`
  width: 100%;
  padding: 20px 0px 40px 0px;
  max-width: 1006px;
`;

// eslint-disable-next-line import/no-anonymous-default-export
export default () => (
  <NftProvider>
    <NFTPool />
  </NftProvider>
);
