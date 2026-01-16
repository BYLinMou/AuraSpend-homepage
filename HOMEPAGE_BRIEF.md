# AuraSpend 網站首頁需求說明書 / AuraSpend Homepage Brief 🚀

> 本文件同時包含「繁體中文（繁體）」版與「English」版，便於與臺灣/港澳與國際團隊對接。

---

## 繁體中文（繁體）

### 1. 概要介紹 ✨
- 產品名：**AuraSpend**
- 簡短描述：一款結合 AI 收據識別與寵物化激勵的智能記帳與預算管理行動應用。透過自動 OCR 提取收據資訊、AI 助手自然語言問答與可視化報表，幫助使用者養成健康消費習慣。
- 目標受眾：重視個人理財、希望簡化記帳流程或期望利用 AI 助手快速分析支出的使用者。

---

### 2. 現有素材與技術棧 🔧
- 前端：React Native + Expo + Expo Router（代碼位置：`app/`）
- 後端：Supabase（Postgres、Auth、Realtime、Storage）
- AI：目前使用 OpenAI 兼容的模型 (含 vision 能力)，**注意：下一版本將改為由我們提供與管理的 API Key，使用者不需自行配置或輸入 API Key**（相關的使用者端配置文件將在未來移除或標記為已淘汰）。
- 收據處理文檔：`docs/RECEIPT_PROCESSING_ARCHITECTURE.md`、`docs/RECEIPT_IMPLEMENTATION_SUMMARY.md`
- 圖片資源：`assets/images/`（建議匯出適合網頁與橫幅使用的截圖/影片短片）
- 主題色：`constants/theme.ts`
- 專案 README: `README.md`（包含 demo 影片連結）

---

### 3. 建議首頁結構（優先順序） 🧭
1. Hero（首屏）
   - 大標題（價值主張）、副標與主要 CTA（如「立即下載」「瞭解更多」）
   - 配圖或示範短片（使用 `assets/images/` 截圖或 README 的影片）

2. 核心功能區（3–6 張卡片）
   - 智能收據 OCR 與自動填入
   - 預算與支出追蹤（圖表縮圖）
   - 浮動 AI 助手（聊天式查詢）
   - 寵物化激勵（遊戲化元素）
   - 多幣別支援與離線快取

3. 使用流程（3 步）
   - 拍攝 / 上傳收據 → AI 辨識 OCR → 自動填入並儲存為交易

4. 亮點（可選）
   - 即時同步（Supabase Realtime）
   - 隱私與安全說明（後端集中管理 API 金鑰、示例資料須匿名化）

5. 截圖 / 演示
   - 儀表板、添加交易、報表、寵物/成就頁、聊天助手演示

6. 路線圖與未來發展
   - 即將推出：AI Workflow（定時報表、自動提醒與 Email 傳送）、Batch Processing（批次收據上傳與審核）、多語手寫辨識、離線 ML 模型、企業版功能

7. CTA（下載 / 註冊 / 加入內測）
   - App Store / Google Play / Expo 下載連結

8. 聯絡資訊與文件連結
   - GitHub 倉庫、Docs 目錄與聯絡方式（例如 GitHub issue 或專案聯絡信箱）

---

### 4. 建議文案範例（繁體中文） ✍️
- Hero 標題：**「用 AI 記帳，讓每筆消費都變得輕鬆」**
- 副標：**「拍張收據，AI 自動填入；專屬助理與互動化報表，幫你看清每一分花費。」**
- 功能卡示例：
  - **智慧 OCR** — 自動擷取商家、金額與分類，省時又精準。
  - **預算洞察** — 設定預算並查看視覺化進度與歷史趨勢。
  - **AI 助手** — 一句話即可查詢支出摘要或獲得節省建議。
  - **寵物化激勵** — 遊戲化元素提高長期使用黏性。

---

### 5. 對接 / 交付清單（給實作團隊） ✅
- 視覺資源：從 `assets/images/` 匯出 PNG/JPG 與短影片（主畫面、添加交易、報表、寵物頁）
- 文案與在地化：以 `src/i18n` 與 `locales/` 為參考，製作繁中與英語兩版首頁文案
- 色彩與字體：使用 `constants/theme.ts` 的主題色，確保 App 與官網一致性
- 動畫 / 示範：可使用 Web-friendly 短片或 Lottie 檔案示範 OCR 流程與聊天助手
- 下載連結：指向 Releases 或 Expo 的下載頁面

---

### 6. 安全與隱私（需顯著告示） ⚠️
- 下一版本：AI 功能將使用團隊供應並集中管理的 API Key（使用者端不再需要配置 API Key）。請在後端或安全服務中妥善管理金鑰存取與稽核。
- 展示範例資料時請使用匿名或合成資料以保護使用者隱私。

---

### 7. 即將推出的重點功能（Upcoming Features） 🔮
- **AI Workflow（排程與主動通知）**
  - 定時由 AI 生成使用報表（如每週/月報），並可按使用者設定自動寄送至 Email。
  - 當系統偵測到超過預算或某一分類的支出異常升高時，AI 會主動發送提醒（App Push / Email / In-app 消息）並提供具體建議。
- **Batch Processing（批次收據處理）**
  - 使用者可一次上傳多張收據，後端由 AI 批次解析並生成待審核的交易清單。
  - 使用者審核並確認後，批次將匯入至交易紀錄，支援批次分類與標註功能。

---

