
import type { Article, Company, User, Trend, Comment, HackerNewsStory } from './types';
import { mockArticles } from '@/lib/mock-data';
import { differenceInMinutes } from 'date-fns';

let cachedStories: HackerNewsStory[] = [];
let lastFetchTimestamp: number | null = null;
const CACHE_DURATION_MINUTES = 5; // 5 minutes for fresh news

export function clearCache() {
  cachedStories = [];
  lastFetchTimestamp = null;
}

// --- NEW HACKER NEWS FETCHER ---


const TOP_STORIES_URL = 'https://hacker-news.firebaseio.com/v0/topstories.json';
const ITEM_URL_BASE = 'https://hacker-news.firebaseio.com/v0/item/';

export const getHackerNewsArticles = async (limit = 20): Promise<Article[]> => {
  const now = Date.now();

  // Return cached stories if available and not stale
  if (lastFetchTimestamp && (now - lastFetchTimestamp) < CACHE_DURATION_MINUTES * 60 * 1000 && cachedStories.length >= Math.min(limit, 50)) {
    console.log('Returning cached Hacker News stories.');
    return mapHnStoriesToArticles(cachedStories.slice(0, limit));
  }

  console.log('Fetching fresh stories from Hacker News API.');
  try {
    // 3-second timeout on the top-stories fetch
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    const response = await fetch(TOP_STORIES_URL, { signal: controller.signal, cache: 'no-store' }).finally(() => clearTimeout(timeoutId));
    if (!response.ok) throw new Error(`Failed to fetch top story IDs: ${response.statusText}`);
    const storyIds: number[] = await response.json();

    // Cap candidates at 150 max (3× limit, max 150) to keep SSR fast
    const candidateIds = storyIds.slice(0, Math.min(limit * 3, 150));

    // Helper: fetch one story with a 2-second timeout
    const fetchStory = async (id: number): Promise<HackerNewsStory | null> => {
      try {
        const ctrl = new AbortController();
        const tid = setTimeout(() => ctrl.abort(), 2000);
        const res = await fetch(`${ITEM_URL_BASE}${id}.json`, { signal: ctrl.signal }).finally(() => clearTimeout(tid));
        if (!res.ok) return null;
        return await res.json();
      } catch { return null; }
    };

    // Batch into chunks of 30 to keep load manageable
    const CHUNK = 30;
    const allItems: HackerNewsStory[] = [];
    for (let i = 0; i < candidateIds.length; i += CHUNK) {
      const chunk = candidateIds.slice(i, i + CHUNK);
      const chunkResults = await Promise.all(chunk.map(fetchStory));
      const valid = chunkResults.filter(
        (s): s is HackerNewsStory => s !== null && s.type === 'story' && !!s.url && !s.dead && !s.deleted
      );
      allItems.push(...valid);
      if (allItems.length >= limit) break;
    }

    const fetchedStories = allItems.slice(0, limit);

    if (fetchedStories.length > 0) {
      cachedStories = fetchedStories;
      lastFetchTimestamp = now;
      console.log(`Successfully fetched and cached ${fetchedStories.length} stories from Hacker News.`);
      return mapHnStoriesToArticles(fetchedStories);
    } else {
      console.warn('Hacker News API returned no valid stories. Falling back to mock data.');
      return getMockArticles(limit);
    }
  } catch (error) {
    console.error('Error fetching from Hacker News API:', error);
    console.log('Falling back to mock articles due to API error.');
    return getMockArticles(limit);
  }
};



// --- MOCK DATA SYSTEM ---

export const getMockArticles = (limit: number = 50): Article[] => {
  return mockArticles.slice(0, limit);
}


// --- UTILITY & HELPERS ---

// A simple way to get some articles, trying live first, then falling back to mock
export async function getArticles(limit: number = 20): Promise<Article[]> {
  try {
    const hnArticles = await getHackerNewsArticles(limit);
    if (hnArticles && hnArticles.length > 0) {
      return hnArticles;
    }
  } catch (error) {
    console.error("Hacker News fetch failed, falling back to mock data.", error);
  }
  return getMockArticles(limit);
}

export async function getArticleBySlug(slug: string): Promise<Article | undefined> {
  // If we're looking for a specific Hacker News article, fetch it directly
  // to avoid fetching the top 50 loop and making 100 API calls for one read
  if (slug.startsWith('hn-')) {
    const id = slug.replace('hn-', '');
    try {
      const response = await fetch(`${ITEM_URL_BASE}${id}.json`);
      if (response.ok) {
        const story: HackerNewsStory = await response.json();
        if (story && story.type === 'story' && !story.dead && !story.deleted) {
          // mapHnStoriesToArticles works fine with a single array item
          return mapHnStoriesToArticles([story])[0];
        }
      }
    } catch (error) {
      console.error(`Failed to fetch individual HN story ${id}:`, error);
      // Fallback below
    }
  }

  const allArticles = await getArticles(50);
  return allArticles.find(a => a.slug === slug || a.id === slug);
}


