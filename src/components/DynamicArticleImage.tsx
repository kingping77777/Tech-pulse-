'use client';


interface DynamicArticleImageProps {
  title: string;
  fallbackUrl: string;
}

export function DynamicArticleImage({ title, fallbackUrl }: DynamicArticleImageProps) {
  // Use the fallbackUrl (already a real Unsplash image from data.ts) directly
  // If no fallback, pick a deterministic tech image based on title
  const seed = title.replace(/\s+/g, '').slice(0, 15);
  const imageUrl = fallbackUrl && fallbackUrl.startsWith('http')
    ? fallbackUrl
    : `https://picsum.photos/seed/${seed}/800/450`;

  return (
    <img
      src={imageUrl}
      alt={title}
      className="absolute inset-0 w-full h-full object-cover opacity-80 transition-all duration-700"
      onError={(e) => {
        // If the image fails, fall back to a local placeholder or simply null it out to avoid loops
        if ((e.target as HTMLImageElement).src !== 'https://picsum.photos/seed/fallback/800/450') {
           (e.target as HTMLImageElement).src = 'https://picsum.photos/seed/fallback/800/450';
        }
      }}
    />
  );
}
