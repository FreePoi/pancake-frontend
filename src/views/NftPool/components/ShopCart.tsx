import React, { FC, useCallback, useContext, useState } from 'react';
import styled from 'styled-components';
import { Button, Text, Grid } from '@kaco/uikit';
import { NftContext } from '../providers/nft.provider';
import RemoveSVG from '../img/remove.svg';
import { NFT } from '..';
import { useContract } from 'hooks/useContract';
import Nft100Abi from 'config/abi/NFT100Pair721.json';
import useActiveWeb3React from 'hooks/useActiveWeb3React';

const Item: FC<{ className?: string; item: NFT; floorPrice: number; symbol: string }> = ({
  className,
  item,
  floorPrice,
  symbol,
}) => {
  const { remove } = useContext(NftContext);
  const [isHover, setIsHover] = useState(false);

  return (
    <div className="item">
      <div className="show" onMouseOver={() => setIsHover(true)} onMouseOut={() => setIsHover(false)}>
        <img src={item.image} alt="" />
        <div className="mask" style={{ opacity: isHover ? '1' : '0' }} onClick={() => remove(item)}>
          <img src={RemoveSVG} alt="" />
        </div>
      </div>
      <Text color="white" bold fontSize="12px" mt="14px" mb="12px">
        {item.name}#{item.id}
      </Text>
      <Text color="#1BD3D5" bold fontSize="12px">
        {floorPrice}
        {symbol}
      </Text>
    </div>
  );
};

const ShopCart: FC<{ className?: string; floorPrice: number; symbol: string; pairAddres: string }> = ({
  className,
  floorPrice,
  symbol,
  pairAddres,
}) => {
  const { items } = useContext(NftContext);
  const contract = useContract(pairAddres, Nft100Abi);
  const { account } = useActiveWeb3React();

  const onBuy = useCallback(() => {
    if (!account || !contract) {
      return;
    }

    const burn = contract.withdraw(
      items.map((item) => item.id),
      items.map(() => 1),
      account,
    );

    burn.then(
      (s) => {
        alert('success');
      },
      (e) => {
        alert('failed');
        console.log('e', e);
      },
    );
  }, [contract, account, items]);

  return (
    <div className={className}>
      <div>
        <Grid gridGap={{ xs: '16px', md: '31px' }} className="items">
          {items.map((item) => (
            <Item item={item} key={item.id} floorPrice={floorPrice} symbol={symbol} />
          ))}
        </Grid>
        <div className="right">
          <Text color="#1BD3D5" bold fontSize="28px">
            {items.length * floorPrice} {symbol}
          </Text>
          <Text color="white" bold fontSize="12px" textAlign="right" mt="13px" mb="17px">
            Total Cost
          </Text>
          <Button onClick={onBuy}>Buy</Button>
        </div>
      </div>
    </div>
  );
};

export default styled(ShopCart)`
  position: sticky;
  width: 100%;
  bottom: 20px;
  z-index: 10;
  > div {
    margin: 0px auto;
    max-width: 1286px;
    display: flex;
    justify-content: space-between;
    padding: 20px;
    background: #1f373b;
    box-shadow: 0px 5px 16px 4px rgba(0, 0, 0, 0.2);
    opacity: 0.98;
    border-radius: 24px;

    > .items {
      max-height: 328px;
      overflow: auto;
      grid-template-columns: 136px 136px 136px 136px;

      /* display: flex;
      flex-wrap: wrap; */
      > .item {
        text-align: center;
        > .show {
          width: 136px;
          height: 136px;
          border-radius: 8px;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;

          > img {
            width: 136px;
            height: 136px;
          }
          > .mask {
            transition: opacity 0.2s linear;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            z-index: 11;
            top: 0px;
            bottom: 0px;
            right: 0px;
            left: 0px;
            background-color: rgba(0, 0, 0, 0.8);
          }
        }
      }
    }

    > .right {
      padding-left: 180px;
      padding-right: 21px;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
    }
  }
`;
