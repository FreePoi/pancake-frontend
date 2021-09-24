import { Text, Flex } from '@kaco/uikit';
import { useTranslation } from 'contexts/Localization';
import React from 'react';
import styled from 'styled-components';
import LogoPng from '../imgs/farms.svg';
import Toggle from 'components/Menu/GlobalSettings/Toggle';
import Search from 'components/Search';

const FarmHeader: React.FC<{
  className?: string;
  filter: string;
  stakedOnly: boolean;
  onStakedOnlyChange: (now: boolean) => void;
  onFilterChange: (now: string) => void;
}> = ({ className, onStakedOnlyChange, filter, onFilterChange, stakedOnly }) => {
  const { t } = useTranslation();

  return (
    <Flex className={className} justifyContent="space-between">
      <div className="left">
        <img src={LogoPng} alt="" />
        {/* <Text color="#1BD3D5" fontSize="20px">
          {t('Happy Farming :)')}
        </Text> */}
      </div>
      <div className="right">
        <Flex alignItems="center" mb="16px" justifyContent="flex-end">
          <Text color="textSubtle" mr="12px" bold>
            {t('Staked only')}
          </Text>
          <Toggle checked={stakedOnly} onChange={() => onStakedOnlyChange(!stakedOnly)} />
        </Flex>
        <Search value={filter} onChange={onFilterChange} />
      </div>
    </Flex>
  );
};

export default styled(FarmHeader)`
  padding-top: 11px;
  margin-bottom: 44px;
  flex-wrap: wrap;
  > .left {
    max-width: 404px;
    > img {
      height: 90px;
      margin-bottom: 20px;
    }
    margin-bottom: 25px;
    ${({ theme }) => theme.mediaQueries.sm} {
      margin-bottom: 0px;
    }
  }
  > .right {
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
    flex: 1;
    max-width: 360px;
  }
`;
