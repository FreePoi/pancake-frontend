import React, { FC } from 'react';
import styled from 'styled-components';
import { useWeb3React } from '@web3-react/core';
import ThemeWhiteSvg from './imgs/theme-white.svg';
import ConnectWalletButton from '../ConnectWalletButton';
import CollapseSvg from './imgs/collapse.svg';
import { useMatchBreakpoints } from '@kaco/uikit';
import TwitterIcon from '../svg/Twitter';
import TelegramIcon from '../svg/Telegram';

export enum ThemeChoice {
  Dark,
  White,
}

const Header: FC<{ className?: string; setCollapsed: (collapsed: boolean) => void; collapsed: boolean }> = ({
  className,
  setCollapsed,
  collapsed,
}) => {
  const { account } = useWeb3React();
  const { isXs, isSm } = useMatchBreakpoints();

  return (
    <div className={className}>
      {(isXs || isSm) && (
        <img
          src={CollapseSvg}
          alt=""
          style={{ transform: collapsed ? 'scaleX(-1)' : '' }}
          onClick={() => setCollapsed(!collapsed)}
        />
      )}
      <div className="left">
        <a target="_blank" rel="noreferrer" href="https://twitter.com/KACOFinance">
          <TwitterIcon height="28px" />
        </a>
        <a target="_blank" rel="noreferrer" href="https://t.me/coinversationofficial">
          <TelegramIcon height="28px" />
        </a>
      </div>
      <div className="right">
        {/* <div className="theme-choice">
          <img src={ThemeWhiteSvg} alt="" />
        </div> */}
        {account ? (
          <div className="account">
            <span>{account}</span>
            <img src={ThemeWhiteSvg} alt="" />
          </div>
        ) : (
          <ConnectWalletButton scale="sm" />
        )}
      </div>
    </div>
  );
};

export default styled(Header)`
  padding-left: 41px;
  padding-right: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 72px;
  position: absolute;
  top: 0px;
  width: 100%;

  > .left,
  > .right {
    display: flex;
    align-items: center;
  }
  > .left > a {
    &:first-child {
      margin-right: 16px;
    }
    &:hover {
      svg {
        fill: #00dbde;
      }
    }
    display: block;
    width: 28px;
    height: 28px;
    background: #1f252a;
    border-radius: 14px;
  }

  > .right {
    .theme-choice {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 16px;
      width: 36px;
      height: 36px;
      background: #1f252a;
      border-radius: 12px;
      > img {
        width: 20px;
        height: 20px;
      }
    }
    > .account {
      display: flex;
      align-items: center;
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #ffffff;
      height: 36px;
      background: #1f252a;
      border: 1px solid #2f363b;
      border-radius: 12px;
      padding: 0px 16px;
      max-width: 200px;
      > span {
        text-overflow: ellipsis;
        overflow-x: hidden;
      }
      > img {
        margin-left: 14px;
      }
    }
  }
`;
