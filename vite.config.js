import { defineConfig } from 'vite';
import fs from 'fs';

export default defineConfig({
  base: process.env.NODE_ENV === "production" ? '/code/' : '/',
  plugins: [
    {
      name: 'replace-base-url',
      transform(code, id) {
        // 在打包時替換 main.js 中的 BASE_URL
        if (process.env.NODE_ENV === "production" && id.endsWith('main.js')) {
          return code.replace(
            "window.__BASE_URL__ = '/';",
            "window.__BASE_URL__ = '/code/';"
          );
        }
        return code;
      }
    }
  ],
  server: {
    https: {
      key: fs.readFileSync('./localhost-key.pem'),
      cert: fs.readFileSync('./localhost.pem')
    },
    port: 3000,
    open: true
  }
});
