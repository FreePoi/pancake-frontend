import React, { useState, useEffect, useCallback } from 'react';
import { Button, Flex, Text, IconButton, CloseIcon } from '@kaco/uikit';
import { useTranslation } from 'contexts/Localization';
import Modal from 'components/Modal/Modal';
import Claim_KAC_Token_PNG from './Claim_KAC_Token_PNG.png';
import Balance from 'components/Balance';
import styled from 'styled-components';
import { useMerkleDistributorContract } from 'hooks/useContract';
import useToast from 'hooks/useToast';
import { useWeb3React } from '@web3-react/core';
import merkle from 'config/constants/merkle.json';

import { getBalanceAmount } from 'utils/formatBalance';
const HeaderStyled = styled(Flex)`
  img {
    width: 60px;
    height: 60px;
    margin-right: 14px;
  }
`;
// const BorderDiv = styled.div`
//   padding: 15px 5%;
//   background: #12171a;
//   border: 1px solid #272e32;
//   border-radius: 12px;
//   margin-bottom: 30px;
// `;
// const BorderInput = styled(Input)`
//   background: #12171a;
//   border: none;
//   padding: 0;
//   font-size: 16px;
// `;
const BgButton = styled(Button)`
  background-color: #1bd3d5;
  border: none;
  padding: 0;
  margin: 0;
  font-size: 16px;
  font-weight: bold;
  font-size: 14px;
  color: #fff;
  height: 48px;
  margin-bottom: 20px;
  &:disabled {
    background-color: #272e32;
  }
`;
interface CollectModalProps {
  onDismiss?: () => void;
}

const getClaimObjectFromAddress = (address: string) => {
  const keys = Object.keys(merkle.claims);
  return merkle.claims[keys.find((key) => key.toLowerCase() === address.toLowerCase())];
};
const CollectModal: React.FC<CollectModalProps> = ({ onDismiss }) => {
  const { t } = useTranslation();
  const { account } = useWeb3React();
  const airdropContract = useMerkleDistributorContract();

  const [recipientAddress, setRecipientAddress] = useState('0xFB83a67784F110dC658B19515308A7a95c2bA33A');
  const [isEligible, setIsEligible] = useState(false);
  const [isAirdropClaimed, setIsAirdropClaimed] = useState(false);
  const [claimable, setClaimable] = useState('0');
  const { toastError, toastSuccess } = useToast();
  // const [error, setError] = useState('');
  // const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // const getEligibility = useCallback(
  //   (event: React.ChangeEvent<HTMLInputElement>) => {
  //     // const address = event.target.value;
  //     const address = '0xFB83a67784F110dC658B19515308A7a95c2bA33A';
  //     setRecipientAddress(address);
  //     const eligibility = !!getClaimObjectFromAddress(address);
  //     setIsEligible(eligibility);
  //     if (eligibility) {
  //     } else {
  //       toastError('Error', 'Address has no available claim');
  //     }
  //   },
  //   [setIsEligible, toastError],
  // );
  const getAirdropStats = useCallback(async () => {
    const claimObject: any = getClaimObjectFromAddress(recipientAddress);
    setClaimable(getBalanceAmount(claimObject.amount, 18).toString());
    const isClaimed = await airdropContract.isClaimed(claimObject.index);
    console.log(isClaimed);
    setIsAirdropClaimed(!!isClaimed);
    if (isClaimed) {
      toastError('Claimed Error', 'you have already claimed your airdrop');
    } else {
    }
  }, [recipientAddress, setIsAirdropClaimed, toastError, airdropContract]);
  const claimAirdrop = useCallback(async () => {
    console.log(isAirdropClaimed);
    if (isAirdropClaimed) {
      return;
    }
    const claimObject = getClaimObjectFromAddress(recipientAddress);
    setIsLoading(true);
    console.log(3333);
    const tx = await airdropContract.claim(claimObject.index, recipientAddress, claimObject.amount, claimObject.proof, {
      from: account,
    });
    console.log(1111);
    toastSuccess('Recoreded', 'Your transaction has been recoreded');
    const receipt = await tx.wait();
    if (receipt.status) {
      toastSuccess('successfully claimed', 'You have successfully claimed your airdrop');
    } else {
      toastError('Transation was not Successful');
    }
    setIsLoading(false);
  }, [account, recipientAddress, airdropContract, toastError, toastSuccess, isAirdropClaimed]);
  useEffect(() => {
    const setUp = async () => {
      if (!airdropContract) {
        toastError('Error', 'airdrop not available');
      }
      const address = '0xFB83a67784F110dC658B19515308A7a95c2bA33A';
      setRecipientAddress(address);
      const eligibility = !!getClaimObjectFromAddress(address);
      setIsEligible(eligibility);
      if (eligibility) {
        await getAirdropStats();
      } else {
        toastError('Error', 'Address has no available claim');
      }
      // if (isEligible) {
      //   await getAirdropStats();
      // }
    };
    setUp();
  }, [isEligible, getAirdropStats, toastError, airdropContract]);
  return (
    <Modal>
      <Flex justifyContent="space-between" mb="10px">
        <HeaderStyled>
          <img src={Claim_KAC_Token_PNG} alt="Claim_KAC_Token_PNG" />
          <div>
            <Balance fontSize="28px" bold value={+claimable} decimals={8} unit="KAC" />
            <Text bold fontSize="14px">
              Claim KAC Token
            </Text>
          </div>
        </HeaderStyled>

        <IconButton variant="text" onClick={onDismiss} aria-label="Close the dialog">
          <CloseIcon color="#484E4E" width="24" />
        </IconButton>
      </Flex>

      <Text padding="0 4%" mt="20px" mb="30px" bold fontSize="14px" lineHeight="24px" color="#9DA6A6">
        Enter an address to trigger a KAC claim. If the address has any claimable KAC it will be sent to them on
        submission.
      </Text>
      {/* <BorderDiv>
        {error && (
          <Text color="failure" mb="8px">
            {error}
          </Text>
        )}
        <Text color="#9DA6A6;" fontSize="12px" mb="4px">
          Recipient
        </Text>

        <BorderInput
          id="claimAddress"
          name="address"
          type="text"
          placeholder={t('Wallet Address or ENS name')}
          value={value}
          onChange={handleChange}
          isWarning={error}
          disabled={isLoading}
        />
      </BorderDiv> */}
      <BgButton
        minWidth="150px"
        variant="secondary"
        onClick={claimAirdrop}
        disabled={!account || isLoading}
        ml="8px"
        mr="8px"
      >
        {isAirdropClaimed ? 'Claimed' : t('Claim KAC')}
      </BgButton>
    </Modal>
  );
};

export default CollectModal;
