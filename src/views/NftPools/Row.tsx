import { FC, useState } from 'react';

import { Link } from 'react-router-dom';

import { Pool } from './index';
import { Text, Flex } from '@kaco/uikit';
import styled from 'styled-components';
import LogoSvg from './svg/demo.svg';
import { RowBetween } from '../../components/Layout/Row';

const StyledTr = styled.tr`
  border-bottom: 1px solid #122124;

  td > .link {
    visibility: hidden;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    &:hover {
      background-color: #122124;
      td > .link {
        visibility: visible;
        cursor: pointer;
      }
    }
  }

  &:last-child {
    border-bottom-width: 0px;
  }
  > td {
    vertical-align: middle;
  }
`;
const MoreTr = styled.tr`
  background-color: #122124;
  overflow: hidden;
`;

const PoolName_: FC<{ poolName: string; fragmentName: string; className?: string }> = ({
  poolName,
  fragmentName,
  className,
}) => {
  return (
    <Flex alignItems="center" className={className}>
      <div>
        <img src={LogoSvg} alt="" />
      </div>
      <div>
        <Text bold fontSize="16px" mb={{ xs: '4px', md: '7px' }}>
          {poolName}
        </Text>
        <Text>{fragmentName}</Text>
      </div>
    </Flex>
  );
};

const PoolName = styled(PoolName_)`
  padding: 12px 20px;

  ${({ theme }) => theme.mediaQueries.md} {
    padding: 18px 30px;
  }

  > div > img {
    height: 26px;
    width: 26px;
    margin-right: 12px;

    ${({ theme }) => theme.mediaQueries.md} {
      height: 52px;
      width: 52px;
      margin-right: 21px;
    }
  }
`;

const TitledItem_: FC<{ title: string; value: string | number }> = ({ title, value }) => {
  return (
    <div>
      <Text color="#9DA6A6" fontSize="12px" mb={{ md: '12px', xs: '6px' }}>
        {title}
      </Text>
      <Text bold fontSize="15px">
        {value}
      </Text>
    </div>
  );
};
const TitledItem = styled(TitledItem_)``;

const Row: FC<{ pool: Pool; simpleMode: boolean }> = ({ pool, simpleMode }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <StyledTr onClick={() => setCollapsed((old) => !old)}>
        <td>
          <PoolName poolName={pool.poolName} fragmentName={pool.fragmentName} />
        </td>
        {!simpleMode && (
          <>
            <td>
              <TitledItem title="NFT IN Pool" value={pool.nftCount} />
            </td>
            <td>
              <TitledItem title="Liquidity" value={pool.liquidity} />
            </td>
          </>
        )}
        <td>
          <TitledItem title="Floor Price" value={pool.floorPrice} />
        </td>

        {!simpleMode && (
          <>
            <td>
              <TitledItem title="7 Days Change" value={pool.changeDay7} />
            </td>
            <td>
              <div className="link">
                <Link to={`/nft/pool/a`}>LINK</Link>
              </div>
            </td>
          </>
        )}
      </StyledTr>

      {
        <MoreTr>
          <td
            style={{
              overflow: 'hidden',
              transition: 'height 0.1s',
              height: simpleMode && !collapsed ? '144px' : '0px',
            }}
            colSpan={6}
          >
            <div
              style={{
                overflow: 'hidden',
                transition: 'height 0.1s',
                height: simpleMode && !collapsed ? '144px' : '0px',
              }}
            >
              <RowBetween padding="12px">
                <Text fontSize="12px">NFT IN Pool</Text>
                <Text color="white">{pool.nftCount}</Text>
              </RowBetween>
              <RowBetween padding="12px">
                <Text fontSize="12px">Liquidity</Text>
                <Text color="white">{pool.liquidity}</Text>
              </RowBetween>
              <RowBetween padding="12px">
                <Text fontSize="12px">7 Days Change</Text>
                <Text color="white">{pool.changeDay7}</Text>
              </RowBetween>
            </div>
          </td>
        </MoreTr>
      }
    </>
  );
};

export default Row;
