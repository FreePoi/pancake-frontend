import React, { FC, useContext, useEffect, useMemo, useState } from 'react';
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

const Pools_: FC<{ className?: string }> = ({ className }) => {
  const [items, setItems] = useState<NFT[]>([]);
  const { pairAddress } = useParams<{ pairAddress: string }>();
  const pair = useMemo(
    () => NFT_PAIRS.find((pair) => pair[chainId].address.toLocaleLowerCase() === pairAddress.toLocaleLowerCase()),
    [pairAddress],
  );

  useEffect(() => {
    if (!pair) {
      return;
    }

    fetchNfts(pair[chainId].nftAddress, pairAddress).then(setItems);
  }, [pairAddress, pair]);

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

  return (
    <>
      <Page className={className}>
        <PoolHeader />
        <GoodsInPool />
      </Page>
      {!!items.length && <ShopCart />}
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
