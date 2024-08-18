import { useEffect, useState } from 'react';
import { usePolkadot } from '../context/PolkadotContext';

const Home: React.FC = () => {
  const { api, isApiReady, accounts } = usePolkadot();
  const [blockNumber, setBlockNumber] = useState<number | null>(null);
  const [chainName, setChainName] = useState<string | null>(null);

  useEffect(() => {
    if (isApiReady && api) {
      const fetchChainData = async () => {
        const number = (await api.query.system.number()).toHuman();
        setBlockNumber(number as number);

        const name = await api.rpc.system.chain();
        setChainName(name.toString());
      };

      fetchChainData().catch(console.error);
    }
  }, [api, isApiReady]);

  return (
    <div className="flex flex-col items-center h-screen justify-center">
      <h1>Substrate Chain Info</h1>
      <p>Chain Name: {chainName}</p>
      <p>Latest Block Number: {blockNumber}</p>

      <div className="flex flex-col py-4 items-center">
        <h1>Polkadot Wallet Info</h1>
        {isApiReady ? (
          <div>
            <h2>Accounts:</h2>
            <ul>
              {accounts?.map((account) => (
                <li key={account.address}>
                  {account.meta.name}: {account.address}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default Home;