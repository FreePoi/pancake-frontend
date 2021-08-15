import React from 'react';
import styled from 'styled-components';
import { Text, Flex, Heading, IconButton, ArrowBackIcon, NotificationDot } from '@kaco/uikit';
import { Link } from 'react-router-dom';
import { useExpertModeManager } from 'state/user/hooks';
import GlobalSettings from 'components/Menu/GlobalSettings';
import Transactions from './Transactions';
import QuestionHelper from '../QuestionHelper';
import { CSSProperties } from 'react';

interface Props {
  title: string;
  subtitle?: string;
  helper?: string;
  backTo?: string;
  noConfig?: boolean;
  style?: CSSProperties;
}

const AppHeaderContainer = styled(Flex)`
  align-items: center;
  justify-content: space-between;
  padding: 24px;
  width: 100%;
  /* border-bottom: 1px solid ${({ theme }) => theme.colors.cardBorder}; */
`;

const AppHeader: React.FC<Props> = ({ title, subtitle, helper, backTo, noConfig = false, style }) => {
  const [expertMode] = useExpertModeManager();

  return (
    <AppHeaderContainer style={style}>
      <Flex alignItems="center" mr={noConfig ? 0 : '16px'}>
        {backTo && (
          <IconButton as={Link} to={backTo}>
            <ArrowBackIcon width="32px" />
          </IconButton>
        )}
        <Flex flexDirection="column" alignItems="center" style={{ height: '100%' }}>
          <Heading as="h2" mb="8px" marginBottom="0px">
            {title}
          </Heading>
        </Flex>
      </Flex>
      {!noConfig && (
        <Flex alignItems="center">
          <Transactions />
          <NotificationDot show={expertMode}>
            <GlobalSettings />
          </NotificationDot>
        </Flex>
      )}
    </AppHeaderContainer>
  );
};

export default AppHeader;
