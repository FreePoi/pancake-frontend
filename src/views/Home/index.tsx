import React from 'react';
import styled from 'styled-components';
import HomeBgPng from './components/home-bg.png';
import BannerPng from './components/banner.svg';
import KacoInfoPng from './components/kaco-info-bg.png';
import { useTranslation } from 'contexts/Localization';
import { Text, Flex } from '@kaco/uikit';
import { useMatchBreakpoints } from '@kaco/uikit';

const Home: React.FC<{ className?: string }> = ({ className }) => {
  const { t } = useTranslation();
  const { isXs, isSm } = useMatchBreakpoints();

  return (
    <div className={className}>
      <div>
        <div className="banner">
          <div className="left">
            <h1>$819,1220.11</h1>
            <span>{t('Liquidity')}</span>
          </div>
          <div className="right">
            <img src={BannerPng} alt="" />
          </div>
        </div>
        <div className="kac-info">
          <h3>KAC INFO</h3>

          {[isXs, isSm].some(Boolean) ? (
            <>
              <Text mb="20px" style={{ whiteSpace: 'nowrap', minWidth: '230px' }} color="">
                KAC PRICE： $0.09
              </Text>
              <Text mb="20px" style={{ whiteSpace: 'nowrap', minWidth: '230px' }} color="">
                KAC Total：100000
              </Text>
              <Text mb="20px" style={{ whiteSpace: 'nowrap', minWidth: '230px' }} color="">
                KAC Circulation：32425424
              </Text>

              <Text mb="20px" style={{ whiteSpace: 'nowrap', minWidth: '230px' }} color="">
                KAC Burnt： 0
              </Text>
              <Text mb="20px" style={{ whiteSpace: 'nowrap', minWidth: '230px' }} color="">
                KAC Market CAP： $100000
              </Text>
            </>
          ) : (
            <>
              <Flex flexWrap="wrap">
                <Text mb="35px" style={{ whiteSpace: 'nowrap', minWidth: '230px' }} color="">
                  KAC PRICE： $0.09
                </Text>
                <Text mb="35px" style={{ whiteSpace: 'nowrap', minWidth: '230px' }} color="">
                  KAC Total：100000
                </Text>
                <Text mb="35px" style={{ whiteSpace: 'nowrap', minWidth: '230px' }} color="">
                  KAC Circulation：32425424
                </Text>
              </Flex>
              <Flex>
                <Text mb="35px" style={{ whiteSpace: 'nowrap', minWidth: '230px' }} color="">
                  KAC Burnt： 0
                </Text>
                <Text mb="35px" style={{ whiteSpace: 'nowrap', minWidth: '230px' }} color="">
                  KAC Market CAP： $100000
                </Text>
                <Text mb="35px" style={{ whiteSpace: 'nowrap', minWidth: '230px' }} color=""></Text>
              </Flex>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
const lg = `@media screen and (max-width: 1150px)`;

export default styled(Home)`
  overflow: hidden;
  top: 72px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  background-image: url(${HomeBgPng});
  background-size: 100%;
  background-position-y: 30%;
  background-repeat: no-repeat;
  color: #1bd3d5;
  padding-bottom: 30px;
  /* ${({ theme }) => theme.mediaQueries.md} {
    padding-left: 64px;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    padding-left: 0px;
  } */

  > div {
    margin: 0 auto;
    max-width: 1200px;
    width: 100%;
    ${({ theme }) => theme.mediaQueries.md} {
      padding: 0px 80px;
    }
    > .banner {
      ${lg} {
        flex-direction: column-reverse;
        flex-wrap: wrap;
      }
      ${({ theme }) => theme.mediaQueries.md} {
        /* flex-wrap: no-wrap;
        flex-direction: initial;
        justify-content: center; */
      }
      ${({ theme }) => theme.mediaQueries.xl} {
        justify-content: space-between;
      }
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 7px;

      ${lg} {
        margin-bottom: 30px;
      }
      > .left {
        ${lg} {
          text-align: center;
        }
        text-align: left;
        padding-left: 10px;
        margin-top: 30px;
        margin-bottom: 30px;

        ${({ theme }) => theme.mediaQueries.md} {
          margin-top: 0px;
          margin-bottom: 0px;
        }
        h1 {
          font-size: 60px;

          ${lg} {
            font-size: 40px;
            text-align: center;
          }
          ${({ theme }) => theme.mediaQueries.md} {
          }
          font-weight: bold;
          margin-bottom: 30px;
        }
        span {
          font-weight: bold;
          font-size: 20px;
        }
      }
      > .right > img {
        width: 480px;
      }
    }
    > .kac-info {
      margin: 0px 30px;
      ${({ theme }) => theme.mediaQueries.md} {
        margin: 0px;
        background-image: url(${KacoInfoPng});
      }
      max-width: 1006px;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      /* border: 3px solid #1f373b; */
      /* border-radius: 20px; */
      padding: 48px 30px;
      > h3 {
        font-size: 18px;
        margin-bottom: 35px;
        ${({ theme }) => theme.mediaQueries.md} {
          font-size: 24px;
          margin-bottom: 51px;
        }
        font-weight: bold;
        color: #1bd3d5;
      }
    }
  }
`;