const mapHnStoriesToArticles = (stories: HackerNewsStory[]): Article[] => {
  // Category-specific curated images — each category has its own pool
  const categoryImages: Record<string, string[]> = {
    'AI': [
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1655720033654-a4239dd42d10?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1591696205602-2f950c417cb9?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1675557009001-28b3b19f7f5e?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1668554245893-2430d0077217?auto=format&fit=crop&q=80&w=800',
    ],
    'Crypto': [
      'https://images.unsplash.com/photo-1605792657660-596af9009e82?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1516245834210-c4c142787335?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1524673278499-4fcb794624a3?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1547483238-f400e65ccd56?auto=format&fit=crop&q=80&w=800',
    ],
    'Startups': [
      'https://images.unsplash.com/photo-1553028826-f4804a6dba3b?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800',
    ],
    'Big Tech': [
      'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1531297172864-45d0614f8111?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1472289065668-ce650ac443d2?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800',
    ],
    'Market Trends': [
      'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1535320903710-d993d3d77d29?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1559526324-593bc073d938?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1549421263-5ec394a5ad4c?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9?auto=format&fit=crop&q=80&w=800',
    ],
    'Security': [
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1480506132288-68f7705954bd?auto=format&fit=crop&q=80&w=800',
    ],
    'Hardware': [
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1496096265110-f83ad7f96608?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1604702433319-b46e5e7f8fcf?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1601972599720-36938d4ecd31?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1516110833967-0b5716ca1387?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800',
    ],
    'Web3': [
      'https://images.unsplash.com/photo-1639322537504-6427a16b0a28?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1642790551116-18e4f42b6e34?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1644361566696-3d442b5b482a?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1644143379190-08a5f055de1d?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1639822538507-c25e5f2ebe5f?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1639620431862-a4e98a7b8d6d?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1621504450181-5d356f61d307?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?auto=format&fit=crop&q=80&w=800',
    ],
    'Quantum': [
      'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1636953056323-9c09fdd74fa6?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1518709779341-56cf4535e94b?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1595617795501-9661aafda72a?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1446776858070-70c3d5ed6758?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1614854262318-831574f15f1f?auto=format&fit=crop&q=80&w=800',
    ],
    'Tech': [
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1633412802994-5c058f151b66?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1532879311112-62b897019b37?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1468436139062-f60851436e2a?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800',
    ],
  };

  const generateHoloSummary = (title: string, author: string, score: number): string[] => {
    const intakes = [
      `Digital protocol analysis initiated for artifact: ${title}`,
      `Real-time decentralized metrics scanning architecture node.`,
      `Global network sensors tracking structural viability.`
    ];
    const mechanics = [
      "Discovery fundamentally alters the current deployment pipeline.",
      "Identified as a significant pivot in resource allocation models.",
      "Classified as a critical milestone for ecosystem integration."
    ];
    const validations = [
      `Expect rapid adoption cycles. Validation node: ${author}.`,
      `Further observation of paradigm shifts recommended. Origin traced to ${author}.`,
      `Market volatility and framework evolution highly probable. Metric consensus hit ${score}.`
    ];
    
    return [
        intakes[Math.floor((title.length + score) % intakes.length)],
        mechanics[Math.floor(title.length % mechanics.length)],
        validations[Math.floor(score % validations.length)]
    ];
  };

  // Deep copy the pools to mutate and remove used images
  const pools: Record<string, string[]> = {
    'AI': [...categoryImages['AI']],
    'Crypto': [...categoryImages['Crypto']],
    'Startups': [...categoryImages['Startups']],
    'Big Tech': [...categoryImages['Big Tech']],
    'Market Trends': [...categoryImages['Market Trends']],
    'Security': [...categoryImages['Security']],
    'Hardware': [...categoryImages['Hardware']],
    'Web3': [...categoryImages['Web3']],
    'Quantum': [...categoryImages['Quantum']],
    'Tech': [...categoryImages['Tech']],
  };

  // Extract all 80 images into a flat fallback pool just in case
  const globalPool = Object.values(categoryImages).flat();
  const usedImages = new Set<string>();

  return stories.map((story, index) => {
    const randomUser = users[index % users.length];
    const category = categorizeHackerNewsStory(story.title);
    
    let imageUrl = '';
    const catPool = pools[category] || pools['Tech'];
    
    // 1. Try to get a unique image from the article's own category
    while (catPool.length > 0) {
      // Pull a deterministic index based on story.id
      const pIndex = story.id % catPool.length;
      const candidate = catPool.splice(pIndex, 1)[0]; // Remove to prevent reuse
      
      if (!usedImages.has(candidate)) {
        imageUrl = candidate;
        usedImages.add(candidate);
        break;
      }
    }

    // 2. If the category ran out of unique images, steal an unused image from the global pool
    if (!imageUrl) {
      for (const candidate of globalPool) {
        if (!usedImages.has(candidate)) {
          imageUrl = candidate;
          usedImages.add(candidate);
          break;
        }
      }
    }

    // 3. Absolute mathematical fallback if more than 80 articles are fetched
    if (!imageUrl) {
      imageUrl = `https://picsum.photos/seed/techpulse-${story.id}/800/600`;
    }

    return {
      id: `hn-${story.id}`,
      title: story.title,
      slug: `hn-${story.id}`,
      content: story.title,
      summary: generateHoloSummary(story.title, story.by, story.score),
      tags: getTagsFromTitle(story.title),
      categories: [category],
      company: '',
      imageUrl: imageUrl,
      imageHint: category.toLowerCase(),
      authorId: randomUser.id,
      publishedAt: new Date(story.time * 1000).toISOString(),
      isFeatured: false,
      readTime: Math.max(1, Math.ceil(story.title.length / 5 / 200)),
      url: story.url,
    };
  });
};

