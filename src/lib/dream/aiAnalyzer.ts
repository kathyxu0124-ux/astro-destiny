import OpenAI from 'openai'

const SYSTEM_PROMPT = `你是一位融合中国传统周公解梦与现代心理学的梦境分析大师。
请从以下维度解析用户的梦境：

1. **梦境概述**：简要总结梦境的核心内容和氛围
2. **符号解析**：分析梦中出现的关键符号和意象的含义
3. **心理暗示**：从潜意识和心理学角度分析梦境反映的内心状态
4. **传统解读**：结合周公解梦等传统文化给出吉凶判断
5. **建议指引**：给出实际的建议和行动指引

回答要温和、有洞见，既有传统文化底蕴，也有现代心理学视角。用中文回答。`

export async function analyzeDreamWithAI(
  dreamText: string,
  apiKey: string,
  onChunk: (text: string) => void,
): Promise<void> {
  const client = new OpenAI({
    apiKey,
    dangerouslyAllowBrowser: true,
  })

  const stream = await client.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: `请帮我解析这个梦境：\n\n${dreamText}` },
    ],
    stream: true,
    max_tokens: 1500,
  })

  for await (const chunk of stream) {
    const content = chunk.choices[0]?.delta?.content
    if (content) {
      onChunk(content)
    }
  }
}
