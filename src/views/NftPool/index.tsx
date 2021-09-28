import React, { FC, useContext } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import Page from 'components/Layout/Page';
import ShopCart from './components/ShopCart';
import { PoolHeader } from './components/Header';
import { NftProvider, NftContext } from './providers/nft.provider';
import { NFT_PAIRS } from 'config/constants/nft';
import { GoodsInPool } from './components/GoodsInPool';
import { PriceContext } from 'contexts/PriceProvider';

const NftPool: FC<{ className?: string }> = ({ className }) => {
  const { items } = useContext(NftContext);
  const { priceVsBusdMap } = useContext(PriceContext);
  const { pairAddress } = useParams<{ pairAddress: string }>();
  const index = NFT_PAIRS.findIndex((pair) => pair.address.toLocaleLowerCase() === pairAddress.toLocaleLowerCase());
  const pair = NFT_PAIRS[index];

  return (
    <>
      <Page className={className}>
        <PoolHeader pairIndex={index} floorPrice={priceVsBusdMap[pairAddress.toLowerCase()]?.toNumber() || 0} />
        <GoodsInPool pair={pair} />
      </Page>
      {!!items.length && <ShopCart floorPrice={100} symbol={pair.symbol} pairAddres={pair.address} />}
    </>
  );
};

const NFTPool = styled(NftPool)`
  width: 100%;
  max-width: 1054px;
`;

// eslint-disable-next-line import/no-anonymous-default-export
export default () => (
  <NftProvider>
    <NFTPool />
  </NftProvider>
);
