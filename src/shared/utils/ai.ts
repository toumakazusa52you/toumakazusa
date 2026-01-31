import OpenAI from 'openai';

export const generateDialog = async (
  question: string,
  style: string,
  relation: string = ''
): Promise<string> => {
  const apiKey = (window as any).OpenAI_API_Key || '';
  
  if (!apiKey) {
    throw new Error('OpenAI API Key not set');
  }

  const openai = new OpenAI({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true,
  });

  const styleDescriptions: Record<string, string> = {
    humor: '幽默风趣，用轻松幽默的方式回应，化解尴尬',
    polite: '礼貌得体，传统礼貌的回应方式',
    sharp: '犀利回怼，机智地反击但不失礼貌',
    evasive: '巧妙回避，转移话题，不直接回答',
  };

  const prompt = `你是一个应对春节亲戚询问的话术专家。请根据以下信息生成一个${styleDescriptions[style]}的回应：

${relation ? `面对${relation}的询问：` : ''}
问题：${question}

要求：
1. 回应要符合${styleDescriptions[style]}的风格
2. 语言要自然口语化，符合日常交流习惯
3. 长度适中，不要太长
4. 要体现出智慧和情商
5. 避免使用敏感或不合适的内容
`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: '你是一个应对春节亲戚询问的话术专家，善于用各种风格回应亲戚的问题。',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 150,
    });

    return response.choices[0].message.content?.trim() || '抱歉，生成失败，请重试。';
  } catch (error) {
    console.error('AI生成失败:', error);
    throw new Error('AI生成失败，请检查API密钥是否正确。');
  }
};
