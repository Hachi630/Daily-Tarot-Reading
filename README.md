# 🔮 神秘塔罗占卜 (Mystical Tarot AI)

一个基于 React 和 Node.js 的塔罗占卜 Web 应用，集成 Google Gemini AI 提供智能解读。

## 功能特性

- ✨ **78 张标准韦特塔罗牌**：完整的大阿卡纳和小阿卡纳牌组
- 🔄 **逆位牌支持**：30% 概率抽到逆位牌，正确解读内化能量
- 🎴 **两种牌阵**：单牌占卜和三牌阵（过去·现在·未来）
- 🎨 **精美动画**：使用 Framer Motion 实现流畅的洗牌、翻牌动画
- 🤖 **AI 智能解读**：Google Gemini 1.5 Pro 提供专业塔罗解读
- 🎭 **神秘主题**：深紫色和金色渐变的神秘风格 UI

## 技术栈

### 前端
- React 19 + Vite
- Tailwind CSS
- Framer Motion（动画）
- React Markdown（Markdown 渲染）

### 后端
- Node.js + Express
- Google Gemini 1.5 Pro API
- CORS 支持

## 项目结构

```
Daily-Tarot-Reading/
├── client/                 # React 前端
│   ├── src/
│   │   ├── components/     # React 组件
│   │   ├── data/          # 塔罗牌数据
│   │   ├── utils/         # 工具函数
│   │   └── App.jsx
│   └── public/
│       └── assets/        # 塔罗牌图片（需自行添加）
├── server/                # Node.js 后端
│   ├── server.js
│   └── services/
│       └── geminiService.js
└── data/
    └── tarotData.json     # 塔罗牌数据源
```

## 安装与运行

### 前置要求

- Node.js 18+
- Google Gemini API Key

### 1. 安装依赖

```bash
# 安装前端依赖
cd client
npm install

# 安装后端依赖
cd ../server
npm install
```

### 2. 配置环境变量

在 `server` 目录下创建 `.env` 文件：

```env
GOOGLE_GEMINI_API_KEY=your_api_key_here
PORT=3000
```

在 `client` 目录下创建 `.env` 文件（可选，默认使用 localhost:3000）：

```env
VITE_API_URL=http://localhost:3000
```

### 3. 添加塔罗牌图片

将塔罗牌图片放入 `client/public/assets/` 目录，文件名需与 `tarotData.json` 中的 `image_url` 字段匹配。

例如：
- `the_fool.jpg`
- `the_magician.jpg`
- `ace_of_cups.jpg`
- 等等...

### 4. 启动应用

```bash
# 启动后端服务器（在 server 目录）
npm start
# 或开发模式
npm run dev

# 启动前端开发服务器（在 client 目录，新终端）
npm run dev
```

访问 `http://localhost:5173` 开始使用。

## 使用说明

1. **输入问题**：在首页输入你想问塔罗牌的问题
2. **选择牌阵**：选择单牌占卜或三牌阵
3. **洗牌**：观看洗牌动画
4. **抽牌**：查看抽到的牌，点击卡片可翻转查看
5. **获取解读**：点击"获取解读"按钮，AI 将为你提供专业解读

## 核心特性说明

### 逆位牌逻辑

- 抽牌时有 30% 概率抽到逆位牌
- 逆位牌在视觉上旋转 180 度
- AI 解读时，逆位牌被正确理解为"内化能量"、"延迟"或"受阻能量"，而非简单的"坏运气"

### Prompt Engineering

后端使用精心设计的 Prompt，确保 Gemini AI：
- 理解逆位牌的正确含义
- 根据牌的位置（过去/现在/未来）进行解读
- 结合用户问题提供个性化解读
- 输出格式化的 Markdown 内容

## 开发

### 后端 API

- `GET /api/health` - 健康检查
- `POST /api/reading` - 获取塔罗解读

请求体示例：
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

## 许可证

MIT
