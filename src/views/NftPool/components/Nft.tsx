import React, { FC, useContext, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Button, Flex, Text } from '@kaco/uikit';
import { NftContext } from '../providers/nft.provider';
import { LockInfo, NFT } from './GoodsInPool';
import LockSvg from '../img/lock.svg';
import { simpleRpcProvider } from 'utils/providers';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { BLOCK_INTERVAL } from 'config/constants/nft';

function getLastDate(
  until: number,
  now: number,
): {
  days: number;
  hours: number;
  mins: number;
  secs: number;
} {
  if (now >= until) {
    return {
      days: 0,
      hours: 0,
      mins: 0,
      secs: 0,
    };
  }

  const all = (until - now) * BLOCK_INTERVAL;
  const m = 60;
  const h = 3600;
  const d = h * 24;
  const daysR = all % d;
  const hoursR = daysR % h;
  const minsR = hoursR % m;

  return {
    days: (all - daysR) / d,
    hours: (daysR - hoursR) / h,
    mins: (hoursR - minsR) / m,
    secs: minsR,
  };
}

const Nft: FC<{ className?: string; nft: NFT; lockInfo: LockInfo | undefined }> = ({ className, nft, lockInfo }) => {
  const { add, items } = useContext(NftContext);
  const [now, setNow] = useState(0);
  const { account } = useActiveWeb3React();
  const added = useMemo(() => !!items.find((item) => item.id === nft.id), [items, nft]);
  const nowDate:
    | {
        days: number;
        hours: number;
        mins: number;
        secs: number;
      }
    | undefined = useMemo(() => lockInfo && getLastDate(lockInfo.lastBlock, now), [lockInfo, now]);

  useEffect(() => {
    simpleRpcProvider.getBlockNumber().then(setNow);
  }, []);

  return (
    <div className={className}>
      <div className="show">
        <img src={nft.image} alt="" />
        {lockInfo && (
          <Flex className="locked">
            <div>
              <Text fontSize="20px" bold color="#1BD3D5">
                {nowDate.days}
              </Text>
              <Text fontSize="12px" color="#1BD3D5">
                Days
              </Text>
            </div>
            <div>
              <Text fontSize="20px" bold color="#1BD3D5">
                {nowDate.hours}
              </Text>
              <Text fontSize="12px" color="#1BD3D5">
                Hrs
              </Text>
            </div>
            <div>
              <Text fontSize="20px" bold color="#1BD3D5">
                {nowDate.mins}
              </Text>
              <Text fontSize="12px" color="#1BD3D5">
                Mins
              </Text>
            </div>
            <div>
              <Text fontSize="20px" bold color="#1BD3D5">
                {nowDate.secs}
              </Text>
              <Text fontSize="12px" color="#1BD3D5">
                Secs
              </Text>
            </div>
          </Flex>
        )}
      </div>
      <Text fontSize="16px" style={{ flex: '1' }} bold mb={{ xs: '16px', md: '24px' }} mt={{ xs: '16px', md: '24px' }}>
        {nft.name}#{nft.id}
      </Text>
      {lockInfo && account?.toLowerCase() !== lockInfo.unlocker.toLowerCase() ? (
        <img src={LockSvg} alt="" />
      ) : (
        <Button height="32px" width="120px" variant={added ? 'text' : 'secondary'} onClick={() => !added && add(nft)}>
          {added ? 'Added' : account?.toLowerCase() === lockInfo?.unlocker.toLowerCase() ? 'withdraw' : 'Buy +'}
        </Button>
      )}
    </div>
  );
};

export default styled(Nft)`
  width: 300px;
  ${({ theme }) => theme.mediaQueries.sm} {
    width: 224px;
  }
  background: #122124;
  border: 2px solid #1e3337;
  border-radius: 12px;
  padding: 12px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  > .show {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 300px;
    ${({ theme }) => theme.mediaQueries.sm} {
      height: 200px;
    }
    width: 100%;
    background: #1b383e;
    /* background: radial-gradient(circle, #2a6c6e, #43238c); */
    border-radius: 8px;
    img {
      max-width: 100%;
      max-height: 100%;
    }

    > .locked {
      padding: 0px 31px;
      ${({ theme }) => theme.mediaQueries.sm} {
        padding: 0px 11px;
      }
      align-items: center;
      justify-content: space-between;
      position: absolute;
      left: 0px;
      top: 0px;
      right: 0px;
      bottom: 0px;
      background: rgba(0, 0, 0, 0.8);

      > div {
        width: 40px;
        height: 68px;
        background: #1f373b;
        border-radius: 12px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        padding: 8px 0px 12px 0px;
      }
    }
  }
`;
