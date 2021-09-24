export enum NFT_TYPE {
  NFT721 = 721,
  NFT1155 = 1155,
}

export const NFT_PAIRS: {
  [key: number]: {
    address: string;
    nftAddress: string;
    name: string;
    symbol: string;
    pid: number;
    type: NFT_TYPE;
  };
}[] = [
  {
    97: {
      // address: '0xbDd2CcD607F1138f41e1aBf1011b75EE4e711fA6',
      // nftAddress: '0x5bbA2c99ff918f030D316ea4fD77EC166DDe0aFf',
      // name: 'KACOxALPACA NFT100',
      address: '0xb1a91CDF684f321419A6D7F3AFEaDde984dB60AC',
      nftAddress: '0x5bbA2c99ff918f030D316ea4fD77EC166DDe0aFf',
      name: 'ALPACA NFT100',
      symbol: ' K-ALPACA',
      pid: 0,
      type: NFT_TYPE.NFT1155,
    },
    // 97: {
    //   address: '0x232d2464211903B045a09414f47bE4C826a25cd0',
    //   nftAddress: '0xDD7698b02213eb713C183E03e82fF1A66AF6c17E',
    //   name: '',
    //   symbol: '',
    //   pid: 0,
    //   type: NFT_TYPE.NFT1155,
    // },
  },
  {
    97: {
      // address: '0x3Ff2e308012460583ff1519bd504E940A46270C6',
      // nftAddress: '0xDD7698b02213eb713C183E03e82fF1A66AF6c17E',
      // name: 'KACOxKACO NFT100',
      address: '0x2839956D80fbB701Aaf718BB0Eab80561595Da71',
      nftAddress: '0xDD7698b02213eb713C183E03e82fF1A66AF6c17E',
      name: 'KACO NFT100',
      symbol: 'K-KACO',
      pid: 1,
      type: NFT_TYPE.NFT721,
    },
    // 97: {
    //   address: '0x232d2464211903B045a09414f47bE4C826a25cd0',
    //   nftAddress: '0xDD7698b02213eb713C183E03e82fF1A66AF6c17E',
    //   name: '',
    //   symbol: '',
    //   pid: 0,
    //   type: NFT_TYPE.NFT1155,
    // },
  },
];

export const NFT_FACTORY = {
  // 97: '0xc7Dfd0e4C74466aB1161939707CEB921528c44F0',
  97: '0x7C3343Ddb7Fd5cD2C8A421C5C22C44c396AD50B2',
  // 97: '0x8B19B61931a08C7dD12c494A7e90b5c13d39C9a3',
};
