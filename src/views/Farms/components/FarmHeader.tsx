import { useTranslation } from 'contexts/Localization';
import React from 'react';
import styled from 'styled-components';
import LogoPng from './farm.svg';

const FarmHeader: React.FC<{ className?: string }> = ({ className }) => {
  const { t } = useTranslation();
  return (
    <div className={className}>
      <img src={LogoPng} alt="" />
      <div>{t('Happy Farming :)')}</div>
    </div>
  );
};

export default styled(FarmHeader)`
  padding-top: 11px;
  text-align: center;
  > img {
    height: 88px;
  }
  > div {
    font-size: 12px;
    color: #1bd3d5;
    margin-top: 14px;
    margin-bottom: 43px;
  }
`;
