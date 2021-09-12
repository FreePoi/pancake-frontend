import React, { FC } from 'react';
import styled from 'styled-components';
import NFTSVG from '../img/nft.png';
import { Button, useMatchBreakpoints, Flex, Text, Grid } from '@kaco/uikit';

const ShopCart: FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={className}>
      <div>shop cart</div>
    </div>
  );
};

export default styled(ShopCart)`
  position: sticky;
  width: 100%;
  bottom: 20px;
  padding: 0px 20px 0px 60px;
  z-index: 10;
  > div {
    padding: 20px;
    background: #1f373b;
    box-shadow: 0px 5px 16px 4px rgba(0, 0, 0, 0.2);
    opacity: 0.98;
    border-radius: 24px;
  }
`;
