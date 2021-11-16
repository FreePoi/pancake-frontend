import React, { FC, useContext, useMemo } from 'react';
import styled from 'styled-components';
import { Button, Text } from '@kaco/uikit';
import { NftContext } from '../providers/nft.provider';
import LockSvg from '../img/lock.svg';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { NftInfoWithLock } from '../hooks/useNftWithLocks';
import LockTime from './LockTime';

const Nft: FC<{ className?: string; nft: NftInfoWithLock; now: number }> = ({ className, nft, now }) => {
  const { add, items } = useContext(NftContext);
  const { account } = useActiveWeb3React();
  const added = useMemo(() => !!items.find((item) => item.id === nft.id), [items, nft]);
  return (
    <div className={className}>
      {nft.attributes.length ? (
        <div className="attri">
          <h3>
            {nft.name}#{nft.id}
          </h3>
          <ul>
            {nft.attributes.map((v: any, index: number) => {
              return (
                <li key={index}>
                  <h4>{Object.keys(v)}: </h4>
                  <p>{Object.values(v)}</p>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
      <div className="show">
        <img src={nft.image} alt="" />
        {nft.lastBlock > now && (
          <div className="locked">
            <LockTime lastBlock={nft.lastBlock} now={now} />
          </div>
        )}
      </div>
      <Text fontSize="16px" style={{ flex: '1' }} bold mb={{ xs: '12px', md: '24px' }} mt={{ xs: '12px', md: '24px' }}>
        {nft.name}#{nft.id}
      </Text>
      {nft.lastBlock > now && account?.toLowerCase() !== nft.unlocker.toLowerCase() ? (
        <img src={LockSvg} alt="" />
      ) : (
        <Button height="32px" width="120px" variant={added ? 'text' : 'secondary'} onClick={() => !added && add(nft)}>
          {added ? 'Added' : account?.toLowerCase() === nft.unlocker.toLowerCase() ? 'withdraw' : 'Buy +'}
        </Button>
      )}
    </div>
  );
};

export default styled(Nft)`
  position: relative;
  max-width: 300px;
  width: 100%;
  padding: 6px;
  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 12px;
    width: 224px;
  }
  background: #122124;
  border: 2px solid #1e3337;
  border-radius: 12px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.3s ease;
  z-index: 1;

  &:hover {
    border-color: #1bd3d5;
    z-index: 9;
    .attri {
      visibility: visible;
      opacity: 1;
    }
  }
  .attri {
    visibility: hidden;
    opacity: 0;
    position: absolute;
    top: 0;
    left: 90%;
    z-index: 9;
    text-align: left;
    width: 90%;
    background-color: #122124;
    color: #9da6a6;
    border: 2px solid #1bd3d5;
    border-radius: 16px;
    line-height: 28px;
    padding: 10px 18px;
    max-height: 380px;
    overflow-y: scroll;
    font-weight: 500;
    user-select: none;
    transition: all 0.5s ease;
    &::-webkit-scrollbar {
      display: none;
    }
    ul {
      list-style: none;
    }
    h3 {
      color: #1bd3d5;
      font-size: 18px;
      font-weight: 800;
    }
    h4 {
      color: #fff;
      font-size: 14px;
      display: inline-block;
      word-break: break-all;
      color: #9da6a6;
      line-height: 20px;
    }
    p {
      color: #fff;
      font-size: 12px;
      word-break: break-all;
      line-height: 20px;
    }
  }

  @media screen and (max-width: 1040px) {
    &:nth-child(2n + 1) {
      .attri {
        left: 80%;
      }
    }
    &:nth-child(2n) {
      .attri {
        left: -80%;
      }
    }
  }

  @media screen and (max-width: 1263px) {
    &:nth-child(3n) {
      .attri {
        left: -80%;
      }
    }
  }
  > .show {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    ${({ theme }) => theme.mediaQueries.sm} {
      height: 200px;
    }
    width: 100%;
    background: #1b383e;
    /* background: radial-gradient(circle, #2a6c6e, #43238c); */
    border-radius: 8px;
    img {
      border-radius: 8px;
      max-width: 100%;
      max-height: 100%;
    }

    > .locked {
      border-radius: 8px;
      display: flex;
      align-items: center;
      position: absolute;
      left: 0px;
      top: 0px;
      right: 0px;
      bottom: 0px;
      background: rgba(0, 0, 0, 0.8);
    }
  }
`;
