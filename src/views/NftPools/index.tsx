import React, { FC, useMemo, useState } from 'react';
import styled from 'styled-components';
import Page from 'components/Layout/Page';
import { useMatchBreakpoints, Text, Flex } from '@kaco/uikit';
import Row from './Row';

const PoolList = styled.div`
  border-radius: 16px;
  overflow: hidden;
  background-color: #1f373b;

  > table {
    width: 100%;
  }
  > div {
    > .line {
      background-color: #1f373b;
      height: 88px;
    }
    > .more {
    }
  }
`;

export interface Pool {
  poolName: string;
  fragmentName: string;
  nftCount: number;
  liquidity: number;
  floorPrice: number;
  changeDay7: number;
}

const pools: Pool[] = [
  {
    poolName: 'BabySwap NFB',
    fragmentName: 'BabySwap 100',
    nftCount: 300,
    liquidity: 192344,
    floorPrice: 202.11,
    changeDay7: 444422,
  },
  {
    poolName: 'ALPACA FIANCE',
    fragmentName: 'Alpaca 600',
    nftCount: 300,
    liquidity: 192344,
    floorPrice: 202.11,
    changeDay7: 444422,
  },
  {
    poolName: 'KACO FINANCE',
    fragmentName: 'Kaco 300',
    nftCount: 300,
    liquidity: 192344,
    floorPrice: 202.11,
    changeDay7: 444422,
  },
  {
    poolName: 'Memenopoly',
    fragmentName: 'Memenopoly 100',
    nftCount: 300,
    liquidity: 192344,
    floorPrice: 202.11,
    changeDay7: 444422,
  },
];

const NftPools: FC = () => {
  const { isXs, isSm } = useMatchBreakpoints();

  const simpleMode = useMemo(() => isXs || isSm, [isXs, isSm]);

  return (
    <Page>
      <PoolList>
        <table>
          {pools.map((pool) => (
            <Row key={pool.poolName} pool={pool} simpleMode={simpleMode} />
          ))}
        </table>
      </PoolList>
    </Page>
  );
};

export default NftPools;
