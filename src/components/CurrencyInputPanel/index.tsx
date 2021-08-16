import React from 'react';
import { Currency, Pair } from '@kaco/sdk';
import { Button, useModal, Flex } from '@kaco/uikit';
import styled from 'styled-components';
import { useTranslation } from 'contexts/Localization';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { useCurrencyBalance } from '../../state/wallet/hooks';
import CurrencySearchModal from '../SearchModal/CurrencySearchModal';
import { CurrencyLogo, DoubleCurrencyLogo } from '../Logo';
import DropdownSvg from './dropdown.svg';
import { Input as NumericalInput } from './NumericalInput';

const InputRow = styled.div<{ selected: boolean }>`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  padding: ${({ selected }) => (selected ? '0.75rem 0.5rem 0.75rem 1rem' : '0.75rem 0.75rem 0.75rem 1rem')};
`;
const CurrencySelectButton = styled(Button).attrs({ variant: 'text', scale: 'sm' })`
  padding: 0 0.5rem;
`;
// const LabelRow = styled.div`
//   display: flex;
//   flex-flow: row nowrap;
//   align-items: center;
//   color: ${({ theme }) => theme.colors.text};
//   font-size: 0.75rem;
//   line-height: 1rem;
//   padding: 0.75rem 1rem 0 1rem;
// `;
const InputPanel = styled.div<{ hideInput?: boolean }>`
  display: flex;
  justify-content: space-between;
  position: relative;
  /* border-radius: ${({ hideInput }) => (hideInput ? '8px' : '20px')}; */
  /* background-color: ${({ theme }) => theme.colors.background}; */
  z-index: 1;
  background: #272e32;
  box-shadow: 0px 5px 13px 2px rgba(9, 2, 18, 0.3);
  border-radius: 16px;
  padding: 10px 16px;
  color: white;
  > .currency {
    height: 72px;
    padding: 10px 16px;
    width: 136px;
    background: #1f252a;
    border: 2px solid #1bd3d5;
    border-radius: 16px;
    > .label {
      font-size: 12px;
      margin-bottom: 8px;
      color: #9da6a6;
    }
    > .open-currency-select-button {
      padding: 0px;
      height: 24px;
      width: 100%;

      .currency-name {
        font-size: 16px;
        font-weight: bold;
        color: #ffffff;
      }
    }
  }

  > .number {
    flex: 1;
    > .label {
      line-height: 32px;
      height: 32px;
      text-align: right;
      font-size: 12px;
      color: #9da6a6;
      margin-bottom: 4px;

      > button {
        font-size: 12px;
        color: #00dbde;
      }
    }
    .token-amount-input {
      text-align: right;
      font-size: 20px;
      font-weight: bold;
      color: #ffffff;
    }
  }
`;
interface CurrencyInputPanelProps {
  value: string;
  onUserInput: (value: string) => void;
  onMax?: () => void;
  showMaxButton: boolean;
  label?: string;
  onCurrencySelect: (currency: Currency) => void;
  currency?: Currency | null;
  disableCurrencySelect?: boolean;
  hideBalance?: boolean;
  pair?: Pair | null;
  hideInput?: boolean;
  otherCurrency?: Currency | null;
  id: string;
  showCommonBases?: boolean;
}
export default function CurrencyInputPanel({
  value,
  onUserInput,
  onMax,
  showMaxButton,
  label,
  onCurrencySelect,
  currency,
  disableCurrencySelect = false,
  hideBalance = false,
  pair = null, // used for double token logo
  hideInput = false,
  otherCurrency,
  id,
  showCommonBases,
}: CurrencyInputPanelProps) {
  const { account } = useActiveWeb3React();
  const selectedCurrencyBalance = useCurrencyBalance(account ?? undefined, currency ?? undefined);
  const { t } = useTranslation();
  const translatedLabel = label || t('Input');

  const [onPresentCurrencyModal] = useModal(
    <CurrencySearchModal
      onCurrencySelect={onCurrencySelect}
      selectedCurrency={currency}
      otherSelectedCurrency={otherCurrency}
      showCommonBases={showCommonBases}
    />,
  );
  return (
    <InputPanel id={id}>
      <div className="currency">
        <div className="label">{translatedLabel}</div>
        <CurrencySelectButton
          selected={!!currency}
          className="open-currency-select-button"
          onClick={() => {
            if (!disableCurrencySelect) {
              onPresentCurrencyModal();
            }
          }}
        >
          <Flex width="100%" justifyItems="flex-end" alignItems="center" justifyContent="space-between">
            {pair ? (
              <DoubleCurrencyLogo currency0={pair.token0} currency1={pair.token1} size={16} margin />
            ) : currency ? (
              <CurrencyLogo currency={currency} size="24px" style={{ marginRight: '8px' }} />
            ) : null}
            {pair ? (
              <span className="currency-name">
                {pair?.token0.symbol}:{pair?.token1.symbol}
              </span>
            ) : (
              <span className="currency-name">
                {currency && currency.symbol && currency.symbol.length > 20
                  ? `${currency.symbol.slice(0, 4)}...${currency.symbol.slice(
                      currency.symbol.length - 5,
                      currency.symbol.length,
                    )}`
                  : currency?.symbol}
              </span>
            )}
            {!disableCurrencySelect && <img src={DropdownSvg} alt="" />}
          </Flex>
        </CurrencySelectButton>
      </div>
      <div className="number">
        {!hideInput && (
          <div className="label">
            {account && !hideBalance && !!currency && selectedCurrencyBalance
              ? t('Balance: %amount%', { amount: selectedCurrencyBalance?.toSignificant(6) ?? '' })
              : ' -'}

            {!hideInput && account && currency && showMaxButton && label !== 'To' && (
              <Button onClick={onMax} scale="sm" variant="text" pr={0}>
                MAX
              </Button>
            )}
          </div>
        )}
        <InputRow style={{ padding: '0' }} selected={disableCurrencySelect}>
          {!hideInput && (
            <NumericalInput
              className="token-amount-input"
              value={value}
              onUserInput={(val) => {
                onUserInput(val);
              }}
            />
          )}
        </InputRow>
      </div>
    </InputPanel>
  );
}
