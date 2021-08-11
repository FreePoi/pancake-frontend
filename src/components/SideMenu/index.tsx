import React, { FC, useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { usePriceCakeBusd } from 'state/farms/hooks'
import LogoPng from './imgs/logo.png'
import CollapseSvg from './imgs/collapse.svg'
import FarmSvg from './imgs/icon_Farm_D.svg'
import FarmNSvg from './imgs/icon_Farm_N.svg'
import HomeSvg from './imgs/icon_home_D.svg'
import HomeNSvg from './imgs/icon_home_N.svg'
import InfoSvg from './imgs/icon_Info_D.svg'
import InfoNSvg from './imgs/icon_Info_N.svg'
import MintSvg from './imgs/icon_Mint_D.svg'
import MintNSvg from './imgs/icon_Mint_N.svg'
import PoolsSvg from './imgs/icon_Pools_D.svg'
import PoolsNSvg from './imgs/icon_Pools_N.svg'
import TradeSvg from './imgs/icon_trade_D.svg'
import TradeNSvg from './imgs/icon_trade_N.svg'
import Logo2Svg from './imgs/logo2_primary.svg'
import Logo2DefaultSvg from './imgs/logo2_default.svg'
import Header from './Header'

const menuItems: {
  text: string
  imgs: any[]
  link: string
}[] = [
  {
    text: 'Home',
    imgs: [HomeSvg, HomeNSvg],
    link: '/home',
  },
  {
    text: 'Trade',
    imgs: [TradeSvg, TradeNSvg],
    link: '/trade',
  },
  {
    text: 'Mint',
    imgs: [MintSvg, MintNSvg],
    link: '/mint',
  },
  {
    text: 'Farm',
    imgs: [FarmSvg, FarmNSvg],
    link: '/farm',
  },
  {
    text: 'Pools',
    imgs: [PoolsSvg, PoolsNSvg],
    link: '/pools',
  },
  {
    text: 'Info',
    imgs: [InfoSvg, InfoNSvg],
    link: '/info',
  },
]
const Wrapper = styled.div<{ collapsed: boolean }>`
  > .body-container {
    transition: 0.15s padding;
    background: #1f252a;
    > .content {
      position: relative;
    }
  }

  > .side {
    z-index: 10;
    display: flex;
    flex-direction: column;
    transition: 0.15s width;
    position: fixed;
    left: 0px;
    top: 0px;
    bottom: 0px;
    background: linear-gradient(0deg, rgba(17, 66, 36, 0.1), rgba(64, 242, 244, 0.1));

    > img {
      cursor: pointer;
      width: 20px;
      height: 20px;
      position: absolute;
      right: ${(props) => (props.collapsed ? '-12px' : '-10px')};
      top: 10px;
    }
    > .logo > img {
      height: 30px;
      margin-left: 17px;
      margin-top: 22px;
      margin-bottom: 20px;
    }
    > .nav {
      flex: 1;
      margin-top: 20px;
      > .link {
        display: flex;
        align-items: center;
        font-size: 14px;
        font-family: Microsoft YaHei;
        color: #ffffff;
        height: 48px;
        margin-bottom: 4px;
        &:last-child {
          margin-bottom: 0px;
        }
        &:hover {
          background: #272e32;
          color: #1bd3d5;
        }
        > span {
          margin-left: 12px;
        }
        > .icon-holder {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: 16px;
          > img {
            /* width: 32px;
            height: 32px; */
          }
        }
      }
    }

    > .account-info {
      border-top: 1px solid #272e32;
      height: 90px;
      > .balance {
        justify-content: ${(props) => (props.collapsed ? 'center' : '')};
        padding-top: ${(props) => (props.collapsed ? '11px' : '19px')};
        padding-left: ${(props) => (props.collapsed ? '0px' : '31px')};
        display: flex;
        align-items: center;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #ffffff;
        > img {
          width: ${(props) => (props.collapsed ? '30px' : '18px')};
          height: ${(props) => (props.collapsed ? '30px' : '18px')};
        }
        > span {
          margin-left: 7px;
        }
      }
    }
  }
`

const SideMenu: FC<{ className?: string }> = ({ className, children }) => {
  const [collapsed, setCollapsed] = useState(false)
  const cakePriceUsd = usePriceCakeBusd()

  return (
    <Wrapper className={className} collapsed={collapsed}>
      <div className="side" style={{ width: collapsed ? '64px' : '200px' }}>
        <img
          src={CollapseSvg}
          alt=""
          style={{ transform: collapsed ? 'scaleX(-1)' : '' }}
          onClick={() => setCollapsed((old) => !old)}
        />
        <div className="logo">
          <img src={collapsed ? Logo2Svg : LogoPng} alt="" />
        </div>
        <div className="nav">
          {menuItems.map((item) => (
            <Link className="link" to={item.link} key={item.link}>
              <div className="icon-holder">
                <img src={item.imgs[collapsed ? 0 : 1]} alt="" />
              </div>
              {!collapsed && <span>{item.text}</span>}
            </Link>
          ))}
        </div>
        <div className="account-info">
          <div className="balance">
            <img src={collapsed ? Logo2DefaultSvg : Logo2Svg} alt="" />
            {!collapsed && <span>${cakePriceUsd.isNaN() ? '0' : cakePriceUsd.toFixed(2)}</span>}
          </div>
        </div>
      </div>
      <div className="body-container" style={{ paddingLeft: collapsed ? '64px' : '200px' }}>
        <div className="content">
          <Header onThemeChange={() => {}} />
          {children}
        </div>
      </div>
    </Wrapper>
  )
}

export default SideMenu
