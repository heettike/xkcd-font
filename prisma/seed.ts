import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Clear existing data
  await prisma.provider.deleteMany()
  await prisma.podcast.deleteMany()
  await prisma.tweet.deleteMany()
  await prisma.video.deleteMany()
  await prisma.article.deleteMany()
  await prisma.investor.deleteMany()
  console.log('Cleared existing data')

  // Seed Investors - one per category
  const investors = [
    {
      name: 'Alex Thompson',
      title: 'Partner at Paradigm Capital',
      category: 'vcs',
      twitter: 'https://twitter.com/alexthompson',
      notes: 'Led investments in Uniswap and Compound. Very responsive on Twitter DMs.'
    },
    {
      name: 'Sarah Chen',
      title: 'General Partner at a16z crypto',
      category: 'vcs',
      twitter: 'https://twitter.com/sarahchen',
      linkedin: 'https://linkedin.com/in/sarahchen',
      notes: 'Focus on infrastructure and DeFi. Prefers warm intros.'
    },
    {
      name: 'Mike Johnson',
      title: 'Angel Investor & Former Coinbase',
      category: 'angels',
      twitter: 'https://twitter.com/mikej',
      notes: 'Writes $25k-$100k checks. Very hands-on with portfolio companies.'
    },
    {
      name: 'Emily Davis',
      title: 'Founder at DeFi Ventures',
      category: 'liquid_funds',
      twitter: 'https://twitter.com/emilydavis',
      notes: 'Liquid fund focused on DeFi tokens. Quick decision maker.'
    },
    {
      name: 'David Kim',
      title: 'Managing Partner at Polychain',
      category: 'vcs',
      twitter: 'https://twitter.com/davidkim',
      notes: 'Focus on L1s and scalability solutions.'
    },
    {
      name: 'Lisa Wang',
      title: 'Angel & Advisor',
      category: 'angels',
      linkedin: 'https://linkedin.com/in/lisawang',
      notes: 'Former VP at Binance. Great for CEX listing intros.'
    },
    {
      name: 'James Wilson',
      title: 'CIO at Multicoin Capital',
      category: 'liquid_funds',
      twitter: 'https://twitter.com/jameswilson',
      notes: 'Both venture and liquid strategies. Deep technical diligence.'
    },
  ]

  for (const investor of investors) {
    await prisma.investor.create({ data: investor })
  }
  console.log(`Created ${investors.length} investors`)

  // Seed Articles - one per category
  const articles = [
    {
      title: 'How to Build Pre-Launch Hype for Your Token',
      url: 'https://example.com/pre-launch-hype',
      category: 'pre_launch',
      notes: 'Great framework for building anticipation before TGE.'
    },
    {
      title: 'ICO Structures: A Complete Guide',
      url: 'https://example.com/ico-structures',
      category: 'ico_details',
      notes: 'Covers Dutch auctions, fixed price sales, and LBPs.'
    },
    {
      title: 'The Philosophy of Decentralization',
      url: 'https://example.com/decentralization',
      category: 'philosophy',
      notes: 'Vitalik\'s essay on progressive decentralization.'
    },
    {
      title: 'Q4 2024 Project Update',
      url: 'https://example.com/q4-update',
      category: 'project_updates',
      notes: 'Example of a well-structured project update post.'
    },
  ]

  for (const article of articles) {
    await prisma.article.create({ data: article })
  }
  console.log(`Created ${articles.length} articles`)

  // Seed Videos
  const videos = [
    {
      title: 'Uniswap Launch Video',
      url: 'https://www.youtube.com/watch?v=example1',
      notes: 'Simple, clean announcement video. Good reference for launch content.'
    },
    {
      title: 'How Aave Built a Billion Dollar Protocol',
      url: 'https://www.youtube.com/watch?v=example2',
      notes: 'Documentary style - great for brand building.'
    },
  ]

  for (const video of videos) {
    await prisma.video.create({ data: video })
  }
  console.log(`Created ${videos.length} videos`)

  // Seed Tweets
  const tweets = [
    {
      content: 'Just launched our protocol. After 2 years of building in stealth, we\'re finally live. Here\'s the thread on what we built and why...',
      tweetUrl: 'https://twitter.com/example/status/1',
      notes: 'Example of a great launch thread. Clear narrative structure.'
    },
    {
      content: 'Our tokenomics explained: 1. Community: 40% 2. Team: 20% (4yr vest) 3. Treasury: 25% 4. Investors: 15%',
      tweetUrl: 'https://twitter.com/example/status/2',
      notes: 'Transparent tokenomics communication - well received by community.'
    },
  ]

  for (const tweet of tweets) {
    await prisma.tweet.create({ data: tweet })
  }
  console.log(`Created ${tweets.length} tweets`)

  // Seed Podcasts
  const podcasts = [
    {
      title: 'Bankless: The Future of DeFi',
      url: 'https://spotify.com/episode/1',
      notes: 'Good example of founder storytelling on a major crypto podcast.'
    },
    {
      title: 'Unchained: Interview with Vitalik',
      url: 'https://spotify.com/episode/2',
      notes: 'Technical deep dive format - good for protocol launches.'
    },
  ]

  for (const podcast of podcasts) {
    await prisma.podcast.create({ data: podcast })
  }
  console.log(`Created ${podcasts.length} podcasts`)

  // Seed Providers - one per category
  const providers = [
    {
      name: 'Web3 Studio',
      website: 'https://web3studio.io',
      avgPrice: '$50,000 - $100,000',
      category: 'agencies',
      subcategory: 'Full-Service',
      notes: 'Did the Arbitrum and Optimism launches. Very professional.'
    },
    {
      name: 'DeFi Designs',
      website: 'https://defidesigns.co',
      avgPrice: '$10,000 - $25,000',
      category: 'agencies',
      subcategory: 'Design',
      notes: 'Great for brand identity and UI/UX. Fast turnaround.'
    },
    {
      name: 'The Crypto Pod',
      website: 'https://cryptopod.fm',
      avgPrice: '$2,000 - $5,000',
      category: 'podcasters',
      notes: '50k+ listeners per episode. Good for founder interviews.'
    },
    {
      name: 'Crypto Whale',
      website: 'https://twitter.com/cryptowhale',
      avgPrice: '$5,000 - $15,000',
      category: 'kols',
      notes: '500k followers. Great engagement rates. Does thread sponsorships.'
    },
    {
      name: 'DeFi Degen',
      website: 'https://twitter.com/defidegen',
      avgPrice: '$3,000 - $8,000',
      category: 'kols',
      notes: '200k followers. Very authentic voice, doesn\'t shill everything.'
    },
    {
      name: 'BlockFilm Studio',
      website: 'https://blockfilm.io',
      avgPrice: '$15,000 - $50,000',
      category: 'filmmakers',
      notes: 'Did the Solana documentary. Cinema quality production.'
    },
    {
      name: 'Wintermute',
      website: 'https://wintermute.com',
      avgPrice: 'Custom pricing',
      category: 'market_makers',
      notes: 'Tier 1 market maker. Works with top CEXs. Requires significant volume.'
    },
    {
      name: 'GSR Markets',
      website: 'https://gsr.io',
      avgPrice: 'Custom pricing',
      category: 'market_makers',
      notes: 'Established MM with good reputation. Flexible deal structures.'
    },
    {
      name: 'Crypto Legal LLP',
      website: 'https://cryptolegal.io',
      avgPrice: '$500/hour',
      category: 'miscellaneous',
      subcategory: 'Legal',
      notes: 'Specialized in token launches and regulatory compliance.'
    },
  ]

  for (const provider of providers) {
    await prisma.provider.create({ data: provider })
  }
  console.log(`Created ${providers.length} providers`)

  console.log('Seeding complete!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
