import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import { Grid } from '@kaco/uikit';
import styled from 'styled-components';
import Nft from './Nft';
import { NftPairConfig } from 'config/constants/nft';
// import { fetchNfts } from '../util/fetchNft';
// import PageLoader from 'components/Loader/PageLoader';
// import { useTranslation } from 'contexts/Localization';
// import Select from 'components/KacoSelect/KacoSelect';
// NftInfoWithLock, useNftWithLockInfo,
import { NftInfoWithLock, NftLockInfo, useNfts } from '../hooks/useNftWithLocks';
import NoBalance from './NoBalance';
import { simpleRpcProvider } from 'utils/providers';
import { fetchNftInfo } from '../util/fetchNft';
import { useWeb3React } from '@web3-react/core';

export interface Pool {
  poolName: string;
  fragmentName: string;
  nftCount: number;
  liquidity: number;
  floorPrice: number;
  changeDay7: number;
}

export interface NFT {
  id: number;
  balance: number;
  uri: string;
  image: string;
  name: string;
}
const pageSize = 24;
export const NFT_POOLS = 'NFT_POOLS';
const defaultAddress = '0x0000000000000000000000000000000000000001';

const Pools_: FC<{
  className?: string;
  pair: NftPairConfig | undefined;
}> = ({ className, pair }) => {
  // let _pairs: NFT[] = [];

  // try {
  //   _pairs = JSON.parse(localStorage.getItem(`${NFT_POOLS}-${pair?.address.toLowerCase()}`)) || [];
  // } catch {
  //   localStorage.removeItem(NFT_POOLS);
  // }
  // const [items, setItems] = useState<NFT[]>(_pairs);
  // const [fetching, setFetching] = useState(false);
  // const { t } = useTranslation();
  // const locksInfo = useNftWithLockInfo(pair);
  // const nfts = useNftWithLocks(pair);
  const { account: _account } = useWeb3React();
  const [nfts, setNfts] = useState<NftInfoWithLock[]>();
  const nfts_ = useNfts(pair);
  const nftsReversed = useMemo(() => [...nfts_].reverse(), [nfts_]);
  const count = useRef(0);

  const account = useMemo(() => _account || defaultAddress, [_account]);
  const container = useRef<HTMLDivElement>(null);
  const [now, setNow] = useState(0);
  const fetchingMore = useRef(false);

  useEffect(() => {
    if (!pair || !nftsReversed.length || !account) {
      return;
    }

    console.log('nftsxxxxxxxx');
    fetchMore(nftsReversed, 0, pair.nftAddress, account).then((nfts) => {
      alert(`nfts ${JSON.stringify(nfts?.length)}`);
      setNfts(nfts);
    });
  }, [pair, nftsReversed, account]);

  useEffect(() => {
    if (!nfts || !nfts.length || !nftsReversed.length || !pair) {
      return;
    }

    document.body.onscroll = (e) => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
      const clientHeight = document.documentElement.clientHeight || document.body.clientHeight;

      if (
        clientHeight + scrollTop > scrollHeight - 300 &&
        !fetchingMore.current &&
        count.current < nftsReversed.length - pageSize
      ) {
        fetchingMore.current = true;
        count.current += pageSize;
        fetchMore(nftsReversed, count.current, pair.nftAddress, account)
          .then((nfts) => {
            setNfts((old) => [...old, ...nfts]);
          })
          .finally(() => (fetchingMore.current = false));
      }
    };

    return () => (document.body.onscroll = undefined);
  }, [nfts, container, nftsReversed, account, pair]);

  useEffect(() => {
    simpleRpcProvider.getBlockNumber().then(setNow);
  }, []);

  // useEffect(() => {
  //   if (!pair?.nftAddress || !pair?.address) {
  //     return;
  //   }

  //   setFetching(true);
  //   fetchNfts(pair?.nftAddress, pair?.address)
  //     .then((items) => {
  //       setItems(items);
  //       localStorage.setItem(`${NFT_POOLS}-${pair?.address.toLowerCase()}`, JSON.stringify(items));
  //     })
  //     .finally(() => setFetching(false));
  // }, [pair]);

  // const results: NftInfoWithLock[] = useMemo(() => {
  //   return items
  //     .filter(({ id }) => locksInfo[id])
  //     .map((item): NftInfoWithLock => {
  //       const lockInfo = locksInfo[item.id];
  //       return {
  //         ...item,
  //         lastBlock: lockInfo.lastBlock,
  //         unlocker: lockInfo.unlocker,
  //         amount: lockInfo.amount,
  //       };
  //     });
  // }, [items, locksInfo]);

  // if (fetching) {
  //   return <PageLoader />;
  // }

  // return <PageLoader />;
  if (!nfts) {
    return <div>xxx</div>;
  }

  return (
    <div className={className}>
      {!nfts.length ? (
        <NoBalance />
      ) : (
        <>
          {/* <Flex alignItems="center" mb="30px">
            <Text color="#9DA6A6" fontSize="12px" mr="12px">
              sort:
            </Text>
            <Select
              style={{
                maxWidth: '300px',
                width: '100%',
              }}
              options={[
                {
                  label: t('xxxx'),
                  value: 'xxxx',
                },
                {
                  label: t('zzzz'),
                  value: 'zzzz',
                },
                {
                  label: t('yyyy'),
                  value: 'yyyy',
                },
              ]}
            />
          </Flex> */}
          <Grid gridGap="10px" className="pools" ref={container}>
            {nfts.map((item, index) => (
              <Nft nft={item} key={index} now={now} />
            ))}
          </Grid>
          {/* {fetchingMore.current && <PageLoader />} */}
        </>
      )}
    </div>
  );
};

export const GoodsInPool = styled(Pools_)`
  border-radius: 24px;
  z-index: 2;
  position: relative;
  padding-top: 30px;
  ${({ theme }) => theme.mediaQueries.md} {
    background: #122124;
    padding: 40px;
  }
  > .pools {
    grid-template-columns: 1fr 1fr;
    justify-items: center;

    @media screen and (min-width: 1040px) {
      grid-template-columns: 1fr 1fr 1fr;
    }

    @media screen and (min-width: 1263px) {
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }
  }
`;

async function fetchMore(nfts: NftLockInfo[], start: number, nftAddress: string, account: string) {
  const results = await Promise.all(
    nfts.slice(start, start + pageSize).map((nft) => fetchNftInfo(nftAddress, nft.id, account)),
  );

  return results
    .map((nft, index) => {
      if (!nft) {
        return undefined;
      }

      const n: NftInfoWithLock = { ...nft, ...nfts[start + index] };

      return n;
    })
    .filter(Boolean);
}
