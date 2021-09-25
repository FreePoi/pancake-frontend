import { FC, useState } from 'react';
import { useHistory } from 'react-router-dom';

import styled from 'styled-components';
import { Text, Flex } from '@kaco/uikit';

import LogoSvg from '../svg/demo.svg';
import { RowBetween } from '../../../components/Layout/Row';
import { NftPair } from '../hooks/useNftPools';

const StyledTr = styled.tr`
  border-bottom: 1px solid #122124;

  td > .link {
    visibility: hidden;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    &:hover {
      background-color: #122124;
      td > .link {
        color: #1bd3d5;
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

const Row: FC<{ pair: NftPair; simpleMode: boolean }> = ({ pair, simpleMode }) => {
  const history = useHistory();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <StyledTr
        onClick={() => setCollapsed((old) => !old)}
        onClickCapture={() => history.push(`/nft/pool/${pair.pairAddress}`)}
      >
        <td>
          <PoolName poolName={pair.name} fragmentName={pair.symbol} />
        </td>
        {!simpleMode && (
          <>
            <td>
              <TitledItem title="NFT IN Pool" value={pair.supply} />
            </td>
            <td>
              <TitledItem title="Liquidity" value={0} />
            </td>
          </>
        )}
        <td>
          <TitledItem title="Floor Price" value={0} />
        </td>

        {!simpleMode && (
          <>
            <td>
              <TitledItem title="7 Days Change" value={0} />
            </td>
            <td>
              <div className="link">Link</div>
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
              height: simpleMode && !collapsed ? '130px' : '0px',
            }}
            colSpan={6}
          >
            <div
              style={{
                padding: simpleMode && !collapsed ? '10px 0px' : '0px',
                overflow: 'hidden',
                transition: 'height 0.1s',
                height: simpleMode && !collapsed ? '130px' : '0px',
              }}
            >
              <RowBetween padding="8px 12px">
                <Text fontSize="12px">NFT IN Pool</Text>
                <Text color="white">{pair.supply}</Text>
              </RowBetween>
              <RowBetween padding="8px 12px">
                <Text fontSize="12px">Liquidity</Text>
                <Text color="white">{0}</Text>
              </RowBetween>
              <RowBetween padding="8px 12px">
                <Text fontSize="12px">7 Days Change</Text>
                <Text color="white">{0}</Text>
              </RowBetween>
            </div>
          </td>
        </MoreTr>
      }
    </>
  );
};

export default Row;
