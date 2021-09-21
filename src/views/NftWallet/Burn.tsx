import Page from './Page';
import { FC, useEffect, useState } from 'react';
import { Button, Grid, Text, Flex, useModal } from '@kaco/uikit';
import styled from 'styled-components';
import BurnModal from './components/BurnModal';
import { NftPair, useNftPairs } from 'views/NftPools/hooks/useNftPools';
import { useWeb3React } from '@web3-react/core';
import multicall from 'utils/multicall';
import Erc20 from 'config/abi/erc20.json';
import { BigNumber } from '@ethersproject/bignumber';

const Burn: FC<{ className?: string }> = ({ className }) => {
  const pairs = useNftPairs();
  const { account } = useWeb3React();
  const [balancesOfNft100, setBalancesOfNft100] = useState<(NftPair & { balance: number })[]>([]);
  const [nft100Index, setNft100Index] = useState(-1);
  const [onMint] = useModal(
    <BurnModal pair={balancesOfNft100[nft100Index]} balance={balancesOfNft100[nft100Index]?.balance} />,
  );

  useEffect(() => {
    if (!account) {
      return;
    }

    const calls = pairs
      .map((pair) => [
        {
          address: pair.pairAddres,
          name: 'balanceOf',
          params: [account],
        },
        {
          address: pair.pairAddres,
          name: 'decimals',
        },
      ])
      .reduce((calls, curr) => calls.concat(curr), []);

    multicall(Erc20, calls).then((results: any[]) => {
      const balancesOfNft100 = [];

      for (let i = 0; i < results.length - 1; i += 2) {
        const balance: BigNumber = results[i][0];
        const decimals = results[i + 1][0];
        const balanceNumber = balance.div(BigNumber.from(10).pow(BigNumber.from(decimals))).toNumber();

        console.log('balance', balanceNumber);

        balancesOfNft100.push({ ...pairs[i], balance: balanceNumber });
      }

      console.log('balancesOfNft100', balancesOfNft100);

      setBalancesOfNft100(balancesOfNft100);
    });
  }, [account, pairs]);

  return (
    <Page>
      <div className={className}>
        <Text bold color="white" mb="20px" fontSize="20px">
          NFT100
        </Text>
        <Grid gridGap={{ xs: '4px', md: '16px' }} className="nfts">
          {balancesOfNft100.map((balance, index) => (
            <Flex
              className="fragment"
              onClick={() => {
                setNft100Index(index);
                onMint();
              }}
              key={balance.pairAddres}
            >
              <div className="logo"></div>
              <Flex flex="1" justifyContent="space-between" alignItems="center">
                <div className="">
                  <Text color="#1BD3D5" bold fontSize="20px">
                    {balance.balance}
                  </Text>
                  <Text color="white" bold>
                    {balance.symbol}
                  </Text>
                </div>
                <Button variant="secondary">Burn</Button>
              </Flex>
            </Flex>
          ))}
        </Grid>
      </div>
    </Page>
  );
};

export default styled(Burn)`
  width: 100%;
  background: #122124;
  border-radius: 24px;
  padding: 30px 40px;

  > .nfts {
    grid-template-columns: 1fr;
    justify-items: center;

    ${({ theme }) => theme.mediaQueries.md} {
      grid-template-columns: 1fr 1fr;
    }
    @media screen and (min-width: 1165px) {
      grid-template-columns: 1fr 1fr;
    }

    > .fragment {
      width: 450px;
      height: 88px;
      background: #1f373b;
      border-radius: 16px;
      padding: 18px 30px;
      align-items: center;

      > .logo {
        width: 52px;
        height: 52px;
        border-radius: 50%;
        background-color: #f1842c;
        margin-right: 20px;
      }
    }
  }
`;
