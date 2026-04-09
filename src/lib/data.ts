
import type { Article, Company, User, Trend, Comment, HackerNewsStory } from './types';
import { mockArticles } from '@/lib/mock-data';
import { differenceInMinutes } from 'date-fns';

let cachedStories: HackerNewsStory[] = [];
let lastFetchTimestamp: number | null = null;
const CACHE_DURATION_MINUTES = 360; // 6 hours

// --- NEW HACKER NEWS FETCHER ---

const TOP_STORIES_URL = 'https://hacker-news.firebaseio.com/v0/topstories.json';
const ITEM_URL_BASE = 'https://hacker-news.firebaseio.com/v0/item/';

export const getHackerNewsArticles = async (limit = 20): Promise<Article[]> => {
  const now = Date.now();

  // Return cached stories if available and not stale
  if (lastFetchTimestamp && (now - lastFetchTimestamp) < CACHE_DURATION_MINUTES * 60 * 1000 && cachedStories.length > 0) {
    console.log('Returning cached Hacker News stories.');
    return mapHnStoriesToArticles(cachedStories.slice(0, limit));
  }

  console.log('Fetching fresh stories from Hacker News API.');
  try {
    const response = await fetch(TOP_STORIES_URL, { next: { revalidate: 3600 } });
    if (!response.ok) {
      throw new Error(`Failed to fetch top story IDs: ${response.statusText}`);
    }
    const storyIds: number[] = await response.json();

    const storyPromises = storyIds.slice(0, limit * 2) // Fetch more to filter out non-articles
      .map(id => fetch(`${ITEM_URL_BASE}${id}.json`).then(res => res.json()));

    const results = await Promise.allSettled(storyPromises);

    const fetchedStories: HackerNewsStory[] = results
      .filter(result => result.status === 'fulfilled' && result.value)
      .map(result => (result as PromiseFulfilledResult<HackerNewsStory>).value)
      .filter(story => story && story.type === 'story' && story.url && !story.dead && !story.deleted)
      .slice(0, limit);

    if (fetchedStories.length > 0) {
      cachedStories = fetchedStories;
      lastFetchTimestamp = now;
      console.log(`Successfully fetched and cached ${fetchedStories.length} stories from Hacker News.`);
      return mapHnStoriesToArticles(fetchedStories);
    } else {
       console.warn('Hacker News API returned no valid stories. Falling back to mock data.');
       return getMockArticles();
    }
  } catch (error) {
    console.error('Error fetching from Hacker News API:', error);
    console.log('Falling back to mock articles due to API error.');
    return getMockArticles();
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
  const allArticles = await getArticles(50);
  return allArticles.find(a => a.slug === slug || a.id === slug);
}


const mapHnStoriesToArticles = (stories: HackerNewsStory[]): Article[] => {
  // A large pool of distinct, premium "Digital Atelier / Tech / Cyberpunk" images to avoid repeats
  const massiveImagePool: string[] = [
    'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=600', // AI Network
    'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=600', // Robot
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=600', // Cyber Security
    'https://images.unsplash.com/photo-1605792657660-596af9009e82?auto=format&fit=crop&q=80&w=600', // Bitcoin
    'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&q=80&w=600', // Crypto generic
    'https://images.unsplash.com/photo-1553028826-f4804a6dba3b?auto=format&fit=crop&q=80&w=600', // Startup planning
    'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=600', // Sleek office
    'https://images.unsplash.com/photo-1496096265110-f83ad7f96608?auto=format&fit=crop&q=80&w=600', // Server racks
    'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600', // CPU motherboard
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600', // Space data
    'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=600', // Retro wave VR
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=600', // Cyber Matrix
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=600', // Tech office glass
    'https://images.unsplash.com/photo-1531297172864-45d0614f8111?auto=format&fit=crop&q=80&w=600', // Minimalist devices
    'https://images.unsplash.com/photo-1633412802994-5c058f151b66?auto=format&fit=crop&q=80&w=600', // Code on screen
    'https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=600', // Abstract 3D shape
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600', // Fluid colors Tech
    'https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?auto=format&fit=crop&q=80&w=600', // GPU Crypto farm
    'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=600', // Smart phone array
    'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=600'  // Data visualization
  ];

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

  return stories.map((story, index) => {
    const randomUser = users[index % users.length];
    const category = categorizeHackerNewsStory(story.title);
    
    // Hash the ID slightly differently or just module it to pick a unique consistent image
    const imageUrl = massiveImagePool[(story.id + index) % massiveImagePool.length];

    return {
      id: `hn-${story.id}`,
      title: story.title,
      slug: `hn-${story.id}`, // Slugs are not really used for HN links but are part of the type
      content: story.title, // HN API doesn't provide content
      summary: generateHoloSummary(story.title, story.by, story.score),
      tags: getTagsFromTitle(story.title),
      categories: [category],
      company: '',
      imageUrl: imageUrl,
      imageHint: "tech abstract",
      authorId: randomUser.id,
      publishedAt: new Date(story.time * 1000).toISOString(),
      isFeatured: false,
      readTime: Math.ceil(story.title.length / 5 / 200), // Estimated read time
      url: story.url,
    };
  });
};

const categorizeHackerNewsStory = (title: string): string => {
  const lowerTitle = title.toLowerCase();
  if (/\b(ai|ml|llm|neural network|openai|gemini|anthropic)\b/.test(lowerTitle)) return 'AI';
  if (/\b(crypto|bitcoin|ethereum|blockchain|nft)\b/.test(lowerTitle)) return 'Crypto';
  if (/\b(startup|funding|yc|sequoia|a16z)\b/.test(lowerTitle)) return 'Startups';
  if (/\b(apple|google|meta|microsoft|amazon|nvidia)\b/.test(lowerTitle)) return 'Big Tech';
  return 'Tech';
}

const getTagsFromTitle = (title: string): string[] => {
    const tags = new Set<string>();
    const lowerTitle = title.toLowerCase();
    
    if (lowerTitle.includes('ai')) tags.add('AI');
    if (lowerTitle.includes('rust')) tags.add('Rust');
    if (lowerTitle.includes('python')) tags.add('Python');
    if (lowerTitle.includes('server')) tags.add('Backend');
    if (lowerTitle.includes('react')) tags.add('Frontend');
    if (lowerTitle.includes('security')) tags.add('Security');

    if (tags.size === 0) tags.add('General Tech');

    return Array.from(tags).slice(0, 3);
}


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
    photoUrl: `https://picsum.photos T/seed/avatar-4/100/100`,
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
    { keyword: 'Gemini 2.5', score: 95, relatedArticles: [] },
    { keyword: 'Vision Pro 2', score: 92, relatedArticles: [] },
    { keyword: 'Blackwell GPU', score: 88, relatedArticles: [] },
    { keyword: 'Open Source AI', score: 85, relatedArticles: [] },
    { keyword: 'Quantum Supremacy', score: 81, relatedArticles: [] },
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