### 8. 附錄：重要倉庫位置（給工程組） 📁
- 主入口：`app/_layout.tsx`（路由、Gate）
- 核心頁面：`app/(tabs)/index.tsx`、`app/(tabs)/add.tsx`、`app/(tabs)/reports.tsx`、`app/(tabs)/settings.tsx`
- 收據服務：`src/services/receipt.ts`
- OpenAI 設定註解：`docs/OPENAI_CONFIGURATION.md`（注意：與使用者直接配置 API Key 的流程將於下版本退役）
- 文檔目錄：`docs/`（OCR 與實作細節）
- 資源：`assets/images/`、README 中的 demo 影片連結

---

## English

### 1. Overview ✨
- Product: **AuraSpend**
- Short description: A gamified, AI-powered expense tracking and budgeting mobile app that extracts receipt data via OCR, provides an AI assistant for natural-language queries, and visual reports to help users manage their spending.
- Target audience: Users who want hassle-free bookkeeping, quick AI insights into spending, and engaging incentives to maintain good habits.

---

### 2. Assets & Tech Stack 🔧
- Frontend: React Native + Expo + Expo Router (`app/`)
- Backend: Supabase (Postgres, Auth, Realtime, Storage)
- AI: Currently uses OpenAI-compatible models (including vision-capable models). **Note: In the next release the platform will use a team-managed API key; the user-side API key configuration will be removed.**
- Receipt docs: `docs/RECEIPT_PROCESSING_ARCHITECTURE.md`, `docs/RECEIPT_IMPLEMENTATION_SUMMARY.md`
- Images: `assets/images/` (export web-friendly screenshots/videos)
- Theme: `constants/theme.ts`
- README: `README.md` (includes demo video link)

---

### 3. Recommended Homepage Structure 🧭
1. Hero
   - Headline (value prop), subheadline, primary CTA (Download / Learn more)
   - Illustration or demo video (use `assets/images/` or README video)

2. Core Features (3–6 cards)
   - AI Receipt OCR & Auto-fill
   - Budgets & Spending Insights (charts)
   - Floating AI Assistant (chat-based queries)
   - Gamified Pet Companion (engagement)
   - Multi-currency and offline caching

3. How it Works (3 steps)
   - Take/upload receipt → AI OCR → Auto-fill and save transaction

4. Highlights
   - Real-time sync (Supabase Realtime)
   - Privacy & security (API keys managed centrally; anonymized sample data)

5. Screenshots / Demos
   - Dashboard, add transaction, reports, pet/achievements, assistant

6. Roadmap & Growth
   - Upcoming: AI Workflow (scheduled reports & alerts), Batch Processing (multi-receipt upload & review), handwriting support, offline ML, enterprise features

7. CTA (Download / Sign up / Join beta)
   - App Store / Play / Expo links

8. Contact & Docs
   - GitHub repo, docs links, contact (email or GitHub issues)

---

### 4. Suggested Copy (English) ✍️
- Headline: "Let AI handle your receipts — bookkeeping made effortless"
- Subheadline: "Snap a receipt, AI fills the details, and your assistant helps you understand spending at a glance."
- Feature bullets:
  - **Smart OCR** — Extract merchant, amount, and category quickly and accurately.
  - **Budget Insights** — Set budgets and monitor progress with visual charts.
  - **AI Assistant** — Ask natural-language questions about your spending.
  - **Pet Companion** — Gamified rewards to improve retention.

---

### 5. Integration Checklist (for Engineering) ✅
- Visual assets: export screenshots/videos from `assets/images/`
- Copy & localization: produce both Traditional Chinese and English versions using `src/i18n` and `locales/` as reference
- Theme & typography: use `constants/theme.ts` for visual consistency
- Demo media: include web-friendly short clips or Lottie animations for OCR and assistant flows
- Download links: point to Releases or Expo distribution

---

### 6. Security & Privacy Notes ⚠️
- Next release: AI will operate using a team-provisioned API key; user-side key configuration will be removed. Store and audit keys securely on the server-side or secure infrastructure.
- Use anonymized or synthetic data when showcasing user flows.

---

### 7. Upcoming Features (Short) 🔮
- AI Workflow: scheduled report generation (weekly/monthly), email delivery, and proactive alerts when budgets are exceeded or a category's spending spikes. Alerts can be delivered via push notifications or email and include actionable suggestions.
- Batch Processing: bulk receipt upload, background AI parsing that creates a reviewable transaction queue, and user approval flow to commit multiple transactions at once.

---

### 8. Appendix: Key Repo Locations 📁
- Entry: `app/_layout.tsx` (routing & Gate)
- Core pages: `app/(tabs)/index.tsx`, `app/(tabs)/add.tsx`, `app/(tabs)/reports.tsx`, `app/(tabs)/settings.tsx`
- Receipt service: `src/services/receipt.ts`
- NOTE: `docs/OPENAI_CONFIGURATION.md` documents the previous user-side API key flow and is considered deprecated for the next release.
- Docs: `docs/`
- Assets: `assets/images/` and README demo video

---

如果你要，我可以接著：
1. 直接生成單獨的 `HOMEPAGE_BRIEF_EN.md` 與 `HOMEPAGE_BRIEF_ZH_TW.md`；
2. 將 "即將推出的功能" 內容拆成更細的需求規格（包含 API 與 UX 流程圖）；
3. 把交付清單拆成可直接上 Jira / Trello 的任務清單。

請告訴我下一步想做哪一項。 ✅
