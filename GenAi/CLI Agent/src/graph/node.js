import { ChatGroq } from "@langchain/groq"
import { getApiKey } from '../utils/file.utils.js'
import { AIMessage } from 'langchain'
import { upsertFiles } from "../tools/file.tools.js"
import * as fileTools from '../tools/file.tools.js'

//node for state graph
export async function LLMNODE(state) {
    // const { apikey, error } = await getApiKey()
    // if (error) throw new Error(error)

    const model = new ChatGroq({
        model: "openai/gpt-oss-120b",
        apiKey: apikey,
    })

    const modelWithTool = model.bindTools([upsertFiles])

    const stream = await model.stream(state.messages)

    process.stdout.write("AI: ")

    let aiMessage = ''
    for await (const chunk of stream) {
        process.stdout.write(chunk.text)
        if (!aiMessage) aiMessage = chunk
        else aiMessage = aiMessage.concat(chunk)
    }
    process.stdout.write("\n")
    return {
        messages: [
            ...state.messages,
            new aiMessage
        ]
    }
}   

//handles tool calls from ai 

export async function TOOLNODE(state, config){
    const messages = state.messages
    const lastMessage = state.messages[state.messages - 1]
    const toolCalls = lastMessage.tool_calls

    const toolResults = await Promise.all(toolCalls.map(async toolCall =>{
        return await fileTools[toolCall.name].invoke(toolCall)
        
    }))


    return{
        messages:[
            ...state.messages,
            ...toolResults
        ]
    }
}