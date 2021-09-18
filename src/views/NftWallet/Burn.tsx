import Page from './Page';
import { FC } from 'react';
import { Button, Grid, Text, Flex, useModal } from '@kaco/uikit';
import styled from 'styled-components';
import BurnModal from './components/BurnModal';

const Burn: FC<{ className?: string }> = ({ className }) => {
  const [onMint] = useModal(<BurnModal />);

  return (
    <Page>
      <div className={className}>
        <Text bold color="white" mb="20px" fontSize="20px">
          NFT100
        </Text>
        <Grid gridGap={{ xs: '4px', md: '16px' }} className="nfts">
          <Flex className="fragment" onClick={onMint}>
            <div className="logo"></div>
            <Flex flex="1" justifyContent="space-between" alignItems="center">
              <div className="">
                <Text color="#1BD3D5" bold fontSize="20px">
                  300
                </Text>
                <Text color="white" bold>
                  KAlpaca
                </Text>
              </div>
              <Button variant="secondary">Burn</Button>
            </Flex>
          </Flex>

          <Flex className="fragment" onClick={onMint}>
            <div className="logo"></div>
            <Flex flex="1" justifyContent="space-between" alignItems="center">
              <div className="">
                <Text color="#1BD3D5" bold fontSize="20px">
                  300
                </Text>
                <Text color="white" bold>
                  KAlpaca
                </Text>
              </div>
              <Button variant="secondary">Burn</Button>
            </Flex>
          </Flex>
          <Flex className="fragment" onClick={onMint}>
            <div className="logo"></div>
            <Flex flex="1" justifyContent="space-between" alignItems="center">
              <div className="">
                <Text color="#1BD3D5" bold fontSize="20px">
                  300
                </Text>
                <Text color="white" bold>
                  KAlpaca
                </Text>
              </div>
              <Button variant="secondary">Burn</Button>
            </Flex>
          </Flex>
          <Flex className="fragment" onClick={onMint}>
            <div className="logo"></div>
            <Flex flex="1" justifyContent="space-between" alignItems="center">
              <div className="">
                <Text color="#1BD3D5" bold fontSize="20px">
                  300
                </Text>
                <Text color="white" bold>
                  KAlpaca
                </Text>
              </div>
              <Button variant="secondary">Burn</Button>
            </Flex>
          </Flex>
          <Flex className="fragment" onClick={onMint}>
            <div className="logo"></div>
            <Flex flex="1" justifyContent="space-between" alignItems="center">
              <div className="">
                <Text color="#1BD3D5" bold fontSize="20px">
                  300
                </Text>
                <Text color="white" bold>
                  KAlpaca
                </Text>
              </div>
              <Button variant="secondary">Burn</Button>
            </Flex>
          </Flex>
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
