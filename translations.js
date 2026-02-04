// ===========================
// Language Translations
// ===========================
const translations = {
    'zh-TW': {
        // Meta
        'meta.description': '用 AI 記帳，讓每筆消費都變得輕鬆。拍張收據，AI 自動填入；專屬助理與互動化報表，幫你看清每一分花費。',
        'meta.title': 'AuraSpend - AI 智能記帳與預算管理',
        
        // Navigation
        'nav.features': '功能',
        'nav.how-it-works': '使用方式',
        'nav.screenshots': '展示',
        'nav.roadmap': '未來規劃',
        'nav.pricing': '價格方案',
        'nav.download': '立即下載',
        
        // Hero Section
        'hero.title': '用 AI 記帳，<br>讓每筆消費都變得輕鬆',
        'hero.subtitle': '拍張收據，AI 自動填入；專屬助理與互動化報表，幫你看清每一分花費。',
        'hero.download-apk': '立即下載 (APK)',
        'hero.learn-more': '了解更多',
        'hero.pip-close': '關閉小窗口',
        
        // Screenshots Section
        'screenshots.title': '應用展示',
        'screenshots.subtitle': '探索 AuraSpend 的精美介面與強大功能',
        'screenshots.dashboard': '儀表板總覽',
        'screenshots.reports': '視覺化報表',
        'screenshots.add-transaction': '添加交易',
        'screenshots.ai-assistant': 'AI 聊天助手',
        'screenshots.smart-agent': '智能 Agent',
        'screenshots.pet': '寵物與成就',
        'screenshots.settings': '設定與偏好',
        'screenshots.themes': '主題與外觀',
        'screenshots.announcer': '第 {current} 張，共 {total} 張',
        'screenshots.show-slide': '顯示第 {index} 張',
        
        // How It Works Section
        'how-it-works.title': '使用流程',
        'how-it-works.subtitle': '三步驟完成記帳，簡單又快速',
        'step1.title': '拍攝或上傳收據',
        'step1.description': '使用手機相機拍攝收據，或從相簿選擇已有的收據照片。',
        'step2.title': 'AI 辨識 OCR',
        'step2.description': 'AI 自動識別商家名稱、金額、日期與消費類別。',
        'step3.title': '自動填入並儲存',
        'step3.description': '確認資訊無誤後，一鍵儲存為交易記錄，完成記帳。',
        
        // Highlights Section
        'highlight.realtime.title': '即時同步',
        'highlight.realtime.description': '基於 Supabase Realtime，多設備即時同步，資料永不遺失。',
        'highlight.multilang.title': '多語言多幣別',
        'highlight.multilang.description': '支援多種語言與貨幣，全球使用者都能輕鬆上手。',
        
        // Features Section
        'features.title': '核心功能',
        'features.subtitle': '強大的 AI 技術，簡化你的記帳流程',
        'feature.ocr.title': '智慧 OCR',
        'feature.ocr.description': '自動擷取商家、金額與分類，省時又精準。拍張收據，AI 立即識別並填入交易資訊。',
        'feature.ai.title': 'AI 助手',
        'feature.ai.description': '一句話即可查詢支出摘要或獲得節省建議。智能分析你的消費習慣。',
        'feature.currency.title': '多幣別支援',
        'feature.currency.description': '支援多種貨幣與離線快取功能。旅行記帳也能輕鬆搞定。',
        
        // Roadmap Section
        'roadmap.title': '未來規劃',
        'roadmap.subtitle': '我們正在開發更多令人興奮的功能',
        'roadmap.current': '進行中',
        'roadmap.upcoming': '即將推出',
        'roadmap.future': '未來計劃',
        'roadmap.batch.title': 'Batch Processing',
        'roadmap.batch.description': '批次上傳多張收據，AI 批次解析並生成待審核的交易清單，支援批次分類與標註。',
        'roadmap.batch.feature1': '一次上傳多張收據',
        'roadmap.batch.feature2': '批次審核與確認',
        'roadmap.batch.feature3': '批次分類功能',
        'roadmap.workflow.title': 'AI Workflow',
        'roadmap.workflow.description': '定時生成報表並自動寄送至 Email。當超過預算或支出異常升高時，AI 會主動發送提醒與建議。',
        'roadmap.workflow.feature1': '每週/月報自動生成',
        'roadmap.workflow.feature2': 'Email 與 Push 通知',
        'roadmap.workflow.feature3': '智能預算提醒',
        'roadmap.more.title': '更多功能',
        'roadmap.more.description': '手寫辨識、離線 ML 模型、企業版功能等更多實用工具正在開發中。',
        'roadmap.more.feature1': '多語手寫辨識',
        'roadmap.more.feature2': '離線 ML 模型',
        'roadmap.more.feature3': '企業多人協作',
        
        // Pricing Section
        'pricing.title': '價格方案',
        'pricing.subtitle': '選擇最適合您的方案，開始智能記帳之旅。',
        'pricing.free': '免費版',
        'pricing.free-price': 'HK$0',
        'pricing.free-feature1': '每天 10 次 AI 收據辨識',
        'pricing.free-feature2': '無限制轉帳記錄雲端儲存',
        'pricing.free-feature3': '社區支援',
        'pricing.free-start': '立即開始',
        'pricing.subscription': '訂閱版',
        'pricing.subscription-price': 'HK$?? <span>/ 月</span>',
        'pricing.subscription-feature1': '每天 50 次 AI 收據辨識',
        'pricing.subscription-feature2': '無限制轉帳記錄雲端儲存',
        'pricing.subscription-feature3': '<b>去除所有廣告</b>',
        'pricing.subscription-feature4': '優先客戶支援',
        'pricing.subscription-select': '選擇訂閱版',
        'pricing.lifetime': '終身版',
        'pricing.lifetime-price': 'HK$?? <span>/ 一次性</span>',
        'pricing.lifetime-feature1': '每天 10 次 AI 收據辨識',
        'pricing.lifetime-feature2': '<b>自定義 AI 服務商 (BYOK)</b>',
        'pricing.lifetime-feature3': '無限制轉帳記錄雲端儲存',
        'pricing.lifetime-feature4': '<b>永久去除所有廣告</b>',
        'pricing.lifetime-feature5': '社區支援',
        'pricing.lifetime-get': '獲取終身版',
        'pricing.enterprise': '企業版',
        'pricing.enterprise-price': '聯繫我們',
        'pricing.enterprise-feature1': '包含所有訂閱版功能',
        'pricing.enterprise-feature2': '無限制 AI 調用',
        'pricing.enterprise-feature3': '團隊管理與多人協作',
        'pricing.enterprise-feature4': '專屬客戶經理',
        'pricing.enterprise-feature5': '數據導出與 API 整合',
        'pricing.enterprise-feature6': '私有化部署選項',
        'pricing.enterprise-contact': '聯繫銷售',
        'pricing.recommended': '推薦',
        
        // Download Section
        'download.title': '開始使用 AuraSpend',
        'download.subtitle': '立即下載，體驗 AI 智能記帳的便利',
        'download.note': '或加入內測計劃，搶先體驗最新功能',
        'download.beta': '加入內測',
        
        // Footer
        'footer.description': '用 AI 記帳，讓每筆消費都變得輕鬆',
        'footer.product': '產品',
        'footer.features': '功能介紹',
        'footer.how-it-works': '使用方式',
        'footer.roadmap': '未來規劃',
        'footer.download': '立即下載',
        'footer.resources': '資源',
        'footer.docs': '技術文檔',
        'footer.api': 'API 文件',
        'footer.github': 'GitHub 倉庫',
        'footer.issues': '問題回報',
        'footer.contact': '聯絡我們',
        'footer.support': 'support@auraspend.com',
        'footer.github-issues': 'GitHub Issues',
        'footer.privacy': '隱私政策',
        'footer.terms': '服務條款',
        'footer.copyright': '© {year} AuraSpend. All rights reserved.',
        'footer.lang-zh': '繁體中文',
        'footer.lang-en': 'English',
        
        // Beta Form
        'beta.success': '感謝您的註冊！我們會盡快與您聯繫。'
    },
    'en': {
        // Meta
        'meta.description': 'Track expenses with AI, making every transaction effortless. Snap a receipt, AI fills it in automatically; personal assistant and interactive reports help you see every penny spent.',
        'meta.title': 'AuraSpend - AI Smart Expense Tracking & Budget Management',
        
        // Navigation
        'nav.features': 'Features',
        'nav.how-it-works': 'How It Works',
        'nav.screenshots': 'Showcase',
        'nav.roadmap': 'Roadmap',
        'nav.pricing': 'Pricing',
        'nav.download': 'Download Now',
        
        // Hero Section
        'hero.title': 'Track Expenses with AI,<br>Make Every Transaction Effortless',
        'hero.subtitle': 'Snap a receipt, AI fills it in automatically; personal assistant and interactive reports help you see every penny spent.',
        'hero.download-apk': 'Download Now (APK)',
        'hero.learn-more': 'Learn More',
        'hero.pip-close': 'Close',
        
        // Screenshots Section
        'screenshots.title': 'App Showcase',
        'screenshots.subtitle': 'Explore AuraSpend\'s beautiful interface and powerful features',
        'screenshots.dashboard': 'Dashboard Overview',
        'screenshots.reports': 'Visual Reports',
        'screenshots.add-transaction': 'Add Transaction',
        'screenshots.ai-assistant': 'AI Chat Assistant',
        'screenshots.smart-agent': 'Smart Agent',
        'screenshots.pet': 'Pet & Achievements',
        'screenshots.settings': 'Settings & Preferences',
        'screenshots.themes': 'Themes & Appearance',
        'screenshots.announcer': 'Slide {current} of {total}',
        'screenshots.show-slide': 'Show slide {index}',
        
        // How It Works Section
        'how-it-works.title': 'How It Works',
        'how-it-works.subtitle': 'Complete expense tracking in three simple steps',
        'step1.title': 'Capture or Upload Receipt',
        'step1.description': 'Use your phone camera to take a photo of a receipt, or select an existing receipt from your photo gallery.',
        'step2.title': 'AI OCR Recognition',
        'step2.description': 'AI automatically identifies merchant name, amount, date, and expense category.',
        'step3.title': 'Auto-fill and Save',
        'step3.description': 'Confirm the information and save it as a transaction record with one click.',
        
        // Highlights Section
        'highlight.realtime.title': 'Real-time Sync',
        'highlight.realtime.description': 'Based on Supabase Realtime, sync across multiple devices in real-time, data never lost.',
        'highlight.multilang.title': 'Multi-language & Multi-currency',
        'highlight.multilang.description': 'Support multiple languages and currencies, easy for global users to get started.',
        
        // Features Section
        'features.title': 'Core Features',
        'features.subtitle': 'Powerful AI technology to simplify your expense tracking',
        'feature.ocr.title': 'Smart OCR',
        'feature.ocr.description': 'Automatically extract merchant, amount, and category with precision. Snap a receipt, AI instantly recognizes and fills in transaction details.',
        'feature.ai.title': 'AI Assistant',
        'feature.ai.description': 'Query expense summaries or get savings tips with a single sentence. Intelligently analyze your spending habits.',
        'feature.currency.title': 'Multi-currency Support',
        'feature.currency.description': 'Support multiple currencies with offline caching. Travel expense tracking made easy.',
        
        // Roadmap Section
        'roadmap.title': 'Roadmap',
        'roadmap.subtitle': 'We are developing more exciting features',
        'roadmap.current': 'In Progress',
        'roadmap.upcoming': 'Coming Soon',
        'roadmap.future': 'Future Plans',
        'roadmap.batch.title': 'Batch Processing',
        'roadmap.batch.description': 'Upload multiple receipts at once, AI batch parses and generates a pending review transaction list, supports batch classification and tagging.',
        'roadmap.batch.feature1': 'Upload multiple receipts at once',
        'roadmap.batch.feature2': 'Batch review and confirmation',
        'roadmap.batch.feature3': 'Batch classification feature',
        'roadmap.workflow.title': 'AI Workflow',
        'roadmap.workflow.description': 'Automatically generate reports and send them via Email. When exceeding budget or abnormal spending increases, AI proactively sends alerts and suggestions.',
        'roadmap.workflow.feature1': 'Weekly/monthly report auto-generation',
        'roadmap.workflow.feature2': 'Email and Push notifications',
        'roadmap.workflow.feature3': 'Smart budget alerts',
        'roadmap.more.title': 'More Features',
        'roadmap.more.description': 'Handwriting recognition, offline ML models, enterprise features and more useful tools are under development.',
        'roadmap.more.feature1': 'Multi-language handwriting recognition',
        'roadmap.more.feature2': 'Offline ML models',
        'roadmap.more.feature3': 'Enterprise team collaboration',
        
        // Pricing Section
        'pricing.title': 'Pricing Plans',
        'pricing.subtitle': 'Choose the plan that suits you best and start your smart expense tracking journey.',
        'pricing.free': 'Free',
        'pricing.free-price': 'HK$0',
        'pricing.free-feature1': '10 AI receipt recognitions per day',
        'pricing.free-feature2': 'Unlimited cloud storage for transaction records',
        'pricing.free-feature3': 'Community support',
        'pricing.free-start': 'Get Started',
        'pricing.subscription': 'Subscription',
        'pricing.subscription-price': 'HK$?? <span>/ month</span>',
        'pricing.subscription-feature1': '50 AI receipt recognitions per day',
        'pricing.subscription-feature2': 'Unlimited cloud storage for transaction records',
        'pricing.subscription-feature3': '<b>Remove all ads</b>',
        'pricing.subscription-feature4': 'Priority customer support',
        'pricing.subscription-select': 'Choose Subscription',
        'pricing.lifetime': 'Lifetime',
        'pricing.lifetime-price': 'HK$?? <span>/ one-time</span>',
        'pricing.lifetime-feature1': '10 AI receipt recognitions per day',
        'pricing.lifetime-feature2': '<b>Custom AI provider (BYOK)</b>',
        'pricing.lifetime-feature3': 'Unlimited cloud storage for transaction records',
        'pricing.lifetime-feature4': '<b>Permanently remove all ads</b>',
        'pricing.lifetime-feature5': 'Community support',
        'pricing.lifetime-get': 'Get Lifetime',
        'pricing.enterprise': 'Enterprise',
        'pricing.enterprise-price': 'Contact Us',
        'pricing.enterprise-feature1': 'Includes all subscription features',
        'pricing.enterprise-feature2': 'Unlimited AI calls',
        'pricing.enterprise-feature3': 'Team management and multi-user collaboration',
        'pricing.enterprise-feature4': 'Dedicated account manager',
        'pricing.enterprise-feature5': 'Data export and API integration',
        'pricing.enterprise-feature6': 'Private deployment options',
        'pricing.enterprise-contact': 'Contact Sales',
        'pricing.recommended': 'Recommended',
        
        // Download Section
        'download.title': 'Get Started with AuraSpend',
        'download.subtitle': 'Download now and experience the convenience of AI smart expense tracking',
        'download.note': 'Or join the beta program to experience the latest features first',
        'download.beta': 'Join Beta',
        
        // Footer
        'footer.description': 'Track expenses with AI, making every transaction effortless',
        'footer.product': 'Product',
        'footer.features': 'Features',
        'footer.how-it-works': 'How It Works',
        'footer.roadmap': 'Roadmap',
        'footer.download': 'Download Now',
        'footer.resources': 'Resources',
        'footer.docs': 'Documentation',
        'footer.api': 'API Docs',
        'footer.github': 'GitHub Repository',
        'footer.issues': 'Issue Tracker',
        'footer.contact': 'Contact Us',
        'footer.support': 'support@auraspend.com',
        'footer.github-issues': 'GitHub Issues',
        'footer.privacy': 'Privacy Policy',
        'footer.terms': 'Terms of Service',
        'footer.copyright': '© {year} AuraSpend. All rights reserved.',
        'footer.lang-zh': '繁體中文',
        'footer.lang-en': 'English',
        
        // Beta Form
        'beta.success': 'Thank you for signing up! We will contact you soon.'
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = translations;
}