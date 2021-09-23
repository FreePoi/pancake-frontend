import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Text, Flex, Button, Modal, InjectedModalProps } from '@kaco/uikit';
import { useTranslation } from 'contexts/Localization';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { NftPair } from 'views/NftPools/hooks/useNftPools';
import { fetchNfts } from 'views/NftPool/util/fetchNft';
import { NFT } from 'views/NftPool';
import { useContract } from 'hooks/useContract';
import Nft100Abi from 'config/abi/NFT100Pair721.json';

interface Props extends InjectedModalProps {
  pair: NftPair | undefined;
  balance: number;
}

const Card = styled.div`
  width: 220px;
  background: #1f252a;
  border: 2px solid #272e32;
  border-radius: 12px;
  margin-right: 16px;
  padding: 10px;
  &:last-child {
    margin-right: 0px;
  }
`;

const BurnModal: React.FC<Props> = ({ onDismiss, pair }) => {
  const { t } = useTranslation();
  const { account } = useActiveWeb3React();
  const [nfts, setNfts] = useState<NFT[]>([]);
  const contract = useContract(pair?.pairAddress, Nft100Abi);

  console.log('pair', pair);
  useEffect(() => {
    if (!pair) {
      return;
    }

    fetchNfts(pair.nftAddress, pair.pairAddress).then(setNfts, () => {});
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

  console.log('nfts', nfts, pair);

  return (
    <Modal maxWidth="400px" width="100%" title={t('KAlpaca Pool')} onDismiss={onDismiss}>
      <Flex justifyContent="space-between">
        {nfts.map((nft) => (
          <Card key={nft.id}>
            <img src={nft.image} alt="" style={{ width: '200px', height: '200px' }} />
            <Text bold color="white" textAlign="center" mt="16px" mb="13px">
              {nft.name}#{nft.id}
            </Text>
            <Flex justifyContent="center">
              <Button variant="secondary" onClick={() => onBurn(nft.id)} width="136px">
                {t('Choose')}
              </Button>
            </Flex>
          </Card>
        ))}
      </Flex>
      <Text bold color="#F1842C" textAlign="center" mt="30px" mb="13px">
        Choose one NFT BURN {pair?.symbol}: 100
      </Text>
    </Modal>
  );
};

export default BurnModal;
