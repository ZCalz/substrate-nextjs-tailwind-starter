import React, { createContext, useContext, useEffect, useState } from 'react';
import { ApiPromise, WsProvider } from '@polkadot/api';
require('dotenv').config();

const WS_PROVIDER_URL = process.env.RPC_ENPOINT || 'ws://localhost:9944';
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
import { web3Accounts, web3Enable } from '@polkadot/extension-dapp';

interface PolkadotContextType {
  accounts: InjectedAccountWithMeta[] | null;
  api: ApiPromise | null;
  isApiReady: boolean;
}

const PolkadotContext = createContext<PolkadotContextType>({
  accounts: null,
  api: null,
  isApiReady: false,
});

export const usePolkadot = () => useContext(PolkadotContext);

export const PolkadotProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [accounts, setAccounts] = useState<InjectedAccountWithMeta[] | null>(null);
  const [api, setApi] = useState<ApiPromise | null>(null);
  const [isApiReady, setIsApiReady] = useState(false);

  useEffect(() => {
    const initApi = async () => {
      const provider = new WsProvider(WS_PROVIDER_URL);
      const api = await ApiPromise.create({ provider });
      await api.isReady;
      setApi(api);
      setIsApiReady(true);
    };

    initApi().catch(console.error);

    return () => {
      if (api) {
        api.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
    const enablePolkadotExtension = async () => {
      const extensions = await web3Enable('Substrate Dapp Template');
      if (extensions.length === 0) {
        console.log('No Polkadot extension found');
        return;
      }
    //   const accounts = await web3Accounts();
    //   console.log(accounts);
    };
    if (window) {
        enablePolkadotExtension();
    }
}
    // enablePolkadotExtension();}
  }, []);

  return (
    <PolkadotContext.Provider value={{ accounts, api, isApiReady }}>
      {children}
    </PolkadotContext.Provider>
  );
};