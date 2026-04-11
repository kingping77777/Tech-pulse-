'use client';

import Image from 'next/image';

interface DynamicArticleImageProps {
  title: string;
  fallbackUrl: string;
}

// Real curated Unsplash images by keyword — no AI generation needed
const TECH_IMAGES = [
  'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1531297172864-45d0614f8111?auto=format&fit=crop&q=80&w=1200',
];

export function DynamicArticleImage({ title, fallbackUrl }: DynamicArticleImageProps) {
  // Use the fallbackUrl (already a real Unsplash image from data.ts) directly
  // If no fallback, pick a deterministic tech image based on title length
  const imageUrl = fallbackUrl && fallbackUrl.startsWith('http')
    ? fallbackUrl
    : TECH_IMAGES[title.length % TECH_IMAGES.length];

  return (
    <Image
      src={imageUrl}
      alt={title}
      fill
      className="object-cover opacity-80 transition-all duration-700"
      priority
      onError={(e) => {
        // If the image fails, fall back to a safe tech image
        (e.target as HTMLImageElement).src = TECH_IMAGES[0];
      }}
    />
  );
}
