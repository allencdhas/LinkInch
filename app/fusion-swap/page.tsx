'use client'

import { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { ArrowRight, Shield, Zap, Clock, TrendingUp, AlertCircle } from 'lucide-react'
import { fusionService, FusionQuote } from '@/lib/1inch-fusion'

interface Token {
  address: string
  symbol: string
  name: string
  decimals: number
  logoURI: string
}

export default function FusionSwapPage() {
  const { isConnected, address } = useAccount()
  const [tokens, setTokens] = useState<Token[]>([])
  const [fromToken, setFromToken] = useState<Token | null>(null)
  const [toToken, setToToken] = useState<Token | null>(null)
  const [amount, setAmount] = useState('')
  const [quote, setQuote] = useState<FusionQuote | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSwapping, setIsSwapping] = useState(false)

  useEffect(() => {
    loadTokens()
  }, [])

  const loadTokens = async () => {
    try {
      const supportedTokens = await fusionService.getSupportedTokens()
      setTokens(supportedTokens)
      if (supportedTokens.length > 0) {
        setFromToken(supportedTokens[0])
        setToToken(supportedTokens[1] || supportedTokens[0])
      }
    } catch (error) {
      console.error('Error loading tokens:', error)
    }
  }

  const getQuote = async () => {
    if (!fromToken || !toToken || !amount || !address) return

    setIsLoading(true)
    try {
      const quoteData = await fusionService.getQuote(
        fromToken.address,
        toToken.address,
        amount,
        address
      )
      setQuote(quoteData)
    } catch (error) {
      console.error('Error getting quote:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSwap = async () => {
    if (!quote || !address) return

    setIsSwapping(true)
    try {
      // In a real implementation, you would:
      // 1. Sign the quote with the user's wallet
      // 2. Submit the order to Fusion Plus
      // 3. Track the order status
      
      const mockSignature = '0x' + '0'.repeat(130) // Mock signature
      
      const order = await fusionService.createOrder(
        quote.quoteId,
        address,
        mockSignature
      )
      
      alert(`Fusion Plus order created! Order ID: ${order.id}`)
      setAmount('')
      setQuote(null)
    } catch (error) {
      console.error('Error creating swap:', error)
      alert('Failed to create swap. Please try again.')
    } finally {
      setIsSwapping(false)
    }
  }

  const switchTokens = () => {
    const temp = fromToken
    setFromToken(toToken)
    setToToken(temp)
    setQuote(null)
  }

  if (!isConnected) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🔗</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Connect Your Wallet</h2>
        <p className="text-gray-600">Connect your wallet to use Fusion Plus swaps</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Fusion Plus Swap</h1>
        <p className="text-gray-600">Advanced trading with MEV protection and gasless transactions</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Swap Form */}
        <div className="lg:col-span-2">
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Create Fusion Plus Swap</h2>
            
            <div className="space-y-6">
              {/* From Token */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  From
                </label>
                <div className="flex space-x-3">
                  <div className="flex-1">
                    <select
                      value={fromToken?.address || ''}
                      onChange={(e) => {
                        const token = tokens.find(t => t.address === e.target.value)
                        setFromToken(token || null)
                        setQuote(null)
                      }}
                      className="input-field"
                    >
                      {tokens.map((token) => (
                        <option key={token.address} value={token.address}>
                          {token.symbol} - {token.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex-1">
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => {
                        setAmount(e.target.value)
                        setQuote(null)
                      }}
                      placeholder="0.0"
                      className="input-field"
                    />
                  </div>
                </div>
              </div>

              {/* Switch Button */}
              <div className="flex justify-center">
                <button
                  onClick={switchTokens}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* To Token */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  To
                </label>
                <div className="flex space-x-3">
                  <div className="flex-1">
                    <select
                      value={toToken?.address || ''}
                      onChange={(e) => {
                        const token = tokens.find(t => t.address === e.target.value)
                        setToToken(token || null)
                        setQuote(null)
                      }}
                      className="input-field"
                    >
                      {tokens.map((token) => (
                        <option key={token.address} value={token.address}>
                          {token.symbol} - {token.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex-1">
                    <input
                      type="number"
                      value={quote?.toAmount || ''}
                      placeholder="0.0"
                      className="input-field bg-gray-50"
                      readOnly
                    />
                  </div>
                </div>
              </div>

              {/* Get Quote Button */}
              <button
                onClick={getQuote}
                disabled={!fromToken || !toToken || !amount || isLoading}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Getting Quote...' : 'Get Quote'}
              </button>

              {/* Quote Details */}
              {quote && (
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <h3 className="font-medium text-gray-900">Quote Details</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Price Impact:</span>
                      <span className="ml-2 font-medium text-green-600">-0.1%</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Estimated Gas:</span>
                      <span className="ml-2 font-medium">{quote.estimatedGas}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Valid Until:</span>
                      <span className="ml-2 font-medium">
                        {new Date(quote.validUntil * 1000).toLocaleTimeString()}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Quote ID:</span>
                      <span className="ml-2 font-medium text-xs">{quote.quoteId}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Swap Button */}
              {quote && (
                <button
                  onClick={handleSwap}
                  disabled={isSwapping}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isSwapping ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Creating Swap...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4" />
                      <span>Execute Fusion Plus Swap</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Info Panel */}
        <div className="space-y-6">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Fusion Plus Benefits</h3>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-start space-x-2">
                <Shield className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <div className="font-medium text-gray-900">MEV Protection</div>
                  <p>Protected from front-running and sandwich attacks</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Zap className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <div className="font-medium text-gray-900">Gasless Transactions</div>
                  <p>No gas fees until order executes</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <TrendingUp className="w-5 h-5 text-purple-600 mt-0.5" />
                <div>
                  <div className="font-medium text-gray-900">Better Pricing</div>
                  <p>Access to multiple DEXs for optimal rates</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">How it Works</h3>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                <p>Get a quote with MEV protection</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                <p>Sign the order with your wallet</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                <p>Order executes automatically with protection</p>
              </div>
            </div>
          </div>

          <div className="card bg-blue-50 border-blue-200">
            <div className="flex items-start space-x-2">
              <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h3 className="font-medium text-blue-800">Quote Expiry</h3>
                <p className="text-sm text-blue-700 mt-1">
                  Quotes are valid for 5 minutes. Execute quickly to get the best rates.
                </p>
              </div>
            </div>
          </div>

          <div className="card bg-yellow-50 border-yellow-200">
            <div className="flex items-start space-x-2">
              <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <h3 className="font-medium text-yellow-800">Important</h3>
                <p className="text-sm text-yellow-700 mt-1">
                  Fusion Plus provides MEV protection but execution is not guaranteed. Market conditions may affect your swap.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 