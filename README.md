This is a frontend template made with [PolkadotJS](https://polkadot.js.org/docs/), [Next.js](https://nextjs.org/docs) and [TailwindCSS](https://tailwindcss.com/docs/installation) to interact with a [Substrate](https://docs.substrate.io/) blockchain

## Getting Started

Clone the repository:

```bash
git clone  
```
Create a `.env` file from the example and replace the `RPC_ENPOINT` with your desired URL:   

```bash
cp .env.example .env
```

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.