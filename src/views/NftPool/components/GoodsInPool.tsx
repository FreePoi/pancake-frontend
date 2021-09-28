import React, { FC, useEffect, useState } from 'react';
import { Grid } from '@kaco/uikit';
import styled from 'styled-components';
import Nft from './Nft';
import { NftPairConfig } from 'config/constants/nft';
// import { fetchNfts } from '../util/fetchNft';
import PageLoader from 'components/Loader/PageLoader';
// import { useTranslation } from 'contexts/Localization';
// import Select from 'components/KacoSelect/KacoSelect';
import { useNftWithLocks } from '../hooks/useNftWithLocks';
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

const Pools_: FC<{
  className?: string;
  pair: NftPairConfig | undefined;
}> = ({ className, pair }) => {
  // const [items, setItems] = useState<NFT[]>([]);
  // const [fetching, setFetching] = useState(false);
  // const { t } = useTranslation();
  const locksInfo = useNftWithLocks(pair);
  const [now, setNow] = useState(0);

  useEffect(() => {
    simpleRpcProvider.getBlockNumber().then(setNow);
  }, []);

  // useEffect(() => {
  //   if (!pair?.nftAddress || !pair?.address) {
  //     return;
  //   }

  //   setFetching(true);
  //   fetchNfts(pair?.nftAddress, pair?.address)
  //     .then(setItems)
  //     .finally(() => setFetching(false));
  // }, [pair]);

  if (!locksInfo) {
    return <PageLoader />;
  }

  return (
    <div className={className}>
      {!locksInfo.length ? (
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
            {locksInfo.map((item, index) => (
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
