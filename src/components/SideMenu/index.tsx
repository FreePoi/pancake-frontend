import React, { FC, useState } from 'react'
import styled from 'styled-components'
import LogoPng from './imgs/logo.png'
import CollapseSvg from './imgs/collapse.svg'

const SideMenu: FC<{ className?: string }> = ({ className, children }) => {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className={className}>
      <div className="side" style={{ width: collapsed ? '64px' : '200px' }}>
        <div className="logo">
          <img src={LogoPng} alt="" />
        </div>
        <img
          src={CollapseSvg}
          alt=""
          style={{ transform: collapsed ? 'scaleX(-1)' : '' }}
          onClick={() => setCollapsed((old) => !old)}
        />
      </div>
      <div className="body-container" style={{ paddingLeft: collapsed ? '64px' : '200px' }}>
        <div className="content">{children}</div>
      </div>
    </div>
  )
}

export default styled(SideMenu)`
  > .body-container {
    transition: 0.15s padding;
    background: #1f252a;
  }

  > .side {
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
      right: -11px;
      top: 10px;
    }
    > .logo > img {
      height: 30px;
      margin-left: 17px;
      margin-top: 22px;
      margin-bottom: 20px;
    }
  }
`
