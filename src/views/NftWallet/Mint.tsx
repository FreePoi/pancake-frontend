import Page from './Page';
import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Grid, Text } from '@kaco/uikit';
import Nft from './components/Nft';
import { fetchAllTokens, filterNft } from 'views/NftPool/util/fetchNft';
import { NFT } from 'views/NftPool/components/GoodsInPool';
import { useWeb3React } from '@web3-react/core';
import { NftPair, useNftPairs } from 'views/NftPools/hooks/useNftPools';
import PageLoader from 'components/Loader/PageLoader';
import NoBalance from './components/NoBalance';

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
      <Grid gridGap={{ xs: '4px', md: '10px' }} className="nfts">
        {nfts.map((nft) => (
          <Nft nft={nft} key={nft.id} pair={pair} />
        ))}
      </Grid>
    </div>
  );
};

const NftsGroupByPool = styled(NftsGroupByPool_)`
  width: 100%;
  border-radius: 24px;

  ${({ theme }) => theme.mediaQueries.md} {
    background: #122124;
    padding: 30px 40px;
  }

  > .nfts {
    grid-template-columns: 1fr 1fr;
    justify-content: space-between;

    @media screen and (min-width: 1040px) {
      justify-items: center;
      grid-template-columns: 1fr 1fr 1fr;
    }

    @media screen and (min-width: 1263px) {
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }
  }
`;
export const USER_NFTS = 'USER_NFTS';

const Mint: FC<{ className?: string }> = ({ className }) => {
  let _pairs: ({ nfts: NFT[] } & NftPair)[] = [];

  try {
    _pairs = JSON.parse(localStorage.getItem(USER_NFTS));
  } catch {
    localStorage.removeItem(USER_NFTS);
  }
  const [pools, setPools] = useState<({ nfts: NFT[] } & NftPair)[]>(_pairs);
  const { account } = useWeb3React();
  const pairs = useNftPairs();
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!account || !pairs || !pairs.length) {
      return;
    }

    setFetching(true);
    fetchAllTokens(account)
      .then((items) => {
        const pools = pairs
          .map((pair) => ({ ...pair, nfts: filterNft(items, pair.nftAddress) }))
          .filter((pair) => pair.nfts.length);

        setPools(pools);
        localStorage.setItem(USER_NFTS, JSON.stringify(pools));
      }, console.error)
      .finally(() => setFetching(false));
  }, [account, pairs]);

  return (
    <Page className={className}>
      {!pools && fetching ? (
        <PageLoader />
      ) : !pools.length ? (
        <NoBalance />
      ) : (
        pools.map((pair, index) => (
          <NftsGroupByPool title={pair.name} nfts={pair.nfts} key={index} pair={pools[index]} />
        ))
      )}
    </Page>
  );
};

export default styled(Mint)`
  width: 100%;
  min-height: 0px;
`;
