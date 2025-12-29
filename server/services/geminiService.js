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
  // 使用 gemini-3-pro-preview，如果失败则回退到其他可用模型
  // 注意：根据 API 版本，可能需要使用不同的模型名称
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

  const systemPrompt = `你是一位经验丰富且神秘的塔罗占卜师，具有深刻的共情能力和洞察力。你的解读深刻、富有同情心且具有转化力。

**重要：请使用中文回复所有内容。**

**关键解读规则：**

1. **逆位牌（逆位）的含义：**
   - 逆位牌代表"内化能量"、"延迟"或"受阻能量"
   - 它们并不意味着"坏运气"或"负面结果"
   - 它们表示牌的能量向内转化，需要更多时间才能显现，或者正在被抗拒
   - 例如：逆位牌可能意味着这个人需要先在内在上完善自己，能量才能向外流动

2. **位置解读：**
   - 过去：导致当前情况的原因
   - 现在：当前的状况和能量
   - 未来：潜在的结果和方向
   - 结果：对问题的整体回答

3. **解读风格：**
   - 神秘而实用
   - 展现深刻的共情和理解
   - 提供可行的建议
   - 使用象征性语言但保持清晰
   - 将牌的含义与提问者的具体问题联系起来

4. **输出格式：**
   - 使用清晰的 Markdown 格式
   - 包含标题、段落和适当的强调
   - 结构：总体概述 → 逐张牌分析 → 综合分析 → 指导建议

现在，请为以下内容提供全面的塔罗解读：

**问题：** ${question}

**牌阵类型：** ${spreadType}

**抽到的牌：**
${cardsDescription}

请提供详细、有洞察力的解读，尊重正位和逆位的含义，它们的位置，以及它们如何与提问者的情况相关。请使用中文回复。`;

  try {
    const result = await model.generateContent(systemPrompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Gemini API Error:', error);
    
    // 检查是否是 API key 问题
    if (error.message && (error.message.includes('API key not valid') || error.message.includes('leaked') || error.message.includes('403'))) {
      console.error('❌ API Key 问题！');
      if (error.message.includes('leaked')) {
        console.error('⚠️  API Key 被报告为泄露，请使用新的 API Key');
        console.error('请访问 https://makersuite.google.com/app/apikey 创建新的 API Key');
      } else {
        console.error('请检查：');
        console.error('1. .env 文件中的 GOOGLE_GEMINI_API_KEY 是否正确');
        console.error('2. API key 是否在 Google AI Studio 中有效');
        console.error('3. API key 是否有访问 Gemini API 的权限');
        console.error('4. 服务器是否已重启以加载新的环境变量');
      }
      throw new Error('API Key 无效或已泄露。请访问 https://makersuite.google.com/app/apikey 创建新的 API Key，并更新 .env 文件。');
    }
    
    // 如果 gemini-3-pro-preview 失败，尝试备选模型
    if (error.message && (error.message.includes('model') || error.message.includes('not found') || error.message.includes('404') || error.message.includes('403'))) {
      // 尝试多个备选模型，按优先级排序
      const fallbackModels = ['gemini-pro', 'gemini-1.5-flash'];
      
      for (const modelName of fallbackModels) {
        try {
          console.log(`尝试使用备选模型 ${modelName}...`);
          const fallbackModel = genAI.getGenerativeModel({ model: modelName });
          const result = await fallbackModel.generateContent(systemPrompt);
          const response = await result.response;
          console.log(`✅ 成功使用模型: ${modelName}`);
          return response.text();
        } catch (fallbackError) {
          console.log(`模型 ${modelName} 失败: ${fallbackError.message}`);
          // 如果是 API key 问题，不再尝试其他模型
          if (fallbackError.message && (fallbackError.message.includes('API key') || fallbackError.message.includes('leaked') || fallbackError.message.includes('403'))) {
            throw fallbackError;
          }
          continue;
        }
      }
      
      console.error('所有备选模型都失败');
      throw new Error(`无法生成解读：所有模型都不可用。请检查 API key 是否有效，或访问 https://makersuite.google.com/app/apikey 创建新的 API Key。原始错误: ${error.message}`);
    }
    
    throw new Error(`Failed to generate reading: ${error.message}`);
  }
}

