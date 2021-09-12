import BigNumber from 'bignumber.js';
import React, { useCallback, useMemo, useState } from 'react';
import { Text, Flex, Button, Modal, InjectedModalProps } from '@kaco/uikit';
import { ModalActions, ModalInput } from 'components/Modal';
import { useTranslation } from 'contexts/Localization';
import MintSvg from '../img/mint.svg';
import NFTSVG from '../../NftPool/img/nft.png';
import styled from 'styled-components';

interface Props extends InjectedModalProps {}

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

const BurnModal: React.FC<Props> = ({ onDismiss }) => {
  const { t } = useTranslation();

  return (
    <Modal maxWidth="400px" width="100%" title={t('KAlpaca Pool')} onDismiss={onDismiss}>
      <Flex justifyContent="space-between">
        <Card>
          <img src={NFTSVG} alt="" style={{ width: '200px', height: '200px' }} />
          <Text bold color="white" textAlign="center" mt="16px" mb="13px">
            Alpaca#82912
          </Text>
          <Flex justifyContent="center">
            <Button variant="secondary" onClick={onDismiss} width="136px">
              {t('Choose')}
            </Button>
          </Flex>
        </Card>
        <Card>
          <img src={NFTSVG} alt="" style={{ width: '200px', height: '200px' }} />
          <Text bold color="white" textAlign="center" mt="16px" mb="13px">
            Alpaca#82912
          </Text>
          <Flex justifyContent="center">
            <Button variant="secondary" onClick={onDismiss} width="136px">
              {t('Choose')}
            </Button>
          </Flex>
        </Card>
        <Card>
          <img src={NFTSVG} alt="" style={{ width: '200px', height: '200px' }} />
          <Text bold color="white" textAlign="center" mt="16px" mb="13px">
            Alpaca#82912
          </Text>
          <Flex justifyContent="center">
            <Button variant="secondary" onClick={onDismiss} width="136px">
              {t('Choose')}
            </Button>
          </Flex>
        </Card>
      </Flex>
      <Text bold color="#F1842C" textAlign="center" mt="30px" mb="13px">
        Choose one NFT BURN KAlpaca：100
      </Text>
    </Modal>
  );
};

export default BurnModal;
