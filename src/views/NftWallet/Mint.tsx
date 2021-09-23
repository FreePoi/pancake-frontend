import Page from './Page';
import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Grid, Text } from '@kaco/uikit';
import Nft from './components/Nft';
import { fetchAllTokens, filterNft } from 'views/NftPool/util/fetchNft';
import { NFT } from 'views/NftPool';
import { useWeb3React } from '@web3-react/core';
import { NftPair, useNftPairs } from 'views/NftPools/hooks/useNftPools';
import PageLoader from 'components/Loader/PageLoader';

const NftsGroupByPool_: FC<{
  className?: string;
  title: string;
  pair: NftPair;
  nfts: NFT[];
}> = ({ className, title, nfts, pair }) => {
  return (
    <div className={className}>
      <Text bold color="white" mb="20px" fontSize="20px">
        {title}
      </Text>
      <Grid gridGap={{ xs: '4px', md: '16px' }} className="nfts">
        {nfts.map((nft) => (
          <Nft nft={nft} key={nft.id} pair={pair} />
        ))}
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
  const [pools, setPools] = useState<({ nfts: NFT[] } & NftPair)[]>([]);
  const { account } = useWeb3React();
  const pairs = useNftPairs();
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!account || !pairs || !pairs.length) {
      return;
    }

    console.log('fetchAllTokens');
    setFetching(true);
    fetchAllTokens(account)
      .then((items) => {
        const pools = pairs
          .map((pair) => ({ ...pair, nfts: filterNft(items, pair.nftAddress) }))
          .filter((pair) => pair.nfts.length);

        setPools(pools);
      }, console.error)
      .finally(() => setFetching(false));
  }, [account, pairs]);

  return (
    <Page className={className}>
      {fetching && <PageLoader />}
      {!fetching &&
        pools.map((pair, index) => (
          <NftsGroupByPool title={pair.name} nfts={pair.nfts} key={index} pair={pairs[index]} />
        ))}
    </Page>
  );
};

export default styled(Mint)`
  width: 100%;
`;
