# AuraSpend 網站首頁

這是 AuraSpend AI 智能記帳應用的官方網站首頁。

## 📁 文件結構

```
website/
├── index.html              # 主頁面 HTML
├── styles.css              # 樣式表
├── script.js               # JavaScript 交互邏輯
├── ASSETS_GUIDE.md         # 圖片資源詳細說明
├── README.md               # 本文檔
└── assets/                 # 圖片資源目錄（待添加）
    ├── logo.svg
    ├── badges/
    ├── hero/
    ├── features/
    ├── steps/
    └── screenshots/
```

## 🚀 快速開始

### 1. 打開網頁
直接在瀏覽器中打開 `index.html` 即可查看首頁。

```bash
# Windows
start index.html

# macOS
open index.html

# Linux
xdg-open index.html
```

### 2. 本地服務器（推薦）
為了更好的開發體驗，建議使用本地服務器：

#### 使用 Python
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

#### 使用 Node.js
```bash
# 安裝 http-server
npm install -g http-server

# 啟動服務器
http-server -p 8000
```

#### 使用 VS Code
安裝 "Live Server" 擴展，右鍵點擊 `index.html` 選擇 "Open with Live Server"

然後在瀏覽器訪問 `http://localhost:8000`

## 🎨 圖片資源準備

目前所有圖片使用的是 placeholder 路徑。請按照以下步驟添加實際圖片：

### 詳細說明
請查看 [ASSETS_GUIDE.md](ASSETS_GUIDE.md) 獲取：
- 完整的圖片清單
- 每張圖片的詳細規格
- 建議的設計風格
- 製作工具推薦

### 快速清單
需要準備的圖片資源：
- **Logo**: 1個 (SVG 格式)
- **下載徽章**: 5個 (App Store, Google Play, Expo)
- **首屏素材**: 1張海報圖 + 1個演示影片
- **功能圖示**: 6個圖示 + 6張演示截圖
- **使用流程**: 3張流程圖
- **應用截圖**: 6張手機截圖

## ✨ 主要功能

### 已實現的功能
✅ 響應式設計（支援手機、平板、桌面）  
✅ 流暢的滾動動畫  
✅ 移動端導航菜單  
✅ 截圖輪播展示  
✅ 影片播放模態框  
✅ 平滑滾動錨點導航  
✅ 交互式按鈕與懸停效果  
✅ 語言切換器（框架）  

### 頁面區塊
1. **導航欄** - 固定頂部，包含 Logo 和主要導航鏈接
2. **Hero 區** - 大標題、副標題、CTA 按鈕和演示影片
3. **核心功能** - 6個功能卡片展示主要特點
4. **使用流程** - 3步驟說明使用方式
5. **應用截圖** - 輪播展示應用界面
6. **亮點展示** - 4個關鍵優勢
7. **未來規劃** - Roadmap 時間軸
8. **下載區** - CTA 與下載按鈕
9. **頁腳** - 聯絡資訊與文檔鏈接

## 🎨 設計系統

### 配色方案
基於 AuraSpend 品牌色彩：
- **主色**: `#6366F1` (Indigo)
- **次要色**: `#EC4899` (Pink)
- **強調色**: `#F59E0B` (Amber)
- **中性色**: Gray 系列

### 字體
- 西文: Inter
- 中文: Noto Sans TC
- Fallback: 系統默認 Sans-serif

### 響應式斷點
- 手機: < 480px
- 平板: 481px - 768px
- 桌面: 769px - 1024px
- 大屏: > 1024px

## 🛠 自定義與修改

### 修改內容
所有文案內容都在 `index.html` 中，可直接編輯：
- 標題、副標題
- 功能描述
- 路線圖項目
- 聯絡資訊

### 修改樣式
編輯 `styles.css` 來調整：
- 顏色變量（:root 部分）
- 間距和尺寸
- 動畫效果
- 響應式佈局

### 添加功能
編輯 `script.js` 來添加：
- 自定義交互
- 表單處理
- 分析追蹤
- 語言切換邏輯

## 📱 瀏覽器支援

- ✅ Chrome (最新版)
- ✅ Firefox (最新版)
- ✅ Safari (最新版)
- ✅ Edge (最新版)
- ⚠️ IE11 (部分功能不支援)

## 🔧 進階配置

### SEO 優化
在 `<head>` 中添加：
```html
<meta property="og:title" content="AuraSpend - AI 智能記帳">
<meta property="og:description" content="用 AI 記帳，讓每筆消費都變得輕鬆">
<meta property="og:image" content="assets/og-image.png">
<meta property="og:url" content="https://auraspend.com">
```

### Google Analytics
在 `</body>` 前添加：
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### 部署
可部署至：
- **GitHub Pages**: 免費靜態網站託管
- **Netlify**: 自動化部署，支援表單
- **Vercel**: 快速部署，優秀的效能
- **自己的伺服器**: 使用 Nginx 或 Apache

## 📝 待辦事項

- [ ] 準備所有圖片資源（參考 ASSETS_GUIDE.md）
- [ ] 更新下載鏈接為實際的 App Store / Play Store URL
- [ ] 實現語言切換功能（中/英）
- [ ] 添加 Beta 測試報名表單
- [ ] 設置 Google Analytics 或其他分析工具
- [ ] SEO 元標籤優化
- [ ] Open Graph 圖片準備
- [ ] 部署到生產環境
- [ ] 設置自定義域名
- [ ] SSL 證書配置

## 🤝 貢獻

如需修改或改進網站，請：
1. 編輯相應的 HTML/CSS/JS 檔案
2. 在本地測試所有更改
3. 確保響應式設計正常運作
4. 檢查不同瀏覽器的兼容性

## 📞 聯絡

如有問題或建議，請聯絡：
- GitHub Issues: [專案倉庫]
- Email: support@auraspend.com

---

**版本**: 1.0.0  
**最後更新**: 2026-01-16  
**授權**: 與 AuraSpend 主專案相同
