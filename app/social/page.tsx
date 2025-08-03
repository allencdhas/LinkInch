'use client'

import { useState } from 'react'
import { useAccount } from 'wagmi'
import { Heart, MessageCircle, Share2, TrendingUp, UserPlus, Star } from 'lucide-react'

interface Trader {
  id: string
  name: string
  avatar: string
  address: string
  followers: number
  following: number
  totalVolume: string
  successRate: number
  isFollowing: boolean
  recentTrades: Array<{
    token: string
    type: 'buy' | 'sell'
    amount: string
    price: string
    timestamp: string
  }>
}

export default function SocialPage() {
  const { isConnected } = useAccount()
  const [traders, setTraders] = useState<Trader[]>([
    {
      id: '1',
      name: 'CryptoWhale',
      avatar: '🐋',
      address: '0x1234...5678',
      followers: 1250,
      following: 45,
      totalVolume: '$450K',
      successRate: 87,
      isFollowing: false,
      recentTrades: [
        { token: 'ETH', type: 'buy', amount: '2.5', price: '$1,850', timestamp: '2h ago' },
        { token: 'USDC', type: 'sell', amount: '5000', price: '$1.00', timestamp: '4h ago' }
      ]
    },
    {
      id: '2',
      name: 'DeFiTrader',
      avatar: '🚀',
      address: '0x8765...4321',
      followers: 890,
      following: 32,
      totalVolume: '$320K',
      successRate: 92,
      isFollowing: true,
      recentTrades: [
        { token: 'UNI', type: 'buy', amount: '150', price: '$5.20', timestamp: '1h ago' },
        { token: 'LINK', type: 'sell', amount: '200', price: '$12.50', timestamp: '3h ago' }
      ]
    },
    {
      id: '3',
      name: 'YieldFarmer',
      avatar: '🌾',
      address: '0x9876...5432',
      followers: 2100,
      following: 78,
      totalVolume: '$780K',
      successRate: 95,
      isFollowing: false,
      recentTrades: [
        { token: 'AAVE', type: 'buy', amount: '50', price: '$85.30', timestamp: '30m ago' },
        { token: 'COMP', type: 'buy', amount: '100', price: '$45.20', timestamp: '2h ago' }
      ]
    }
  ])

  const toggleFollow = (traderId: string) => {
    setTraders(traders.map(trader => 
      trader.id === traderId 
        ? { ...trader, isFollowing: !trader.isFollowing }
        : trader
    ))
  }

  if (!isConnected) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🔗</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Connect Your Wallet</h2>
        <p className="text-gray-600">Connect your wallet to access the social trading features</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Social Trading</h1>
          <p className="text-gray-600">Follow successful traders and copy their strategies</p>
        </div>
        <button className="btn-primary flex items-center space-x-2">
          <UserPlus className="w-4 h-4" />
          <span>Find Traders</span>
        </button>
      </div>

      <div className="grid gap-6">
        {traders.map((trader) => (
          <div key={trader.id} className="card">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="text-3xl">{trader.avatar}</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{trader.name}</h3>
                  <p className="text-sm text-gray-500">{trader.address}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm text-gray-600">{trader.successRate}% success</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      {trader.followers} followers
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => toggleFollow(trader.id)}
                  className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                    trader.isFollowing
                      ? 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                      : 'bg-primary-600 text-white hover:bg-primary-700'
                  }`}
                >
                  {trader.isFollowing ? 'Following' : 'Follow'}
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-lg font-semibold text-primary-600">{trader.totalVolume}</div>
                <div className="text-sm text-gray-600">Total Volume</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-lg font-semibold text-green-600">{trader.successRate}%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-lg font-semibold text-blue-600">{trader.following}</div>
                <div className="text-sm text-gray-600">Following</div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Recent Trades</h4>
              <div className="space-y-2">
                {trader.recentTrades.map((trade, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${
                        trade.type === 'buy' ? 'bg-green-500' : 'bg-red-500'
                      }`} />
                      <div>
                        <div className="font-medium text-gray-900">
                          {trade.type === 'buy' ? 'Bought' : 'Sold'} {trade.amount} {trade.token}
                        </div>
                        <div className="text-sm text-gray-500">{trade.timestamp}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-gray-900">{trade.price}</div>
                      <div className="text-sm text-gray-500">per {trade.token}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-700">
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-sm">Message</span>
                </button>
                <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-700">
                  <Share2 className="w-4 h-4" />
                  <span className="text-sm">Share</span>
                </button>
              </div>
              <button className="btn-primary">
                Copy Strategy
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 