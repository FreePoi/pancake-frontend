import React, { FC } from 'react';
import styled from 'styled-components';
import { useWeb3React } from '@web3-react/core';
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
      <div className="right">
        <div className="icons">
          <a target="_blank" rel="noreferrer" href="https://twitter.com/KACOFinance">
            <TwitterIcon height="28px" />
          </a>
          <a target="_blank" rel="noreferrer" href="https://t.me/coinversationofficial">
            <TelegramIcon height="28px" />
          </a>
        </div>
        {account ? (
          <div className="account">
            <span>{account}</span>
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

  ${({ theme }) => theme.mediaQueries.xs} {
    justify-content: space-between;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    justify-content: space-between;
  }
  /* 
  ${({ theme }) => theme.mediaQueries.md} {
    justify-content: flex-end;
  } */

  ${({ theme }) => theme.mediaQueries.md} {
    justify-content: flex-end;
  }
  height: 72px;
  position: absolute;
  top: 0px;
  width: 100%;

  > .right {
    display: flex;
    align-items: center;
    > .icons {
      display: flex;
      align-items: center;
      > a {
        margin-right: 16px;
        display: block;
        width: 28px;
        height: 28px;
        border-radius: 14px;
        &:hover {
          svg {
            width: 24px;
            fill: #00dbde;
          }
        }
      }
    }

    > .theme-choice {
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
      max-width: 150px;
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
