// 必须在所有其他导入之前加载环境变量
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import { createReading } from './services/geminiService.js';

// 验证环境变量
if (!process.env.GOOGLE_GEMINI_API_KEY) {
  console.error('❌ 警告: GOOGLE_GEMINI_API_KEY 未设置！');
  console.error('请在 server/.env 文件中设置 GOOGLE_GEMINI_API_KEY');
}

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Tarot Reading API is running' });
});

// Main reading endpoint
app.post('/api/reading', async (req, res) => {
  try {
    const { question, spread_type, cards } = req.body;

    // Validation
    if (!question || !spread_type || !cards || !Array.isArray(cards)) {
      return res.status(400).json({
        error: 'Missing required fields: question, spread_type, and cards array'
      });
    }

    // Generate reading using Gemini
    const reading = await createReading(question, spread_type, cards);

    res.json({ reading });
  } catch (error) {
    console.error('Error generating reading:', error);
    res.status(500).json({
      error: 'Failed to generate reading',
      message: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

