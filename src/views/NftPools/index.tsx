import React, { FC, useMemo, useState } from 'react';
import styled from 'styled-components';
import Page from 'components/Layout/Page';
import { useMatchBreakpoints, Text, Flex } from '@kaco/uikit';
import Row from './components/Row';
import AnimalSvg from './svg/animal.png';
import MarketPng from './svg/market.png';
import { useNftPairs } from './hooks/useNftPools';
import Search from 'components/Search';
import PageLoader from 'components/Loader/PageLoader';

const Header = styled(Flex)`
  justify-content: space-between;

  > .left {
    margin-bottom: 20px;
    ${({ theme }) => theme.mediaQueries.md} {
      margin-bottom: 0px;
    }
  }
  > .right {
    display: none;
    ${({ theme }) => theme.mediaQueries.md} {
      display: block;
    }
  }
`;

const PoolList = styled.div`
  border-radius: 16px;
  overflow: hidden;
  background-color: #1f373b;
  z-index: 2;
  position: relative;
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

const NftPools: FC = () => {
  const { isXs, isSm } = useMatchBreakpoints();
  const pairs = useNftPairs();
  const [filter, setFilter] = useState<string>('');
  const simpleMode = useMemo(() => isXs || isSm, [isXs, isSm]);

  return (
    <Page>
      <Header>
        <div className="left">
          <img src={MarketPng} alt="" />
          <Text color="#1BD3D5" bold fontSize="20px" mt="23px" mb="40px">
            Trade, Swap, Fractionalized Your NFTS
          </Text>
          <Search value={filter} onChange={setFilter} />
        </div>
        <div
          className="right"
          style={{ background: `url(${AnimalSvg})`, height: '221px', width: '247px', marginRight: '89px' }}
        ></div>
      </Header>
      {!pairs.length ? (
        <PageLoader />
      ) : (
        <PoolList>
          <table>
            <tbody>
              {pairs.map((pair) => (
                <Row key={pair.pairAddress} pair={pair} simpleMode={simpleMode} />
              ))}
            </tbody>
          </table>
        </PoolList>
      )}
    </Page>
  );
};

export default NftPools;
