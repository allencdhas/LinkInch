'use client'

import { useAccount } from 'wagmi'
import { TrendingUp, Users, Shield, Zap } from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  const { isConnected } = useAccount()

  const features = [
    {
      icon: TrendingUp,
      title: 'Limit Order Trading',
      description: 'Place buy and sell orders with 1inch Limit Order Protocol',
      href: '/buy-orders'
    },
    {
      icon: Users,
      title: 'Social Trading',
      description: 'Follow and copy successful traders in the community',
      href: '/social'
    },
    {
      icon: Zap,
      title: 'Fusion Plus',
      description: 'MEV-protected swaps with gasless transactions',
      href: '/fusion-swap'
    },
    {
      icon: Shield,
      title: 'Secure & Decentralized',
      description: 'Built on Ethereum with industry-leading security',
      href: '#'
    }
  ]

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold text-gradient">
          SocialInch
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          The next generation of social trading powered by 1inch Limit Order Protocol. 
          Connect, trade, and earn with the community.
        </p>
        {!isConnected && (
          <div className="flex justify-center space-x-4">
            <Link href="/social" className="btn-primary">
              Explore Social Trading
            </Link>
            <Link href="/buy-orders" className="btn-secondary">
              Start Trading
            </Link>
          </div>
        )}
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature) => {
          const Icon = feature.icon
          return (
            <Link key={feature.title} href={feature.href}>
              <div className="card hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-primary-50 rounded-lg">
                    <Icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Stats Section */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="card text-center">
          <div className="text-3xl font-bold text-primary-600 mb-2">$2.5M+</div>
          <div className="text-gray-600">Total Volume Traded</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-primary-600 mb-2">1,250+</div>
          <div className="text-gray-600">Active Traders</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-primary-600 mb-2">15,000+</div>
          <div className="text-gray-600">Orders Executed</div>
        </div>
      </div>
    </div>
  )
} 