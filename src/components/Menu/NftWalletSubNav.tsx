import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { ButtonMenu, ButtonMenuItem } from '@kaco/uikit';
import { useTranslation } from 'contexts/Localization';

const StyledNav = styled.nav`
  margin-bottom: 40px;
  display: flex;
  justify-content: center;
`;

const getActiveIndex = (pathname: string): number => {
  if (pathname.includes('/burn')) {
    return 1;
  }
  return 0;
};

const Nav = () => {
  const location = useLocation();
  const { t } = useTranslation();

  return (
    <StyledNav>
      <ButtonMenu activeIndex={getActiveIndex(location.pathname)} scale="sm" variant="subtle">
        <ButtonMenuItem width="112px" id="swap-nav-link" to="/nft/wallet/mint" as={Link}>
          {t('MINT')}
        </ButtonMenuItem>
        <ButtonMenuItem width="112px" id="pool-nav-link" to="/nft/wallet/burn" as={Link}>
          {t('BURN')}
        </ButtonMenuItem>
      </ButtonMenu>
    </StyledNav>
  );
};

export default Nav;
