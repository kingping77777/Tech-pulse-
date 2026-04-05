import { z } from 'zod';

export const ArticleSchema = z.object({
  id: z.string().describe("A unique identifier for the article."),
  title: z.string().describe("The title of the news article."),
  slug: z.string().describe("A URL-friendly slug for the article."),
  content: z.string().describe("The full content of the news article."),
  summary: z.string().describe("A concise summary of the article."),
  tags: z.array(z.string()).describe("An array of relevant tags."),
  categories: z.array(z.string()).describe("An array of categories the article belongs to."),
  company: z.string().describe("The ID of the company associated with the article, if any."),
  imageUrl: z.string().url().describe("A URL for the article's header image."),
  imageHint: z.string().describe("A hint for AI to generate a relevant image."),
  authorId: z.string().describe("The ID of the article's author."),
  publishedAt: z.string().datetime().describe("The publication date and time in ISO 8601 format."),
  isFeatured: z.boolean().describe("Indicates if the article is a featured story."),
  readTime: z.number().optional().describe("An estimated read time in minutes."),
});
