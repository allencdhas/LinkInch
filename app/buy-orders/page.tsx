'use client'

import { useState } from 'react'
import { useAccount, useContractWrite, usePrepareContractWrite } from 'wagmi'
import { ArrowUp, DollarSign, Clock, AlertCircle } from 'lucide-react'

interface Token {
  symbol: string
  name: string
  address: string
  decimals: number
  price: string
}

const tokens: Token[] = [
  { symbol: 'ETH', name: 'Ethereum', address: '0x0000000000000000000000000000000000000000', decimals: 18, price: '$1,850' },
  { symbol: 'USDC', name: 'USD Coin', address: '0xA0b86a33E6441b8c4C8C8C8C8C8C8C8C8C8C8C8', decimals: 6, price: '$1.00' },
  { symbol: 'UNI', name: 'Uniswap', address: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984', decimals: 18, price: '$5.20' },
  { symbol: 'LINK', name: 'Chainlink', address: '0x514910771AF9Ca656af840dff83E8264EcF986CA', decimals: 18, price: '$12.50' },
]

export default function BuyOrdersPage() {
  const { isConnected } = useAccount()
  const [selectedToken, setSelectedToken] = useState<Token>(tokens[0])
  const [amount, setAmount] = useState('')
  const [limitPrice, setLimitPrice] = useState('')
  const [expiry, setExpiry] = useState('7')
  const [isLoading, setIsLoading] = useState(false)

  const handlePlaceOrder = async () => {
    if (!isConnected) return
    
    setIsLoading(true)
    try {
      // Here you would integrate with 1inch Limit Order Protocol
      // This is a mock implementation
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Mock success
      alert('Buy order placed successfully!')
      setAmount('')
      setLimitPrice('')
    } catch (error) {
      console.error('Error placing order:', error)
      alert('Failed to place order. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (!isConnected) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🔗</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Connect Your Wallet</h2>
        <p className="text-gray-600">Connect your wallet to place buy orders</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Place Buy Orders</h1>
        <p className="text-gray-600">Set limit buy orders using 1inch Limit Order Protocol</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Order Form */}
        <div className="lg:col-span-2">
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Create Buy Order</h2>
            
            <div className="space-y-6">
              {/* Token Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Token to Buy
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {tokens.map((token) => (
                    <button
                      key={token.symbol}
                      onClick={() => setSelectedToken(token)}
                      className={`p-3 rounded-lg border-2 transition-colors duration-200 ${
                        selectedToken.symbol === token.symbol
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-medium text-gray-900">{token.symbol}</div>
                      <div className="text-sm text-gray-500">{token.price}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount to Buy
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.0"
                    className="input-field pr-12"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    {selectedToken.symbol}
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Current price: {selectedToken.price}
                </p>
              </div>

              {/* Limit Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Limit Price (USD)
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="number"
                    value={limitPrice}
                    onChange={(e) => setLimitPrice(e.target.value)}
                    placeholder="0.00"
                    className="input-field pl-10"
                  />
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Order will execute when price drops to this level
                </p>
              </div>

              {/* Expiry */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Order Expiry
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <select
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    className="input-field pl-10"
                  >
                    <option value="1">1 day</option>
                    <option value="7">7 days</option>
                    <option value="30">30 days</option>
                    <option value="90">90 days</option>
                  </select>
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-3">Order Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Token:</span>
                    <span className="font-medium">{selectedToken.symbol}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-medium">{amount || '0'} {selectedToken.symbol}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Limit Price:</span>
                    <span className="font-medium">${limitPrice || '0'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Value:</span>
                    <span className="font-medium">
                      ${amount && limitPrice ? (parseFloat(amount) * parseFloat(limitPrice)).toFixed(2) : '0'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Place Order Button */}
              <button
                onClick={handlePlaceOrder}
                disabled={!amount || !limitPrice || isLoading}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Placing Order...</span>
                  </>
                ) : (
                  <>
                    <ArrowUp className="w-4 h-4" />
                    <span>Place Buy Order</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Info Panel */}
        <div className="space-y-6">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">How it Works</h3>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                <p>Set your desired buy price and amount</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                <p>Order executes automatically when market price reaches your limit</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                <p>Orders can be cancelled anytime before execution</p>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Benefits</h3>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>No gas fees until order executes</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Better prices than market orders</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Automated execution</span>
              </div>
            </div>
          </div>

          <div className="card bg-yellow-50 border-yellow-200">
            <div className="flex items-start space-x-2">
              <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <h3 className="font-medium text-yellow-800">Important</h3>
                <p className="text-sm text-yellow-700 mt-1">
                  Limit orders are not guaranteed to execute. Market conditions may prevent your order from being filled.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 