const categorizeHackerNewsStory = (title: string): string => {
  const t = title.toLowerCase();
  // AI & Machine Learning
  if (/\b(ai|ml|llm|gpt|gemini|claude|anthropic|openai|mistral|neural|deep.?learn|machine.?learn|large.?lang|chatbot|transformer|diffusion|stable.?diffusion|midjourney|sora|copilot|cursor|agent)\b/.test(t)) return 'AI';
  // Crypto & Web3
  if (/\b(bitcoin|btc|ethereum|eth|crypto|blockchain|nft|defi|web3|solana|polygon|dao|tok[ei]n|wallet|ledger|celsius|binance|coinbase|doge|xrp|altcoin|mining|staking|yield|liquidity)\b/.test(t)) return 'Crypto';
  // Startups & VC
  if (/\b(startup|yc|y.?combinator|funding|series.?[abcde]|seed.?round|vc|venture.?capital|founder|unicorn|pivot|accelerator|incubator|raise|valuation|ipo|acquisition|acqui-hire|a16z|andreessen|sequoia|benchmark)\b/.test(t)) return 'Startups';
  // Big Tech Companies
  if (/\b(apple|google|alphabet|meta|facebook|instagram|whatsapp|microsoft|amazon|aws|nvidia|tesla|samsung|intel|amd|qualcomm|tsmc|ibm|oracle|salesforce|netflix|spotify|uber|airbnb|tiktok|bytedance)\b/.test(t)) return 'Big Tech';
  // Market & Finance
  if (/\b(market|stock|nasdaq|s&p|dow|trading|invest|hedge.?fund|private.?equity|fintech|payment|inflation|recession|fed|interest.?rate|gdp|economy|revenue|profit|earnings|quarter|fiscal)\b/.test(t)) return 'Market Trends';
  // Cybersecurity
  if (/\b(hack|breach|exploit|vulnerab|ransomware|malware|phish|security|cyber|cve|zero.?day|privacy|data.?leak|password|2fa|encrypt|vpn|firewall|ddos|botnet|spyware)\b/.test(t)) return 'Security';
  // Hardware & Chips
  if (/\b(chip|gpu|cpu|semiconductor|silicon|arm|risc|fpga|asic|quantum|server|data.?center|memory|ram|storage|ssd|nvme|ethernet|router|5g|6g|satellite|photon)\b/.test(t)) return 'Hardware';
  // Web3 (secondary check)
  if (/\b(metaverse|nft|dao|web3|decentral|layer.?[12]|bridge|swap|protocol)\b/.test(t)) return 'Web3';
  // Science & Quantum
  if (/\b(quantum|physics|biology|gene|crispr|climate|space|nasa|spacex|rocket|satellite|telescope|science|research)\b/.test(t)) return 'Quantum';
  return 'Tech';
};

