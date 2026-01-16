# AuraSpend 網站圖片資源需求說明 🎨

本文檔詳細說明了 AuraSpend 首頁所需的所有圖片資源、規格、建議內容及存放路徑。

---

## 📁 資源目錄結構

```
website/
├── assets/
│   ├── logo.svg                          # Logo 檔案
│   ├── badges/                           # 下載徽章
│   │   ├── app-store.svg
│   │   ├── google-play.svg
│   │   ├── app-store-large.svg
│   │   ├── google-play-large.svg
│   │   └── expo-download.svg
│   ├── hero/                             # 首屏區域
│   │   ├── demo-video-poster.png
│   │   └── demo-video.mp4
│   ├── features/                         # 功能卡片圖片
│   │   ├── ocr-icon.png
│   │   ├── ocr-demo.png
│   │   ├── budget-icon.png
│   │   ├── budget-demo.png
│   │   ├── ai-icon.png
│   │   ├── ai-demo.png
│   │   ├── pet-icon.png
│   │   ├── pet-demo.png
│   │   ├── currency-icon.png
│   │   ├── currency-demo.png
│   │   ├── sync-icon.png
│   │   └── sync-demo.png
│   ├── steps/                            # 使用流程圖片
│   │   ├── step1-capture.png
│   │   ├── step2-ai.png
│   │   └── step3-save.png
│   └── screenshots/                      # 應用截圖
│       ├── dashboard.png
│       ├── add-transaction.png
│       ├── reports.png
│       ├── pet.png
│       ├── ai-assistant.png
│       └── settings.png
```

---

## 🎯 詳細圖片規格與說明

### 1. Logo 與品牌標識

#### **assets/logo.svg**
- **尺寸**: 建議 512x512px 或更大（SVG 格式可任意縮放）
- **格式**: SVG（優先）或 PNG（透明背景）
- **內容**: AuraSpend 的品牌 Logo
- **建議**: 簡潔、現代、易辨識的圖標，可結合 AI、錢包、或寵物元素
- **顏色**: 主色使用 #6366F1（品牌主色），可搭配漸層效果

---

### 2. 下載徽章 (badges/)

#### **app-store.svg / app-store-large.svg**
- **尺寸**: 
  - Small: 高度 50px（自動寬度）
  - Large: 高度 60px（自動寬度）
