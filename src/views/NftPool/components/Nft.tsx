import React, { FC, useContext, useMemo } from 'react';
import styled from 'styled-components';
import { Button, Flex, Text } from '@kaco/uikit';
import { NftContext } from '../providers/nft.provider';
import { NFT } from '../index';
import LockSvg from '../img/lock.svg';

const Nft: FC<{ className?: string; nft: NFT; isLocked: boolean }> = ({ className, nft, isLocked }) => {
  const { add, items } = useContext(NftContext);
  const added = useMemo(() => !!items.find((item) => item.id === nft.id), [items, nft]);

  return (
    <div className={className}>
      <div className="show">
        <img src={nft.image} alt="" />
        {isLocked && (
          <Flex className="locked">
            <div>
              <Text fontSize="20px" bold color="#1BD3D5">
                48
              </Text>
              <Text fontSize="12px" color="#1BD3D5">
                Days
              </Text>
            </div>
            <div>
              <Text fontSize="20px" bold color="#1BD3D5">
                04
              </Text>
              <Text fontSize="12px" color="#1BD3D5">
                Hrs
              </Text>
            </div>
            <div>
              <Text fontSize="20px" bold color="#1BD3D5">
                26
              </Text>
              <Text fontSize="12px" color="#1BD3D5">
                Mins
              </Text>
            </div>
            <div>
              <Text fontSize="20px" bold color="#1BD3D5">
                23
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
      {isLocked ? (
        <img src={LockSvg} alt="" />
      ) : (
        <Button height="32px" width="120px" variant={added ? 'text' : 'secondary'} onClick={() => !added && add(nft)}>
          {/* <Button height="40px" width="180px" variant="secondary"> */}
          {added ? 'Added' : 'Buy +'}
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
