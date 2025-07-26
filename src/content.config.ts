import path from "node:path"
import fs from "node:fs/promises";
// Import the glob loader
import { glob } from "astro/loaders";
// Import utilities from `astro:content`
import { z, defineCollection } from "astro:content";
// Define a `loader` and `schema` for each collection
const post = defineCollection({
    loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/data/post" }),
    schema: z.object({
      title: z.string(),
      pubDate: z.date(),
      modDate: z.date(),
      description: z.string(),
      image: z.object({
        url: z.string(),
        alt: z.string()
      }),
      tags: z.array(z.string())
    })
});

const project = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: "./src/data/project" }),
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    description: z.string(),
    image: z.object({
      url: z.string(),
      alt: z.string()
    }),
    tags: z.array(z.string()),
    source: z.string(),
    demo: z.string(),
  })
});

const job = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: "./src/data/job" }),
  schema: z.object({
    title: z.string(),
    entity: z.string(),
    startDate: z.date(),
    endDate: z.union([z.date(), z.string()]),
    techs: z.array(z.string())
  })
});

const study = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: "./src/data/study" }),
  schema: z.object({
    title: z.string(),
    entity: z.string(),
    startDate: z.date(),
    endDate: z.union([z.date(), z.string()]),
    techs: z.array(z.string())
  })
});

const miscellaneous = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: "./src/data/miscellaneous" }),
  schema: z.object({
    title: z.string(),
    entity: z.string(),
    pubDate: z.date(),
  })
});

const link = defineCollection({
  // loader: glob({ pattern: '**/[^_]*.json', base: "./src/data/tool" }),
  // loader: file("./src/data/tool/tool.json",{
  //   parser: (fileContent) =>{}
  // } ),
  loader: async () => {
    // Ruta absoluta al archivo JSON
    const filePath = path.resolve("./src/data/link/link.json");
    const file = await fs.readFile(filePath, "utf-8");
    const data = JSON.parse(file);
    
    // Devuelve un array de objetos con id
    return data.map((link: { url: any; title: any; tags: string; }) => ({
      id: link.url,
      title: link.title,
      url: link.url,
      tags: link.tags.split(","),
    }));
  },
  schema: z.object({
    title: z.string(),
    url: z.string(),
    tags: z.array(z.string()),
  })
});
// Export a single `collections` object to register your collection(s)
export const collections = { post, project, job, study, miscellaneous, link };