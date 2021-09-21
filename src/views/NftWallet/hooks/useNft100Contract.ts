import { useContract } from 'hooks/useContract';
import Erc721 from 'config/abi/erc-721.json';
import Erc1155 from 'config/abi/ERC1155.json';
import { NFT_TYPE } from 'config/constants/nft';
import { NftPair } from 'views/NftPools/hooks/useNftPools';

export const useNft100Contract = (pair: NftPair | undefined) => {
  const contract = useContract(pair?.nftAddress, pair?.type === NFT_TYPE.NFT721 ? Erc721 : Erc1155);

  return contract;
};
