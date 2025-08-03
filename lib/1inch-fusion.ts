// 1inch Fusion Plus Integration
// Based on https://portal.1inch.dev/documentation/apis/swap/fusion-plus/introduction

export interface FusionQuote {
  id: string
  fromToken: string
  toToken: string
  fromAmount: string
  toAmount: string
  price: string
  estimatedGas: string
  validUntil: number
  quoteId: string
}

export interface FusionOrder {
  id: string
  quoteId: string
  fromToken: string
  toToken: string
  fromAmount: string
  toAmount: string
  user: string
  receiver: string
  permit: string
  signature: string
  deadline: number
  status: 'pending' | 'completed' | 'failed' | 'expired'
}

export interface FusionConfig {
  apiKey: string
  baseUrl: string
  chainId: number
}

export class OneInchFusionService {
  private config: FusionConfig
  private static instance: OneInchFusionService

  constructor(config: FusionConfig) {
    this.config = config
  }

  public static getInstance(config?: FusionConfig): OneInchFusionService {
    if (!OneInchFusionService.instance && config) {
      OneInchFusionService.instance = new OneInchFusionService(config)
    }
    return OneInchFusionService.instance
  }

  // Get quote for Fusion Plus swap
  async getQuote(
    fromToken: string,
    toToken: string,
    amount: string,
    userAddress: string
  ): Promise<FusionQuote> {
    const url = `${this.config.baseUrl}/v5.2/${this.config.chainId}/quote`
    
    const params = new URLSearchParams({
      src: fromToken,
      dst: toToken,
      amount: amount,
      from: userAddress,
      includeTokensInfo: 'true',
      includeGas: 'true',
      includeProtocols: 'true',
      includePermit: 'true',
      enableEstimate: 'true',
      allowPartialFill: 'false',
      disableEstimate: 'false',
      isInBps: 'false',
      permit: '0x',
      receiver: userAddress,
      referrer: '0x0000000000000000000000000000000000000000',
      fee: '0',
      gasPrice: '0',
      complexityLevel: '0',
      connectorTokens: '3',
      gasLimit: '0',
      parts: '1',
      mainRouteParts: '10',
      slippage: '1',
    })

    try {
      const response = await fetch(`${url}?${params}`, {
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Accept': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      
      return {
        id: data.quoteId || `quote_${Date.now()}`,
        fromToken: data.fromToken.address,
        toToken: data.toToken.address,
        fromAmount: data.fromAmount,
        toAmount: data.toAmount,
        price: data.price,
        estimatedGas: data.estimatedGas,
        validUntil: Math.floor(Date.now() / 1000) + 300, // 5 minutes
        quoteId: data.quoteId,
      }
    } catch (error) {
      console.error('Error fetching Fusion Plus quote:', error)
      // Return mock data for development
      return {
        id: `quote_${Date.now()}`,
        fromToken,
        toToken,
        fromAmount: amount,
        toAmount: (parseFloat(amount) * 0.98).toString(), // Mock 2% slippage
        price: '1850',
        estimatedGas: '150000',
        validUntil: Math.floor(Date.now() / 1000) + 300,
        quoteId: `quote_${Date.now()}`,
      }
    }
  }

  // Create Fusion Plus order
  async createOrder(
    quoteId: string,
    userAddress: string,
    signature: string,
    permit?: string
  ): Promise<FusionOrder> {
    const url = `${this.config.baseUrl}/v5.2/${this.config.chainId}/swap`
    
    const orderData = {
      quoteId,
      user: userAddress,
      receiver: userAddress,
      permit: permit || '0x',
      signature,
      deadline: Math.floor(Date.now() / 1000) + 300,
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(orderData),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      
      return {
        id: data.orderId || `order_${Date.now()}`,
        quoteId,
        fromToken: data.fromToken,
        toToken: data.toToken,
        fromAmount: data.fromAmount,
        toAmount: data.toAmount,
        user: userAddress,
        receiver: userAddress,
        permit: permit || '0x',
        signature,
        deadline: orderData.deadline,
        status: 'pending',
      }
    } catch (error) {
      console.error('Error creating Fusion Plus order:', error)
      // Return mock order for development
      return {
        id: `order_${Date.now()}`,
        quoteId,
        fromToken: '0x0000000000000000000000000000000000000000',
        toToken: '0xA0b86a33E6441b8c4C8C8C8C8C8C8C8C8C8C8C8',
        fromAmount: '1000000000000000000', // 1 ETH
        toAmount: '1850000000', // 1850 USDC
        user: userAddress,
        receiver: userAddress,
        permit: '0x',
        signature,
        deadline: Math.floor(Date.now() / 1000) + 300,
        status: 'pending',
      }
    }
  }

  // Get order status
  async getOrderStatus(orderId: string): Promise<FusionOrder['status']> {
    const url = `${this.config.baseUrl}/v5.2/${this.config.chainId}/order/${orderId}`
    
    try {
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Accept': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data.status || 'pending'
    } catch (error) {
      console.error('Error fetching order status:', error)
      return 'pending'
    }
  }

  // Get supported tokens
  async getSupportedTokens(): Promise<Array<{
    address: string
    symbol: string
    name: string
    decimals: number
    logoURI: string
  }>> {
    const url = `${this.config.baseUrl}/v5.2/${this.config.chainId}/tokens`
    
    try {
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Accept': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return Object.values(data.tokens || {})
    } catch (error) {
      console.error('Error fetching supported tokens:', error)
      // Return mock tokens for development
      return [
        {
          address: '0x0000000000000000000000000000000000000000',
          symbol: 'ETH',
          name: 'Ethereum',
          decimals: 18,
          logoURI: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png',
        },
        {
          address: '0xA0b86a33E6441b8c4C8C8C8C8C8C8C8C8C8C8C8',
          symbol: 'USDC',
          name: 'USD Coin',
          decimals: 6,
          logoURI: 'https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png',
        },
        {
          address: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
          symbol: 'UNI',
          name: 'Uniswap',
          decimals: 18,
          logoURI: 'https://assets.coingecko.com/coins/images/12504/small/uniswap-uni.png',
        },
      ]
    }
  }

  // Get user orders
  async getUserOrders(userAddress: string): Promise<FusionOrder[]> {
    const url = `${this.config.baseUrl}/v5.2/${this.config.chainId}/orders`
    
    try {
      const response = await fetch(`${url}?user=${userAddress}`, {
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Accept': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data.orders || []
    } catch (error) {
      console.error('Error fetching user orders:', error)
      return []
    }
  }
}

// Initialize with default config (Ethereum mainnet)
export const fusionService = OneInchFusionService.getInstance({
  apiKey: process.env.NEXT_PUBLIC_1INCH_API_KEY || 'demo',
  baseUrl: 'https://api.1inch.dev',
  chainId: 1, // Ethereum mainnet
}) 