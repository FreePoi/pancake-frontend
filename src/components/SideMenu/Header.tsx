import React, { FC, useState } from 'react'
import styled from 'styled-components'
import TwitterSvg from './imgs/twitter.svg'
import FacebookSvg from './imgs/facebook.svg'
import ThemeWhiteSvg from './imgs/theme-white.svg'
import UserIconSvg from './imgs/user-icon.svg'

export enum ThemeChoice {
  Dark,
  White,
}

const Header: FC<{ className?: string; onThemeChange: (theme: ThemeChoice) => void }> = ({
  className,
  onThemeChange,
}) => {
  return (
    <div className={className}>
      <div className="left">
        <a href="https://www.twitter.com">
          <img src={TwitterSvg} alt="" />
        </a>
        <a href="https://www.facebook.com">
          <img src={FacebookSvg} alt="" />
        </a>
      </div>
      <div className="right">
        <div className="theme-choice">
          <img src={ThemeWhiteSvg} alt="" />
        </div>
        <div className="account">
          <span>0x19...0918CF</span>
          <img src={ThemeWhiteSvg} alt="" />
        </div>
      </div>
    </div>
  )
}

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

      > img {
        margin-left: 14px;
      }
    }
  }
`
