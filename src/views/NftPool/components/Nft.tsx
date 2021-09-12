import React, { FC, useContext, useMemo } from 'react';
import styled from 'styled-components';
import NFTSVG from '../img/nft.png';
import { Button, useMatchBreakpoints, Flex, Text, Grid } from '@kaco/uikit';
import { NftContext, NftProvider } from '../providers/nft.provider';

const Nft: FC<{ className?: string; nft: string }> = ({ className, nft }) => {
  const { add, remove, items } = useContext(NftContext);
  const added = useMemo(() => !!items?.find((item) => item === nft), [items, nft]);

  console.log('items', items);

  return (
    <div className={className}>
      <div className="show">
        <img src={NFTSVG} alt="" />
      </div>
      <Text fontSize="18px" bold mb={{ xs: '16px', md: '24px' }} mt={{ xs: '16px', md: '24px' }}>
        Kaco#{nft}
      </Text>
      <Button height="40px" width="180px" variant="secondary" onClick={() => !added && add(nft)}>
        {/* <Button height="40px" width="180px" variant="secondary"> */}
        {added ? 'Added' : 'Buy +'}
      </Button>
    </div>
  );
};

export default styled(Nft)`
  width: 100%;
  min-width: 268px;
  max-width: 298px;
  height: 415px;
  background: #122124;
  border: 2px solid #1e3337;
  border-radius: 12px;
  padding: 10px;
  text-align: center;
  > .show {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 278px;
    background: radial-gradient(circle, #2a6c6e, #43238c);
    border-radius: 8px;
    img {
      height: 100%;
    }
  }
`;
