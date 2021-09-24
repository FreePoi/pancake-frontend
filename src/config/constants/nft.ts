export enum NFT_TYPE {
  NFT721 = 721,
  NFT1155 = 1155,
}

export interface NftPairConfig {
  address: string;
  nftAddress: string;
  name: string;
  symbol: string;
  pid: number;
  type: NFT_TYPE;
}

export const NFT_PAIRS: NftPairConfig[] = [
  {
    address: '0x65aDc52BfD0E3d9Df80Be6E36F330E757862e2Bd',
    nftAddress: '0x46F36F9FE211600417D9d24c014a154052ABC960',
    name: 'KACO NFT100',
    symbol: 'KKACO',
    pid: 0,
    type: NFT_TYPE.NFT1155,
  },
];

export const BLOCK_INTERVAL = 3;

// export const NFT_PAIRS: NftPairConfig[] = [
//   {
//     address: '0xb1a91CDF684f321419A6D7F3AFEaDde984dB60AC',
//     nftAddress: '0x5bbA2c99ff918f030D316ea4fD77EC166DDe0aFf',
//     name: 'ALPACA NFT100',
//     symbol: ' K-ALPACA',
//     pid: 0,
//     type: NFT_TYPE.NFT1155,
//   },
//   {
//     address: '0x2839956D80fbB701Aaf718BB0Eab80561595Da71',
//     nftAddress: '0xDD7698b02213eb713C183E03e82fF1A66AF6c17E',
//     name: 'KACO NFT100',
//     symbol: 'K-KACO',
//     pid: 1,
//     type: NFT_TYPE.NFT721,
//   },
// ];

export const NFT_FACTORY = {
  56: '0x7bce4113838bC9609A0A96149c61B0ae811421b2',
  97: '0x7C3343Ddb7Fd5cD2C8A421C5C22C44c396AD50B2',
};
