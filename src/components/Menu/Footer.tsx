import React from 'react'
import styled from 'styled-components'
import { ButtonMenu, ButtonMenuItem, LinkExternal, Flex, Svg, Image, Button } from '@kaco/uikit'
import { useTranslation } from 'contexts/Localization'

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 16px;

  ${({ theme }) => theme.mediaQueries.md} {
    justify-content: space-between;
    flex-direction: row;
  }
`

const BubbleWrapper = styled(Flex)`
  svg {
    fill: ${({ theme }) => theme.colors.textSubtle};
    transition: background-color 0.2s, opacity 0.2s;
  }
  &:hover {
    svg {
      opacity: 0.65;
    }
  }
  &:active {
    svg {
      opacity: 0.85;
    }
  }
`

const Footer = () => {
  const { t } = useTranslation()
  return (
    <Wrapper>
      <Flex flexDirection={['column', 'column', 'row']} alignItems="center" />
      <Flex
        flexGrow={1}
        alignItems="center"
        width={['100%', '100%', '100%', 'auto']}
        justifyContent={['center', 'center', 'center', 'flex-end']}
      />
    </Wrapper>
  )
}

export default Footer
