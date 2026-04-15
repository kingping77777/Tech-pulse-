'use client';

import Image from 'next/image';

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
    <Image
      src={imageUrl}
      alt={title}
      fill
      className="object-cover opacity-80 transition-all duration-700"
      priority
      onError={(e) => {
        // If the image fails, fall back
        (e.target as HTMLImageElement).src = `https://picsum.photos/seed/fallback/800/450`;
      }}
    />
  );
}
