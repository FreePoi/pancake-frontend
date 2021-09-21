import React, { useCallback } from 'react';
import { Text, Flex, Button, Modal, InjectedModalProps } from '@kaco/uikit';
import { ModalActions } from 'components/Modal';
import { useTranslation } from 'contexts/Localization';
import MintSvg from '../img/mint.svg';
import { NFT } from 'views/NftPool';
import { NftPair } from 'views/NftPools/hooks/useNftPools';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { NFT_TYPE } from 'config/constants/nft';
import { useNft100Contract } from '../hooks/useNft100Contract';

interface Props extends InjectedModalProps {
  nft: NFT;
  pair: NftPair;
}

const MintModal: React.FC<Props> = ({ onDismiss, nft, pair }) => {
  const { t } = useTranslation();
  const { account } = useActiveWeb3React();
  const contract = useNft100Contract(pair);

  const onMint = useCallback(() => {
    console.log('contract', Object.keys(contract), contract);
    console.log('pair', pair, 'nft', nft);
    if (!account) {
      return;
    }

    let mint: Promise<any>;
    if (pair.type === NFT_TYPE.NFT721) {
      mint = contract.safeTransferFrom(account, pair.pairAddres, nft.id);
    } else {
      mint = contract.safeTransferFrom(account, pair.pairAddres, nft.id, 1);
    }

    mint.then(
      (s) => {
        alert('success');
        onDismiss();
      },
      (e) => console.log('e', e),
    );
  }, [contract, pair, account, nft, onDismiss]);

  return (
    <Modal maxWidth="400px" width="100%" title={t('Mint')} onDismiss={onDismiss}>
      <div>
        <Flex
          style={{
            padding: '13px 14px',
            background: '#272E32',
            borderRadius: '20px',
            alignItems: 'center',
          }}
        >
          <img src={nft.image} alt="" style={{ width: '69px', height: '69px' }} />
          <Text bold fontSize="20px" color="white" ml="30px">
            {nft.name}#{nft.id}
          </Text>
        </Flex>
        <Flex justifyContent="center">
          <img src={MintSvg} alt="" style={{ position: 'relative', top: '-10px', zIndex: 2 }} />
        </Flex>
        <Flex
          style={{
            padding: '13px 14px',
            background: '#272E32',
            borderRadius: '20px',
            position: 'relative',
            top: '-20px',
            zIndex: 1,
          }}
        >
          <div
            style={{
              width: '68px',
              height: '68px',
              background: '#6EB395',
              borderRadius: '34px',
            }}
          />
          <Flex ml="30px" flexDirection="column" justifyContent="center">
            <Text bold fontSize="20px" color="white">
              {pair.symbol}
            </Text>
            <Text fontSize="12px" color="#1BD3D5">
              Quantity 100
            </Text>
          </Flex>
        </Flex>
      </div>
      <ModalActions>
        <Button onClick={onMint} width="100%">
          {t('Confirm')}
        </Button>
      </ModalActions>
    </Modal>
  );
};

export default MintModal;
