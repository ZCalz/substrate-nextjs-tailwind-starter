import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { PolkadotProvider } from '../context/PolkadotContext';

function App({ Component, pageProps }: AppProps) {
  return (
    <PolkadotProvider>
      <Component {...pageProps} />
    </PolkadotProvider>
  );
}

export default App;