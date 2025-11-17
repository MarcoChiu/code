# 程式碼片段管理系統

此專案是一個專業的程式碼片段管理系統，旨在幫助開發者高效地存取、管理及重複使用多種程式語言的程式碼片段。該系統支援多語言語法高亮，並提供動態檔案載入與 GitHub Pages 部署功能。

## 功能特色

- **多語言語法高亮**：支援 JavaScript、C#、SQL、HTML、CSS 和 SCSS，提供清晰的程式碼展示。
- **動態檔案載入**：自動從指定目錄載入 HTML 檔案，無需手動更新。
- **模組化設計**：採用模組化架構，便於功能擴展與維護。
- **GitHub Pages 部署**：完整配置，支援快速部署至 GitHub Pages。
- **響應式設計**：針對桌面與行動裝置進行優化，提供一致的使用體驗。
- **高效搜尋與分類**：內建搜尋功能，支援依分類篩選程式碼片段。

## 專案結構

```
code/
├── css/                # 樣式表
│   ├── loading.css     # 載入動畫樣式
│   └── style.css       # 全域樣式
├── js/                 # JavaScript 檔案
│   ├── index.js        # 主應用邏輯
│   ├── loading.js      # 載入動畫邏輯
│   └── Utilities.js    # 工具函式庫
├── page/               # HTML 程式碼片段
│   ├── react/          # React 範例
│   ├── javascript/     # JavaScript 範例
│   ├── csharp/         # C# 範例
│   └── sql/            # SQL 範例
├── index.html          # 主入口檔案
├── vite.config.js      # Vite 配置檔案
├── package.json        # 專案中繼資料與依賴
└── README.md           # 專案文件
```

## 安裝與執行

### 環境需求

- Node.js 版本：^16.0.0
- npm 版本：^8.0.0

### 安裝步驟

1. 複製此儲存庫：
   ```bash
   git clone https://github.com/MarcoChiu/code.git
   ```

2. 進入專案目錄：
   ```bash
   cd code
   ```

3. 安裝專案依賴：
   ```bash
   npm install
   ```

### 開發模式

啟動開發伺服器：
```bash
npm run dev
```

伺服器啟動後，開啟瀏覽器並訪問 `http://localhost:3000`。

### 建置專案

建置生產環境版本：
```bash
npm run build
```

建置完成的檔案將輸出至 `dist/` 目錄。

### 部署至 GitHub Pages

執行以下指令將專案部署至 GitHub Pages：
```bash
npm run deploy
```

部署完成後，可透過 `https://<username>.github.io/code/` 訪問專案。

## 配置說明

### Vite 基底路徑

`vite.config.js` 檔案已配置為處理本地開發與 GitHub Pages 部署的不同基底路徑：

```javascript
base: process.env.NODE_ENV === 'production' ? '/code/' : '/'
```

此配置確保在本地開發環境中使用根路徑 `/`，而在 GitHub Pages 部署時使用 `/code/` 作為基底路徑。

### 動態檔案載入

`index.js` 檔案提供動態檔案載入功能，您可以透過修改 `generateFileNames` 函式來設定要載入的檔案數量：

```javascript
function generateFileNames(count) {
    var files = [];
    for (var i = 1; i <= count; i++) {
        var num = i.toString().padStart(3, '0');
        files.push(num + '.html');
    }
    return files;
}
```

此函式會根據指定的數量自動生成檔案名稱，例如：
- `generateFileNames(3)` 會生成 `['001.html', '002.html', '003.html']`
- `generateFileNames(0)` 會返回空陣列。

## 常見問題

### 如何新增程式碼片段？

1. 將新的 HTML 檔案新增至對應的 `page/<分類>/` 目錄。
2. 更新 `index.js` 中的 `pageDirs` 配置，或直接修改 `generateFileNames` 的參數。
3. 重新啟動開發伺服器以載入新檔案。

### 部署後無法正確載入資源？

請確認 `vite.config.js` 中的 `base` 配置是否正確，並確保所有資源路徑均以 `window.__BASE_URL__` 作為前綴。

## 授權條款

此專案採用 MIT 授權條款。詳情請參閱 [LICENSE](LICENSE) 檔案。

---

若有任何問題或建議，歡迎提交 Issue 或聯絡專案維護者。