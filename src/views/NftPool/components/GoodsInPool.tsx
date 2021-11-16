import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import { Grid } from '@kaco/uikit';
import styled from 'styled-components';
import NftItem from './Nft';
import { NftPairConfig, NftItemConfig } from 'config/constants/nft';
// import { fetchNfts } from '../util/fetchNft';
import PageLoader from 'components/Loader/PageLoader';
// import { useTranslation } from 'contexts/Localization';
// NftInfoWithLock, useNftWithLockInfo,
import Search from 'components/Search';
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
  attributes: any[];
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
  const NftData = [...new Set(pair.data.map((v: any) => v.name))];
  const { account: _account } = useWeb3React();
  const [nfts, setNfts] = useState<NftInfoWithLock[]>();
  const nfts_ = useNfts(pair);
  const nftsReversed = useMemo(() => [...nfts_].reverse(), [nfts_]);
  const count = useRef(0);

  const account = useMemo(() => _account || defaultAddress, [_account]);
  const container = useRef<HTMLDivElement>(null);
  const [now, setNow] = useState(0);
  const fetchingMore = useRef(false);
  const [showName, setShowName] = useState(false);
  const [searchNameValue, setSearchNameValue] = useState('');
  const [searchIdValue, setSearchIdValue] = useState('');
  // console.log(pair, nfts ? [...new Set(nfts.map((v) => v.name))] : '');
  useEffect(() => {
    if (!pair || !nftsReversed.length || !account) {
      return;
    }
    fetchMore(nftsReversed, pair.data, 0, pair.nftAddress, account, searchIdValue, searchNameValue).then(setNfts);
  }, [pair, nftsReversed, account, searchIdValue, searchNameValue]);

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
        fetchMore(nftsReversed, pair.data, count.current, pair.nftAddress, account, searchIdValue, searchNameValue)
          .then((nfts) => {
            setNfts((old) => [...old, ...nfts]);
          })
          .finally(() => (fetchingMore.current = false));
      }
    };

    return () => (document.body.onscroll = undefined);
  }, [nfts, container, nftsReversed, account, pair, searchIdValue, searchNameValue]);

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

  if (!nfts) {
    return <PageLoader />;
  }

  return (
    <div className={className}>
      <div className="searchWrap">
        <Search
          placeholder="Search NFT"
          value={searchIdValue || searchNameValue}
          onChange={(v) => {
            setSearchIdValue(v);
            setSearchNameValue('');
          }}
          onFocus={setShowName}
          onBlur={(v) => {
            setTimeout(() => {
              setShowName(v);
            }, 500);
          }}
        />

        {showName ? (
          <ul className="nameList">
            {NftData.map((v, index: number) => (
              <li
                key={index}
                onClick={() => {
                  setSearchIdValue('');
                  setSearchNameValue(`${v}`);
                }}
                className={searchNameValue === v ? 'on' : ''}
              >
                {v}
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      {!nfts.length ? (
        <NoBalance />
      ) : (
        <>
          <Grid gridGap="10px" className="pools" ref={container}>
            {nfts.map((item, index) => (
              <NftItem nft={item} key={index} now={now} />
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
  .searchWrap {
    margin-bottom: 22px;
    width: 100%;
    position: relative;
    ${({ theme }) => theme.mediaQueries.md} {
      width: 42%;
    }
    .nameList {
      position: absolute;
      z-index: 19;
      background-color: rgba(18, 33, 36, 0.9);
      width: 100%;
      list-style: none;
      color: #9da6a6;
      border: 2px solid #1bd3d5;
      border-radius: 16px;
      line-height: 32px;
      font-size: 14px;
      padding: 10px 18px;
      margin-top: 12px;
      max-height: 380px;
      overflow-y: scroll;
      font-weight: 600;
      &::-webkit-scrollbar {
        display: none;
      }
      li {
        transition: all 0.3s ease;
        cursor: pointer;
        &:hover,
        &.on {
          color: #1bd3d5;
        }
      }
    }
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

async function fetchMore(
  nfts: NftLockInfo[],
  nftData: NftItemConfig[],
  start: number,
  nftAddress: string,
  account: string,
  searchId: string,
  searchName: string,
) {
  let ids = nftData;
  if (searchId) {
    ids = nftData.filter((v) => `${v.name}${v.id}`.indexOf(searchId) > -1);
  } else if (searchName) {
    ids = nftData.filter((v) => `${v.name}`.indexOf(searchName) > -1);
  }
  let _nfts: NftLockInfo[] = [];
  nfts.map((vv) => {
    const _nftsd = ids.filter((v) => vv.id === v.id);
    if (_nftsd && _nftsd.length > 0) {
      _nfts.push(vv);
    }
    return vv;
  });
  if (_nfts.length === 0) {
    _nfts = nfts;
  }
  const results = await Promise.all(
    _nfts.slice(start, start + pageSize).map((nft) => fetchNftInfo(nftAddress, nft.id, account)),
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
