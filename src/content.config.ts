import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string(),
    tags: z.array(z.string()),
    heroImage: z.string().optional(),
    ogImage: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const successStories = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/success-stories",
  }),
  schema: z.object({
    clientName: z.string(),
    industry: z.string(),
    challenge: z.string(),
    solutionSummary: z.string(),
    outcome: z.string(),
    testimonialQuote: z.string().optional(),
    testimonialAuthor: z.string().optional(),
    logoRef: z.string().optional(),
    featured: z.boolean().default(false),
    slug: z.string(),
  }),
});

const solutions = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/solutions" }),
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    description: z.string(),
    icon: z.string().optional(),
    order: z.number(),
  }),
});

const products = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/products" }),
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    description: z.string(),
    icon: z.string().optional(),
    order: z.number(),
  }),
});

const clients = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/clients" }),
  schema: z.object({
    name: z.string(),
    logo: z.string(),
    url: z.string().url().optional(),
    industry: z.string().optional(),
    // true = identity confirmed from the live site's labeled gallery tile;
    // false/omitted = filename-only entry (MIGRATION FLAG backlog), hidden from the Clients page.
    verified: z.boolean().default(false),
  }),
});

const partners = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/partners" }),
  schema: z.object({
    name: z.string(),
    logo: z.string(),
    url: z.string().url().optional(),
    description: z.string().optional(),
  }),
});

export const collections = {
  blog,
  "success-stories": successStories,
  solutions,
  products,
  clients,
  partners,
};
