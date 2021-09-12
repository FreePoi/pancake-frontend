import React, { FC } from 'react';
import styled from 'styled-components';
import NFTSVG from '../../NftPool/img/nft.png';
import { Button, Text, useModal } from '@kaco/uikit';
import MintModal from './MintModal';

const Nft: FC<{ className?: string; nft: string }> = ({ className, nft }) => {
  const [onMint] = useModal(<MintModal />);

  return (
    <div className={className}>
      <div className="show">
        <img src={NFTSVG} alt="" />
      </div>
      <Text fontSize="18px" bold mb={{ xs: '16px', md: '24px' }} mt={{ xs: '16px', md: '24px' }}>
        Kaco#{nft}
      </Text>
      <Button height="40px" width="180px" variant={'secondary'} onClick={onMint}>
        Mint
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
