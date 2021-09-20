import React, { FC } from 'react';
import { Flex, Text } from '@kaco/uikit';
import styled from 'styled-components';
import HeaderBgSvg from '../img/header-bg.svg';
import LogoSvg from '../../NftPools/svg/demo.svg';

export interface Pool {
  poolName: string;
  fragmentName: string;
  nftCount: number;
  liquidity: number;
  floorPrice: number;
  changeDay7: number;
}

const PoolHeader_: FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={className}>
      <div>
        <img className="pool-logo" src={LogoSvg} alt="" />
        <h1>KACO NFT POOL</h1>
        <Flex className="pool-info">
          <div className="info">
            <Text fontSize="20px" bold mb="4px">
              300
            </Text>
            <Text fontSize="12px">NFT In Pool</Text>
          </div>
          <div className="info">
            <Text fontSize="20px" bold mb="4px">
              0.89 BNB
            </Text>
            <Text fontSize="12px">NFT Price</Text>
          </div>
          <div className="info second-line">
            <Text fontSize="20px" bold mb="4px">
              $234,129.98
            </Text>
            <Text fontSize="12px">Liquidity</Text>
          </div>
          <div className="info second-line">
            <Text fontSize="20px" bold mb="4px">
              120,000
            </Text>
            <Text fontSize="12px">KKaco Supply</Text>
          </div>
        </Flex>
      </div>
    </div>
  );
};

export const PoolHeader = styled(PoolHeader_)`
  background-image: url(${HeaderBgSvg});
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: relative;
  border-radius: 24px;
  top: 39px;
  z-index: 1;

  > div {
    height: 100%;
    width: 100%;
    padding: 0px 20px 39px 20px;
    ${({ theme }) => theme.mediaQueries.md} {
      padding: 0px 40px 39px 40px;
    }

    background-color: rgba(0, 0, 0, 0.6);
    border-radius: 24px;
    > .pool-logo {
      position: absolute;
      left: 20px;
      top: -15px;
      width: 50px;
      height: 50px;

      ${({ theme }) => theme.mediaQueries.md} {
        left: 40px;
        top: -40px;
        width: 120px;
        height: 120px;
      }
    }

    > h1 {
      color: #1bd3d5;
      padding: 19px 0px 0px 66px;
      font-size: 24px;

      ${({ theme }) => theme.mediaQueries.md} {
        font-size: 32px;
        padding: 29px 0px 0px 146px;
      }
    }

    > .pool-info {
      width: 100%;
      flex-wrap: wrap;
      margin-top: 30px;
      padding: 10px 30px;
      margin-bottom: 30px;
      background: #238485;
      border-radius: 12px;
      justify-content: space-between;
      > .info {
        width: 50%;
      }
      ${({ theme }) => theme.mediaQueries.md} {
        > .info {
          width: auto;
        }
      }

      > .second-line {
        margin-top: 20px;
      }

      ${({ theme }) => theme.mediaQueries.md} {
        grid-template-columns: 1fr 1fr 1fr 1fr;
        align-items: center;
        margin-top: 40px;
        width: 67.5%;
        min-width: 600px;
        min-width: 550px;
        > .second-line {
          margin-top: 0px;
        }
      }
    }
  }
`;
