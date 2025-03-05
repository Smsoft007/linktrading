# Getting Started

This guide will help you set up and run the Auto USDT Frontend project on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or later)
- [npm](https://www.npmjs.com/) (v8 or later) or [yarn](https://yarnpkg.com/) (v1.22 or later)
- [Git](https://git-scm.com/)

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd auto-usdt-frontend
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Set up environment variables:

Create a `.env.local` file in the root directory based on the `.env` file:

```bash
cp .env .env.local
```

Edit the `.env.local` file to configure your environment variables.

## Development

To start the development server:

```bash
npm run dev
# or
yarn dev
```

This will start the Next.js development server at [http://localhost:3000](http://localhost:3000).

## Building for Production

To create a production build:

```bash
npm run build
# or
yarn build
```

To start the production server:

```bash
npm run start
# or
yarn start
```

## Project Structure

For a detailed overview of the project structure, see the [Project Structure](./structure.md) documentation.

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Create a production build
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint to check for code issues

## Connecting to MetaMask

The application integrates with MetaMask for wallet connectivity. To use this feature:

1. Install the [MetaMask browser extension](https://metamask.io/download.html)
2. Create or import a wallet
3. Connect to the application when prompted

## Troubleshooting

### Common Issues

#### Build Errors

If you encounter build errors, try the following:

1. Clear the Next.js cache:

```bash
rm -rf .next
```

2. Reinstall dependencies:

```bash
rm -rf node_modules
npm install
# or
yarn install
```

#### MetaMask Connection Issues

If you have issues connecting to MetaMask:

1. Ensure MetaMask is installed and unlocked
2. Check that you're on a supported network
3. Try refreshing the page

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [MetaMask Documentation](https://docs.metamask.io/) 