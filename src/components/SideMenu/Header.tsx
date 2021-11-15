import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useWeb3React } from '@web3-react/core';
import ConnectWalletButton from '../ConnectWalletButton';
// import { LogoutIcon, useMatchBreakpoints, useModal } from '@kaco/uikit';
import { Text, Flex, LogoutIcon, useMatchBreakpoints, useTooltip, useModal } from '@kaco/uikit';
import UncollapsedSvg from './imgs/icon_sq.svg';
import BscSvg from './imgs/icon_bsc.svg';
import SdnSvg from './imgs/icon_sd.png';
import SelectedSvg from './imgs/icon_select.svg';
import SlSvg from './imgs/icon_sl.svg';
import useAuth from 'hooks/useAuth';
import { useTranslation } from 'contexts/Localization';
import ClaimModal from './Modals/ClaimModal';
import { useKarsierContract } from 'hooks/useContract';
import BigNumber from 'bignumber.js';
export enum ThemeChoice {
  Dark,
  White,
}

const Header: FC<{ className?: string; setCollapsed: (collapsed: boolean) => void; collapsed: boolean }> = ({
  className,
  setCollapsed,
  collapsed,
}) => {
  const { account } = useWeb3React();
  const { isXs, isSm } = useMatchBreakpoints();
  const { logout } = useAuth();
  const { t } = useTranslation();

  const karsierContract = useKarsierContract();
  // const [karsierNfts, setKarsierNfts] = useState([]);
  const [karsierNft, setKarsierNft] = useState('');

  console.log(karsierContract.walletOfOwner);
  useEffect(() => {
    (async () => {
      if (account && karsierContract.walletOfOwner) {
        const _arr = await karsierContract.walletOfOwner(account);
        if (_arr.length) {
          const _kArr = _arr.map((v: BigNumber) => v.toNumber());
          // setKarsierNfts(_kArr);
          const uri = await karsierContract.tokenURI(_kArr[0]);
          const res = await fetch(uri);
          const info = await res.json();

          setKarsierNft(info.image || '');
        }
      }
    })();
  }, [account, karsierContract]);
  const tooltipContent = (
    <div>
      <Text fontSize="16px" bold color="#1BD3D5">
        Select a Network
      </Text>
      <Text fontSize="12px" bold mb="25px" mt="15px">
        {t('You are currently browsing Kaco on BSC network')}
      </Text>
      <Flex
        style={{ cursor: 'pointer' }}
        mb="12px"
        py="14px"
        px="19px"
        alignItems="center"
        justifyContent="space-between"
        background="#272E32"
        borderRadius="16px"
        onClick={() => (window.location.href = 'https://www.kaco.finance/')}
      >
        <Flex alignItems="center">
          <img src={BscSvg} alt="" />
          <Text color="white" fontSize="16px" bold ml="21px">
            BSC
          </Text>
        </Flex>
        <img src={SelectedSvg} alt="" />
      </Flex>

      <Flex
        style={{ cursor: 'pointer' }}
        mb="12px"
        py="14px"
        px="19px"
        alignItems="center"
        justifyContent="space-between"
        background="#272E32"
        borderRadius="16px"
        onClick={() => (window.location.href = 'https://shiden.kaco.finance/')}
      >
        <Flex alignItems="center">
          <img src={SdnSvg} alt="" />
          <Text color="white" fontSize="16px" bold ml="21px">
            SDN
          </Text>
        </Flex>
      </Flex>
      <Flex></Flex>
    </div>
  );
  const { targetRef, tooltip, tooltipVisible } = useTooltip(tooltipContent, {
    trigger: 'click',
    tootipStyle: { background: '#1F252A' },
    placement: 'top-end',
    hideArrow: true,
    tooltipOffset: [20, 10],
  });
  // console.log('tooltipVisible', tooltipVisible);
  const [onPresentClaim] = useModal(<ClaimModal />);
  return (
    <div className={className}>
      {(isXs || isSm) && <img src={UncollapsedSvg} alt="" onClick={() => setCollapsed(!collapsed)} />}
      <div className="right">
        {account ? (
          <div className="claim_kac" onClick={onPresentClaim}>
            {isXs || isSm ? 'Claim' : '  Claim Kac  '}
          </div>
        ) : null}
        {/* <div className="icons">
          <a target="_blank" rel="noreferrer" href="https://twitter.com/KACOFinance">
            <TwitterIcon height="28px" />
          </a>
          <a target="_blank" rel="noreferrer" href="https://t.me/coinversationofficial">
            <TelegramIcon height="28px" />
          </a>
        </div> */}
        {tooltipVisible && tooltip}

        <Flex
          style={{ cursor: 'pointer' }}
          ref={targetRef}
          alignItems="center"
          borderRadius="12px"
          border="2px solid #1BD3D5"
          height="36px"
          width="100px"
          justifyContent="space-between"
          padding="0px 16px"
          mr="16px"
        >
          <Text color="#1BD3D5" fontSize="12px" bold>
            BSC
          </Text>
          <img
            style={{ width: '10px', height: '6px', transform: tooltipVisible ? '' : 'scaleY(-1)' }}
            src={SlSvg}
            alt=""
          />
        </Flex>
        {account ? (
          <div className="account">
            <span>{account}</span>
            {/* add kaco header img */}
            {karsierNft.length > 0 ? (
              <img className="head_icon" src={karsierNft} alt={karsierNft} onClick={logout} />
            ) : (
              <LogoutIcon onClick={logout} />
            )}
          </div>
        ) : (
          <ConnectWalletButton scale="sm" />
        )}
      </div>
    </div>
  );
};

export default styled(Header)`
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 72px;
  position: absolute;
  top: 0px;
  width: 100%;

  ${({ theme }) => theme.mediaQueries.sm} {
    justify-content: flex-end;
  }
  > img {
    width: 20px;
    height: 20px;
  }

  > .right {
    display: flex;
    align-items: center;
    > .icons {
      display: flex;
      align-items: center;
      > a {
        margin-right: 16px;
        display: block;
        width: 28px;
        height: 28px;
        border-radius: 14px;
        &:hover {
          svg {
            width: 24px;
            fill: #00dbde;
          }
        }
      }
    }

    > .theme-choice {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 16px;
      width: 36px;
      height: 36px;
      background: #1f252a;
      border-radius: 12px;
      > img {
        width: 20px;
        height: 20px;
      }
    }
    .claim_kac {
      padding: 0px 0.8rem;
      overflow: hidden;
      height: 36px;
      line-height: 36px;
      font-size: 14px;
      color: #fff;
      background: linear-gradient(90deg, #1bd3d5, #d755d9, #ec9b5a);
      border-radius: 12px;
      font-weight: bold;
      margin-right: 16px;
      cursor: pointer;
    }
    > .account {
      > svg {
        &:hover {
          cursor: pointer;
          fill: #1fc7d4;
        }
      }
      .head_icon {
        display: block;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        padding: 2px;
      }
      display: flex;
      align-items: center;
      font-size: 14px;
      font-weight: bold;
      color: #ffffff;
      height: 38px;
      background: #1f252a;
      border: 1px solid #2f363b;
      border-radius: 12px;
      padding: 2px 16px;
      max-width: 150px;
      > span {
        text-overflow: ellipsis;
        overflow: hidden;
      }
      > img {
        margin-left: 14px;
      }
    }
  }
`;
