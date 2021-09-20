import React, { Context, useCallback, useEffect, useState } from 'react';

interface NftContextProps {
  items: number[];
  add: (id: number) => void;
  remove: (id: number) => void;
}

const NFTShopChart = 'nft-shop-chart';

export const NftContext: Context<NftContextProps> = React.createContext({} as unknown as NftContextProps);

export const NftProvider = React.memo(({ children }: { children: React.ReactNode }): React.ReactElement => {
  const [items, setItems] = useState<number[]>([]);

  useEffect(() => {
    try {
      const items = (JSON.parse(localStorage.getItem(NFTShopChart)) as number[]) || [];

      console.log('itemsssssssssss', items);

      setItems(items);
    } catch (e) {}
  }, []);

  const add = useCallback((id: number) => {
    setItems((items) => {
      if (items.find((item) => item === id)) {
        return items;
      }

      return [...items, id];
    });
  }, []);

  const remove = useCallback((id: number) => {
    setItems((items) => {
      const index = items.findIndex((item) => item === id);
      if (index === -1) {
        return items;
      }

      return [...items.slice(0, index), ...items.slice(index + 1)];
    });
  }, []);

  return (
    <NftContext.Provider
      value={{
        items,
        add,
        remove,
      }}
    >
      {children}
    </NftContext.Provider>
  );
});
