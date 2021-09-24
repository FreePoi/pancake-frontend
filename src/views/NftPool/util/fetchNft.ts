import { NFT } from '../components/GoodsInPool';
import { chainId } from 'views/NftPools/hooks/useNftPools';

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

  console.log('items', items, 'fnts', nfts, nftAddress);
  return nfts;
}

const apiKeys = [
  'ckey_12045efc624e428fb454b1a6957',
  'ckey_4eb246f7c62c4ffdb379460cd21',
  'ckey_a8ada44913884c34a0906d32830',
  'ckey_86fa38882dd04212bcbf635df00',
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

  console.log('covalentData', covalentData);

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
