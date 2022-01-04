import React, { useMemo } from 'react';
import styled from 'styled-components';
import { Pair } from '@kaco/sdk';
import { Text, Flex, CardBody, CardFooter, Button, AddIcon } from '@kaco/uikit';
import { Link } from 'react-router-dom';
import { useTranslation } from 'contexts/Localization';
import { useFarms, usePollFarmsData } from 'state/farms/hooks';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import FullPositionCard from '../../components/PositionCard';
import { useTokenBalancesWithLoadingIndicator } from '../../state/wallet/hooks';
import { usePairs } from '../../hooks/usePairs';
import { toV2LiquidityToken, useTrackedTokenPairs } from '../../state/user/hooks';
import Dots from '../../components/Loader/Dots';
import { AppHeader, AppBody } from '../../components/App';
import Page from '../Page';
import Status from './Status';

const Body = styled(CardBody)``;
const FullPositionCardWrap = styled.div`
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: 20px;
`;
export default function Pool() {
  const { account } = useActiveWeb3React();
  const { t } = useTranslation();

  // fetch the user's balances of all tracked V2 LP tokens
  const trackedTokenPairs = useTrackedTokenPairs();
  const tokenPairsWithLiquidityTokens = useMemo(
    () =>
      trackedTokenPairs.map((tokens) => {
        return { liquidityToken: toV2LiquidityToken(tokens), tokens };
      }),
    [trackedTokenPairs],
  );
  const liquidityTokens = useMemo(
    () => tokenPairsWithLiquidityTokens.map((tpwlt) => tpwlt.liquidityToken),
    [tokenPairsWithLiquidityTokens],
  );
  const [, fetchingV2PairBalances] = useTokenBalancesWithLoadingIndicator(account ?? undefined, liquidityTokens);
  // console.log({ tokenPairsWithLiquidityTokens });

  // add farmLP filter

  // fetch the reserves for all V2 pools in which the user has a balance
  // const liquidityTokensWithBalances = tokenPairsWithLiquidityTokens;
  const { data: farmsLP } = useFarms();
  usePollFarmsData();
  // multiplier  .match(/\d+/g)
  const farmsLPPlus = useMemo(
    () =>
      farmsLP.filter((v) => {
        if (Number((v?.multiplier ?? '0').match(/\d+/g).join('')) > 0) {
          return true;
        } else {
          return false;
        }
      }),
    [farmsLP],
  );
  // console.log({ farmsLPPlus, tokenPairsWithLiquidityTokens, trackedTokenPairs });
  const liquidityTokensWithBalances = tokenPairsWithLiquidityTokens;
  //   useMemo(
  //   () =>
  //     tokenPairsWithLiquidityTokens.filter((v) => {
  //       // [base, token]
  //       const _base = v.tokens0.symbol;
  //       const _token = v.tokens[1].symbol;
  //       if (_base === 'CAKE') {
  //         console.log(`${_token}-${_base}`);
  //       }
  //       if (
  //         farmsLPPlus.filter((item) => {
  //           if (item.lpSymbol.indexOf(`${_token}-${_base}`) > -1) {
  //             console.log(item.lpSymbol, `${_token}-${_base}`);
  //           }
  //           return item.lpSymbol.indexOf(`${_token}-${_base}`) > -1;
  //         }).length
  //       ) {
  //         return true;
  //       } else {
  //         return false;
  //       }
  //     }),
  //   [farmsLPPlus, tokenPairsWithLiquidityTokens],
  // );

  const v2Pairs = usePairs(liquidityTokensWithBalances.map(({ tokens }) => tokens));
  const v2IsLoading =
    fetchingV2PairBalances ||
    v2Pairs?.length < liquidityTokensWithBalances.length ||
    v2Pairs?.some((V2Pair) => !V2Pair);

  const _allV2PairsWithLiquidity = useMemo(
    () => v2Pairs.map(([, pair]) => pair).filter((v2Pair): v2Pair is Pair => Boolean(v2Pair)),
    [v2Pairs],
  );
  const allV2PairsWithLiquidity = useMemo(() => {
    return _allV2PairsWithLiquidity.filter((v: Pair) => {
      return farmsLPPlus.filter(
        (item) =>
          item.lpSymbol.indexOf(`${v.token0.symbol}-${v.token1.symbol}`) > -1 ||
          item.lpSymbol.indexOf(`${v.token1.symbol}-${v.token0.symbol}`) > -1,
      ).length;
    });
  }, [farmsLPPlus, _allV2PairsWithLiquidity]);
  // console.log({ farmsLPPlus, _allV2PairsWithLiquidity, tokenPairsWithLiquidityTokens });
  const renderBody = () => {
    if (!account) {
      return <Status span={t('Connect to a wallet to view your liquidity.')} status="not-connected" />;
    }
    if (v2IsLoading) {
      return (
        <Text color="textSubtle" textAlign="center">
          <Dots>{t('Loading')}</Dots>
        </Text>
      );
    }
    if (allV2PairsWithLiquidity?.length > 0) {
      return (
        <FullPositionCardWrap>
          {allV2PairsWithLiquidity.map((v2Pair, index) => (
            <FullPositionCard
              key={v2Pair.liquidityToken.address}
              pair={v2Pair}
              mb={index < allV2PairsWithLiquidity.length - 1 ? '16px' : 0}
            />
          ))}
        </FullPositionCardWrap>
      );
    }

    return <Status span={t('No liquidity found.')} status="no-liquidity" />;
  };

  return (
    <Page>
      <AppBody>
        <AppHeader
          style={{ paddingBottom: '10px' }}
          title={t('Your Liquidity')}
          subtitle={t('Remove liquidity to receive tokens back')}
        />
        <Body>
          {renderBody()}
          {account && !v2IsLoading && (
            <Flex flexDirection="column" alignItems="center" mt="24px">
              <Text color="secondary" mb="8px">
                {t("Don't see a pool you joined?")}
              </Text>
              <Button id="import-pool-link" variant="secondary" scale="sm" as={Link} to="/find">
                {t('Find other LP tokens')}
              </Button>
            </Flex>
          )}
        </Body>
        <CardFooter style={{ textAlign: 'center', borderTop: '0', paddingTop: '8px' }}>
          <Button id="join-pool-button" as={Link} to="/add" width="100%" startIcon={<AddIcon color="white" />}>
            {t('Add Liquidity')}
          </Button>
        </CardFooter>
      </AppBody>
    </Page>
  );
}
