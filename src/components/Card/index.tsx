import styled from 'styled-components';
import { Box } from '@kaco/uikit';

const Card = styled(Box)<{
  width?: string;
  padding?: string;
  border?: string;
  borderRadius?: string;
}>`
  width: ${({ width }) => width ?? '100%'};
  border-radius: 16px;
  padding: 1.25rem;
  padding: ${({ padding }) => padding};
  border: ${({ border }) => border};
  border-radius: ${({ borderRadius }) => borderRadius};
  /* background-color: ${({ theme }) => theme.colors.background}; */
`;
export default Card;

export const LightCard = styled(Card)``;

export const LightGreyCard = styled(Card)`
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  background-color: ${({ theme }) => theme.colors.background};
`;

export const GreyCard = styled(Card)`
  background-color: ${({ theme }) => theme.colors.dropdown};
`;

export const SolidCard = styled(Card)`
  border: 2px solid ${({ theme }) => theme.colors.cardBorder};
  background-color: ${({ theme }) => theme.colors.cardBackground};
`;

export const PlainCard = styled(Card)`
  background: ${({ theme }) => theme.colors.cardBorder};
  border-radius: 8px;
`;

export const DashedPrimayCard = styled(Card)`
  background: ${({ theme }) => theme.colors.cardBorder};
  border: 1px dashed ${({ theme }) => theme.colors.primarySecondary};
  border-radius: 12px;
`;

export const ErrorCard = styled(Card)`
  background: #1f373b;
  border-radius: 8px;
`;
