'use client'

import { useAccount } from 'wagmi'
import { TrendingUp, Users, Shield, Zap } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

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
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          The next generation of social trading powered by 1inch Limit Order Protocol. 
          Connect, trade, and earn with the community.
        </p>
        {!isConnected && (
          <div className="flex justify-center space-x-4">
            <Button asChild size="lg">
              <Link href="/social">
                Explore Social Trading
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/buy-orders">
                Start Trading
              </Link>
            </Button>
          </div>
        )}
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature) => {
          const Icon = feature.icon
          return (
            <Link key={feature.title} href={feature.href}>
              <Card className="hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">
                      {feature.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>

      {/* Stats Section */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-primary mb-2">$2.5M+</div>
            <CardDescription>Total Volume Traded</CardDescription>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-primary mb-2">1,250+</div>
            <CardDescription>Active Traders</CardDescription>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-primary mb-2">15,000+</div>
            <CardDescription>Orders Executed</CardDescription>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 