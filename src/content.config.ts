import { defineConfig } from 'astro/config';
import reimu from 'astro-theme-reimu';

export default defineConfig({
  site: 'https://moyuyf.cn',
  integrations: [
    reimu()
  ]
});
