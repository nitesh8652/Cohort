import { ChatCohere, CohereEmbeddings } from '@langchain/cohere'
import "dotenv/config"
import { Pinecone } from '@pinecone-database/pinecone'
import { HumanMessage, AIMessage, ToolMessage } from 'langchain'


const userInput = "how he got is first job?"

//converting userinput to vector

const embeddings = new CohereEmbeddings({
    apiKey: process.env.COHERE_API_KEY,
    model: "embed-v5.0-fast",
})

const vector = await embeddings.embedQuery(userInput)

//vector db PINE CONE

const pinecone = new Pinecone({

    apiKey: process.env.PINECORE_API_KEY
})

const index = pinecone.index("cohort")


//query pinecore index with vector

const results = await index.documents.search({
    topK:3,
    scoreBy:[
        {
            type:'dense_vector',
            fields:['embedding'],
            values:vector
        }
    ],
    includeFields:['content']
})

// console.log(results)

const model = new ChatCohere({
    model: "command-a-03-2025",
    apiKey: process.env.COHERE_API_KEY
})

const messages = []

messages.push(new HumanMessage(userInput))

messages.push(new ToolMessage({
    content:JSON.stringify(results)
}))

const aiResponse = await model.stream(messages)


for await (const chunk of aiResponse){
    process.stdout.write(chunk.text)
}
console.log(aiResponse)