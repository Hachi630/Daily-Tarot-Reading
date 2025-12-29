# 🔮 神秘塔罗占卜 / Mystical Tarot AI

一个基于 React 和 Node.js 的塔罗占卜 Web 应用，集成 Google Gemini AI 提供智能解读。

A React and Node.js based Tarot divination web application with Google Gemini AI integration for intelligent readings.

---

## 功能特性 / Features

- ✨ **78 张标准韦特塔罗牌** / **78 Standard Rider-Waite Tarot Cards**: 完整的大阿卡纳和小阿卡纳牌组 / Complete Major and Minor Arcana deck
- 🔄 **逆位牌支持** / **Reversed Card Support**: 30% 概率抽到逆位牌，正确解读内化能量 / 30% chance of reversed cards with proper interpretation of internalized energy
- 🎴 **两种牌阵** / **Two Spread Types**: 单牌占卜和三牌阵（过去·现在·未来） / Single card and three-card spread (Past·Present·Future)
- 🎨 **精美动画** / **Beautiful Animations**: 使用 Framer Motion 实现流畅的洗牌、翻牌动画 / Smooth shuffle and flip animations using Framer Motion
- 🤖 **AI 智能解读** / **AI Intelligent Reading**: Google Gemini 3 Pro Preview 提供专业塔罗解读 / Google Gemini 3 Pro Preview provides professional Tarot readings
- 🎭 **神秘主题** / **Mystical Theme**: 深紫色和金色渐变的神秘风格 UI / Mystical UI with deep purple and gold gradients
- 📝 **关键词显示** / **Keywords Display**: 点击牌背面查看关键词 / Click card back to view keywords
- 🌐 **在线图片** / **Online Images**: 自动从网络加载塔罗牌图片 / Automatically loads Tarot card images from the web

---

## 技术栈 / Tech Stack

### 前端 / Frontend
- React 19 + Vite
- Tailwind CSS
- Framer Motion（动画 / Animations）
- React Markdown（Markdown 渲染 / Markdown rendering）

### 后端 / Backend
- Node.js + Express
- Google Gemini 3 Pro Preview API
- CORS 支持 / CORS support

---

## 项目结构 / Project Structure

```
Daily-Tarot-Reading/
├── client/                 # React 前端 / Frontend
│   ├── src/
│   │   ├── components/     # React 组件 / React Components
│   │   ├── data/          # 塔罗牌数据 / Tarot Card Data
│   │   ├── utils/         # 工具函数 / Utility Functions
│   │   └── App.jsx
│   └── public/
│       └── assets/        # 塔罗牌图片（可选，使用在线图片） / Tarot images (optional, uses online images)
├── server/                # Node.js 后端 / Backend
│   ├── server.js
│   ├── services/
│   │   └── geminiService.js
│   └── .env              # 环境变量配置 / Environment Variables
└── data/
    └── tarotData.json     # 塔罗牌数据源 / Tarot Data Source
```

---

## 安装与运行 / Installation & Running

### 前置要求 / Prerequisites

- Node.js 18+
- Google Gemini API Key

### 1. 安装依赖 / Install Dependencies

```bash
# 安装前端依赖 / Install frontend dependencies
cd client
npm install

# 安装后端依赖 / Install backend dependencies
cd ../server
npm install
```

### 2. 配置环境变量 / Configure Environment Variables

在 `server` 目录下创建 `.env` 文件 / Create `.env` file in `server` directory:

```env
GOOGLE_GEMINI_API_KEY=your_api_key_here
PORT=3000
```

