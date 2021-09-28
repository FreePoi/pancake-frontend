import React, { FC, useEffect, useMemo, useState } from 'react';
import { Grid } from '@kaco/uikit';
import styled from 'styled-components';
import Nft from './Nft';
import { NftPairConfig } from 'config/constants/nft';
import { fetchNfts } from '../util/fetchNft';
import PageLoader from 'components/Loader/PageLoader';
// import { useTranslation } from 'contexts/Localization';
// import Select from 'components/KacoSelect/KacoSelect';
import { NftInfoWithLock, useNftWithLockInfo } from '../hooks/useNftWithLocks';
import NoBalance from './NoBalance';
import { simpleRpcProvider } from 'utils/providers';

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
const NFT_POOLS = 'NFT_POOLS';

const Pools_: FC<{
  className?: string;
  pair: NftPairConfig | undefined;
}> = ({ className, pair }) => {
  let _pairs: NFT[] = [];

  try {
    _pairs = JSON.parse(localStorage.getItem(NFT_POOLS)) || [];
  } catch {
    localStorage.removeItem(NFT_POOLS);
  }
  const [items, setItems] = useState<NFT[]>(_pairs);
  const [fetching, setFetching] = useState(false);
  // const { t } = useTranslation();
  const locksInfo = useNftWithLockInfo(pair);
  const [now, setNow] = useState(0);

  useEffect(() => {
    simpleRpcProvider.getBlockNumber().then(setNow);
  }, []);

  useEffect(() => {
    console.log('pair', pair);
    if (!pair?.nftAddress || !pair?.address) {
      return;
    }

    setFetching(true);
    fetchNfts(pair?.nftAddress, pair?.address)
      .then((items) => {
        console.log(items, 'items');

        setItems(items);
        localStorage.setItem(NFT_POOLS, JSON.stringify(items));
      })
      .finally(() => setFetching(false));
  }, [pair]);

  const results: NftInfoWithLock[] = useMemo(() => {
    return items
      .filter(({ id }) => locksInfo[id])
      .map((item): NftInfoWithLock => {
        const lockInfo = locksInfo[item.id];
        return {
          ...item,
          lastBlock: lockInfo.lastBlock,
          unlocker: lockInfo.unlocker,
          amount: lockInfo.amount,
        };
      });
  }, [items, locksInfo]);

  console.log('results', results);

  if (fetching) {
    return <PageLoader />;
  }

  return (
    <div className={className}>
      {!items.length ? (
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
          <Grid gridGap="10px" className="pools">
            {results.map((item, index) => (
              <Nft nft={item} key={index} now={now} />
            ))}
          </Grid>
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

    ${({ theme }) => theme.mediaQueries.md} {
      grid-template-columns: 1fr 1fr 1fr;
    }

    @media screen and (min-width: 1165px) {
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }
  }
`;
