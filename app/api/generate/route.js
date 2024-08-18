import { NextResponse } from 'next/server'

// Assuming a hypothetical Llama API client
import LlamaAPI from 'llama-api'

const llama = new LlamaAPI(process.env.LLAMA_API_KEY)

const systemPrompt = `
You are a flashcard creator. Create exactly 10 flashcards from the given text.
Both front and back should be one sentence long.
Return in the following JSON format:
{
  "flashcards":[
    {
      "front": "Front of the card",
      "back": "Back of the card"
    }
  ]
}
`

export async function POST(req) {
  const data = await req.text()

  try {
    const response = await llama.complete({
      prompt: `${systemPrompt}\n\nText: ${data}`,
      maxTokens: 1000,
      temperature: 0.7,
    })

    const flashcards = JSON.parse(response.choices[0].text)
    return NextResponse.json(flashcards.flashcards)
  } catch (error) {
    console.error('Error generating flashcards:', error)
    return NextResponse.json({ error: { message: error.message } }, { status: 500 })
  }
}