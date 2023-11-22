import { Message, OpenAIStream, StreamingTextResponse, ReplicateStream } from 'ai'
import { Configuration, OpenAIApi } from 'openai-edge'
import Replicate from 'replicate'


import { nanoid } from '@/lib/utils'
import { getContext } from '@/utils/context'


export const runtime = 'edge'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})

const replicate = new Replicate({
	auth: process.env.NEXT_PUBLIC_REPLICATE_API_KEY || ''
})

const openai = new OpenAIApi(configuration)

export async function POST(req: Request) {
  const json = await req.json()
  const { messages, currentModel } = json

  console.log(currentModel)

  const lastMessage = messages[messages.length - 1]

  // Get the context from the last message
  const context = await getContext(lastMessage.content, '')

  console.log(context)

  const prompt = [
    {
      role: 'system',
      content: `AI assistant is a brand new, powerful, human-like artificial intelligence.
    The traits of AI include expert knowledge, helpfulness, cleverness, and articulateness.
    AI is a well-behaved and well-mannered individual.
    AI is always friendly, kind, and inspiring, and he is eager to provide vivid and thoughtful responses to the user.
    AI has the sum of all knowledge in their brain, and is able to accurately answer nearly any question about any topic in conversation.
    START CONTEXT BLOCK
    ${context}
    END OF CONTEXT BLOCK
    AI assistant will take into account any CONTEXT BLOCK that is provided in a conversation.
    If the context does not provide the answer to question, the AI assistant will say, "I'm sorry, but I don't know the answer to that question".
    AI assistant will not apologize for previous responses, but instead will indicated new information was gained.
    AI assistant will not invent anything that is not drawn directly from the context.
    `,
    },
  ]

  if (currentModel === 'llama') {
    console.log('llama')

    const data = [prompt[0].content, ...messages
      .map((message: { content: any }) => message.content)
      ].join('\n')

      console.log(data)
    
    const response = await replicate.predictions.create({
      // You must enable streaming.
      stream: true,
      // The model must support streaming. See https://replicate.com/docs/streaming
      // This is the model ID for Llama 2 70b Chat
      version:
        '2c1608e18606fad2812020dc541930f2d0495ce32eee50074220b87300bc16e1',
      // Format the message list into a single string with newlines
      input: {
        prompt: data
      }
    })
  
    // Convert the response into a friendly text-stream
    const stream = await ReplicateStream(response)
    // Respond with the stream
    return new StreamingTextResponse(stream)
  }

  const res = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [...prompt, ...messages.filter((message: Message) => message.role === 'user')],
    temperature: 0.7,
    stream: true
  })

  const stream = OpenAIStream(res)

  return new StreamingTextResponse(stream)
}
