import React, { FC, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'contexts/Localization';
import Page from 'components/Layout/Page';
import { useMatchBreakpoints } from '@kaco/uikit';

const PoolList = styled.div`
  border-radius: 16px;
  overflow: hidden;
  background-color: #1f373b;

  > div {
    > .line {
      background-color: #1f373b;
    }
    > .more {
      overflow: hidden;
      background-color: #122124;
    }
  }
`;

interface Pool {
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
    fragmentName: '',
    nftCount: 300,
    liquidity: 192344,
    floorPrice: 202.11,
    changeDay7: 444422,
  },
  {
    poolName: 'BabySwap NFB',
    fragmentName: '',
    nftCount: 300,
    liquidity: 192344,
    floorPrice: 202.11,
    changeDay7: 444422,
  },
  {
    poolName: 'ALPACA FIANCE',
    fragmentName: '',
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

const PoolItem: FC<{ pool: Pool; simpleMode: boolean }> = ({ pool, simpleMode }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div key={pool.poolName}>
      <div className="line" onClick={() => setCollapsed((old) => !old)}>
        line
      </div>
      {
        <div style={{ transition: 'height 0.1s', height: simpleMode && !collapsed ? '100px' : '0px' }} className="more">
          more
        </div>
      }
    </div>
  );
};

const NftPools: FC = () => {
  const { isXs, isSm } = useMatchBreakpoints();

  const simpleMode = useMemo(() => isXs || isSm, [isXs, isSm]);

  return (
    <Page>
      <PoolList>
        {pools.map((pool) => (
          <PoolItem key={pool.poolName} pool={pool} simpleMode={true} />
        ))}
      </PoolList>
    </Page>
  );
};

export default NftPools;
