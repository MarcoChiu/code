import { defineConfig } from 'vite';
import fs from 'fs';

export default defineConfig({
  base: process.env.NODE_ENV === "production" ? '/code/' : '/',
  plugins: [
    {
      name: 'replace-base-url',
      transform(code, id) {
        // 在打包時替換 main.js 中的 BASE_URL
        // 使用更精確的路徑判斷，支援 Windows 和 Unix 路徑
        const isMainJs = id.endsWith('main.js') || id.endsWith('main.js'.replace(/\//g, '\\'));
        if (process.env.NODE_ENV === "production" && isMainJs) {
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
