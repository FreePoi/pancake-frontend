import React, { FC, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Grid } from '@kaco/uikit';
import styled from 'styled-components';
import Page from 'components/Layout/Page';
import Nft from './components/Nft';
import ShopCart from './components/ShopCart';
import { PoolHeader } from './components/Header';
import { NftProvider, NftContext } from './providers/nft.provider';
import { chainId } from 'views/NftPools/hooks/useNftPools';
import { NFT_PAIRS } from 'config/constants/nft';
import { fetchNfts } from './util/fetchNft';
import multicall from 'utils/multicall';
import NFT100Pair1155Abi from 'config/abi/NFT100Pair1155.json';

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

  useEffect(() => {
    if (!nftAddress || !pairAddress) {
      return;
    }

    fetchNfts(nftAddress, pairAddress).then(setItems);
  }, [pairAddress, nftAddress]);

  useEffect(() => {
    if (!pairAddress) {
      return;
    }

    const calls = [
      {
        address: pairAddress,
        name: 'getLockInfos',
      },
    ];

    multicall(NFT100Pair1155Abi, calls).then(([[[ids, values]]]) => {
      console.log('ids', ids, values);
    });
  }, [pairAddress]);

  return (
    <Grid gridGap={{ xs: '4px', md: '16px' }} className={className}>
      {items.map((item, index) => (
        <Nft nft={item} key={index} />
      ))}
    </Grid>
  );
};

const GoodsInPool = styled(Pools_)`
  background: #122124;
  border-radius: 24px;
  position: relative;
  z-index: 2;
  padding: 20px;
  grid-template-columns: 1fr;
  justify-items: center;

  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: 1fr 1fr;
    padding: 40px;
  }
  @media screen and (min-width: 1165px) {
    grid-template-columns: 1fr 1fr 1fr;
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
  padding-top: 20px;
  padding-bottom: 40px;
  .empty {
    height: 201px;
    width: 100%;
  }
`;

// eslint-disable-next-line import/no-anonymous-default-export
export default () => (
  <NftProvider>
    <NFTPool />
  </NftProvider>
);
