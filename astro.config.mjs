// @ts-check
import { defineConfig } from 'astro/config';

import preact from "@astrojs/preact";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: 'https://AlejandroGorgues.github.io',
  markdown: {
    shikiConfig: {
      // theme: 'ayu-dark',
      theme: 'one-light',
      wrap:false
    },
  },
  prefetch: true,
  devToolbar: {
      enabled: false
  },

  redirects: {
      "/project": "/project/1",
      "/archive": "/archive/1",
      "/posts": "/posts/1",
      "/":"/posts/1"
  },
  integrations: [preact({ compat: true }), mdx()]
});