**获取 API Key / Get API Key:**
1. 访问 [Google AI Studio](https://makersuite.google.com/app/apikey) / Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. 创建新的 API Key / Create a new API Key
3. 确保已启用 Generative Language API / Ensure Generative Language API is enabled

**详细配置指南 / Detailed Setup Guide:**
查看 `server/GEMINI_SETUP.md` 获取完整的配置说明 / See `server/GEMINI_SETUP.md` for complete setup instructions

### 3. 启动应用 / Start Application

```bash
# 启动后端服务器（在 server 目录） / Start backend server (in server directory)
cd server
npm start
# 或开发模式 / or development mode
npm run dev

# 启动前端开发服务器（在 client 目录，新终端） / Start frontend dev server (in client directory, new terminal)
cd client
npm run dev
```

访问 `http://localhost:5173` 开始使用 / Visit `http://localhost:5173` to start using

---

## 使用说明 / Usage

1. **输入问题** / **Enter Question**: 在首页输入你想问塔罗牌的问题 / Enter your question on the homepage
2. **选择牌阵** / **Choose Spread**: 选择单牌占卜或三牌阵 / Choose single card or three-card spread
3. **洗牌** / **Shuffle**: 观看洗牌动画 / Watch the shuffle animation
4. **抽牌** / **Draw Cards**: 查看抽到的牌，点击卡片可翻转查看 / View drawn cards, click to flip
5. **查看关键词** / **View Keywords**: 点击牌背面查看关键词 / Click card back to view keywords
6. **获取解读** / **Get Reading**: 点击"获取解读"按钮，AI 将为你提供专业解读 / Click "Get Reading" button for AI interpretation

---

## 核心特性说明 / Core Features

### 逆位牌逻辑 / Reversed Card Logic

- 抽牌时有 30% 概率抽到逆位牌 / 30% chance of drawing reversed cards
- 逆位牌在视觉上旋转 180 度 / Reversed cards are visually rotated 180 degrees
- AI 解读时，逆位牌被正确理解为"内化能量"、"延迟"或"受阻能量"，而非简单的"坏运气" / AI correctly interprets reversed cards as "internalized energy", "delays", or "blocked energy", not simply "bad luck"

### Prompt Engineering

后端使用精心设计的 Prompt，确保 Gemini AI：
- 理解逆位牌的正确含义 / Understands correct meaning of reversed cards
- 根据牌的位置（过去/现在/未来）进行解读 / Interprets based on card positions (Past/Present/Future)
- 结合用户问题提供个性化解读 / Provides personalized readings based on user questions
- 输出格式化的 Markdown 内容 / Outputs formatted Markdown content

### 在线图片支持 / Online Image Support

- 自动从 GitHub 加载塔罗牌图片 / Automatically loads Tarot card images from GitHub
- 如果图片加载失败，会显示占位符 / Shows placeholder if image fails to load
- 支持本地图片作为备选 / Supports local images as fallback

---

## 开发 / Development

### 后端 API / Backend API

- `GET /api/health` - 健康检查 / Health check
- `POST /api/reading` - 获取塔罗解读 / Get Tarot reading

**请求体示例 / Request Body Example:**
```json
{
  "question": "我最近的工作发展如何？",
  "spread_type": "three_card",
  "cards": [
    {
      "name": "The Fool",
      "isReversed": false,
      "position": "Past"
    },
    {
      "name": "The Magician",
      "isReversed": true,
      "position": "Present"
    },
    {
      "name": "The World",
      "isReversed": false,
      "position": "Future"
    }
  ]
}
```

### 环境变量 / Environment Variables

**后端 / Backend (`server/.env`):**
```env
GOOGLE_GEMINI_API_KEY=your_api_key_here
PORT=3000
```

**前端 / Frontend (`client/.env` - 可选 / optional):**
```env
VITE_API_URL=http://localhost:3000
```

---

## 故障排除 / Troubleshooting

### API Key 无效错误 / API Key Invalid Error

如果遇到 "API key not valid" 错误 / If you encounter "API key not valid" error:

1. **检查 .env 文件** / **Check .env file**: 确保文件在 `server` 目录下，格式正确 / Ensure file is in `server` directory with correct format
2. **验证 API Key** / **Verify API Key**: 在 [Google AI Studio](https://makersuite.google.com/app/apikey) 中检查 / Check in [Google AI Studio](https://makersuite.google.com/app/apikey)
3. **启用 API** / **Enable API**: 在 Google Cloud Console 中启用 Generative Language API / Enable Generative Language API in Google Cloud Console
4. **重启服务器** / **Restart Server**: 修改 .env 后必须重启 / Must restart after modifying .env

### 图片不显示 / Images Not Loading

- 图片会自动从网络加载 / Images automatically load from the web
- 如果网络问题，会显示占位符 / Placeholder shown if network issues
- 可以添加本地图片到 `client/public/assets/` / Can add local images to `client/public/assets/`

### 模型错误 / Model Errors

- 默认使用 `gemini-3-pro-preview` / Default uses `gemini-3-pro-preview`
- 如果不可用，自动回退到 `gemini-1.5-pro` / Automatically falls back to `gemini-1.5-pro` if unavailable

---

## 许可证 / License

MIT

---

## 贡献 / Contributing

欢迎提交 Issue 和 Pull Request！/ Issues and Pull Requests are welcome!

---

## 更新日志 / Changelog

### v1.0.0
- ✨ 初始版本 / Initial release
- 🎴 支持 78 张塔罗牌 / Support for 78 Tarot cards
- 🤖 集成 Gemini 3 Pro Preview / Gemini 3 Pro Preview integration
- 🎨 精美动画和 UI / Beautiful animations and UI
- 📝 关键词显示功能 / Keywords display feature
- 🌐 在线图片支持 / Online image support
