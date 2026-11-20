import { ChatGroq } from "@langchain/groq"
import { getApiKey } from '../utils/file.utils.js'
import { AIMessage } from 'langchain'

export async function LLMNODE(state) {
    const { apikey, error } = await getApiKey()
    if (error) throw new Error(error)

    const model = new ChatGroq({
        model: "openai/gpt-oss-120b",
        apiKey: apikey,
    })
    const stream = await model.stream(state.messages)

    process.stdout.write("AI: ")

    let aiMessage = ''
    for await (const chunk of stream) {
        process.stdout.write(chunk.text)
        aiMessage += chunk.text
    }
    process.stdout.write("\n")
    return {
        messages: [
            ...state.messages,
            new AIMessage(aiMessage)
        ]
    }
}   