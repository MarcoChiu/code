# 程式碼片段庫

此專案是一個程式碼片段庫，旨在幫助開發者快速存取和管理多種程式語言的可重複使用程式碼片段。該庫支援 HTML、JavaScript、C#、SQL 等多種語言。

## 功能特色

- **多語言支援**：提供 JavaScript、C#、SQL、HTML、CSS 和 SCSS 的語法高亮。
- **動態檔案載入**：自動從指定目錄載入 HTML 檔案。
- **可自定義**：輕鬆新增或修改程式碼片段。
- **GitHub Pages 部署**：已完整配置，可部署至 GitHub Pages。
- **響應式設計**：針對桌面與行動裝置進行優化。

## 專案結構

```
code/
├── css/                # 樣式表
│   ├── loading.css
│   └── style.css
├── js/                 # JavaScript 檔案
│   ├── index.js        # 主應用邏輯
│   ├── loading.js      # 載入動畫邏輯
│   └── Utilities.js    # 工具函式
├── page/               # HTML 程式碼片段
│   ├── react/          # React 範例
│   ├── javascript/     # JavaScript 範例
│   ├── csharp/         # C# 範例
│   └── sql/            # SQL 範例
├── index.html          # 主入口檔案
├── vite.config.js      # Vite 配置
├── package.json        # 專案中繼資料與依賴
└── README.md           # 專案文件
```

## 安裝步驟

1. 複製此儲存庫：
   ```bash
   git clone https://github.com/MarcoChiu/code.git
   ```

2. 進入專案目錄：
   ```bash
   cd code
   ```

3. 安裝依賴：
   ```bash
   npm install
   ```

## 使用方法

### 開發模式

啟動開發伺服器：
```bash
npm run dev
```

在瀏覽器中訪問 `http://localhost:3000`。

### 建置專案

建置生產環境版本：
```bash
npm run build
```

### 部署

部署至 GitHub Pages：
```bash
npm run deploy
```

## 配置說明

### Vite 基底路徑

`vite.config.js` 檔案已配置為處理本地開發與 GitHub Pages 部署的不同基底路徑：

```javascript
base: process.env.NODE_ENV === 'production' ? '/code/' : '/'
```

### 動態檔案載入

`index.js` 檔案會動態載入 `page/` 目錄中的 HTML 檔案。您可以透過修改 `generateFileNames` 函式來設定要載入的檔案數量：

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

## 授權條款

此專案採用 MIT 授權條款。詳情請參閱 [LICENSE](LICENSE) 檔案。