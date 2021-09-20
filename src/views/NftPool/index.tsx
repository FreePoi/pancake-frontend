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
  console.log(
    'process.env.COVALENT_KEY',
    process.env.REACT_APP_COVALENT_KEY,
    'NFT_PAIRS',
    NFT_PAIRS,
    pairAddress,
    pair,
  );

  useEffect(() => {
    const apiUrl = `https://api.covalenthq.com/v1/${chainId}/address/${pairAddress}/balances_v2/?key=${process.env.REACT_APP_COVALENT_KEY}&nft=true`;

    if (!pair) {
      return;
    }

    fetch(apiUrl).then(async (data) => {
      const covalentData: {
        data: {
          items:
            | {
                balance: string;
                contract_address: string;
                contract_name: string;
                contract_ticker_symbol: string;
                nft_data?: {
                  token_balance: string;
                  token_id: string;
                  token_url: string;
                  external_data: {
                    image: string;
                    image_256: string;
                    image_512: string;
                    image_1024: string;
                    name: string;
                  };
                }[];
              }[];
        } | null;
        error: boolean;
        error_code: number | null;
        error_message: string | null;
      } = await data.json();

      console.log('covalentData', covalentData);

      if (!covalentData.data || covalentData.error) {
        return;
      }

      const nfts: NFT[] = covalentData.data.items
        .filter(
          (token) =>
            token.nft_data &&
            token.contract_address.toLocaleLowerCase() === pair[chainId].nftAddress.toLocaleLowerCase(),
        )
        .reduce((nfts, curr) => nfts.concat(curr.nft_data), [])
        .map((nft) => ({
          id: parseInt(nft.token_id),
          balance: parseInt(nft.token_balance),
          uri: nft.token_url,
          image: nft.external_data.image,
          name: nft.external_data.name,
        }));

      console.log('sssssssssss', nfts);
      setItems([...nfts]);
    });
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
