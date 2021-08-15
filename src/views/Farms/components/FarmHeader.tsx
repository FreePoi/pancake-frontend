import { useTranslation } from 'contexts/Localization';
import React from 'react';
import styled from 'styled-components';
import LogoPng from './logo.png';

const FarmHeader: React.FC<{ className?: string }> = ({ className }) => {
  const { t } = useTranslation();
  return (
    <div className={className}>
      <img src={LogoPng} alt="" />
      <div>{t('There are various farming opportunities available at Kaco Farms')}</div>
    </div>
  );
};

export default styled(FarmHeader)`
  padding-top: 11px;
  text-align: center;
  > div {
    font-size: 12px;
    color: #1bd3d5;
    margin-bottom: 43px;
  }
`;
