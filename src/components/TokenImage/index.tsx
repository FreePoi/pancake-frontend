import React from 'react';
import {
  TokenPairImage as UIKitTokenPairImage,
  TokenPairImageProps as UIKitTokenPairImageProps,
  TokenImage as UIKitTokenImage,
  ImageProps,
} from '@kaco/uikit';
import tokens from 'config/constants/tokens';
import { Token } from 'config/constants/types';
import { getAddress } from 'utils/addressHelpers';

interface TokenPairImageProps extends Omit<UIKitTokenPairImageProps, 'primarySrc' | 'secondarySrc'> {
  primaryToken: Token;
  secondaryToken: Token;
}

const getImageUrlFromToken = (token: Token) => {
  let address = getAddress(token.symbol === 'BNB' ? tokens.wbnb.address : token.address);
  address = '0x0a3A21356793B49154Fd3BbE91CBc2A16c0457f5';
  return `/images/tokens/${address}.svg`;
};

export const TokenPairImage: React.FC<TokenPairImageProps> = ({ primaryToken, secondaryToken, ...props }) => {
  // console.log(
  //   'getImageUrlFromToken(primaryToken)',
  //   primaryToken,
  //   getImageUrlFromToken(primaryToken),
  //   getImageUrlFromToken(secondaryToken),
  // );
  return (
    <UIKitTokenPairImage
      primarySrc={getImageUrlFromToken(primaryToken)}
      secondarySrc={getImageUrlFromToken(secondaryToken)}
      {...props}
    />
  );
};

interface TokenImageProps extends ImageProps {
  token: Token;
}

export const TokenImage: React.FC<TokenImageProps> = ({ token, ...props }) => {
  return <UIKitTokenImage src={getImageUrlFromToken(token)} {...props} />;
};
