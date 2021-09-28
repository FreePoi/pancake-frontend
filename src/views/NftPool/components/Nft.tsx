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
