# 程式碼查詢庫

一個用於收集和展示程式碼片段的網頁應用，支援多語言程式碼高亮顯示和分類管理。

## 🌐 線上展示

- **GitHub Pages**: [https://marcochiu.github.io/code/](https://marcochiu.github.io/code/)

## ✨ 功能特色

- 📝 支援多種程式語言高亮顯示（JavaScript, C#, SQL, HTML, CSS, SCSS）
- 🗂️ 自動分類管理和側邊欄選單
- 🔍 即時搜尋功能
- 📱 響應式設計，支援桌面和移動裝置
- 📋 一鍵複製程式碼
- 🎨 暗色主題界面
- 🔄 強制刷新按鈕（清除快取）

## 🛠️ 技術棧

- **框架**: Vite 7.2.2
- **語言**: JavaScript (ES6+)
- **樣式**: CSS3
- **UI 庫**: SweetAlert2
- **部署**: GitHub Pages

## 📁 專案結構

```
code/
├── public/
│   └── page/           # HTML 頁面檔案
│       ├── react/      # React 相關頁面
│       ├── javascript/ # JavaScript 相關頁面
│       └── csharp/     # C# 相關頁面
├── js/
│   ├── index.js        # 主程式邏輯
│   ├── loading.js      # 載入動畫
│   └── Utilities.js    # 工具函數
├── css/
│   ├── style.css       # 主樣式
│   └── loading.css     # 載入動畫樣式
├── main.js             # 應用入口
├── index.html          # HTML 模板
└── vite.config.js      # Vite 配置
```

## 🚀 開始使用

### 環境需求

- Node.js 16.0 或更高版本
- npm 或 yarn

### 安裝

```bash
# 複製專案
git clone https://github.com/MarcoChiu/code.git

# 進入專案目錄
cd code

# 安裝依賴
npm install
```

### 開發

```bash
# 啟動開發服務器（支援 HTTPS）
npm run dev

# 訪問 https://localhost:3000
```

### 構建

```bash
# 構建生產版本
npm run build

# 預覽構建結果
npm run serve
```

### 部署

```bash
# 部署到 GitHub Pages
npm run deploy
```

## 📝 使用說明

### 新增程式碼片段

1. 在 `public/page/` 目錄下建立對應分類的資料夾（如 `react/`, `javascript/`, `csharp/`）
2. 建立 HTML 檔案，格式如下：

```html
<!DOCTYPE html>
<html>
<head>
    <title>React - 範例標題</title>
</head>
<body>
    <div>HTML 內容</div>
    
    <script>
        // JavaScript 程式碼
        console.log('Hello World');
    </script>
</body>
</html>
```

3. 在 `js/index.js` 的 `pageDirs` 中添加檔案名稱：

```javascript
var pageDirs = {
    'react': ['react001.html', 'react002.html', 'your-new-file.html'],
    'javascript': [],
    'csharp': []
};
```

### 自訂樣式

編輯 `css/style.css` 檔案來自訂：
- 程式碼高亮配色（`.token-*` 類別）
- 卡片樣式（`.code-card`）
- 側邊欄樣式（`.sidebar`）

## 🎨 程式碼高亮

支援以下程式語言的語法高亮：
- JavaScript (包含 JSX)
- C#
- SQL
- HTML
- CSS
- SCSS

## 🔧 配置說明

### Vite 配置

`vite.config.js` 包含：
- 生產環境 base path 設定（`/code/`）
- HTTPS 開發服務器配置
- BASE_URL 動態替換插件

### 環境變數

- 本地開發：`BASE_URL = '/'`
- GitHub Pages：`BASE_URL = '/code/'`

## 📄 授權

此專案僅供學習和個人使用。

## 👤 作者

MarcoChiu

## 🙏 致謝

- [Vite](https://vitejs.dev/) - 快速的前端構建工具
- [SweetAlert2](https://sweetalert2.github.io/) - 美觀的彈窗提示
- [GitHub Pages](https://pages.github.com/) - 免費的靜態網站託管
