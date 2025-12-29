# Gemini API 配置指南

## 项目信息
- **项目名称**: Daily-Tarot-Reading
- **项目编号**: 249089862972
- **项目 ID**: gen-lang-client-0835687688
- **完整项目名称**: projects/249089862972

## 配置步骤

### 1. 在 Google Cloud Console 中启用 Gemini API

1. 访问 [Google Cloud Console](https://console.cloud.google.com/)
2. 选择你的项目：**Daily-Tarot-Reading** (项目编号: 249089862972)
3. 导航到 **API 和服务** > **库**
4. 搜索 "Generative Language API" 或 "Gemini API"
5. 点击 **启用**

### 2. 创建或验证 API Key

1. 访问 [Google AI Studio](https://aistudio.google.com/app/apikey)
2. 确保选择正确的项目：**Daily-Tarot-Reading**
3. 创建新的 API Key 或使用现有的
4. 确保 API Key 有访问 **Generative Language API** 的权限

### 3. 配置环境变量

在 `server/.env` 文件中设置：

```env
GOOGLE_GEMINI_API_KEY=你的API密钥
PORT=3000
```

### 4. 验证 API Key 权限

确保 API Key 可以访问以下模型：
- ✅ gemini-3-pro-preview
- ✅ gemini-1.5-pro (备选)

### 5. 重启服务器

修改 `.env` 文件后，必须重启服务器：

```bash
cd server
npm start
```

## 常见问题

### API Key 无效错误

如果遇到 "API key not valid" 错误：

1. **检查 API Key 是否正确**：
   - 确保 `.env` 文件中没有多余的空格
   - API Key 应该以 `AIza` 开头

2. **检查 API 是否已启用**：
   - 在 Google Cloud Console 中确认 Generative Language API 已启用
   - 等待几分钟让更改生效

3. **检查 API Key 权限**：
   - 确保 API Key 与正确的项目关联
   - 确保 API Key 没有被限制或撤销

4. **检查计费**：
   - 确保 Google Cloud 项目已启用计费（某些 API 需要）

### 模型不可用错误

如果 `gemini-3-pro-preview` 不可用：
- 系统会自动回退到 `gemini-1.5-pro`
- 或者尝试使用 `gemini-pro` 或 `gemini-1.5-flash`

## 测试配置

启动服务器后，查看控制台输出：

```
✅ API Key 已加载，长度: 39
API Key 前10个字符: AIzaSyA07O...
```

如果看到这些信息，说明配置成功！