- **格式**: SVG 或 PNG
- **內容**: Apple App Store 官方下載徽章
- **來源**: [Apple Marketing Guidelines](https://developer.apple.com/app-store/marketing/guidelines/)

**APK（專案補充）**：若你要提供直接的 APK 下載，我們會在 Download 區新增 APK 下載按鈕（連至 GitHub Releases）。請將 APK 徽章檔命名為 `assets/badges/apk-badge.svg`，或直接提供我們要顯示的圖檔，頁面目前以 `https://github.com/BYLinMou/COMP3330-Gp20-AuraSpend/releases` 作為範例連結。

**備註（專案決定）**：本專案統一使用「美國（US）」版本的徽章，已將官方徽章複製到 `website/assets/badges/us/`，檔名為 `app-store-us.svg`（白底/白字版）。下載按鈕在 `index.html` 中已設定為美國商店的示例 URL（`https://apps.apple.com/us/app/auraspend/id000000000`），你可以直接替換這個 URL 為實際 App ID，無需再修改圖片路徑。

#### **google-play.svg / google-play-large.svg**
- **尺寸**: 
  - Small: 高度 50px（自動寬度）
  - Large: 高度 60px（自動寬度）
- **格式**: SVG 或 PNG
- **內容**: Google Play 官方下載徽章
- **來源**: [Google Play Badge Generator](https://play.google.com/intl/en_us/badges/)

**備註（專案決定）**：本專案統一使用「美國 / 英文」版本的徽章，已將官方徽章複製到 `website/assets/badges/us/`，檔名為 `google-play-us.svg`。下載按鈕在 `index.html` 中已設定為 Google Play 的示例 URL（`https://play.google.com/store/apps/details?id=com.auraspend`），你可直接替換 App ID，無需再調整圖片路徑。

#### **expo-download.svg**
- **尺寸**: 高度 60px
- **格式**: SVG 或 PNG
- **內容**: Expo 下載按鈕或 "Try with Expo" 徽章
- **建議**: 自行設計簡潔的按鈕，文字 "Download via Expo" 或 "使用 Expo 體驗"

---

### 3. 首屏區域 (hero/)

#### **demo-video-poster.png**
- **尺寸**: 1920x1080px 或 16:9 比例
- **格式**: PNG 或 JPG（品質 85%+）
- **內容**: 應用主畫面截圖或精美的應用 UI 合成圖
- **建議**: 
  - 展示應用的儀表板或主要功能頁面
  - 可使用多個手機螢幕組合（2-3個）展示不同功能
  - 背景可加上柔和漸層或幾何圖形元素
  - 確保畫面清晰、吸睛

#### **demo-video.mp4**
- **尺寸**: 1920x1080px (Full HD)
- **格式**: MP4 (H.264 編碼)
- **長度**: 30-60 秒
- **內容**: 應用操作演示影片
- **建議流程**:
  1. 應用開啟動畫
  2. 拍攝收據功能演示
  3. AI 識別過程（動畫效果）
  4. 交易自動填入
  5. 查看報表與圖表
  6. AI 助手對話演示
  7. 結尾顯示 Logo
- **音樂**: 可選，輕快的背景音樂

**本網站使用的示例影片（YouTube）**：目前首頁 Hero 的 demo 為 YouTube 影片（https://www.youtube.com/watch?v=LM8KUN80FBA），影片將直接在首頁以內嵌播放器播放（autoplay、muted、loop）。若你希望改為直接從 repo 內部播放 MP4，請將 `demo-video.mp4` 上傳至 `website/assets/hero/`，並告訴我，我會把播放器改為播放本地 MP4。

---

### 4. 功能圖示與演示 (features/)

#### **Icon 系列（*-icon.png）**
每個功能都需要一個圖示：
- **尺寸**: 512x512px
- **格式**: PNG（透明背景）
- **風格**: 扁平化、線條圖示或輕擬物化
- **顏色**: 單色白色（會搭配漸層背景）

**具體圖示內容**:
1. **ocr-icon.png**: 相機 + 文字掃描、或文件識別圖示
2. **budget-icon.png**: 錢包、儲蓄罐或圓餅圖圖示
3. **ai-icon.png**: 機器人頭像、對話泡泡或 AI 芯片圖示
4. **pet-icon.png**: 可愛的寵物圖示（貓、狗或虛擬寵物）
5. **currency-icon.png**: 貨幣符號、地球或外幣圖示
6. **sync-icon.png**: 雲端同步、循環箭頭或多裝置圖示

#### **Demo 系列（*-demo.png）**
每個功能的實際演示截圖：
- **尺寸**: 800x500px 或 16:10 比例
- **格式**: PNG 或 JPG
- **內容**: 應用中對應功能的實際截圖或 UI 模擬

**具體演示內容**:
1. **ocr-demo.png**: 收據拍攝頁面，顯示相機取景框與辨識結果
2. **budget-demo.png**: 預算設定與進度條頁面，展示視覺化圖表
3. **ai-demo.png**: AI 聊天助手對話介面，展示問答範例
4. **pet-demo.png**: 寵物成長頁面，展示虛擬寵物與獎勵系統
5. **currency-demo.png**: 多幣別選擇介面或多貨幣交易列表
6. **sync-demo.png**: 多設備同步示意圖或同步成功的提示畫面

---

### 5. 使用流程 (steps/)

這三張圖展示使用流程的三個步驟：

#### **step1-capture.png**
- **尺寸**: 600x800px（手機直向）
- **格式**: PNG
- **內容**: 使用相機拍攝收據的畫面，顯示取景框與拍攝按鈕

#### **step2-ai.png**
- **尺寸**: 600x800px
- **格式**: PNG
- **內容**: AI 正在識別收據的畫面，可顯示載入動畫或識別進度

#### **step3-save.png**
- **尺寸**: 600x800px
- **格式**: PNG
- **內容**: 交易資訊已自動填入的表單頁面，等待使用者確認儲存

---

### 6. 應用截圖 (screenshots/)

這是輪播展示區的手機截圖：

#### **通用規格**
- **尺寸**: 1242x2688px（iPhone 13 Pro Max 尺寸）或同比例
- **格式**: PNG
- **內容**: 應用實際頁面的高清截圖
- **建議**: 使用真實的應用截圖，或使用設計稿生成截圖

#### **具體截圖內容**:

1. **dashboard.png**
   - 主儀表板頁面
   - 顯示本月支出總覽、快速統計、最近交易

2. **add-transaction.png**
   - 添加交易頁面
   - 展示表單欄位、分類選擇、金額輸入

3. **reports.png**
   - 報表分析頁面
   - 展示圓餅圖、折線圖、支出分類排行

4. **pet.png**
   - 寵物與成就頁面
   - 展示虛擬寵物形象、成就徽章、進度條

5. **ai-assistant.png**
   - AI 助手對話頁面
   - 展示聊天介面、用戶提問、AI 回覆與圖表

6. **settings.png**
   - 設定頁面
   - 展示用戶資訊、偏好設定、主題切換

---

## 🎨 設計指南

### 配色方案
根據 `constants/theme.ts`，使用以下色彩：
- **主色**: `#6366F1` (Indigo)
- **主色深**: `#4F46E5`
- **主色淺**: `#818CF8`
- **次要色**: `#EC4899` (Pink)
- **強調色**: `#F59E0B` (Amber)
- **成功**: `#10B981` (Green)
- **錯誤**: `#EF4444` (Red)

### 設計風格
- **現代扁平化**: 簡潔、清晰、易讀
- **漸層效果**: 適度使用漸層增加視覺層次
- **圓角設計**: 按鈕與卡片使用圓角（8-16px）
- **陰影**: 使用柔和的陰影營造深度
- **留白**: 充足的留白空間，避免擁擠

### 截圖製作建議
1. 使用真實應用截圖（從 `assets/images/` 取得）
2. 或從 React Native 應用中使用模擬器/真機截圖
3. 可使用 [Figma](https://figma.com) 或 [Sketch](https://sketch.com) 設計原型
4. 使用 [Mockuuups](https://mockuuups.studio/) 或 [Smartmockups](https://smartmockups.com/) 製作手機外框效果

---

## 📝 Placeholder 說明

目前 HTML 中所有圖片路徑已設定完成，你可以：

### 方法 1：使用線上 Placeholder 服務（暫時測試）
將 HTML 中的圖片路徑暫時替換為：
```html
<!-- Logo -->
<img src="https://via.placeholder.com/512/6366F1/FFFFFF?text=AuraSpend" alt="Logo">

<!-- Hero Image -->
<img src="https://via.placeholder.com/1920x1080/E0E7FF/6366F1?text=App+Demo" alt="Demo">

<!-- Feature Icons -->
<img src="https://via.placeholder.com/512/6366F1/FFFFFF?text=OCR" alt="OCR Icon">

<!-- Screenshots -->
<img src="https://via.placeholder.com/1242x2688/F0F4FF/6366F1?text=Dashboard" alt="Dashboard">
```

### 方法 2：創建空白佔位檔案
在對應路徑創建空白 PNG/SVG 檔案，稍後替換為實際圖片。

---

## ✅ 製作清單

使用以下清單追蹤進度：

### Logo 與品牌
- [ ] logo.svg

### 下載徽章
- [ ] app-store.svg
- [ ] google-play.svg  
- [ ] app-store-large.svg
- [ ] google-play-large.svg
- [ ] expo-download.svg

### 首屏素材
- [ ] demo-video-poster.png
- [ ] demo-video.mp4

### 功能圖示（6組）
- [ ] ocr-icon.png & ocr-demo.png
- [ ] budget-icon.png & budget-demo.png
- [ ] ai-icon.png & ai-demo.png
- [ ] pet-icon.png & pet-demo.png
- [ ] currency-icon.png & currency-demo.png
- [ ] sync-icon.png & sync-demo.png

### 使用流程（3張）
- [ ] step1-capture.png
- [ ] step2-ai.png
- [ ] step3-save.png

### 應用截圖（6張）
- [ ] dashboard.png
- [ ] add-transaction.png
- [ ] reports.png
- [ ] pet.png
- [ ] ai-assistant.png
- [ ] settings.png

---

## 🔄 資源來源建議

1. **從現有專案提取**:
   - 檢查 `assets/images/` 目錄
   - 使用 React Native 模擬器截圖
   - 查看 README 中的 demo 影片

2. **設計工具**:
   - Figma / Sketch（UI 設計）
   - Photoshop / GIMP（圖片編輯）
   - Canva（快速圖示生成）
   - [Heroicons](https://heroicons.com/)（圖示庫）
   - [Feather Icons](https://feathericons.com/)（圖示庫）

3. **影片錄製**:
   - iOS: QuickTime Player（螢幕錄製）
   - Android: ADB screenrecord
   - [Screen Studio](https://www.screen.studio/)（專業螢幕錄製）
   - [Loom](https://www.loom.com/)（線上錄製）

4. **Mockup 工具**:
   - [Mockuuups Studio](https://mockuuups.studio/)
   - [Rotato](https://rotato.app/)
   - [Previewed](https://previewed.app/)

---

## 📧 完成後

完成圖片製作後，請：
1. 確保所有檔案命名與路徑完全一致
2. 優化圖片大小（PNG 使用 TinyPNG，JPG 品質 85%）
3. 將所有檔案放入 `website/assets/` 對應目錄
4. 在瀏覽器中打開 `index.html` 檢查顯示效果
5. 測試響應式設計（手機、平板、桌面）

如有任何問題，請參考本文檔或聯繫開發團隊。

祝設計順利！🎉
