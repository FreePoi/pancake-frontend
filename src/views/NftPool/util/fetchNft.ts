import { NFT_PAIRS } from 'config/constants/nft';
import { NFT } from '../components/GoodsInPool';
import { chainId } from 'views/NftPools/hooks/useNftPools';
import multicall from 'utils/multicall';

interface CovalentTokenItem {
  balance: string;
  contract_address: string;
  contract_name: string;
  contract_ticker_symbol: string;
  nft_data?: {
    token_balance: string;
    token_id: string;
    token_url: string;
    external_data: {
      image: string;
      image_256: string;
      image_512: string;
      image_1024: string;
      name: string;
    };
  }[];
}

export async function fetchNfts(nftAddress: string, pairAddress: string) {
  const items = await fetchAllTokens(pairAddress);
  const nfts: NFT[] = filterNft(items, nftAddress);

  return nfts;
}

const apiKeys = [
  'ckey_12045efc624e428fb454b1a6957',
  'ckey_4eb246f7c62c4ffdb379460cd21',
  'ckey_a8ada44913884c34a0906d32830',
  'ckey_86fa38882dd04212bcbf635df00',
  'ckey_ec6d8dd72f944f1da9a98362369',
  'ckey_b5c20eead9c543f0a288c8107be',
  'ckey_1b876e487b12404993237b6ffb0',
  'ckey_284563ec81734a72a7d74a620d9',
  'ckey_4f8e0c23ba324296b53e2242394',
];
let index = Math.floor(Math.random() * apiKeys.length);

export async function fetchAllTokens(account: string) {
  const key = apiKeys[index];

  index += 1;
  index = index === apiKeys.length ? 0 : index;

  const apiUrl = `https://api.covalenthq.com/v1/${chainId}/address/${account}/balances_v2/?key=${key}&nft=true`;

  const data = await fetch(apiUrl);

  const covalentData: {
    data: {
      items: CovalentTokenItem[];
    } | null;
    error: boolean;
    error_code: number | null;
    error_message: string | null;
  } = await data.json();

  if (!covalentData.data || covalentData.error) {
    return;
  }

  return covalentData.data.items;
}

export function filterNft(items: CovalentTokenItem[], nftAddress: string) {
  return items
    .filter((token) => token.nft_data && token.contract_address.toLocaleLowerCase() === nftAddress.toLocaleLowerCase())
    .reduce((nfts, curr) => nfts.concat(curr.nft_data), [])
    .map((nft) => ({
      id: parseInt(nft.token_id),
      balance: parseInt(nft.token_balance),
      uri: nft.token_url,
      image: nft.external_data.image,
      name: nft.external_data.name,
    }));
}

export async function fetchNftInfo(nftAddress: string, id: number, owner: string): Promise<NFT> {
  const pairConfig = NFT_PAIRS.find((pair) => pair.nftAddress.toLowerCase() === nftAddress.toLowerCase());

  if ([0, 2].find((pid) => pairConfig.pid === pid)) {
    return await fetchPid0(pairConfig.nftAddress, id, owner, pairConfig.nftAbi);
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
}

// kaco
async function fetchPid0(nftAddress: string, id: number, owner: string, abi: any): Promise<NFT> {
  const calls = [
    { address: nftAddress, name: 'balanceOf', params: [owner, id] },
    { address: nftAddress, name: 'uri', params: [id] },
  ];

  const [[balance], [uri]] = await multicall(abi, calls);

  const res = await fetch(uri);
  let info: NftMeta;

  try {
    info = await res.json();
    // console.log('await res.text()', info);
  } catch (e) {
    console.log('nft metadata error', e);
  }

  if (!res.ok || !info) {
    return;
  }

  return {
    id,
    balance: balance.toNumber(),
    uri,
    image: info.image,
    name: info.name,
  };
}

// kaco
async function fetchPid1(nftAddress: string, id: number, owner: string, abi: any): Promise<NFT> {
  const calls = [
    { address: nftAddress, name: 'balanceOf', params: [owner] },
    { address: nftAddress, name: 'tokenURI', params: [id] },
  ];

  const [[balance], [uri]] = await multicall(abi, calls);

  const u = toUri(uri);
  const res = await fetch(u);
  let info: NftMeta;

  try {
    info = await res.json();
  } catch (e) {
    console.log('nft metadata error', e);
  }

  if (!res.ok || !info) {
    return;
  }

  return {
    id,
    balance: balance.toNumber(),
    uri: u,
    image: toUri(info.image),
    name: info.name,
  };
}

// ipfs://QmYD9AtzyQPjSa9jfZcZq88gSaRssdhGmKqQifUDjGFfXm/dollop.png
function toUri(uri: string) {
  return 'https://ipfs.io/ipfs/' + uri.slice('ipfs://'.length);
}
