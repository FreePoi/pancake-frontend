import React, { FC, useMemo, useState } from 'react';
import styled from 'styled-components';
import Page from 'components/Layout/Page';
import { useMatchBreakpoints } from '@kaco/uikit';
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

const Pool: FC = () => {
  const { isXs, isSm } = useMatchBreakpoints();

  return <Page></Page>;
};

export default Pool;
