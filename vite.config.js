import { defineConfig } from 'vite';
import fs from 'fs';

export default defineConfig({
  //開發中 正式環境
  base: process.env.NODE_ENV === "production" ? '/code/' : '/',
  server: {
    https: {
      key: fs.readFileSync('./localhost-key.pem'),
      cert: fs.readFileSync('./localhost.pem')
    },
    port: 3000,
    open: true
  }
});