const getTagsFromTitle = (title: string): string[] => {
  const tags = new Set<string>();
  const t = title.toLowerCase();
  if (t.match(/\b(ai|ml|llm|gpt|neural|openai|gemini|claude|anthropic)\b/)) tags.add('AI');
  if (t.match(/\b(rust|python|go|typescript|javascript|swift|kotlin|java|c\+\+|wasm)\b/)) tags.add(t.match(/\b(rust|python|go|typescript|javascript|swift|kotlin|java|c\+\+|wasm)\b/)![0].charAt(0).toUpperCase() + t.match(/\b(rust|python|go|typescript|javascript|swift|kotlin|java|c\+\+|wasm)\b/)![0].slice(1));
  if (t.includes('server') || t.includes('backend') || t.includes('api')) tags.add('Backend');
  if (t.includes('react') || t.includes('vue') || t.includes('angular') || t.includes('frontend')) tags.add('Frontend');
  if (t.match(/\b(hack|breach|security|exploit|cyber|privacy)\b/)) tags.add('Security');
  if (t.match(/\b(bitcoin|crypto|ethereum|blockchain|nft|defi)\b/)) tags.add('Crypto');
  if (t.match(/\b(startup|funding|yc|vc|raise|unicorn)\b/)) tags.add('Startup');
  if (t.match(/\b(market|stock|invest|trading|finance)\b/)) tags.add('Finance');
  if (t.match(/\b(chip|gpu|cpu|silicon|hardware|quantum)\b/)) tags.add('Hardware');
  if (t.match(/\b(open.?source|github|linux|community|fork)\b/)) tags.add('Open Source');
  if (tags.size === 0) tags.add('Tech');
  return Array.from(tags).slice(0, 3);
};


// --- EXISTING MOCK DATA ---

export const users: User[] = [
  {
    id: 'user-1',
    displayName: 'Alex Wolfe',
    email: 'alex.wolfe@example.com',
    photoUrl: `https://picsum.photos/seed/avatar-1/100/100`,
    photoHint: 'portrait person',
    role: 'admin',
  },
  {
    id: 'user-2',
    displayName: 'Sarah Stone',
    email: 'sarah.stone@example.com',
    photoUrl: `https://picsum.photos/seed/avatar-2/100/100`,
    photoHint: 'portrait smiling',
    role: 'author',
  },
  {
    id: 'user-3',
    displayName: 'Ben Carter',
    email: 'ben.carter@example.com',
    photoUrl: `https://picsum.photos/seed/avatar-3/100/100`,
    photoHint: 'person glasses',
    role: 'author',
  },
    {
    id: 'user-4',
    displayName: 'Maria Rodriguez',
    email: 'maria.rodriguez@example.com',
    photoUrl: `https://picsum.photos/seed/avatar-4/100/100`,
    photoHint: 'woman portrait',
    role: 'reader',
  }
];

export const companies: Company[] = [
  {
    id: 'comp-1',
    name: 'Google',
    slug: 'google',
    logoUrl: `https://picsum.photos/seed/logo-google/100/100`,
    logoHint: 'logo google',
    industry: 'Technology',
  },
  {
    id: 'comp-2',
    name: 'Apple',
    slug: 'apple',
    logoUrl: `https://picsum.photos/seed/logo-apple/100/100`,
    logoHint: 'logo apple',
    industry: 'Technology',
  },
  {
    id: 'comp-3',
    name: 'Microsoft',
    slug: 'microsoft',
    logoUrl: `https://picsum.photos/seed/logo-microsoft/100/100`,
    logoHint: 'logo microsoft',
    industry: 'Technology',
  },
    {
    id: 'comp-4',
    name: 'Nvidia',
    slug: 'nvidia',
    logoUrl: `https://picsum.photos/seed/logo-nvidia/100/100`,
    logoHint: 'logo nvidia',
    industry: 'Hardware',
  },
  {
    id: 'comp-5',
    name: 'Meta',
    slug: 'meta',
    logoUrl: `https://picsum.photos/seed/logo-meta/100/100`,
    logoHint: 'logo meta',
    industry: 'Social Media',
  }
];

export const trends: Trend[] = [
  { keyword: 'Gemini 2.5', score: 98, relatedArticles: [] },
  { keyword: 'Bitcoin ETF', score: 95, relatedArticles: [] },
  { keyword: 'OpenAI', score: 92, relatedArticles: [] },
  { keyword: 'Nvidia Blackwell', score: 90, relatedArticles: [] },
  { keyword: 'Web3 DeFi', score: 87, relatedArticles: [] },
  { keyword: 'Vision Pro 2', score: 85, relatedArticles: [] },
  { keyword: 'Quantum Computing', score: 82, relatedArticles: [] },
  { keyword: 'Y Combinator', score: 79, relatedArticles: [] },
  { keyword: 'Market Crash', score: 76, relatedArticles: [] },
  { keyword: 'Open Source AI', score: 73, relatedArticles: [] },
];

export const comments: Comment[] = [
  {
    id: 'comment-1',
    articleId: 'mock-1',
    userId: 'user-4',
    text: "This is a fascinating read! The ethical considerations are particularly important.",
    createdAt: new Date("2024-07-22T11:00:00.000Z"),
  },
    {
    id: 'comment-2',
    articleId: 'mock-1',
    userId: 'user-3',
    text: "Great summary. I'm excited to see how these advancements will impact creative industries.",
    createdAt: new Date("2024-07-22T11:30:00.000Z"),
  },
];
