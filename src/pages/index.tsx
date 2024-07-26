import { useEffect, useState } from 'react';
import { usePolkadot } from '../context/PolkadotContext';

const Home: React.FC = () => {
  const { api, isApiReady } = usePolkadot();
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
    <div>
      <h1>Substrate Chain Info</h1>
      <p>Chain Name: {chainName}</p>
      <p>Latest Block Number: {blockNumber}</p>
    </div>
  );
};

export default Home;