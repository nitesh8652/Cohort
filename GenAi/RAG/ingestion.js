import { PDFParse } from "pdf-parse";
import fs from 'fs/promises'
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { CohereEmbeddings } from "@langchain/cohere";
import "dotenv/config"
import { Pinecone } from "@pinecone-database/pinecone";

const parser = new PDFParse({
    data: await fs.readFile("./story.pdf")
})

const text = (await parser.getText({ pageJoiner: "" })).text

const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 100,
})

const chunks = await textSplitter.splitText(text)

console.log(chunks)

//embeddings


const embeddings = new CohereEmbeddings({
    model: "embed-v5.0-fast",
    apiKey: process.env.COHERE_API_KEY
})

const vectors = await embeddings.embedDocuments(chunks)

//vector db PINE CONE

const pinecone = new Pinecone({

    apiKey: process.env.PINECORE_API_KEY
})

const index = pinecone.Index({
    name: "cohort",
    host: "https://cohort-ewpcf4e.svc.aped-4627-b74a.pinecone.io"
})

await index.documents.upsert({
    documents: vectors.map((vector, index) => {
        return {
            _id: `chunk-${index}`,
            embedding: vector,
            content: chunks[index]
        }
    })
})

console.log(vectors)