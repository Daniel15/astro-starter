import {defineConfig} from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  build: {
    assets: '_build',
  },
  compressHTML: false,
  integrations: [sitemap()],
  // TODO: Change me!
  site: process.env.SITE_URL ?? 'https://example.com/',
});
