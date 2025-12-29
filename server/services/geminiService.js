import { GoogleGenerativeAI } from '@google/generative-ai';

// 延迟初始化，确保环境变量已加载
let genAI = null;
let model = null;

function initializeGemini() {
  // 如果已经初始化，直接返回
  if (genAI && model) {
    return;
  }

  // 检查并清理 API key
  let apiKey = process.env.GOOGLE_GEMINI_API_KEY;
  if (apiKey) {
    // 移除可能的空格和换行符
    apiKey = apiKey.trim();
  }

  if (!apiKey) {
    console.error('❌ 错误: GOOGLE_GEMINI_API_KEY 环境变量未设置！');
    console.error('请确保 .env 文件存在于 server 目录下，并且包含 GOOGLE_GEMINI_API_KEY');
    throw new Error('GOOGLE_GEMINI_API_KEY 环境变量未设置');
  }

  console.log('✅ API Key 已加载，长度:', apiKey.length);
  console.log('API Key 前10个字符:', apiKey.substring(0, 10) + '...');
  
  // 验证 API key 格式（Google API key 通常以 AIza 开头）
  if (!apiKey.startsWith('AIza')) {
    console.warn('⚠️  警告: API Key 格式可能不正确（通常以 AIza 开头）');
  }

  genAI = new GoogleGenerativeAI(apiKey);
  // 使用 gemini-3-pro-preview，如果失败则回退到 gemini-1.5-pro
  model = genAI.getGenerativeModel({ model: 'gemini-3-pro-preview' });
}

export async function createReading(question, spreadType, cards) {
  // 确保 Gemini 已初始化（此时环境变量应该已经加载）
  initializeGemini();
  
  // Build the cards description
  const cardsDescription = cards.map((card, index) => {
    const position = card.position || (spreadType === 'three_card' 
      ? ['Past', 'Present', 'Future'][index] 
      : 'Result');
    const orientation = card.isReversed ? 'Reversed (逆位)' : 'Upright (正位)';
    return `${position}: ${card.name} - ${orientation}`;
  }).join('\n');

  const systemPrompt = `You are an experienced and mystical Tarot reader with deep empathy and insight. Your readings are profound, compassionate, and transformative.

**CRITICAL INTERPRETATION RULES:**

1. **Reversed Cards (逆位) Meaning:**
   - Reversed cards represent INTERNALIZED ENERGY, DELAYS, or BLOCKED ENERGY
   - They do NOT mean "bad luck" or "negative outcomes"
   - They indicate that the card's energy is turned inward, needs more time to manifest, or is being resisted
   - Example: A reversed card might mean the person needs to work on themselves internally before the energy can flow outward

2. **Position Interpretation:**
   - Past: What has led to the current situation
   - Present: Current circumstances and energies
   - Future: Potential outcomes and direction
   - Result: Overall answer to the question

3. **Reading Style:**
   - Be mystical yet practical
   - Show deep empathy and understanding
   - Provide actionable insights
   - Use symbolic language but remain clear
   - Connect the cards' meanings to the user's specific question

4. **Output Format:**
   - Use clean Markdown formatting
   - Include headings, paragraphs, and emphasis where appropriate
   - Structure: Overview → Card-by-Card Analysis → Synthesis → Guidance

Now, provide a comprehensive Tarot reading for the following:

**Question:** ${question}

**Spread Type:** ${spreadType}

**Cards Drawn:**
${cardsDescription}

Provide a detailed, insightful reading that honors both the upright and reversed meanings of the cards, their positions, and how they relate to the questioner's situation.`;

  try {
    const result = await model.generateContent(systemPrompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Gemini API Error:', error);
    
    // 检查是否是 API key 问题
    if (error.message && error.message.includes('API key not valid')) {
      console.error('❌ API Key 无效！');
      console.error('请检查：');
      console.error('1. .env 文件中的 GOOGLE_GEMINI_API_KEY 是否正确');
      console.error('2. API key 是否在 Google AI Studio 中有效');
      console.error('3. API key 是否有访问 Gemini API 的权限');
      console.error('4. 服务器是否已重启以加载新的环境变量');
      throw new Error('API Key 无效。请检查 .env 文件中的 GOOGLE_GEMINI_API_KEY 配置，并确保服务器已重启。');
    }
    
    // 如果 gemini-3-pro-preview 失败，尝试备选模型
    if (error.message && (error.message.includes('model') || error.message.includes('not found'))) {
      console.log('尝试使用备选模型 gemini-1.5-pro...');
      try {
        const fallbackModel = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
        const result = await fallbackModel.generateContent(systemPrompt);
        const response = await result.response;
        return response.text();
      } catch (fallbackError) {
        console.error('备选模型也失败:', fallbackError);
        throw new Error(`Failed to generate reading: ${fallbackError.message}`);
      }
    }
    
    throw new Error(`Failed to generate reading: ${error.message}`);
  }
}

