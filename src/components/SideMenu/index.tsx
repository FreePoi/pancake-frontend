import React, { FC, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { usePriceCakeBusd } from 'state/farms/hooks';
import LogoPng from './imgs/logo.svg';
import BgPng from './imgs/bg.png';
// import FarmSvg from './imgs/icon_Farm_D.svg';
// import HomeSvg from './imgs/icon_home_D.svg';
import UncollapsedSvg from './imgs/icon_zk.svg';
import CollapsedSvg from './imgs/icon_sq.svg';
// import InfoSvg from './imgs/icon_Info_D.svg';
// import InfoNSvg from './imgs/icon_Info_N.svg';
// import MintSvg from './imgs/icon_Mint_D.svg';
// import MintNSvg from './imgs/icon_Mint_N.svg';
// import PoolsSvg from './imgs/icon_Pools_D.svg';
// import PoolsNSvg from './imgs/icon_Pools_N.svg';
// import TradeSvg from './imgs/icon_trade_D.svg';
import CertikSvg from './imgs/certik.svg';
import GalaxySvg from './imgs/galaxy.svg';
import TradeSvg from '../svg/Trade';
import FarmSvg from '../svg/Farm';
import HomeSvg from '../svg/Home';
import LogoSvg from './imgs/icon_logo.svg';
import Header from './Header';
import { useEffect } from 'react';
import { Flex, Text, useMatchBreakpoints } from '@kaco/uikit';
import TwitterIcon from '../svg/Twitter';
import TelegramIcon from '../svg/Telegram';
import DocLink from './imgs/DocLink';

const menuItems: {
  text: string;
  img: any;
  link: string;
}[] = [
  {
    text: 'Home',
    img: HomeSvg,
    link: '/',
  },
  {
    text: 'Trade',
    img: TradeSvg,
    link: '/swap',
  },
  // {
  //   text: 'Mint',
  //   imgs: [MintSvg, MintNSvg],
  //   link: '/mint',
  // },
  {
    text: 'Farm',
    img: FarmSvg,
    link: '/farms',
  },
  // {
  //   text: 'Pools',
  //   imgs: [PoolsSvg, PoolsNSvg],
  //   link: '/pools',
  // },
  // {
  //   text: 'Info',
  //   imgs: [InfoSvg, InfoNSvg],
  //   link: '/info',
  // },
];

const NavLink = styled(Link)<{ active: 't' | 'f' }>`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #ffffff;
  height: 48px;
  margin-bottom: 4px;
  &:last-child {
    margin-bottom: 0px;
  }
  svg {
    fill: white;
  }
  &:hover {
    background: #272e32;
  }
  > span {
    margin-left: 12px;
  }
  > .icon-holder {
    ${(props) => (props.active === 't' ? 'background: #1bd3d5;' : '')}
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 16px;
  }
`;

const Wrapper = styled.div<{ collapsed: boolean }>`
  background: #1f252a;
  flex: 1;
  display: flex;
  flex-direction: column;
  > .body-container {
    display: flex;
    flex-direction: column;
    background-image: url(${BgPng});
    background-repeat: no-repeat;
    background-size: cover;
    ${({ theme }) => theme.mediaQueries.xs} {
      padding-left: 0px;
    }
    ${({ theme }) => theme.mediaQueries.sm} {
      padding-left: 64px;
    }
    ${({ theme }) => theme.mediaQueries.sm} {
      padding-left: 200px;
    }
    flex: 1;
    transition: 0.15s padding;
    > .content {
      position: relative;
      padding-top: 72px;
      flex: 1;
    }
  }

  > .side {
    overflow: hidden;
    z-index: 10;
    flex-direction: column;
    transition: 0.15s width;
    position: fixed;
    left: 0px;
    top: 0px;
    bottom: 0px;
    display: flex;
    background: #11171b;
    ${({ theme }) => theme.mediaQueries.md} {
      /* background: linear-gradient(0deg, #114228, #40f2f4);
      */
      background: linear-gradient(0deg, #11171b, #142a2f);
    }

    > img {
      cursor: pointer;
      width: 16px;
      height: 16px;
      position: absolute;
      right: 22px;
      top: 27px;
    }
    > .logo > img {
      visibility: ${(props) => (props.collapsed ? 'hidden' : 'visiable')};
      height: 30px;
      margin-left: 17px;
      margin-top: 22px;
      margin-bottom: 20px;
    }
    > .nav {
      flex: 1;
      margin-top: 20px;
    }

    > .account-info {
      border-top: 1px solid #272e32;
      height: 212px;
      padding: ${(props) => (props.collapsed ? '0px 18px' : '0px 20px')};

      > .balance {
        height: 56px;
        > img {
          width: 28px;
          height: 28px;
        }
      }
      > .links {
        position: relative;
        left: -6px;
        padding-top: 16px;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        > a {
          margin-right: ${(props) => (props.collapsed ? '0px' : '16px')};
          &:last-child {
            margin-right: 0px;
          }
        }
        svg {
          fill: white;
          &:hover {
            fill: #1bd3d5;
          }
        }
        > div {
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background-color: rgb(32, 49, 74);

          > a {
            display: inline-flex;
            align-items: center;
            justify-content: center;
          }
          &:hover {
            svg {
              fill: #1bd3d5;
            }
            background: none;
          }
        }
      }
      > .links-collapsed {
        svg {
          fill: white;
          &:hover {
            fill: #1bd3d5;
          }
        }
      }
    }
  }
`;

const SideMenu: FC<{ className?: string }> = ({ className, children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const cakePriceUsd = usePriceCakeBusd();
  const { isXs, isSm, isMd } = useMatchBreakpoints();
  const { pathname } = useLocation();

  const sideCollapsedWidth = useMemo(() => {
    if ([isXs, isSm].some(Boolean)) {
      return '0px';
    }
    return '64px';
  }, [isXs, isSm]);

  useEffect(() => {
    if ([isXs, isSm, isMd].some(Boolean)) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  }, [isXs, isSm, isMd]);

  return (
    <Wrapper className={className} collapsed={collapsed}>
      <div className="side" style={{ width: collapsed ? sideCollapsedWidth : '200px' }}>
        <img src={collapsed ? CollapsedSvg : UncollapsedSvg} alt="" onClick={() => setCollapsed((old) => !old)} />
        <div className="logo">
          <img src={LogoPng} alt="" />
        </div>
        <div className="nav">
          {menuItems.map((item) => (
            <NavLink
              active={
                (
                  item.link === '/'
                    ? pathname === item.link
                    : ['/add', '/remove', '/liquidity'].find((p) => pathname.startsWith(p))
                    ? item.link === '/swap'
                    : pathname.startsWith(item.link)
                )
                  ? 't'
                  : 'f'
              }
              to={item.link}
              key={item.link}
              onClick={() => {
                [isXs, isSm, isMd].some(Boolean) && setCollapsed(true);
              }}
            >
              <div className="icon-holder">{item.img()}</div>
              {!collapsed && <span>{item.text}</span>}
            </NavLink>
          ))}
        </div>
        <div className="account-info">
          <Flex className="balance" alignItems="center">
            <img src={LogoSvg} alt="" />
            {!collapsed && (
              <Text color="#1BD3D5" bold fontSize="16px" ml="10px">
                ${cakePriceUsd.isNaN() ? '0' : cakePriceUsd.toFixed(2)}
              </Text>
            )}
          </Flex>
          {!collapsed && (
            <div className="links">
              <a target="_blank" rel="noreferrer" href="https://twitter.com/KACOFinance">
                <TwitterIcon
                  style={{ position: 'relative', top: '-2px', right: '-2.5px', height: '24px', width: '24px' }}
                />
              </a>
              <a target="_blank" rel="noreferrer" href="https://t.me/coinversationofficial">
                <TelegramIcon style={{ height: '22px', width: '22px' }} />
              </a>
              <a target="_blank" rel="noreferrer" href="https://coinversationprotocol.gitbook.io/kaco-doc/">
                <DocLink style={{ height: '16px', width: '16px' }} />
              </a>
            </div>
          )}
          {collapsed && (
            <div
              className="links-collapsed"
              style={{ marginTop: '6px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
            >
              <a
                style={{ position: 'relative', left: '-1px' }}
                target="_blank"
                rel="noreferrer"
                href="https://twitter.com/KACOFinance"
              >
                <TwitterIcon style={{ height: '24px', width: '24px' }} />
              </a>
              <a
                style={{ marginTop: '12px' }}
                target="_blank"
                rel="noreferrer"
                href="https://t.me/coinversationofficial"
              >
                <TelegramIcon style={{ height: '22px', width: '22px' }} />
              </a>
              <a
                style={{ marginTop: '18px' }}
                target="_blank"
                rel="noreferrer"
                href="https://coinversationprotocol.gitbook.io/kaco-doc/"
              >
                <DocLink style={{ height: '16px', width: '16px' }} />
              </a>
            </div>
          )}
          {!collapsed && (
            <>
              <Flex alignItems="center" mt="21px">
                <a target="_blank" rel="noreferrer" href="https://galaxy.eco/KACO">
                  <Text fontSize="12px" mr="14px">
                    Receive NFT
                  </Text>
                </a>
                <a target="_blank" rel="noreferrer" href="https://galaxy.eco/KACO">
                  <img src={GalaxySvg} alt="" />
                </a>
              </Flex>
              <Flex alignItems="center" mt="21px">
                <a target="_blank" rel="noreferrer" href="https://www.certik.org/projects/coinversation">
                  <Text fontSize="12px" mr="14px">
                    Audited By
                  </Text>
                </a>
                <a target="_blank" rel="noreferrer" href="https://www.certik.org/projects/coinversation">
                  <img src={CertikSvg} alt="" />
                </a>
              </Flex>
            </>
          )}
        </div>
      </div>
      <div
        className="body-container"
        style={{ paddingLeft: [isXs, isSm, isMd].some(Boolean) ? '0px' : collapsed ? '64px' : '200px' }}
      >
        <div className="content">
          <Header setCollapsed={setCollapsed} collapsed={collapsed} />
          <div className="bg-holder">{children}</div>
        </div>
      </div>
    </Wrapper>
  );
};

export default SideMenu;
