import { NFT_PAIRS } from 'config/constants/nft';
import { NFT } from '../components/GoodsInPool';
import multicall from 'utils/multicall';
import BigNumber from 'bignumber.js';

interface BounceItem {
  contract_addr: string;
  contract_name: string;
  token_type: number;
  token_id: number;
  owner_addr: string;
  balance: number;
  token_uri: string;
  name: string;
  description: string;
  image: string;
  attributes?: any;
}

interface BounceData {
  nfts1155: BounceItem[];
  nfts721: BounceItem[];
  total1155: number;
  total721: number;
}

export async function fetchNfts(nftAddress: string, pairAddress: string) {
  const items = await fetchAllTokens(pairAddress);
  const nfts: NFT[] = await filterNft(items, nftAddress);

  return nfts;
}
export async function fetchAllNfts(pairAddress: string) {
  const items: any = await fetchAllTokens(pairAddress);
  const nfts: NFT[] = [];
  for (let i = 0; i < items.length; i++) {
    nfts.push({
      id: +items[i].token_id,
      balance: 0,
      uri: items[i].uri,
      image: items[i].image,
      name: items[i].name,
      attributes: items[i].attributes,
    });
  }
  return nfts;
}

export async function fetchAllTokens(account: string) {
  const apiUrl = `https://nftview.bounce.finance/v2/bsc/nft?user_address=${account}`;

  const data = await fetch(apiUrl);

  const rawData: {
    code: number;
    data: BounceData;
    msg: string;
  } = await data.json();

  if (!rawData.data || rawData.msg !== 'ok') {
    return;
  }

  rawData.data.nfts1155.push(...rawData.data.nfts721);

  return rawData.data.nfts1155;
}

export async function filterNft(items: BounceItem[], nftAddress: string) {
  const flawItems = items.filter(
    (token) =>
      token.contract_addr.toLocaleLowerCase() === nftAddress.toLocaleLowerCase() &&
      token.balance > 0 &&
      (!token.image || token.image.length === 0),
  );
  const promises = flawItems.map(async (item) => {
    const temp = fetchNftInfo(nftAddress, item.token_id, item.owner_addr);
    return temp;
  });
  const results = await Promise.all(promises);
  results.push(
    ...items
      .filter(
        (token) =>
          token.contract_addr.toLocaleLowerCase() === nftAddress.toLocaleLowerCase() &&
          token.balance > 0 &&
          token.image,
      )
      // .reduce((nfts, curr) => nfts.concat(curr.nft_data), [])
      .map((nft) => ({
        id: nft.token_id,
        balance: nft.balance,
        uri: nft.token_uri,
        image: nft.image,
        name: nft.name,
        attributes: nft?.attributes || {},
      })),
  );
  return results;
}

export async function fetchNftInfo(nftAddress: string, id: number, owner: string, nft?: any): Promise<NFT | undefined> {
  const pairConfig = NFT_PAIRS.find((pair) => pair.nftAddress.toLowerCase() === nftAddress.toLowerCase());

  if ([0, 2].findIndex((pid) => pairConfig.pid === pid) > -1) {
    return await fetchPid0(pairConfig.nftAddress, id, owner, pairConfig.nftAbi, nft);
  } else {
    return await fetchPid1(pairConfig.nftAddress, id, owner, pairConfig.nftAbi);
  }
}

interface NftMeta {
  name: string;
  description: string;
  image: string;
  animation_url: string;
  background_color: string;
  external_link: string;
  owner: string;
  attributes?: any[];
}

// kaco, alpaca...
async function fetchPid0(nftAddress: string, id: number, owner: string, abi: any, nft: any): Promise<NFT | undefined> {
  try {
    let _balance = new BigNumber(0);
    if (owner) {
      _balance = await multicall(abi, [{ address: nftAddress, name: 'balanceOf', params: [owner, id] }]);
    }
    if (nft === null || !nft?.name) {
      const _uri = await multicall(abi, [{ address: nftAddress, name: 'uri', params: [id] }]);
      const res = await fetch(_uri[0][0]);
      const info: NftMeta = await res.json();

      if (!res.ok || !info) {
        return;
      }
      return {
        id,
        balance: _balance[0][0].toNumber(),
        uri: _uri[0][0],
        image: info.image,
        name: info.name,
        attributes: info?.attributes || [],
      };
    }
    return {
      id,
      balance: _balance[0][0].toNumber(),
      uri: nft?.uri ?? '',
      image: nft?.image ?? '',
      name: nft?.name ?? '',
      attributes: nft?.attributes ?? [],
    };
  } catch (e) {}
}

// pancake
async function fetchPid1(nftAddress: string, id: number, owner: string, abi: any): Promise<NFT | undefined> {
  const calls = [
    { address: nftAddress, name: 'balanceOf', params: [owner] },
    { address: nftAddress, name: 'tokenURI', params: [id] },
  ];

  const [[balance], [uri]] = await multicall(abi, calls);

  const u = toUri(uri);

  try {
    if (nftAddress.toLocaleLowerCase() === '0xDf7952B35f24aCF7fC0487D01c8d5690a60DBa07'.toLowerCase()) {
      const nftName = extractPancakeName(uri);
      return {
        id,
        balance: balance.toNumber(),
        uri: u,
        image: toPancakeUri(nftName),
        name: nftName,
        attributes: [],
      };
    } else {
      const res = await fetch(u);
      const info: NftMeta = await res.json();

      if (!res.ok || !info) {
        return;
      }
      return {
        id,
        balance: balance.toNumber(),
        uri: u,
        image: toUri(info.image),
        name: info.name,
        attributes: info?.attributes || [],
      };
    }
  } catch (e) {}
}

// ipfs://QmYD9AtzyQPjSa9jfZcZq88gSaRssdhGmKqQifUDjGFfXm/dollop.png
function toUri(uri: string) {
  return 'https://ipfs.io/ipfs/' + uri.slice('ipfs://'.length);
}

// ipfs://QmYu9WwPNKNSZQiTCDfRk7aCR472GURavR9M1qosDmqpev/sparkle.json
function extractPancakeName(uri: string) {
  let name: string = uri.slice(uri.lastIndexOf('/') + 1, uri.length - 5);
  switch (name) {
    case 'easter-flipper': {
      name = 'flipsie-easter-21';
      break;
    }
    case 'easter-champion-storm': {
      name = 'easter-21-champions';
      break;
    }
    case 'easter-caker': {
      name = 'cakeston-easter-21';
      break;
    }
    case 'easter-storm': {
      name = 'stormy-easter-21';
      break;
    }
  }
  return name;
}

function toPancakeUri(name: string) {
  return 'https://static-nft.pancakeswap.com/mainnet/0xDf7952B35f24aCF7fC0487D01c8d5690a60DBa07/' + name + '-1000.png';
}
