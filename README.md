# SocialInch - DeFi Social Trading Platform

A Next.js application that combines social trading features with 1inch Limit Order Protocol (LOP) integration for decentralized trading.

## Features

### 🏠 Home Page
- Platform overview and statistics
- Quick access to all features
- Modern, responsive design

### 👥 Social Trading Page
- Follow successful traders
- View trader profiles and statistics
- See recent trading activities
- Copy trading strategies
- Social interaction features

### 📈 Buy Orders Page
- Place limit buy orders using 1inch LOP
- Token selection with real-time prices
- Order expiry settings
- Order summary and validation
- Gas-free order placement

### 📉 Sell Orders Page
- Place limit sell orders using 1inch LOP
- Token balance integration
- MAX amount functionality
- Order management
- Secure token handling

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Wallet Connection**: Rainbow Kit + Wagmi
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **DeFi Integration**: 1inch Limit Order Protocol
- **State Management**: React Query
- **TypeScript**: Full type safety

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- MetaMask or other Web3 wallet

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd socialInch
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Update the WalletConnect project ID in `app/providers.tsx`:
```typescript
projectId: 'YOUR_PROJECT_ID', // Replace with your WalletConnect project ID
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
socialInch/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── providers.tsx      # Rainbow Kit providers
│   ├── social/            # Social trading page
│   ├── buy-orders/        # Buy orders page
│   └── sell-orders/       # Sell orders page
├── components/            # Reusable components
│   └── Navbar.tsx        # Navigation component
├── public/               # Static assets
└── package.json          # Dependencies and scripts
```

## 1inch Integration

The application integrates with 1inch Limit Order Protocol for:

- **Gas-free order placement**: Orders are signed off-chain
- **Better pricing**: Limit orders often get better prices than market orders
- **Automated execution**: Orders execute automatically when conditions are met
- **Order management**: Cancel or modify orders anytime

### Key Features

- **Limit Buy Orders**: Set buy orders that execute when price drops
- **Limit Sell Orders**: Set sell orders that execute when price rises
- **Order Expiry**: Configurable order expiration times
- **Token Support**: Multiple ERC-20 tokens supported
- **Balance Integration**: Real-time token balance checking

## Social Trading Features

- **Trader Discovery**: Find and follow successful traders
- **Performance Tracking**: View trader statistics and success rates
- **Copy Trading**: Automatically copy successful trading strategies
- **Social Interaction**: Message and share with other traders
- **Activity Feed**: Real-time trading activity updates

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Adding New Features

1. Create new pages in the `app/` directory
2. Add navigation links in `components/Navbar.tsx`
3. Update the providers if new Web3 features are needed
4. Add TypeScript interfaces for new data structures

### Styling

The application uses Tailwind CSS with custom components:

- `.btn-primary` - Primary action buttons
- `.btn-secondary` - Secondary action buttons
- `.card` - Card containers
- `.input-field` - Form inputs
- `.text-gradient` - Gradient text effects

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically on push

### Other Platforms

The application can be deployed to any platform that supports Next.js:

- Netlify
- AWS Amplify
- DigitalOcean App Platform
- Railway

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For support and questions:

- Create an issue on GitHub
- Join our Discord community
- Email: support@socialinch.com

## Roadmap

- [ ] Real-time price feeds
- [ ] Advanced order types (stop-loss, take-profit)
- [ ] Portfolio tracking
- [ ] Mobile app
- [ ] More blockchain networks
- [ ] Advanced analytics
- [ ] Social features (comments, likes)
- [ ] Copy trading automation 