import React, { FC, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Text, Flex, Button, Modal, InjectedModalProps, Grid as KacoGrid } from '@kaco/uikit';
import { useTranslation } from 'contexts/Localization';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { NftPair } from 'views/NftPools/hooks/useNftPools';
import { fetchNfts } from 'views/NftPool/util/fetchNft';
import { NFT } from 'views/NftPool/components/GoodsInPool';
import { useContract } from 'hooks/useContract';
import Nft100Abi from 'config/abi/NFT100Pair721.json';
// import Select from 'components/KacoSelect/KacoSelect';
import PageLoader from 'components/Loader/PageLoader';
import { LockInfo, useNftWithLocks } from 'views/NftPool/hooks/useNftWithLocks';
import LockTime from 'views/NftPool/components/LockTime';
import LockSvg from '../img/lock.svg';

interface Props extends InjectedModalProps {
  pair: NftPair | undefined;
  balance: number;
}
const Grid = styled(KacoGrid)`
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 381px;
  grid-template-columns: 1fr;
  justify-items: center;
  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

const Card_: FC<{
  className?: string;
  onBurn: (id: number) => void;
  nft: NFT;
  lockInfo: LockInfo | undefined;
  account: string | undefined;
}> = ({ className, onBurn, nft, lockInfo, account }) => {
  const { t } = useTranslation();

  console.log('lockInfo', lockInfo, account, nft.id);
  return (
    <div className={className}>
      <div className="show">
        <img src={nft.image} alt="" />
        {lockInfo && (
          <div className="locked">
            <img src={LockSvg} alt="" />
            <LockTime lockInfo={lockInfo} />
          </div>
        )}
      </div>
      <Text bold color="white" textAlign="center" mt="16px" mb="13px">
        {nft.name}#{nft.id}
      </Text>
      <Flex justifyContent="center">
        {lockInfo && account?.toLowerCase() !== lockInfo.unlocker.toLowerCase() ? (
          <Button height="32px" width="120px" variant="text">
            Locked
          </Button>
        ) : (
          <Button height="32px" variant="secondary" onClick={() => onBurn(nft.id)} width="136px">
            {t('Choose')}
          </Button>
        )}
      </Flex>
    </div>
  );
};

const Card = styled(Card_)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 196px;
  background: #1f252a;
  border: 2px solid #272e32;
  border-radius: 12px;
  padding: 10px;
  > .show {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 300px;
    ${({ theme }) => theme.mediaQueries.sm} {
      height: 200px;
    }
    width: 100%;
    background: #1b383e;
    /* background: radial-gradient(circle, #2a6c6e, #43238c); */
    border-radius: 8px;
    img {
      max-width: 100%;
      max-height: 100%;
    }

    > .locked {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: absolute;
      left: 0px;
      top: 0px;
      right: 0px;
      bottom: 0px;
      background: rgba(0, 0, 0, 0.8);

      > img {
        margin-bottom: 10px;
      }
      > div > div {
        background: none;
      }
    }
  }
`;

const BurnModal: React.FC<Props> = ({ onDismiss, pair }) => {
  const { account } = useActiveWeb3React();
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [fetching, setFetching] = useState(true);
  const contract = useContract(pair?.pairAddress, Nft100Abi);
  const locksInfo = useNftWithLocks(pair && { type: pair.type, address: pair.pairAddress });

  console.log('pair', pair);
  useEffect(() => {
    if (!pair) {
      return;
    }

    setFetching(true);
    fetchNfts(pair.nftAddress, pair.pairAddress)
      .then(setNfts, (e) => console.log('eee', e))
      .finally(() => setFetching(false));
  }, [pair]);

  const onBurn = useCallback(
    (id: number) => {
      if (!account || !contract) {
        return;
      }

      const burn = contract.withdraw([id], [1], account);

      burn.then(
        (s) => {
          alert('success');
          onDismiss();
        },
        (e) => console.log('e', e),
      );
    },
    [contract, account, onDismiss],
  );

  return (
    <Modal
      position="relative"
      bodyPadding="0px 30px 30px 30px"
      style={{
        maxWidth: '880px',
        width: '100%',
      }}
      title={null}
      onDismiss={onDismiss}
    >
      <Flex
        justifyContent="center"
        alignItems="center"
        style={{ position: 'absolute', top: '0px', left: '43px', right: '43px', height: '70px' }}
      >
        <Text fontSize="20px" bold style={{ position: 'relative', left: '-3px' }}>
          {pair?.name}
        </Text>
      </Flex>
      {fetching ? (
        <PageLoader />
      ) : (
        <>
          {/* <Flex justifyContent="center" mb="20px">
            <Select
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

          <Grid gridColumnGap={{ xs: '10px', md: '12px' }} gridRowGap={{ xs: '10px', md: '12px' }}>
            {nfts
              .filter((nft) => !locksInfo[nft.id] || locksInfo[nft.id].unlocker.toLowerCase() === account.toLowerCase())
              .map((nft) => (
                <Card key={nft.id} nft={nft} onBurn={onBurn} lockInfo={locksInfo[nft.id]} account={account} />
              ))}
          </Grid>
          <Text bold color="#F1842C" textAlign="center" mt="30px" mb="13px">
            Choose one NFT BURN {pair?.symbol}: 100
          </Text>
        </>
      )}
    </Modal>
  );
};

export default React.memo(BurnModal);
