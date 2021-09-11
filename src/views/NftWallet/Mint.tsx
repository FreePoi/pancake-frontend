import Page from './Page';
import { FC } from 'react';
import styled from 'styled-components';
import { Grid, Text } from '@kaco/uikit';
import Nft from 'views/NftPool/components/Nft';

const NftsGroupByPool_: FC<{ className?: string; title: string }> = ({ className, title }) => {
  return (
    <div className={className}>
      <Text bold color="white" mb="20px" fontSize="20px">
        {title}
      </Text>
      <Grid gridGap={{ xs: '4px', md: '16px' }} className="nfts">
        <Nft nft="d" />
        <Nft nft="d" />
        <Nft nft="d" />
        <Nft nft="d" />
        <Nft nft="d" />
        <Nft nft="d" />
        <Nft nft="d" />
        <Nft nft="d" />
      </Grid>
    </div>
  );
};

const NftsGroupByPool = styled(NftsGroupByPool_)`
  width: 100%;
  background: #122124;
  border-radius: 24px;
  padding: 30px 40px;

  > .nfts {
    grid-template-columns: 1fr;
    justify-items: center;

    ${({ theme }) => theme.mediaQueries.md} {
      grid-template-columns: 1fr 1fr;
    }
    @media screen and (min-width: 1165px) {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
`;

const Mint: FC<{ className?: string }> = ({ className }) => {
  return (
    <Page className={className}>
      <NftsGroupByPool title="Alpaca FinceAlpaca Fince" />
      <NftsGroupByPool title="Pancake Swap" />
    </Page>
  );
};

export default styled(Mint)`
  width: 100%;
`;
